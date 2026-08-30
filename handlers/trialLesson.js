import { sendMessage } from "./vkApi.js";

const FLOW_NAME = "trial_registration";

function getIsoTimestamp(date = new Date()) {
  return date.toISOString();
}

function buildQuestionKeyboard(buttons) {
  return {
    inline: true,
    buttons,
  };
}

async function getUserIdByVkId(env, vkId) {
  if (!env.DB || !vkId) {
    return null;
  }

  const row = await env.DB.prepare("SELECT id FROM users WHERE vk_id = ?").bind(vkId).first();
  return row ? row.id : null;
}

async function getLeadById(env, leadId) {
  if (!env.DB || !leadId) {
    return null;
  }

  return env.DB.prepare("SELECT * FROM leads WHERE id = ?").bind(leadId).first();
}

async function setTrialState(env, vkId, state) {
  if (!env.KV || !vkId) {
    return;
  }

  await env.KV.put(`trial:${vkId}`, JSON.stringify(state));
}

async function getTrialState(env, vkId) {
  if (!env.KV || !vkId) {
    return null;
  }

  const raw = await env.KV.get(`trial:${vkId}`);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function updateLeadField(env, leadId, field, value) {
  if (!env.DB || !leadId) {
    return null;
  }

  const dbValue = value === undefined ? null : value;
  const sql = `UPDATE leads SET ${field} = ?, updated_at = ? WHERE id = ?`;
  return env.DB.prepare(sql).bind(dbValue, getIsoTimestamp(), leadId).run();
}

async function logLeadEvent(env, { userId, leadId, eventType, eventValue }) {
  if (!env.DB || !leadId || !userId) {
    return;
  }

  await env.DB.prepare(
    "INSERT INTO lead_events (user_id, lead_id, event_type, event_value) VALUES (?, ?, ?, ?)"
  ).bind(userId, leadId, eventType, eventValue ?? null).run();
}

async function createLeadForUser(env, userId) {
  if (!env.DB || !userId) {
    return null;
  }

  const result = await env.DB.prepare(
    "INSERT INTO leads (user_id, status) VALUES (?, 'draft')"
  ).bind(userId).run();

  return Number(result?.meta?.last_row_id ?? 0) || null;
}

function createAgeKeyboard() {
  return buildQuestionKeyboard([
    [
      { action: { type: "callback", label: "10–12", payload: JSON.stringify({ action: "trial_age", value: "10_12" }) } },
      { action: { type: "callback", label: "13–14", payload: JSON.stringify({ action: "trial_age", value: "13_14" }) } },
      { action: { type: "callback", label: "15–17", payload: JSON.stringify({ action: "trial_age", value: "15_17" }) } },
    ],
  ]);
}

function createCourseKeyboard() {
  return buildQuestionKeyboard([
    [
      { action: { type: "callback", label: "🟢 ИИ Старт", payload: JSON.stringify({ action: "trial_course", value: "ai_start" }) } },
      { action: { type: "callback", label: "💻 Вайбкодинг", payload: JSON.stringify({ action: "trial_course", value: "vibecoding" }) } },
    ],
    [
      { action: { type: "callback", label: "🎨 ИИ для творчества", payload: JSON.stringify({ action: "trial_course", value: "ai_creative" }) } },
      { action: { type: "callback", label: "⚡ ИИ PRO", payload: JSON.stringify({ action: "trial_course", value: "ai_pro" }) } },
    ],
    [
      { action: { type: "callback", label: "🤷 Нужна помощь в выборе", payload: JSON.stringify({ action: "trial_course", value: "need_help" }) } },
    ],
  ]);
}

function createReviewKeyboard() {
  return buildQuestionKeyboard([
    [
      { action: { type: "callback", label: "✅ Всё верно", payload: JSON.stringify({ action: "trial_review_confirm" }) } },
      { action: { type: "callback", label: "✏️ Изменить", payload: JSON.stringify({ action: "trial_review_edit" }) } },
    ],
  ]);
}

function formatLeadReview(lead) {
  return [
    "Проверьте заявку 👇",
    "",
    `👦 Ребёнок: ${lead.child_name || "Не указано"}`,
    `🎂 Возраст: ${lead.child_age_group || "Не указано"}`,
    "",
    "🤖 Направление:",
    `${lead.course || "Не указано"}`,
    "",
    "💬 О ребёнке:",
    `${lead.notes || "Не указано"}`,
    "",
    "📅 Пробный урок:",
    `${lead.preferred_time_custom || "Не указано"}`,
    "",
    `👤 Родитель: ${lead.parent_name || "Не указано"}`,
    "",
    "📱 Телефон:",
    `${lead.phone || "Не указано"}`,
    "",
    "✉️ Email:",
    `${lead.email || "Не указано"}`,
  ].join("\n");
}

async function startTrialFlow(env, peerId, vkId, { reset = false } = {}) {
  const userId = await getUserIdByVkId(env, vkId);
  if (!userId) {
    return;
  }

  let leadId = null;
  if (reset) {
    leadId = await createLeadForUser(env, userId);
  } else {
    const state = await getTrialState(env, vkId);
    if (state?.lead_id) {
      leadId = Number(state.lead_id);
    } else {
      leadId = await createLeadForUser(env, userId);
    }
  }

  if (!leadId) {
    return;
  }

  const nextState = {
    flow: FLOW_NAME,
    step: "parent_name",
    lead_id: leadId,
  };

  await setTrialState(env, vkId, nextState);
  await logLeadEvent(env, {
    userId,
    leadId,
    eventType: "bot_started",
    eventValue: "trial_registration",
  });

  return sendMessage(env, peerId, {
    text: "Напишите Ваше имя",
  });
}

async function askNextQuestion(env, peerId, state, userId) {
  if (!state?.lead_id) {
    return;
  }

  const lead = await getLeadById(env, state.lead_id);
  if (!lead) {
    return;
  }

  switch (state.step) {
    case "parent_name":
      return sendMessage(env, peerId, { text: "Напишите Ваше имя" });
    case "child_name":
      return sendMessage(env, peerId, { text: "Как зовут ученика?" });
    case "age":
      return sendMessage(env, peerId, {
        text: "Выберите возраст ребёнка",
        keyboard: createAgeKeyboard(),
      });
    case "course":
      return sendMessage(env, peerId, {
        text: "Какой курс интересует?",
        keyboard: createCourseKeyboard(),
      });
    case "notes":
      return sendMessage(env, peerId, {
        text: "Расскажите буквально в 1-2 предложениях о ребёнке: чем интересуется, был ли опыт программирования или работы с ИИ, что хотелось бы научиться делать?\n\nЕсли сложно — нажмите кнопку ниже.",
        keyboard: buildQuestionKeyboard([
          [{ action: { type: "callback", label: "⏩ Пока сложно ответить", payload: JSON.stringify({ action: "trial_notes_skip" }) } }],
        ]),
      });
    case "preferred_time_custom":
      return sendMessage(env, peerId, {
        text: "Напишите удобное время и дату пробного урока.",
      });
    case "phone":
      return sendMessage(env, peerId, {
        text: "Оставьте номер телефона для связи и отправки ссылки на занятие.",
      });
    case "email":
      return sendMessage(env, peerId, {
        text: "Укажите электронную почту.",
      });
    case "review":
      return sendMessage(env, peerId, {
        text: formatLeadReview(lead),
        keyboard: createReviewKeyboard(),
      });
    default:
      return null;
  }
}

async function completeTrialStep(env, peerId, vkId, { step, field, value, eventType, eventValue, messageText }) {
  const state = await getTrialState(env, vkId);
  if (!state || state.flow !== FLOW_NAME || !state.lead_id) {
    return false;
  }

  const userId = await getUserIdByVkId(env, vkId);
  if (!userId) {
    return false;
  }

  if (field && value !== undefined) {
    await updateLeadField(env, state.lead_id, field, value);
    await logLeadEvent(env, {
      userId,
      leadId: state.lead_id,
      eventType,
      eventValue: String(value),
    });
  }

  if (messageText) {
    await updateLeadField(env, state.lead_id, field, messageText);
    await logLeadEvent(env, {
      userId,
      leadId: state.lead_id,
      eventType,
      eventValue: messageText,
    });
  }

  const nextState = { ...state, step };
  await setTrialState(env, vkId, nextState);
  await askNextQuestion(env, peerId, nextState, userId);
  return true;
}

async function finalizeLead(env, peerId, vkId) {
  const state = await getTrialState(env, vkId);
  if (!state || state.flow !== FLOW_NAME || !state.lead_id) {
    return;
  }

  const userId = await getUserIdByVkId(env, vkId);
  const lead = await getLeadById(env, state.lead_id);
  if (!lead || !userId) {
    return;
  }

  const now = getIsoTimestamp();

  await env.DB.prepare(
    "UPDATE leads SET status = 'completed', completed_at = ?, updated_at = ? WHERE id = ?"
  ).bind(now, now, state.lead_id).run();

  await logLeadEvent(env, {
    userId,
    leadId: state.lead_id,
    eventType: "lead_completed",
    eventValue: "completed",
  });

  await env.KV.delete(`trial:${vkId}`);

  const finalLead = await getLeadById(env, state.lead_id);
  const payload = {
    ...finalLead,
    vk_id: vkId,
  };

  const tasks = [];
  if (env.N8N_LEAD_WEBHOOK_URL || env.N8N_WEBHOOK_SECRET) {
    tasks.push(sendLeadToN8n(env, payload));
  }
  tasks.push(sendLeadToVkChat(env, payload));

  await Promise.allSettled(tasks);

  return sendMessage(env, peerId, {
    text: "Заявка принята 🎉\n\nМы свяжемся с вами и подтвердим точное\nвремя пробного занятия.\n\nДо встречи на уроке! 🚀",
  });
}

async function sendLeadToVkChat(env, lead) {
  const accessToken = env.VK_GROUP_TOKEN || env.VK_ACCESS_TOKEN;
  if (!accessToken) {
    return false;
  }

  const message = [
    "🔥 НОВАЯ ЗАЯВКА НА ПРОБНЫЙ УРОК",
    "",
    `👤 Родитель: ${lead.parent_name || "Не указано"}`,
    `👦 Ребёнок: ${lead.child_name || "Не указано"}`,
    `🎂 Возраст: ${lead.child_age_group || "Не указано"}`,
    "",
    `🤖 Направление: ${lead.course || "Не указано"}`,
    "",
    "💬 О ребёнке:",
    `${lead.notes || "Не указано"}`,
    "",
    "📅 Удобная дата и время:",
    `${lead.preferred_time_custom || "Не указано"}`,
    "",
    `📱 Телефон: ${lead.phone || "Не указано"}`,
    `✉️ Email: ${lead.email || "Не указано"}`,
    "",
    `🔵 VK ID: ${lead.vk_id || "Не указано"}`,
    `🆔 Lead ID: ${lead.id || "Не указано"}`,
  ].join("\n");

  const params = new URLSearchParams({
    access_token: accessToken,
    peer_id: String(env.VK_ADMIN_CHAT_ID || "2000000132"),
    message,
    random_id: String(crypto.getRandomValues(new Uint32Array(1))[0] & 0x7fffffff),
    v: "5.199",
  });

  const response = await fetch("https://api.vk.com/method/messages.send", {
    method: "POST",
    body: params,
  });

  const data = await response.json();
  if (data.error) {
    throw new Error(`VK API error: ${data.error.error_msg}`);
  }

  return data;
}

async function sendLeadToN8n(env, lead) {
  if (!env.N8N_LEAD_WEBHOOK_URL) {
    return false;
  }

  const response = await fetch(env.N8N_LEAD_WEBHOOK_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(env.N8N_WEBHOOK_SECRET ? { "X-Webhook-Secret": env.N8N_WEBHOOK_SECRET } : {}),
    },
    body: JSON.stringify({
      lead_id: lead.id,
      vk_id: lead.vk_id,
      parent_name: lead.parent_name,
      child_name: lead.child_name,
      course: lead.course,
      child_age_group: lead.child_age_group,
      experience_level: lead.experience_level,
      notes: lead.notes,
      preferred_time_custom: lead.preferred_time_custom,
      phone: lead.phone,
      email: lead.email,
    }),
  });

  if (!response.ok) {
    throw new Error(`n8n webhook error: ${response.status}`);
  }

  return true;
}

