# Pinia Best Practices (Assignment Notes)

(Keeping this separate is useful for quick grading/reference. The same content is also added to `README.md`.)

## 1) Keep state minimal and normalized
Store only what the UI/business logic truly needs. Avoid duplicating derived values in `state`; instead, compute them via getters.

## 2) Use getters for derived state (not actions)
Use `getters` for values derived from state (e.g., filtering, totals, counts). This keeps actions focused on mutations and makes derived data reusable and cacheable.

## 3) Make actions the only place that mutates state
Treat actions as the “write” layer: mutations happen inside actions so the store’s behavior is predictable.

## 4) Prefer store modules + small, focused stores
Split functionality into multiple stores (e.g., `counter`, `todo`, `cart`, `theme`) instead of one large store. This improves maintainability and reduces accidental coupling.

## 5) Use the Composition API ergonomics with `useStore()`
In Vue 3 components, prefer importing and calling `useXStore()` inside `setup`. Use `computed` for values derived in the component (though store getters often cover this).

## 6) Handle side effects explicitly (persistence, async)
If you need persistence (e.g., `localStorage`) or async calls, encapsulate that logic in actions (or dedicated helper actions) and keep it separate from pure getters.

## 7) Persist only when necessary (watch carefully / throttle)
If you persist with `watch(..., { deep: true })`, it can trigger frequently. Only persist the relevant slices of state and consider debouncing/throttling for large objects.

