import { sendMessage } from "../vkApi.js";

function createProgrammingProjectsKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "🧮 Умный калькулятор",
            payload: JSON.stringify({ action: "projects_programming_calculator" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "🧠 Викторина на Python",
            payload: JSON.stringify({ action: "projects_programming_python_quiz" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "💬 Telegram/VK-бот",
            payload: JSON.stringify({ action: "projects_programming_bot" }),
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

export async function handleProjectsProgramming(env, peerId) {
  return sendMessage(env, peerId, {
    text: "На занятиях ребёнок знакомится с основами программирования и постепенно учится создавать собственные программы.\n\nМы начинаем с понятных задач: как программа хранит данные, принимает решения, повторяет действия и взаимодействует с пользователем.\n\nГлавная цель - чтобы ребёнок не просто запоминал команды, а понимал логику и мог самостоятельно придумать решение небольшой задачи.",
    keyboard: createProgrammingProjectsKeyboard(),
  });
}

