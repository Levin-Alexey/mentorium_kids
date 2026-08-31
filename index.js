// VK Callback API bot on Cloudflare Workers
// Secrets required (set via `wrangler secret put`):
//   VK_CONFIRMATION_CODE - string VK expects back for server confirmation
//   VK_SECRET_KEY         - "Secret key" from VK group Callback API settings
//   VK_ACCESS_TOKEN       - group access token used to call messages.send

import { sendMainMenu, routeAction } from "./handlers/router.js";
import { answerMessageEvent } from "./handlers/vkApi.js";
import { handleTrialLesson, handleTrialTextInput } from "./handlers/trialLesson.js";
import { handleQuestionTextInput } from "./handlers/question.js";
import { handlePickCourseTextInput } from "./handlers/pickCourse.js";
import { handleAiResearcherMoreInfoTextInput, handleAiCreatorMoreInfoTextInput, handleAiDeveloperMoreInfoTextInput, handleAiEngineerMoreInfoTextInput, handleProgrammingBasicMoreInfoTextInput, handleProgrammingBeginnerMoreInfoTextInput, handleProgrammingDeveloperMoreInfoTextInput, handleProgrammingEngineerMoreInfoTextInput } from "./handlers/courses.js";

function getIsoTimestamp(date = new Date()) {
  return date.toISOString();
}

async function ensureUser(env, vkId) {
  if (!vkId || !env.DB) {
    return null;
  }

  const now = getIsoTimestamp();
  const existingUser = await env.DB.prepare(
    "SELECT id FROM users WHERE vk_id = ?"
  ).bind(vkId).first();

  if (existingUser) {
    await env.DB.prepare(
      "UPDATE users SET last_started_at = ?, last_activity_at = ?, updated_at = ? WHERE vk_id = ?"
    ).bind(now, now, now, vkId).run();

    return existingUser.id;
  }

  const result = await env.DB.prepare(
    `INSERT INTO users (
      vk_id,
      source,
      first_started_at,
      last_started_at,
      last_activity_at,
      created_at,
      updated_at
    ) VALUES (?, 'vk_bot', ?, ?, ?, ?, ?)`
  ).bind(vkId, now, now, now, now, now).run();

  return result?.meta?.last_row_id ?? null;
}

export default {
  async fetch(request, env) {
    if (request.method !== "POST") {
      return new Response("ok", { status: 200 });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response("ok", { status: 200 });
    }

    // VK repeats delivery if the response is delayed, so validate the secret first
    if (env.VK_SECRET_KEY && body.secret !== env.VK_SECRET_KEY) {
      return new Response("ok", { status: 200 });
    }

    if (body.type === "confirmation") {
      if (!env.VK_CONFIRMATION_CODE) {
        return new Response("VK_CONFIRMATION_CODE secret is not set", { status: 500 });
      }
      return new Response(env.VK_CONFIRMATION_CODE, { status: 200 });
    }

    if (body.type === "message_new") {
      const message = body.object?.message;
      const vkUserId = message?.from_id ?? message?.peer_id;

      if (vkUserId) {
        await ensureUser(env, vkUserId);

        const hasActiveTrialFlow = await handleTrialTextInput(env, message.peer_id, message.text, vkUserId);
        if (hasActiveTrialFlow) {
          return new Response("ok", { status: 200 });
        }

        const hasActiveQuestionFlow = await handleQuestionTextInput(env, message.peer_id, message.text, vkUserId);
        if (hasActiveQuestionFlow) {
          return new Response("ok", { status: 200 });
        }

        const hasActivePickCourseFlow = await handlePickCourseTextInput(env, message.peer_id, message.text, vkUserId);
        if (hasActivePickCourseFlow) {
          return new Response("ok", { status: 200 });
        }

        const hasActiveAiResearcherMoreInfoFlow = await handleAiResearcherMoreInfoTextInput(env, message.peer_id, message.text, vkUserId);
        if (hasActiveAiResearcherMoreInfoFlow) {
          return new Response("ok", { status: 200 });
        }

        const hasActiveAiCreatorMoreInfoFlow = await handleAiCreatorMoreInfoTextInput(env, message.peer_id, message.text, vkUserId);
        if (hasActiveAiCreatorMoreInfoFlow) {
          return new Response("ok", { status: 200 });
        }

        const hasActiveAiDeveloperMoreInfoFlow = await handleAiDeveloperMoreInfoTextInput(env, message.peer_id, message.text, vkUserId);
        if (hasActiveAiDeveloperMoreInfoFlow) {
          return new Response("ok", { status: 200 });
        }

        const hasActiveAiEngineerMoreInfoFlow = await handleAiEngineerMoreInfoTextInput(env, message.peer_id, message.text, vkUserId);
        if (hasActiveAiEngineerMoreInfoFlow) {
          return new Response("ok", { status: 200 });
        }

        const hasActiveProgrammingBasicMoreInfoFlow = await handleProgrammingBasicMoreInfoTextInput(env, message.peer_id, message.text, vkUserId);
        if (hasActiveProgrammingBasicMoreInfoFlow) {
          return new Response("ok", { status: 200 });
        }

        const hasActiveProgrammingBeginnerMoreInfoFlow = await handleProgrammingBeginnerMoreInfoTextInput(env, message.peer_id, message.text, vkUserId);
        if (hasActiveProgrammingBeginnerMoreInfoFlow) {
          return new Response("ok", { status: 200 });
        }

        const hasActiveProgrammingDeveloperMoreInfoFlow = await handleProgrammingDeveloperMoreInfoTextInput(env, message.peer_id, message.text, vkUserId);
        if (hasActiveProgrammingDeveloperMoreInfoFlow) {
          return new Response("ok", { status: 200 });
        }

        const hasActiveProgrammingEngineerMoreInfoFlow = await handleProgrammingEngineerMoreInfoTextInput(env, message.peer_id, message.text, vkUserId);
        if (hasActiveProgrammingEngineerMoreInfoFlow) {
          return new Response("ok", { status: 200 });
        }
      }

      if (message && env.VK_ACCESS_TOKEN) {
        await sendMainMenu(env, message.peer_id);
      }
    }

    // Inline keyboard button tap
    if (body.type === "message_event") {
      const event = body.object;
      if (event && env.VK_ACCESS_TOKEN) {
        await answerMessageEvent(env, {
          eventId: event.event_id,
          userId: event.user_id,
          peerId: event.peer_id,
        });

        let payload = {};
        try {
          const rawPayload = typeof event.payload === "string" ? event.payload : JSON.stringify(event.payload || {});
          payload = JSON.parse(rawPayload || "{}");
        } catch (error) {
          console.error("Failed to parse VK callback payload", error, event.payload);
          payload = {};
        }

        console.log("VK message_event payload", {
          eventId: event.event_id,
          userId: event.user_id,
          peerId: event.peer_id,
          payload,
        });

        await routeAction(env, payload.action, event.peer_id, {
          ...payload,
          userId: event.user_id,
          peerId: event.peer_id,
        });
      }
    }

    // VK requires "ok" for every processed event, otherwise it retries the webhook
    return new Response("ok", { status: 200 });
  },
};
