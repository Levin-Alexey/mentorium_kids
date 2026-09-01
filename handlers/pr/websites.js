import { sendMessage } from "../vkApi.js";
import { createProjectsBackKeyboard } from "./shared.js";

export async function handleProjectsWebsites(env, peerId) {
  // TODO: заполнить примерами сайтов, созданных учениками
  return sendMessage(env, peerId, {
    text: "🌐 Сайты\n\nСкоро здесь появятся примеры сайтов, которые создают наши ученики.",
    keyboard: createProjectsBackKeyboard(),
  });
}
