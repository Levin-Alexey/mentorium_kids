import { sendMessage, sendAdminChatMessage } from "./vkApi.js";

async function setPricingConsultationState(env, vkId, state) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.put(`pricing_consultation:${vkId}`, JSON.stringify(state));
}

async function getPricingConsultationState(env, vkId) {
  if (!env.KV || !vkId) {
    return null;
  }

  const raw = await env.KV.get(`pricing_consultation:${vkId}`);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function clearPricingConsultationState(env, vkId) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.delete(`pricing_consultation:${vkId}`);
}

function createPricingKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "📩 Получить консультацию",
            payload: JSON.stringify({ action: "pricing_consultation" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "🏠 Главное меню",
            payload: JSON.stringify({ action: "main_menu" }),
          },
        },
      ],
    ],
  };
}

export async function handlePricing(env, peerId) {
  return sendMessage(env, peerId, {
    text: "Стоимость обучения - 7000 рублей в месяц - всё честно и прозрачно.\n\nЧто это значит на практике:\n\n• 4 урока в месяц. Ровно четыре полноценных занятия, каждое из которых длится столько, чтобы успеть и теорию разобрать, и попрактиковаться.\n• Раз в неделю. Такой график помогает выстроить привычку учиться и не терять мотивацию.\n• Без кредитов и рассрочек. Мы не используем сложные финансовые схемы: платите за месяц обучения - и ребёнок спокойно занимается.\n• Без скрытых платежей. Никаких доплат за «доступ к платформе», «методички» или «проверку домашних работ». Цена включает всё необходимое.\n\nНа каждом уроке ребёнок делает шаг к реальному результату: пишет код, собирает проект, учится решать задачи, как это делают настоящие разработчики.\n\nХотите понять, какой курс лучше подойдёт ребёнку? Свяжитесь с нами - подберём вариант и расскажем, как будут выглядеть его первые проекты",
    keyboard: createPricingKeyboard(),
  });
}

export async function handlePricingConsultation(env, peerId, payload = {}) {
  const vkId = payload.userId ?? peerId;

  await setPricingConsultationState(env, vkId, { flow: "pricing_consultation", step: "awaiting_info" });

  return sendMessage(env, peerId, {
    text: "Напишите Ваш вопрос по оплате или возраст ребёнка и интересующий курс, и мы свяжемся с Вами в ближайшее время.",
  });
}

export async function handlePricingConsultationTextInput(env, peerId, text, vkId) {
  if (!text || !vkId) {
    return false;
  }

  const state = await getPricingConsultationState(env, vkId);
  if (!state || state.flow !== "pricing_consultation" || state.step !== "awaiting_info") {
    return false;
  }

  const normalizedText = String(text).trim();
  if (!normalizedText) {
    return false;
  }

  await clearPricingConsultationState(env, vkId);

  await sendAdminChatMessage(
    env,
    `ВОПРОС ПО ОПЛАТЕ!\n\n🔵 VK ID: ${vkId}\n\n💬 Вопрос:\n${normalizedText}`
  );

  await sendMessage(env, peerId, {
    text: "Спасибо! Мы получили Ваш вопрос и свяжемся с Вами в ближайшее время.",
    keyboard: createPricingKeyboard(),
  });

  return true;
}
