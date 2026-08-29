// VK Callback API echo-bot on Cloudflare Workers
// Secrets required (set via `wrangler secret put`):
//   VK_CONFIRMATION_CODE - string VK expects back for server confirmation
//   VK_SECRET_KEY         - "Secret key" from VK group Callback API settings
//   VK_ACCESS_TOKEN       - group access token used to call messages.send

const VK_API_VERSION = "5.199";

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
      return new Response(env.VK_CONFIRMATION_CODE, { status: 200 });
    }

    if (body.type === "message_new") {
      const message = body.object?.message;
      if (message && env.VK_ACCESS_TOKEN) {
        await sendMessage(env, message.peer_id, message.text || "");
      }
    }

    // VK requires "ok" for every processed event, otherwise it retries the webhook
    return new Response("ok", { status: 200 });
  },
};

async function sendMessage(env, peerId, text) {
  const params = new URLSearchParams({
    access_token: env.VK_ACCESS_TOKEN,
    v: VK_API_VERSION,
    peer_id: String(peerId),
    message: text,
    random_id: String(Math.floor(Math.random() * 2 ** 31)),
  });

  await fetch(`https://api.vk.com/method/messages.send?${params.toString()}`, {
    method: "POST",
  });
}
