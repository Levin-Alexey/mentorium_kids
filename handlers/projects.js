import { sendMessage } from "./vkApi.js";

export async function handleProjects(env, peerId) {
  // TODO: replace with links/media showcasing real student projects
  return sendMessage(env, peerId, {
    text: "🏆 Проекты учеников\n\nСкоро здесь будет подборка лучших проектов наших учеников: сайты, игры и приложения, созданные на занятиях.",
  });
}
