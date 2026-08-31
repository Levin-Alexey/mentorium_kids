import { sendMessage, sendAdminChatMessage } from "./vkApi.js";

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

function createBackKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "⬅️ Назад",
            payload: JSON.stringify({ action: "course_ai" }),
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

function createAiLevelsKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "🔍 Исследователь ИИ",
            payload: JSON.stringify({ action: "ai_researcher" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "🎨 Создатель ИИ",
            payload: JSON.stringify({ action: "ai_creator" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "⚙️ Разработчик ИИ",
            payload: JSON.stringify({ action: "ai_developer" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "🔧 Инженер по ИИ",
            payload: JSON.stringify({ action: "ai_engineer" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "⬅️ Назад",
            payload: JSON.stringify({ action: "courses" }),
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

async function setAiResearcherState(env, vkId, state) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.put(`ai_researcher_info:${vkId}`, JSON.stringify(state));
}

async function getAiResearcherState(env, vkId) {
  if (!env.KV || !vkId) {
    return null;
  }

  const raw = await env.KV.get(`ai_researcher_info:${vkId}`);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function clearAiResearcherState(env, vkId) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.delete(`ai_researcher_info:${vkId}`);
}

function createAiResearcherKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "📩 Узнать подробнее",
            payload: JSON.stringify({ action: "ai_researcher_more_info" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "⬅️ Назад",
            payload: JSON.stringify({ action: "course_ai" }),
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

export async function handleCourses(env, peerId) {
  return sendMessage(env, peerId, {
    text: "Мы верим: будущее начинается с первого шага. В этом разделе собраны три направления, которые не просто учат технологиям, а развивают навыки, востребованные в любой профессии:\n\n• 🤖 ИИ - креативность и работа с инструментами будущего.\n• 💻 Программирование - логика, системное мышление и умение доводить проекты до конца.\n• ⌨️ Компьютерная грамотность для самых юных инженеров - базовые навыки, которые делают ребёнка самостоятельным и уверенным в цифровом мире.\n\nХотите узнать, какое направление подойдёт именно Вашему ребёнку? Выберите интересующий блок - и посмотрите подробную программу модуля.",
    keyboard: createCoursesKeyboard(),
  });
}

export async function handleCourseAi(env, peerId) {
  return sendMessage(env, peerId, {
    text: "В разделе \"ИИ\" ребёнок не просто узнаёт про нейросети - он сразу делает свои первые проекты и собирает портфолио. Уже на старте он научится превращать идею в результат, а на старших уровнях - создавать полноценные цифровые продукты.\n\nЧетыре уровня - четыре типа результатов:\n\n• 🔍 Исследователь ИИ - первые проекты: от простых задач до мини‑презентаций о том, как работает ИИ.\n• 🎨 Создатель ИИ - мультимедийные проекты: иллюстрации, сценарии, мини‑мультфильмы и интерактивные истории.\n• ⚙️ Разработчик ИИ - автоматизированные решения и мини‑приложения с ИИ‑функционалом.\n• 🔧 Инженер по ИИ - сложные проекты: от прототипов до готовых решений с продуманной архитектурой.\n\nНажмите на кнопку нужного направления, чтобы увидеть программу. Или напишите нам - подберём старт, который вдохновит ребёнка и даст первые результаты уже в первые недели.",
    keyboard: createAiLevelsKeyboard(),
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

export async function handleAiResearcher(env, peerId) {
  return sendMessage(env, peerId, {
    text: "Курс \"Исследователь ИИ\" даёт ребёнку не просто \"поиграть с нейросетями\", а системно освоить ИИ как рабочий инструмент. Ребенок научится не только пользоваться готовыми сервисами, но и ставить задачи, проверять результаты и доводить проекты до конца - а это навыки, которые пригодятся и в школе, и в будущей профессии.\n\nСначала ребёнок поймёт, что такое ИИ, и освоит правила безопасной работы. Затем научится применять ИИ для творчества: собирать мультимедийные проекты, комбинировать разные форматы и добиваться нужного результата. На финальном этапе он будет самостоятельно превращать свои идеи в проекты - от первого наброска до финального продукта.\n\nЭто про самостоятельность, умение учиться и видеть, как технологии помогают воплощать собственные задумки.",
    keyboard: createAiResearcherKeyboard(),
  });
}

export async function handleAiCreator(env, peerId) {
  // TODO: Replace with actual AI Creator level content
  return sendMessage(env, peerId, {
    text: "🎨 Создатель ИИ\n\n(Подробная программа уровня будет добавлена позже)",
    keyboard: createBackKeyboard(),
  });
}

export async function handleAiDeveloper(env, peerId) {
  // TODO: Replace with actual AI Developer level content
  return sendMessage(env, peerId, {
    text: "⚙️ Разработчик ИИ\n\n(Подробная программа уровня будет добавлена позже)",
    keyboard: createBackKeyboard(),
  });
}

export async function handleAiEngineer(env, peerId) {
  // TODO: Replace with actual AI Engineer level content
  return sendMessage(env, peerId, {
    text: "🔧 Инженер по ИИ\n\n(Подробная программа уровня будет добавлена позже)",
    keyboard: createBackKeyboard(),
  });
}

export async function handleAiResearcherMoreInfo(env, peerId, payload = {}) {
  const vkId = payload.userId ?? peerId;

  await setAiResearcherState(env, vkId, { flow: "ai_researcher_info", step: "awaiting_info" });

  return sendMessage(env, peerId, {
    text: "Напишите Ваш вопрос по курсу \"Исследователь ИИ\" в ответном сообщении, и мы свяжемся с Вами в ближайшее время.",
  });
}

export async function handleAiResearcherMoreInfoTextInput(env, peerId, text, vkId) {
  if (!text || !vkId) {
    return false;
  }

  const state = await getAiResearcherState(env, vkId);
  if (!state || state.flow !== "ai_researcher_info" || state.step !== "awaiting_info") {
    return false;
  }

  const normalizedText = String(text).trim();
  if (!normalizedText) {
    return false;
  }

  await clearAiResearcherState(env, vkId);

  await sendAdminChatMessage(
    env,
    `❓ ВОПРОС ПО КУРСУ - 🔍 Исследователь ИИ\n\n🔵 VK ID: ${vkId}\n\n💬 Вопрос:\n${normalizedText}`
  );

  await sendMessage(env, peerId, {
    text: "Спасибо! Мы получили Ваш вопрос и свяжемся с Вами в ближайшее время.",
    keyboard: createAiResearcherKeyboard(),
  });

  return true;
}
