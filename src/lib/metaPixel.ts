declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaPixel(eventName: string, data?: Record<string, unknown>) {
  if (typeof window === 'undefined') {
    return;
  }

  if (typeof window.fbq !== 'function') {
    return;
  }

  if (data) {
    window.fbq('track', eventName, data);
    return;
  }

  window.fbq('track', eventName);
}
