// lib/analytics.ts
type EventName =
  | 'view_item'
  | 'add_to_cart'
  | 'begin_checkout'
  | 'purchase'
  | 'view_list'
  | 'search'

type EventPayload = Record<string, unknown>

export function track(event: EventName, payload: EventPayload = {}) {
  // eslint-disable-next-line no-console
  if (typeof window !== 'undefined') {
    console.debug('[analytics]', event, payload)
    // could store in localStorage or send to your endpoint
    try {
      const key = 'analytics.v1'
      const prev = JSON.parse(localStorage.getItem(key) || '[]')
      prev.push({ t: Date.now(), event, payload })
      localStorage.setItem(key, JSON.stringify(prev.slice(-200)))
    } catch {}
  } else {
    // server-side no-op
  }
}
