import { sendMessage } from "./vkApi.js";

function createCoursesKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "🤖 Искусственный Интеллект",
            payload: JSON.stringify({ action: "course_ai" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "💻 Программирование",
            payload: JSON.stringify({ action: "course_programming" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "⌨️ Компьютерная грамотность",
            payload: JSON.stringify({ action: "course_literacy" }),
          },
        },
      ],
    ],
  };
}

function createBackKeyboard() {
  return {
    inline: true,
    buttons: [
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

export async function handleCourses(env, peerId) {
  return sendMessage(env, peerId, {
    text: "Мы верим: будущее начинается с первого шага. В этом разделе собраны три направления, которые не просто учат технологиям, а развивают навыки, востребованные в любой профессии:\n\n• 🤖 ИИ - креативность и работа с инструментами будущего.\n• 💻 Программирование - логика, системное мышление и умение доводить проекты до конца.\n• ⌨️ Компьютерная грамотность для самых юных инженеров - базовые навыки, которые делают ребёнка самостоятельным и уверенным в цифровом мире.\n\nХотите узнать, какое направление подойдёт именно Вашему ребёнку? Выберите интересующий блок - и посмотрите подробную программу модуля.",
    keyboard: createCoursesKeyboard(),
  });
}

export async function handleCourseAi(env, peerId) {
  // TODO: Replace with actual AI course content
  return sendMessage(env, peerId, {
    text: "🤖 Искусственный Интеллект\n\n(Подробная программа курса будет добавлена позже)",
    keyboard: createBackKeyboard(),
  });
}

export async function handleCourseProgramming(env, peerId) {
  // TODO: Replace with actual Programming course content
  return sendMessage(env, peerId, {
    text: "💻 Программирование\n\n(Подробная программа курса будет добавлена позже)",
    keyboard: createBackKeyboard(),
  });
}

export async function handleCourseLiteracy(env, peerId) {
  // TODO: Replace with actual Computer Literacy course content
  return sendMessage(env, peerId, {
    text: "⌨️ Компьютерная грамотность\n\n(Подробная программа курса будет добавлена позже)",
    keyboard: createBackKeyboard(),
  });
}
