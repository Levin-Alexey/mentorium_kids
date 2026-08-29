import { sendMessage } from "./vkApi.js";

export async function handlePricing(env, peerId) {
  // TODO: replace with the actual pricing table
  return sendMessage(env, peerId, {
    text: "💰 Стоимость обучения\n\nСвяжитесь с нами, и мы расскажем об актуальных тарифах и абонементах для вашего курса.",
  });
}
