import { sendMessage } from "./vkApi.js";

export async function handleCourses(env, peerId) {
  // TODO: replace with the actual course catalog content
  return sendMessage(env, peerId, {
    text: "🤖 Наши курсы\n\nМы предлагаем курсы по программированию, созданию сайтов и игр, работе с нейросетями и цифровому творчеству для разных возрастов.",
  });
}
