"use client";

const SUPABASE_URL = "https://awibldrxrwsuzmwsiqpa.supabase.co";
const SUPABASE_ANON_KEY = "sb_publishable_Bq2BLduxLYl9fHX6mtKtMA_iry-CU64";

// Client-side analytics & real-time heartbeat tracker
function getVisitorId(): string {
  if (typeof window === "undefined") return "anon";
  try {
    let id = localStorage.getItem("nx_visitor_id");
    if (!id) {
      id = "v_" + Math.random().toString(36).slice(2, 9) + "_" + Date.now().toString(36);
      localStorage.setItem("nx_visitor_id", id);
    }
    return id;
  } catch {
    return "v_guest_" + Math.random().toString(36).slice(2, 8);
  }
}

export function sendAnalyticsPing(payload: {
  type: "pageview" | "heartbeat" | "event";
  path?: string;
  eventName?: string;
  eventData?: Record<string, unknown>;
}) {
  if (typeof window === "undefined") return;

  const visitorId = getVisitorId();
  const path = payload.path || window.location.pathname;
  const referrer = document.referrer ? new URL(document.referrer, window.location.href).hostname : "Direct";
  const device = /Mobile|Android|iPhone/i.test(navigator.userAgent) ? "Mobile" : "Desktop";

  const row = {
    visitor_id: visitorId,
    event_type: payload.type,
    path,
    referrer: referrer || "Direct",
    device,
    event_name: payload.eventName || null,
    event_data: payload.eventData || {},
  };

  const endpoint = `${SUPABASE_URL}/rest/v1/website_events`;

  try {
    fetch(endpoint, {
      method: "POST",
      headers: {
        apikey: SUPABASE_ANON_KEY,
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(row),
      mode: "cors",
      keepalive: true,
    }).catch(() => {
      // Silent fail on network glitches
    });
  } catch {
    // Ignore networking errors on client
  }
}
