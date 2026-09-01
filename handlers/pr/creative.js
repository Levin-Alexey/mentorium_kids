import { sendMessage } from "../vkApi.js";
import { createProjectsBackKeyboard } from "./shared.js";

export async function handleProjectsCreative(env, peerId) {
  // TODO: заполнить примерами творческих проектов учеников
  return sendMessage(env, peerId, {
    text: "🎨 Творческие проекты\n\nСкоро здесь появятся примеры творческих проектов наших учеников.",
    keyboard: createProjectsBackKeyboard(),
  });
}
