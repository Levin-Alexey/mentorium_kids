import { sendMessage } from "../vkApi.js";

function createAiProjectsKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "🧠 ИИ-помощник для учёбы",
            payload: JSON.stringify({ action: "projects_ai_study_helper" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "📖 Генератор историй и сказок",
            payload: JSON.stringify({ action: "projects_ai_story_generator" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "⬅️ Назад",
            payload: JSON.stringify({ action: "projects" }),
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

export async function handleProjectsAi(env, peerId) {
  return sendMessage(env, peerId, {
    text: "На занятиях дети учатся использовать искусственный интеллект не просто для развлечения или поиска ответов, а как настоящий инструмент для создания собственных проектов.\n\nРебёнок учится правильно ставить задачу для ИИ, задавать уточняющие вопросы, улучшать результат и обязательно проверять полученную информацию.",
    keyboard: createAiProjectsKeyboard(),
  });
}

