export function useABTest() {
  function trackPageView(_page: string) {}
  function trackEvent(_event: string, _data?: Record<string, unknown>) {}

  return { trackPageView, trackEvent };
}
