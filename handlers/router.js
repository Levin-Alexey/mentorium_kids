import { sendMainMenu } from "./mainMenu.js";
import { handleTrialLesson } from "./trialLesson.js";
import { handleCourses, handleCourseAi, handleCourseProgramming, handleCourseLiteracy, handleAiResearcher, handleAiCreator, handleAiDeveloper, handleAiEngineer, handleAiResearcherMoreInfo, handleAiCreatorMoreInfo, handleAiDeveloperMoreInfo, handleAiEngineerMoreInfo, handleProgrammingBasic, handleProgrammingBeginner, handleProgrammingDeveloper, handleProgrammingEngineer } from "./courses.js";
import { handlePickCourse } from "./pickCourse.js";
import { handleProjects } from "./projects.js";
import { handlePricing } from "./pricing.js";
import { handleQuestion } from "./question.js";

const ACTION_HANDLERS = {
  trial_lesson: handleTrialLesson,
  trial_course: handleTrialLesson,
  trial_notes_skip: handleTrialLesson,
  trial_review_confirm: handleTrialLesson,
  trial_review_edit: handleTrialLesson,
  courses: handleCourses,
  course_ai: handleCourseAi,
  course_programming: handleCourseProgramming,
  course_literacy: handleCourseLiteracy,
  ai_researcher: handleAiResearcher,
  ai_researcher_more_info: handleAiResearcherMoreInfo,
  ai_creator: handleAiCreator,
  ai_creator_more_info: handleAiCreatorMoreInfo,
  ai_developer: handleAiDeveloper,
  ai_developer_more_info: handleAiDeveloperMoreInfo,
  ai_engineer: handleAiEngineer,
  ai_engineer_more_info: handleAiEngineerMoreInfo,
  programming_basic: handleProgrammingBasic,
  programming_beginner: handleProgrammingBeginner,
  programming_developer: handleProgrammingDeveloper,
  programming_engineer: handleProgrammingEngineer,
  pick_course: handlePickCourse,
  projects: handleProjects,
  pricing: handlePricing,
  question: handleQuestion,
  main_menu: (env, peerId) => sendMainMenu(env, peerId),
};

export async function routeAction(env, action, peerId, payload = {}) {
  const rawAction = typeof action === "string" ? action : action?.action || payload?.action;
  const normalizedAction = rawAction || payload?.action;
  const handler = ACTION_HANDLERS[normalizedAction];

  if (!handler) {
    console.log("Unknown action", { action, payload, peerId, normalizedAction });
    return null;
  }

  return handler(env, peerId, {
    ...payload,
    action: normalizedAction,
  });
}

export { sendMainMenu };
