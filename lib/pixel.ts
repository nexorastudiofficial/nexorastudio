// Meta Pixel helper utility for standard and custom events

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
    _fbq?: unknown;
  }
}

export const FB_PIXEL_ID = "1590932912723924";

// Track route change / PageView
export const pageview = (url?: string) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", "PageView");
  }
};

// Track standard or custom events
export const event = (name: string, options: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("track", name, options);
  }
};

// Track Custom Event
export const customEvent = (name: string, options: Record<string, unknown> = {}) => {
  if (typeof window !== "undefined" && typeof window.fbq === "function") {
    window.fbq("trackCustom", name, options);
  }
};

// Standard Ecommerce Events
export const trackViewContent = (params: {
  content_name: string;
  content_category?: string;
  content_ids?: string[];
  value?: number;
  currency?: string;
}) => {
  event("ViewContent", {
    content_name: params.content_name,
    content_category: params.content_category || "E-commerce",
    content_ids: params.content_ids || [],
    value: params.value || 0,
    currency: params.currency || "DZD",
  });
};

export const trackAddToCart = (params: {
  content_name: string;
  content_category?: string;
  content_ids?: string[];
  value: number;
  currency?: string;
}) => {
  event("AddToCart", {
    content_name: params.content_name,
    content_category: params.content_category || "E-commerce",
    content_ids: params.content_ids || [],
    value: params.value,
    currency: params.currency || "DZD",
  });
};

export const trackInitiateCheckout = (params: {
  value: number;
  num_items: number;
  currency?: string;
}) => {
  event("InitiateCheckout", {
    value: params.value,
    num_items: params.num_items,
    currency: params.currency || "DZD",
  });
};

export const trackPurchase = (params: {
  value: number;
  order_id?: string;
  num_items?: number;
  currency?: string;
}) => {
  event("Purchase", {
    value: params.value,
    order_id: params.order_id || "",
    num_items: params.num_items || 1,
    currency: params.currency || "DZD",
  });
};

// Lead / Contact Events
export const trackContact = (method = "WhatsApp") => {
  event("Contact", {
    contact_method: method,
  });
};

export const trackLead = (params: {
  content_name?: string;
  value?: number;
  currency?: string;
}) => {
  event("Lead", {
    content_name: params.content_name || "Service Inquiry",
    value: params.value || 0,
    currency: params.currency || "DZD",
  });
};

// Button Click Event helper
export const trackButtonClick = (buttonName: string, extra: Record<string, unknown> = {}) => {
  customEvent("ButtonClick", {
    button_name: buttonName,
    timestamp: new Date().toISOString(),
    ...extra,
  });
};
