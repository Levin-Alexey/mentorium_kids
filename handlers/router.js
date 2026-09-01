import { sendMainMenu } from "./mainMenu.js";
import { handleTrialLesson } from "./trialLesson.js";
import { handleCourses, handleCourseAi, handleCourseProgramming, handleCourseLiteracy, handleAiResearcher, handleAiCreator, handleAiDeveloper, handleAiEngineer, handleAiResearcherMoreInfo, handleAiCreatorMoreInfo, handleAiDeveloperMoreInfo, handleAiEngineerMoreInfo, handleProgrammingBasic, handleProgrammingBasicMoreInfo, handleProgrammingBeginner, handleProgrammingBeginnerMoreInfo, handleProgrammingDeveloper, handleProgrammingDeveloperMoreInfo, handleProgrammingEngineer, handleProgrammingEngineerMoreInfo } from "./courses.js";
import { handlePickCourse } from "./pickCourse.js";
import { handleProjects } from "./projects.js";
import { handleProjectsAi } from "./pr/ai.js";
import { handleProjectsAiStudyHelper } from "./pr/aiStudyHelper.js";
import { handleProjectsAiStoryGenerator } from "./pr/aiStoryGenerator.js";
import { handleProjectsGames } from "./pr/games.js";
import { handleProjectsGamesSpaceAdventure } from "./pr/gamesSpaceAdventure.js";
import { handleProjectsGamesCollectTreasures } from "./pr/gamesCollectTreasures.js";
// import { handleProjectsWebsites } from "./pr/websites.js";
// import { handleProjectsCreative } from "./pr/creative.js";
import { handleProjectsProgramming } from "./pr/programming.js";
import { handleProjectsProgrammingCalculator } from "./pr/programmingCalculator.js";
import { handleProjectsProgrammingPythonQuiz } from "./pr/programmingPythonQuiz.js";
import { handleProjectsProgrammingBot } from "./pr/programmingBot.js";
import { handleProjectsProgrammingBotStudyHelper } from "./pr/programmingBotStudyHelper.js";
import { handleProjectsProgrammingBotQuiz } from "./pr/programmingBotQuiz.js";
import { handlePricing, handlePricingConsultation } from "./pricing.js";
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
  programming_basic_more_info: handleProgrammingBasicMoreInfo,
  programming_beginner: handleProgrammingBeginner,
  programming_beginner_more_info: handleProgrammingBeginnerMoreInfo,
  programming_developer: handleProgrammingDeveloper,
  programming_developer_more_info: handleProgrammingDeveloperMoreInfo,
  programming_engineer: handleProgrammingEngineer,
  programming_engineer_more_info: handleProgrammingEngineerMoreInfo,
  pick_course: handlePickCourse,
  projects: handleProjects,
  projects_ai: handleProjectsAi,
  projects_ai_study_helper: handleProjectsAiStudyHelper,
  projects_ai_story_generator: handleProjectsAiStoryGenerator,
  projects_games: handleProjectsGames,
  projects_games_space_adventure: handleProjectsGamesSpaceAdventure,
  projects_games_collect_treasures: handleProjectsGamesCollectTreasures,
  // projects_websites: handleProjectsWebsites,
  // projects_creative: handleProjectsCreative,
  projects_programming: handleProjectsProgramming,
  projects_programming_calculator: handleProjectsProgrammingCalculator,
  projects_programming_python_quiz: handleProjectsProgrammingPythonQuiz,
  projects_programming_bot: handleProjectsProgrammingBot,
  projects_programming_bot_study_helper: handleProjectsProgrammingBotStudyHelper,
  projects_programming_bot_quiz: handleProjectsProgrammingBotQuiz,
  pricing: handlePricing,
  pricing_consultation: handlePricingConsultation,
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
