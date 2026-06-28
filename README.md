# Pinia

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VS Code](https://code.visualstudio.com/) + [Vue (Official)](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Recommended Browser Setup

- Chromium-based browsers (Chrome, Edge, Brave, etc.):
  - [Vue.js devtools](https://chromewebstore.google.com/detail/vuejs-devtools/nhdogjmejiglipccpnnnanhbledajbpd)
  - [Turn on Custom Object Formatter in Chrome DevTools](http://bit.ly/object-formatters)
- Firefox:
  - [Vue.js devtools](https://addons.mozilla.org/en-US/firefox/addon/vue-js-devtools/)
  - [Turn on Custom Object Formatter in Firefox DevTools](https://fxdx.dev/firefox-devtools-custom-object-formatters/)

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## 5️⃣ Best Practices for Using Pinia

1) **Keep state minimal and normalized**
Store only the data you truly need. Avoid duplicating derived values in `state`; derive them with getters instead.

2) **Use getters for derived state**
`getters` are for computed/derived values (totals, filtered lists, counts). This keeps your store logic consistent and your UI simpler.

3) **Mutate state only inside actions**
Treat actions as the only place that changes state. This makes state transitions predictable and easier to debug.

4) **Split logic into focused stores**
Prefer multiple small stores (e.g., `counter`, `todo`, `cart`, `theme`) rather than one giant store. This improves maintainability and reduces unintended coupling.

5) **Encapsulate side effects (persistence/async) in actions**
If your store needs side effects like `localStorage` persistence or API calls, keep that logic inside actions (or dedicated helper actions), not inside getters.

6) **Be careful with deep watchers & persistence**
If you persist state using `watch(..., { deep: true })`, it can trigger frequently. Persist only what’s necessary (or debounce/throttle) for better performance.