export async function handleTrialLesson(env, peerId, payload = {}) {
  const action = payload.action;
  const vkId = payload.userId ?? peerId;

  if (action === "trial_lesson") {
    return startTrialFlow(env, peerId, vkId, { reset: true });
  }

  if (action === "trial_age") {
    return completeTrialStep(env, peerId, vkId, {
      step: "course",
      field: "child_age_group",
      value: payload.value,
      eventType: "age_selected",
      eventValue: payload.value,
    });
  }

  if (action === "trial_course") {
    return completeTrialStep(env, peerId, vkId, {
      step: "notes",
      field: "course",
      value: payload.value,
      eventType: "course_selected",
      eventValue: payload.value,
    });
  }

  if (action === "trial_notes_skip") {
    return completeTrialStep(env, peerId, vkId, {
      step: "preferred_time_custom",
      field: "notes",
      value: null,
      eventType: "notes_completed",
      eventValue: "skipped",
    });
  }

  if (action === "trial_review_confirm") {
    return finalizeLead(env, peerId, vkId);
  }

  if (action === "trial_review_edit") {
    return startTrialFlow(env, peerId, vkId, { reset: true });
  }

  return null;
}

export async function handleTrialTextInput(env, peerId, text, vkId) {
  if (!text || !vkId) {
    return false;
  }

  const state = await getTrialState(env, vkId);
  if (!state || state.flow !== FLOW_NAME || !state.lead_id) {
    return false;
  }

  const userId = await getUserIdByVkId(env, vkId);
  if (!userId) {
    return false;
  }

  const normalizedText = String(text).trim();
  if (!normalizedText) {
    return false;
  }

  switch (state.step) {
    case "parent_name": {
      await updateLeadField(env, state.lead_id, "parent_name", normalizedText);
      await logLeadEvent(env, { userId, leadId: state.lead_id, eventType: "parent_name_entered", eventValue: normalizedText });
      return completeTrialStep(env, peerId, vkId, {
        step: "child_name",
        field: "parent_name",
        messageText: normalizedText,
        eventType: "parent_name_entered",
      });
    }
    case "child_name": {
      await updateLeadField(env, state.lead_id, "child_name", normalizedText);
      await logLeadEvent(env, { userId, leadId: state.lead_id, eventType: "child_name_entered", eventValue: normalizedText });
      return completeTrialStep(env, peerId, vkId, {
        step: "age",
        field: "child_name",
        messageText: normalizedText,
        eventType: "child_name_entered",
      });
    }
    case "notes": {
      await updateLeadField(env, state.lead_id, "notes", normalizedText);
      await logLeadEvent(env, { userId, leadId: state.lead_id, eventType: "notes_completed", eventValue: normalizedText });
      return completeTrialStep(env, peerId, vkId, {
        step: "preferred_time_custom",
        field: "notes",
        messageText: normalizedText,
        eventType: "notes_completed",
      });
    }
    case "preferred_time_custom": {
      await updateLeadField(env, state.lead_id, "preferred_time_custom", normalizedText);
      await logLeadEvent(env, { userId, leadId: state.lead_id, eventType: "time_selected", eventValue: normalizedText });
      return completeTrialStep(env, peerId, vkId, {
        step: "phone",
        field: "preferred_time_custom",
        messageText: normalizedText,
        eventType: "time_selected",
      });
    }
    case "phone": {
      await updateLeadField(env, state.lead_id, "phone", normalizedText);
      await logLeadEvent(env, { userId, leadId: state.lead_id, eventType: "phone_entered", eventValue: normalizedText });
      return completeTrialStep(env, peerId, vkId, {
        step: "email",
        field: "phone",
        messageText: normalizedText,
        eventType: "phone_entered",
      });
    }
    case "email": {
      await updateLeadField(env, state.lead_id, "email", normalizedText);
      await logLeadEvent(env, { userId, leadId: state.lead_id, eventType: "email_entered", eventValue: normalizedText });
      const nextState = { ...state, step: "review" };
      await setTrialState(env, vkId, nextState);
      const lead = await getLeadById(env, state.lead_id);
      if (!lead) {
        return false;
      }
      await sendMessage(env, peerId, {
        text: formatLeadReview(lead),
        keyboard: createReviewKeyboard(),
      });
      return true;
    }
    default:
      return false;
  }
}
