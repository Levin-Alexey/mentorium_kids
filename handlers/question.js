import { sendMessage, sendAdminChatMessage } from "./vkApi.js";

async function setQuestionState(env, vkId, state) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.put(`question:${vkId}`, JSON.stringify(state));
}

async function getQuestionState(env, vkId) {
  if (!env.KV || !vkId) {
    return null;
  }

  const raw = await env.KV.get(`question:${vkId}`);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function clearQuestionState(env, vkId) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.delete(`question:${vkId}`);
}

function createMainMenuKeyboard() {
  return {
    inline: true,
    buttons: [
      [{ action: { type: "callback", label: "🏠 Главное меню", payload: JSON.stringify({ action: "main_menu" }) } }],
    ],
  };
}

export async function handleQuestion(env, peerId, payload = {}) {
  const vkId = payload.userId ?? peerId;

  await setQuestionState(env, vkId, { flow: "question", step: "awaiting_question" });

  return sendMessage(env, peerId, {
    text: "💬 Задать вопрос\n\nНапишите ваш вопрос в ответном сообщении, и наш менеджер ответит вам в ближайшее время.",
  });
}

export async function handleQuestionTextInput(env, peerId, text, vkId) {
  if (!text || !vkId) {
    return false;
  }

  const state = await getQuestionState(env, vkId);
  if (!state || state.flow !== "question" || state.step !== "awaiting_question") {
    return false;
  }

  const normalizedText = String(text).trim();
  if (!normalizedText) {
    return false;
  }

  await clearQuestionState(env, vkId);

  await sendAdminChatMessage(
    env,
    `❓ НОВЫЙ ВОПРОС ОТ ПОЛЬЗОВАТЕЛЯ\n\n🔵 VK ID: ${vkId}\n\n💬 Вопрос:\n${normalizedText}`
  );

  await sendMessage(env, peerId, {
    text: "Спасибо! Ваш вопрос передан менеджеру, он ответит вам в ближайшее время.",
    keyboard: createMainMenuKeyboard(),
  });

  return true;
}
