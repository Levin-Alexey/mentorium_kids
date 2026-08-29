// Inline keyboard shown under the main menu message.
// Button taps arrive as VK "message_event" webhook updates carrying this payload.

export const MAIN_MENU_KEYBOARD = {
  inline: true,
  buttons: [
    [
      {
        action: {
          type: "callback",
          label: "🎮 ПРОБНЫЙ УРОК",
          payload: JSON.stringify({ action: "trial_lesson" }),
        },
      },
    ],
    [
      {
        action: {
          type: "callback",
          label: "🤖 НАШИ КУРСЫ",
          payload: JSON.stringify({ action: "courses" }),
        },
      },
    ],
    [
      {
        action: {
          type: "callback",
          label: "👦 ПОДОБРАТЬ КУРС",
          payload: JSON.stringify({ action: "pick_course" }),
        },
      },
    ],
    [
      {
        action: {
          type: "callback",
          label: "🏆 ПРОЕКТЫ УЧЕНИКОВ",
          payload: JSON.stringify({ action: "projects" }),
        },
      },
    ],
    [
      {
        action: {
          type: "callback",
          label: "💰 СТОИМОСТЬ ОБУЧЕНИЯ",
          payload: JSON.stringify({ action: "pricing" }),
        },
      },
    ],
    [
      {
        action: {
          type: "callback",
          label: "💬 ЗАДАТЬ ВОПРОС",
          payload: JSON.stringify({ action: "question" }),
        },
      },
    ],
  ],
};
