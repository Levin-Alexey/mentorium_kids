import { sendMessage } from "../vkApi.js";

function createProgrammingBotKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "📚 Бот-помощник для учёбы",
            payload: JSON.stringify({ action: "projects_programming_bot_study_helper" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "🎮 Бот-викторина",
            payload: JSON.stringify({ action: "projects_programming_bot_quiz" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "⬅️ Назад",
            payload: JSON.stringify({ action: "projects_programming" }),
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

export async function handleProjectsProgrammingBot(env, peerId) {
  return sendMessage(env, peerId, {
    text: "На занятиях ребёнок знакомится с тем, как работают современные чат-боты, и создаёт собственного помощника для Telegram или VK.\n\nУченик продумывает, что бот должен уметь, какие кнопки и команды у него будут, как он будет отвечать пользователю и что должно происходить после каждого действия.\n\nТакие проекты помогают ребёнку увидеть практическую сторону программирования: написанный код начинает взаимодействовать с реальными людьми через привычный мессенджер.",
    keyboard: createProgrammingBotKeyboard(),
  });
}
