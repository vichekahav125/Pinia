import { defineStore } from 'pinia'

const STORAGE_KEY = 'pinia_demo_theme'

export const useThemeStore = defineStore('theme', {
  state: () => ({
    theme: 'light',
  }),
  getters: {
    isDark: (state) => state.theme === 'dark',
  },
  actions: {
    init() {
      try {
        const saved = localStorage.getItem(STORAGE_KEY)
        if (saved === 'dark' || saved === 'light') this.theme = saved
      } catch {}
    },
    setTheme(value) {
      this.theme = value === 'dark' ? 'dark' : 'light'
      try {
        localStorage.setItem(STORAGE_KEY, this.theme)
      } catch {}
    },
    toggleTheme() {
      this.setTheme(this.isDark ? 'light' : 'dark')
    },
  },
})

