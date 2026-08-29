import { sendMessage } from "./vkApi.js";

export async function handleQuestion(env, peerId) {
  // TODO: route to a real support/manager workflow
  return sendMessage(env, peerId, {
    text: "💬 Задать вопрос\n\nНапишите ваш вопрос в ответном сообщении, и наш менеджер ответит вам в ближайшее время.",
  });
}
