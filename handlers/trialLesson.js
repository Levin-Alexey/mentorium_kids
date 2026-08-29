import { sendMessage } from "./vkApi.js";

export async function handleTrialLesson(env, peerId) {
  // TODO: replace with real trial-lesson booking flow/content
  return sendMessage(env, peerId, {
    text: "🎮 Пробный урок\n\nОставьте заявку, и мы подберём удобное время для бесплатного пробного занятия. Напишите, пожалуйста, ваше имя и возраст ребёнка.",
  });
}
