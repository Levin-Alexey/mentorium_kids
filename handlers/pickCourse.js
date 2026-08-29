import { sendMessage } from "./vkApi.js";

export async function handlePickCourse(env, peerId) {
  // TODO: replace with a real course-matching questionnaire
  return sendMessage(env, peerId, {
    text: "👦 Подобрать курс\n\nНапишите возраст ребёнка и его интересы (программирование, ИИ, дизайн, игры и т.д.), и мы подберём подходящий курс.",
  });
}
