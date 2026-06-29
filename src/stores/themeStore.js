import { defineStore } from 'pinia'

export const useThemeStore = defineStore('theme', {

    state: () => ({
        darkMode: false
    }),

    getters: {

        themeName: (state) =>
            state.darkMode ? 'Dark Mode' : 'Light Mode'

    },

    actions: {

        toggleTheme() {
            this.darkMode = !this.darkMode
        }

    }

})