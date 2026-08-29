// Shared helpers for calling the VK Bots API from Cloudflare Workers.

const VK_API_VERSION = "5.199";

async function callVkApi(env, method, params) {
  const search = new URLSearchParams({
    access_token: env.VK_ACCESS_TOKEN,
    v: VK_API_VERSION,
    ...params,
  });

  return fetch(`https://api.vk.com/method/${method}?${search.toString()}`, {
    method: "POST",
  });
}

// text - message text; attachment - VK attachment string (e.g. "photo123_456"); keyboard - keyboard object (will be JSON-stringified)
export async function sendMessage(env, peerId, { text = "", attachment, keyboard } = {}) {
  const params = {
    peer_id: String(peerId),
    message: text,
    random_id: String(Math.floor(Math.random() * 2 ** 31)),
  };
  if (attachment) params.attachment = attachment;
  if (keyboard) params.keyboard = JSON.stringify(keyboard);

  return callVkApi(env, "messages.send", params);
}

// Required after handling a "message_event" (inline keyboard tap), otherwise the button spins forever on the user's side
export async function answerMessageEvent(env, { eventId, userId, peerId, eventData }) {
  const params = {
    event_id: eventId,
    user_id: String(userId),
    peer_id: String(peerId),
  };
  if (eventData) params.event_data = JSON.stringify(eventData);

  return callVkApi(env, "messages.sendMessageEventAnswer", params);
}
