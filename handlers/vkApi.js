// Shared helpers for calling the VK Bots API from Cloudflare Workers.

const VK_API_VERSION = "5.199";

async function callVkApi(env, method, params) {
  const search = new URLSearchParams({
    access_token: env.VK_ACCESS_TOKEN,
    v: VK_API_VERSION,
    ...params,
  });

  const response = await fetch(`https://api.vk.com/method/${method}?${search.toString()}`, {
    method: "POST",
  });

  // VK always answers with HTTP 200, so real API errors only show up in the JSON body
  const data = await response.json();
  if (data.error) {
    console.error(`VK API ${method} error:`, JSON.stringify(data.error));
  }
  return data;
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

export function getFirstDefinedValue(env, ...keys) {
  for (const key of keys) {
    const value = env?.[key];
    if (typeof value === "string" && value.trim()) {
      return value.trim();
    }
  }
  return "";
}

// Sends a plain text notification to the community's admin chat (confirmed working peer_id: 175946972)
export async function sendAdminChatMessage(env, text) {
  const accessToken = getFirstDefinedValue(env, "VK_GROUP_TOKEN", "VK_ACCESS_TOKEN");
  if (!accessToken) {
    return false;
  }

  const peerId = getFirstDefinedValue(env, "VK_ADMIN_CHAT_ID", "VK_GROUP_CHAT_ID", "VK_CHAT_ID") || "175946972";

  const params = new URLSearchParams({
    access_token: accessToken,
    peer_id: String(peerId),
    message: text,
    random_id: String(crypto.getRandomValues(new Uint32Array(1))[0] & 0x7fffffff),
    v: VK_API_VERSION,
  });

  const response = await fetch("https://api.vk.com/method/messages.send", {
    method: "POST",
    body: params,
  });

  const data = await response.json();
  if (data.error) {
    console.error("VK admin chat message error:", JSON.stringify(data.error));
    return false;
  }

  return data;
}
