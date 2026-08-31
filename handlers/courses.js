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
      // [
      //   {
      //     action: {
      //       type: "callback",
      //       label: "⌨️ Компьютерная грамотность",
      //       payload: JSON.stringify({ action: "course_literacy" }),
      //     },
      //   },
      // ],
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

async function setAiCreatorState(env, vkId, state) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.put(`ai_creator_info:${vkId}`, JSON.stringify(state));
}

async function getAiCreatorState(env, vkId) {
  if (!env.KV || !vkId) {
    return null;
  }

  const raw = await env.KV.get(`ai_creator_info:${vkId}`);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function clearAiCreatorState(env, vkId) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.delete(`ai_creator_info:${vkId}`);
}

async function setAiDeveloperState(env, vkId, state) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.put(`ai_developer_info:${vkId}`, JSON.stringify(state));
}

async function getAiDeveloperState(env, vkId) {
  if (!env.KV || !vkId) {
    return null;
  }

  const raw = await env.KV.get(`ai_developer_info:${vkId}`);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function clearAiDeveloperState(env, vkId) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.delete(`ai_developer_info:${vkId}`);
}

async function setAiEngineerState(env, vkId, state) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.put(`ai_engineer_info:${vkId}`, JSON.stringify(state));
}

async function getAiEngineerState(env, vkId) {
  if (!env.KV || !vkId) {
    return null;
  }

  const raw = await env.KV.get(`ai_engineer_info:${vkId}`);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function clearAiEngineerState(env, vkId) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.delete(`ai_engineer_info:${vkId}`);
}

async function setProgrammingBasicState(env, vkId, state) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.put(`programming_basic_info:${vkId}`, JSON.stringify(state));
}

async function getProgrammingBasicState(env, vkId) {
  if (!env.KV || !vkId) {
    return null;
  }

  const raw = await env.KV.get(`programming_basic_info:${vkId}`);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function clearProgrammingBasicState(env, vkId) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.delete(`programming_basic_info:${vkId}`);
}

async function setProgrammingBeginnerState(env, vkId, state) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.put(`programming_beginner_info:${vkId}`, JSON.stringify(state));
}

async function getProgrammingBeginnerState(env, vkId) {
  if (!env.KV || !vkId) {
    return null;
  }

  const raw = await env.KV.get(`programming_beginner_info:${vkId}`);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function clearProgrammingBeginnerState(env, vkId) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.delete(`programming_beginner_info:${vkId}`);
}

async function setProgrammingDeveloperState(env, vkId, state) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.put(`programming_developer_info:${vkId}`, JSON.stringify(state));
}

async function getProgrammingDeveloperState(env, vkId) {
  if (!env.KV || !vkId) {
    return null;
  }

  const raw = await env.KV.get(`programming_developer_info:${vkId}`);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function clearProgrammingDeveloperState(env, vkId) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.delete(`programming_developer_info:${vkId}`);
}

async function setProgrammingEngineerState(env, vkId, state) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.put(`programming_engineer_info:${vkId}`, JSON.stringify(state));
}

