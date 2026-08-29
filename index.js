// VK Callback API bot on Cloudflare Workers
// Secrets required (set via `wrangler secret put`):
//   VK_CONFIRMATION_CODE - string VK expects back for server confirmation
//   VK_SECRET_KEY         - "Secret key" from VK group Callback API settings
//   VK_ACCESS_TOKEN       - group access token used to call messages.send

import { sendMainMenu, routeAction } from "./handlers/router.js";
import { answerMessageEvent } from "./handlers/vkApi.js";

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
          payload = JSON.parse(event.payload || "{}");
        } catch {
          payload = {};
        }
        await routeAction(env, payload.action, event.peer_id);
      }
    }

    // VK requires "ok" for every processed event, otherwise it retries the webhook
    return new Response("ok", { status: 200 });
  },
};
