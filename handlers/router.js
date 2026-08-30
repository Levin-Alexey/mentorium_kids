import { sendMainMenu } from "./mainMenu.js";
import { handleTrialLesson } from "./trialLesson.js";
import { handleCourses } from "./courses.js";
import { handlePickCourse } from "./pickCourse.js";
import { handleProjects } from "./projects.js";
import { handlePricing } from "./pricing.js";
import { handleQuestion } from "./question.js";

const ACTION_HANDLERS = {
  trial_lesson: handleTrialLesson,
  courses: handleCourses,
  pick_course: handlePickCourse,
  projects: handleProjects,
  pricing: handlePricing,
  question: handleQuestion,
};

export async function routeAction(env, action, peerId, payload = {}) {
  const normalizedAction = typeof action === "string" ? action : action?.action || payload?.action;
  const handler = ACTION_HANDLERS[normalizedAction];

  if (!handler) {
    console.log("Unknown action", { action, payload, peerId });
    return null;
  }

  return handler(env, peerId, {
    ...payload,
    action: normalizedAction,
  });
}

export { sendMainMenu };