async function getProgrammingEngineerState(env, vkId) {
  if (!env.KV || !vkId) {
    return null;
  }

  const raw = await env.KV.get(`programming_engineer_info:${vkId}`);
  if (!raw) {
    return null;
  }

  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

async function clearProgrammingEngineerState(env, vkId) {
  if (!env.KV || !vkId) {
    return;
  }
  await env.KV.delete(`programming_engineer_info:${vkId}`);
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

function createAiCreatorKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "📩 Узнать подробнее",
            payload: JSON.stringify({ action: "ai_creator_more_info" }),
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

function createAiDeveloperKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "📩 Узнать подробнее",
            payload: JSON.stringify({ action: "ai_developer_more_info" }),
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

function createAiEngineerKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "📩 Узнать подробнее",
            payload: JSON.stringify({ action: "ai_engineer_more_info" }),
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

function createProgrammingLevelsKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "🎮 Базовый курс",
            payload: JSON.stringify({ action: "programming_basic" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "💻 Начинающий разработчик",
            payload: JSON.stringify({ action: "programming_beginner" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "⚙️ Разработчик",
            payload: JSON.stringify({ action: "programming_developer" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "🏗️ Инженер-разработчик",
            payload: JSON.stringify({ action: "programming_engineer" }),
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

export async function handleCourseProgramming(env, peerId) {
  return sendMessage(env, peerId, {
    text: "Хотите, чтобы ребёнок не просто \"поучился программированию\", а реально что‑то создал? В этом разделе мы собрали 4 уровня, на каждом из которых ребёнок делает свои проекты - от первых игр до полноценных AI‑продуктов.\n\nГлавное правило нашего подхода: теория только ради практики. Ребёнок не тратит время на абстрактные примеры, а сразу собирает то, что можно запустить, показать друзьям и сохранить в портфолио.\n\nЧто ждёт ребёнка на каждом уровне:\n\n• Базовый курс. Первые 2D‑игры на визуальных блоках и мягкий переход к текстовому коду. Ребёнок видит результат уже на первых неделях.\n• Начинающий разработчик. Полноценные проекты на текстовом языке: от простых утилит до мини‑игр. Ребёнок учится писать чистый код и использовать готовые решения.\n• Разработчик. Веб‑приложения и AI‑сервисы: работа с API, LLM и агентными системами. Ребёнок собирает продукты, которые решают реальные задачи.\n• Инженер‑разработчик. Надёжные системы и MVP: проектирование, контроль качества, наблюдаемость и презентация. Ребёнок учится работать как в настоящей команде.\n\nВ итоге у ребёнка будет не просто список тем, а портфолио из реальных проектов, которые показывают его навыки и прогресс.",
    keyboard: createProgrammingLevelsKeyboard(),
  });
}

function createProgrammingBasicKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "📩 Узнать подробнее",
            payload: JSON.stringify({ action: "programming_basic_more_info" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "⬅️ Назад",
            payload: JSON.stringify({ action: "course_programming" }),
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

export async function handleProgrammingBasic(env, peerId) {
  return sendMessage(env, peerId, {
    text: "На Базовом курсе ребёнок не тратит время на теорию ради теории - он сразу создаёт реальные проекты, которыми хочется делиться. Это лучший способ удержать интерес и дать ребёнку ощущение успеха.\n\nЧто войдёт в практику и портфолио:\n\n• Алгоритмическое мышление через визуальное программирование. На понятных примерах ребёнок научится выстраивать логику: «если это, то сделай то», «повтори 5 раз», «проверь условие». Эти навыки - фундамент любого программирования.\n• Несколько полноценных 2D‑игр в портфолио. Ребёнок соберёт свои первые игры с нуля: от простой механики до оформления и правил победы. Это не мини‑примеры, а законченные продукты, которые можно запустить и поиграть.\n• Естественный переход к текстовому коду. Через рисование и анимацию ребёнок начнёт добавлять в игры новые эффекты с помощью настоящего кода. Переход от блоков к тексту происходит незаметно: ребёнок видит, что код помогает реализовать его идеи быстрее и интереснее.\n\nВ итоге у ребёнка будет не просто список пройденных тем, а несколько своих игр и понимание, что он умеет создавать цифровые продукты.",
    keyboard: createProgrammingBasicKeyboard(),
  });
}

function createProgrammingBeginnerKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "📩 Узнать подробнее",
            payload: JSON.stringify({ action: "programming_beginner_more_info" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "⬅️ Назад",
            payload: JSON.stringify({ action: "course_programming" }),
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

export async function handleProgrammingBeginner(env, peerId) {
  return sendMessage(env, peerId, {
    text: "На модуле \"Начинающий разработчик\" ребёнок делает не учебные примеры, а реальные проекты, которые можно показать, запустить и сохранить в портфолио. Это уровень, где каждый навык сразу превращается в готовый продукт.\n\nЧто войдёт в практику и портфолио:\n\n• Рабочие программы на Python. Ребёнок соберёт несколько небольших, но полностью самостоятельных программ - это показывает, что он умеет не просто писать код, а решать задачи.\n• Собственные 2D‑игры. Через создание игр он закрепит Python и поймёт, как устроена архитектура игровых программ: как хранить состояние, обрабатывать нажатия, управлять объектами.\n• Интерактивные сайты. Ребёнок сделает несколько сайтов с интерактивностью: формы, кнопки, динамическое обновление контента. Это расширяет его кругозор и показывает, что программирование — это не только скрипты, но и интерфейсы.\n\nВ итоге у ребёнка будет не просто список тем, а набор проектов, которые наглядно демонстрируют его навыки и прогресс.",
    keyboard: createProgrammingBeginnerKeyboard(),
  });
}

function createProgrammingDeveloperKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "📩 Узнать подробнее",
            payload: JSON.stringify({ action: "programming_developer_more_info" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "⬅️ Назад",
            payload: JSON.stringify({ action: "course_programming" }),
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

export async function handleProgrammingBasicMoreInfo(env, peerId, payload = {}) {
  const vkId = payload.userId ?? peerId;

  await setProgrammingBasicState(env, vkId, { flow: "programming_basic_info", step: "awaiting_info" });

  return sendMessage(env, peerId, {
    text: "Напишите Ваш вопрос по курсу \"Базовый курс\" в ответном сообщении, и мы свяжемся с Вами в ближайшее время.",
  });
}

export async function handleProgrammingBasicMoreInfoTextInput(env, peerId, text, vkId) {
  if (!text || !vkId) {
    return false;
  }

  const state = await getProgrammingBasicState(env, vkId);
  if (!state || state.flow !== "programming_basic_info" || state.step !== "awaiting_info") {
    return false;
  }

  const normalizedText = String(text).trim();
  if (!normalizedText) {
    return false;
  }

  await clearProgrammingBasicState(env, vkId);

  await sendAdminChatMessage(
    env,
    `ВОПРОС ПО КУРСУ - 🎮 Базовый курс\n\n🔵 VK ID: ${vkId}\n\n💬 Вопрос:\n${normalizedText}`
  );

  await sendMessage(env, peerId, {
    text: "Спасибо! Мы получили Ваш вопрос и свяжемся с Вами в ближайшее время.",
    keyboard: createProgrammingBasicKeyboard(),
  });

  return true;
}

export async function handleProgrammingBeginnerMoreInfo(env, peerId, payload = {}) {
  const vkId = payload.userId ?? peerId;

  await setProgrammingBeginnerState(env, vkId, { flow: "programming_beginner_info", step: "awaiting_info" });

  return sendMessage(env, peerId, {
    text: "Напишите Ваш вопрос по курсу \"Начинающий разработчик\" в ответном сообщении, и мы свяжемся с Вами в ближайшее время.",
  });
}

export async function handleProgrammingBeginnerMoreInfoTextInput(env, peerId, text, vkId) {
  if (!text || !vkId) {
    return false;
  }

  const state = await getProgrammingBeginnerState(env, vkId);
  if (!state || state.flow !== "programming_beginner_info" || state.step !== "awaiting_info") {
    return false;
  }

  const normalizedText = String(text).trim();
  if (!normalizedText) {
    return false;
  }

  await clearProgrammingBeginnerState(env, vkId);

  await sendAdminChatMessage(
    env,
    `ВОПРОС ПО КУРСУ - 💻 Начинающий\n\n🔵 VK ID: ${vkId}\n\n💬 Вопрос:\n${normalizedText}`
  );

  await sendMessage(env, peerId, {
    text: "Спасибо! Мы получили Ваш вопрос и свяжемся с Вами в ближайшее время.",
    keyboard: createProgrammingBeginnerKeyboard(),
  });

  return true;
}

export async function handleProgrammingDeveloper(env, peerId) {
  return sendMessage(env, peerId, {
    text: "Модуль \"⚙️ Разработчик\" - это мост между обучением и настоящей профессией. Здесь ребёнок получает универсальную базу, которая позволит ему осознанно выбрать специализацию: backend, frontend, геймдев или data science.\n\nКакие возможности откроются:\n\n• Прочная база Python перед выбором пути. Ребёнок освоит язык на уровне, достаточном для старта в любой из современных специализаций. Это даёт гибкость: если позже он захочет углубиться в анализ данных или машинное обучение, фундамент уже будет готов.\n• Опыт работы с backend и базами данных. Создание REST API и работа с данными - это одни из самых востребованных навыков на рынке. Ребёнок поймёт, как устроены серверы и как приложения хранят и обрабатывают информацию.\n• Навыки создания полноценных веб‑приложений. Он научится делать не просто красивые страницы, а интерактивные продукты, которые решают реальные задачи. Это отличный старт для портфолио и собеседований.\n• Профессиональный подход к разработке игр. Работа в игровом движке даст понимание архитектуры и процессов, которые используются в индустрии. Даже если ребёнок не выберет геймдев, эти навыки пригодятся в любой разработке.\n• Подготовка к серьёзной информатике. Алгоритмическое мышление и умение проектировать системы - это то, что нужно для поступления в топовые технические вузы и победы на олимпиадах.\n\nЭтот модуль помогает ребёнку не просто «поучиться программированию», а сделать первый осознанный шаг к будущей профессии.",
    keyboard: createProgrammingDeveloperKeyboard(),
  });
}

export async function handleProgrammingDeveloperMoreInfo(env, peerId, payload = {}) {
  const vkId = payload.userId ?? peerId;

  await setProgrammingDeveloperState(env, vkId, { flow: "programming_developer_info", step: "awaiting_info" });

  return sendMessage(env, peerId, {
    text: "Напишите Ваш вопрос по курсу \"Разработчик\" в ответном сообщении, и мы свяжемся с Вами в ближайшее время.",
  });
}

export async function handleProgrammingDeveloperMoreInfoTextInput(env, peerId, text, vkId) {
  if (!text || !vkId) {
    return false;
  }

  const state = await getProgrammingDeveloperState(env, vkId);
  if (!state || state.flow !== "programming_developer_info" || state.step !== "awaiting_info") {
    return false;
  }

  const normalizedText = String(text).trim();
  if (!normalizedText) {
    return false;
  }

  await clearProgrammingDeveloperState(env, vkId);

  await sendAdminChatMessage(
    env,
    `ВОПРОС ПО КУРСУ - ⚙️ Разработчик\n\n🔵 VK ID: ${vkId}\n\n💬 Вопрос:\n${normalizedText}`
  );

  await sendMessage(env, peerId, {
    text: "Спасибо! Мы получили Ваш вопрос и свяжемся с Вами в ближайшее время.",
    keyboard: createProgrammingDeveloperKeyboard(),
  });

  return true;
}

function createProgrammingEngineerKeyboard() {
  return {
    inline: true,
    buttons: [
      [
        {
          action: {
            type: "callback",
            label: "📩 Узнать подробнее",
            payload: JSON.stringify({ action: "programming_engineer_more_info" }),
          },
        },
      ],
      [
        {
          action: {
            type: "callback",
            label: "⬅️ Назад",
            payload: JSON.stringify({ action: "course_programming" }),
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

export async function handleProgrammingEngineer(env, peerId) {
  return sendMessage(env, peerId, {
    text: "Модуль \"🏗️ Инженер‑разработчик\" - это подготовка к серьёзным академическим и профессиональным вызовам. Здесь ребёнок получает знания и опыт, которые дают реальное преимущество при поступлении в технические вузы, на олимпиадах и даже на первых стажировках.\n\nКакие возможности откроются:\n\n• Профессиональный Python для разных направлений. Ребёнок освоит язык на уровне, достаточном для работы в backend, AI и data‑разработке. Это универсальная база: если позже он захочет углубиться в анализ данных или машинное обучение, фундамент уже будет готов.\n• Опыт создания production‑like сервисов. Прохождение полного цикла разработки учит ответственности и вниманию к деталям — качествам, которые ценят в любой IT‑компании.\n• Навыки интеграции frontend и backend. Умение связывать интерфейс и серверную часть — один из самых востребованных навыков на рынке. Ребёнок поймёт, как устроены современные приложения и как разные части системы работают вместе.\n• Инженерный подход к разработке игр. Создание законченной игры с продуманной архитектурой тренирует умение проектировать сложные системы. Даже если ребёнок не выберет геймдев, эти навыки пригодятся в любой разработке.\n• Фундамент для Computer Science. Модуль закрывает ключевые темы, которые изучают на первых курсах технических вузов: алгоритмы, структуры данных, архитектура. Это сильно облегчает учёбу и даёт фору перед однокурсниками.\n• Понимание инфраструктуры и деплоя. Ребёнок узнает, как код превращается в работающий сервис: от загрузки на сервер до поддержки и обновлений. Это то, что отличает «кодера» от «инженера».\n\nЭтот модуль помогает ребёнку не просто «поучиться программированию», а сделать уверенный шаг к серьёзной карьере в IT.",
    keyboard: createProgrammingEngineerKeyboard(),
  });
}

export async function handleProgrammingEngineerMoreInfo(env, peerId, payload = {}) {
  const vkId = payload.userId ?? peerId;

  await setProgrammingEngineerState(env, vkId, { flow: "programming_engineer_info", step: "awaiting_info" });

  return sendMessage(env, peerId, {
    text: "Напишите Ваш вопрос по курсу \"Инженер-разработчик\" в ответном сообщении, и мы свяжемся с Вами в ближайшее время.",
  });
}

export async function handleProgrammingEngineerMoreInfoTextInput(env, peerId, text, vkId) {
  if (!text || !vkId) {
    return false;
  }

  const state = await getProgrammingEngineerState(env, vkId);
  if (!state || state.flow !== "programming_engineer_info" || state.step !== "awaiting_info") {
    return false;
  }

  const normalizedText = String(text).trim();
  if (!normalizedText) {
    return false;
  }

  await clearProgrammingEngineerState(env, vkId);

  await sendAdminChatMessage(
    env,
    `ВОПРОС ПО КУРСУ - 🏗️ Инженер-разработчик\n\n🔵 VK ID: ${vkId}\n\n💬 Вопрос:\n${normalizedText}`
  );

  await sendMessage(env, peerId, {
    text: "Спасибо! Мы получили Ваш вопрос и свяжемся с Вами в ближайшее время.",
    keyboard: createProgrammingEngineerKeyboard(),
  });

  return true;
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
  return sendMessage(env, peerId, {
    text: "В модуле \"Создатель ИИ\" ребёнок сразу делает реальные проекты, которые можно показать, сохранить в портфолио и по-настоящему гордиться.\n\nЧто войдёт в практику:\n\n• Освоение ИИ-инструментов как профессиональных помощников. Ребёнок научится системно работать с нейросетями: подбирать инструменты под задачу, выстраивать процесс и получать стабильный результат.\n• Создание сложных творческих работ. От первого наброска идеи до финального цифрового продукта: ребёнок пройдёт все этапы — концепцию, черновики, правки и сборку.\n• Умное применение ИИ в учёбе. Ребёнок поймёт, как использовать нейросети для исследований и подготовки проектов, не теряя самостоятельности и не прибегая к списыванию.\n• Первые цифровые продукты с элементами разработки. Ребёнок соберёт простые сайты, мини‑игры и интерактивные проекты, одновременно разбираясь в основах кода и логике программ.\n\nВ итоге у ребёнка будет несколько готовых работ: это и тренировка навыков, и отличный повод для гордости, и первые шаги к осознанному выбору цифрового направления.",
    keyboard: createAiCreatorKeyboard(),
  });
}

export async function handleAiDeveloper(env, peerId) {
  return sendMessage(env, peerId, {
    text: "⚙️ В модуле \"Разработчик ИИ\" ребёнок делает не учебные примеры, а настоящие цифровые продукты, которые можно показать, сохранить в портфолио и по‑настоящему гордиться. Это уровень, где код и ИИ работают вместе, чтобы решать реальные задачи.\n\nЧто войдёт в практику и портфолио:\n\n• Системное понимание LLM и AI‑workflow. Ребёнок научится видеть за красивым интерфейсом нейросети её логику и процессы - это даёт уверенность и снимает страх перед сложными технологиями.\n• Рабочее веб‑приложение от идеи до запуска. Он пройдёт полный путь: постановка задачи, проектирование, написание кода с поддержкой ИИ, тестирование и публикация.\n• Собственные AI‑сервисы на Python. Ребёнок подключит LLM через API и создаст свои первые сервисы - например, помощника для учёбы, генератора контента или чат‑бота.\n• Практические проекты с машинным обучением. На простых примерах он попробует обучать модели и научится отличать обучение с нуля от работы с готовой нейросетью - это база для более глубокой работы с данными.\n• Агентные системы: помощники, которые умеют действовать. Ребёнок соберёт помощника, который не просто отвечает, а ищет информацию, сохраняет контекст и выполняет последовательные шаги для решения задачи.\n\nВ итоге у ребёнка будет не просто набор знаний, а готовые проекты и понимание, как создавать цифровые продукты на стыке кода и ИИ.",
    keyboard: createAiDeveloperKeyboard(),
  });
}

export async function handleAiEngineer(env, peerId) {
  return sendMessage(env, peerId, {
    text: "🔧 В модуле \"Инженер по ИИ\" ребёнок делает не учебные задачи, а полноценные инженерные проекты, которые можно показать, сохранить в портфолио и по‑настоящему гордиться. Это уровень, где каждый шаг приближает к профессии: от архитектуры до презентации готового MVP.\n\nЧто войдёт в практику и портфолио:\n\n• Инженерный подход к разработке с ИИ. Ребёнок научится проектировать системы так, чтобы они были надёжными, понятными и управляемыми — это отличает инженера от обычного пользователя.\n• Профессиональная база для LLM‑приложений на Python. Он соберёт свой набор инструментов и шаблонов, чтобы уверенно создавать приложения, где ИИ решает конкретные задачи.\n• Работа с реальными данными и алгоритмами. На живых примерах ребёнок освоит ML‑пайплайн и поймёт, как данные превращаются в работающие решения — это база для любой карьеры в технологиях.\n• AI‑базы знаний по собственным документам. Он сделает систему, которая отвечает на вопросы по его материалам: это и полезный инструмент для учёбы, и отличный проект для портфолио.\n• Надёжные агентные системы с контролем и памятью. Ребёнок спроектирует помощника, который умеет не только отвечать, но и действовать: использовать инструменты, запоминать контекст и выполнять цепочки задач без ошибок.\n• Полный цикл создания AI‑продукта. От проблемы и плана до MVP и презентации: ребёнок научится упаковывать идею в готовый продукт и рассказывать о нём так, чтобы его поняли.\n\nВ итоге у ребёнка будет не просто список навыков, а реальные проекты, показывающие, что он умеет мыслить и работать как инженер.",
    keyboard: createAiEngineerKeyboard(),
  });
}

export async function handleAiDeveloperMoreInfo(env, peerId, payload = {}) {
  const vkId = payload.userId ?? peerId;

  await setAiDeveloperState(env, vkId, { flow: "ai_developer_info", step: "awaiting_info" });

  return sendMessage(env, peerId, {
    text: "Напишите Ваш вопрос по курсу \"Разработчик ИИ\" в ответном сообщении, и мы свяжемся с Вами в ближайшее время.",
  });
}

export async function handleAiDeveloperMoreInfoTextInput(env, peerId, text, vkId) {
  if (!text || !vkId) {
    return false;
  }

  const state = await getAiDeveloperState(env, vkId);
  if (!state || state.flow !== "ai_developer_info" || state.step !== "awaiting_info") {
    return false;
  }

  const normalizedText = String(text).trim();
  if (!normalizedText) {
    return false;
  }

  await clearAiDeveloperState(env, vkId);

  await sendAdminChatMessage(
    env,
    `❓ ВОПРОС ПО КУРСУ - ⚙️ Разработчик ИИ\n\n🔵 VK ID: ${vkId}\n\n💬 Вопрос:\n${normalizedText}`
  );

  await sendMessage(env, peerId, {
    text: "Спасибо! Мы получили Ваш вопрос и свяжемся с Вами в ближайшее время.",
    keyboard: createAiDeveloperKeyboard(),
  });

  return true;
}

export async function handleAiEngineerMoreInfo(env, peerId, payload = {}) {
  const vkId = payload.userId ?? peerId;

  await setAiEngineerState(env, vkId, { flow: "ai_engineer_info", step: "awaiting_info" });

  return sendMessage(env, peerId, {
    text: "Напишите Ваш вопрос по курсу \"Инженер по ИИ\" в ответном сообщении, и мы свяжемся с Вами в ближайшее время.",
  });
}

export async function handleAiEngineerMoreInfoTextInput(env, peerId, text, vkId) {
  if (!text || !vkId) {
    return false;
  }

  const state = await getAiEngineerState(env, vkId);
  if (!state || state.flow !== "ai_engineer_info" || state.step !== "awaiting_info") {
    return false;
  }

  const normalizedText = String(text).trim();
  if (!normalizedText) {
    return false;
  }

  await clearAiEngineerState(env, vkId);

  await sendAdminChatMessage(
    env,
    `❓ ВОПРОС ПО КУРСУ - 🔧 Инженер по ИИ\n\n🔵 VK ID: ${vkId}\n\n💬 Вопрос:\n${normalizedText}`
  );

  await sendMessage(env, peerId, {
    text: "Спасибо! Мы получили Ваш вопрос и свяжемся с Вами в ближайшее время.",
    keyboard: createAiEngineerKeyboard(),
  });

  return true;
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

export async function handleAiCreatorMoreInfo(env, peerId, payload = {}) {
  const vkId = payload.userId ?? peerId;

  await setAiCreatorState(env, vkId, { flow: "ai_creator_info", step: "awaiting_info" });

  return sendMessage(env, peerId, {
    text: "Напишите Ваш вопрос по курсу \"Создатель ИИ\" в ответном сообщении, и мы свяжемся с Вами в ближайшее время.",
  });
}

export async function handleAiCreatorMoreInfoTextInput(env, peerId, text, vkId) {
  if (!text || !vkId) {
    return false;
  }

  const state = await getAiCreatorState(env, vkId);
  if (!state || state.flow !== "ai_creator_info" || state.step !== "awaiting_info") {
    return false;
  }

  const normalizedText = String(text).trim();
  if (!normalizedText) {
    return false;
  }

  await clearAiCreatorState(env, vkId);

  await sendAdminChatMessage(
    env,
    `❓ ВОПРОС ПО КУРСУ - 🎨 Создатель ИИ\n\n🔵 VK ID: ${vkId}\n\n💬 Вопрос:\n${normalizedText}`
  );

  await sendMessage(env, peerId, {
    text: "Спасибо! Мы получили Ваш вопрос и свяжемся с Вами в ближайшее время.",
    keyboard: createAiCreatorKeyboard(),
  });

  return true;
}
