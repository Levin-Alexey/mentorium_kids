// Back + main menu keyboard, "backAction" controls where "Назад" leads.
export function createBackToKeyboard(backAction) {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "⬅️ Назад",
            payload: JSON.stringify({ action: backAction }),
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

// Shared keyboard used on every top-level project category screen.
export function createProjectsBackKeyboard() {
  return createBackToKeyboard("projects");
}
