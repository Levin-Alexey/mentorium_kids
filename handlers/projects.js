import { sendMessage } from "./vkApi.js";

function createProjectsCategoriesKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "🤖 ИИ-проекты",
            payload: JSON.stringify({ action: "projects_ai" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "🎮 Игры",
            payload: JSON.stringify({ action: "projects_games" }),
          },
        },
      ],
      // [
      //   {
      //     action: {
      //       type: "callback",
      //       label: "🌐 Сайты",
      //       payload: JSON.stringify({ action: "projects_websites" }),
      //     },
      //   },
      // ],
      // [
      //   {
      //     action: {
      //       type: "callback",
      //       label: "🎨 Творческие проекты",
      //       payload: JSON.stringify({ action: "projects_creative" }),
      //     },
      //   },
      // ],
      [
        {
          action: {
            type: "callback",
            label: "💻 Программирование",
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

export async function handleProjects(env, peerId) {
  return sendMessage(env, peerId, {
    text: "На наших курсах дети не просто изучают теорию - каждый курс построен вокруг собственных проектов.\n\nРебёнок постепенно проходит путь от простой идеи до своей игры, сайта, ИИ-помощника, бота или творческого проекта.\n\nА пока вы можете посмотреть, какие проекты ребята создают на наших программах 👇",
    keyboard: createProjectsCategoriesKeyboard(),
  });
}
