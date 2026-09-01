import { sendMessage } from "../vkApi.js";

function createGamesProjectsKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "🚀 Космическое приключение",
            payload: JSON.stringify({ action: "projects_games_space_adventure" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "🐱 Собери сокровища",
            payload: JSON.stringify({ action: "projects_games_collect_treasures" }),
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

export async function handleProjectsGames(env, peerId) {
  return sendMessage(env, peerId, {
    text: "На занятиях ребёнок не просто играет, а сам придумывает правила, персонажей и постепенно собирает собственную небольшую игру.\n\nТак дети знакомятся с логикой программирования, учатся планировать действия и видеть результат своей работы.",
    keyboard: createGamesProjectsKeyboard(),
  });
}

