import { sendMessage, sendAdminChatMessage } from "./vkApi.js";

async function setPickCourseState(env, vkId, state) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.put(`pick_course:${vkId}`, JSON.stringify(state));
}

async function getPickCourseState(env, vkId) {
  if (!env.KV || !vkId) {
    return null;
  }

  const raw = await env.KV.get(`pick_course:${vkId}`);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function clearPickCourseState(env, vkId) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.delete(`pick_course:${vkId}`);
}

function createMainMenuKeyboard() {
  return {
    inline: true,
    buttons: [
      [{ action: { type: "callback", label: "🏠 Главное меню", payload: JSON.stringify({ action: "main_menu" }) } }],
    ],
  };
}

export async function handlePickCourse(env, peerId, payload = {}) {
  const vkId = payload.userId ?? peerId;

  await setPickCourseState(env, vkId, { flow: "pick_course", step: "awaiting_info" });

  return sendMessage(env, peerId, {
    text: "👦 Подобрать курс\n\nНапишите возраст ребёнка и его интересы (программирование, ИИ, дизайн, игры и т.д.), и мы подберём подходящий курс.",
  });
}

export async function handlePickCourseTextInput(env, peerId, text, vkId) {
  if (!text || !vkId) {
    return false;
  }

  const state = await getPickCourseState(env, vkId);
  if (!state || state.flow !== "pick_course" || state.step !== "awaiting_info") {
    return false;
  }

  const normalizedText = String(text).trim();
  if (!normalizedText) {
    return false;
  }

  await clearPickCourseState(env, vkId);

  await sendAdminChatMessage(
    env,
    `👦 ПОДОБРАТЬ КУРС - ЗАПРОС ОТ ПОЛЬЗОВАТЕЛЯ\n\n🔵 VK ID: ${vkId}\n\n📝 Запрос:\n${normalizedText}`
  );

  await sendMessage(env, peerId, {
    text: "Спасибо! Ваш запрос принят, мы подберём подходящий курс и ответим Вам в ближайшее время.",
    keyboard: createMainMenuKeyboard(),
  });

  return true;
}
