import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    user: null,
  }),
  getters: {
    isLoggedIn: (state) => !!state.user,
    fullName: (state) => {
      if (!state.user) return ''
      const { firstName = '', lastName = '' } = state.user
      return `${firstName} ${lastName}`.trim()
    },
  },
  actions: {
    login(payload) {
      this.user = {
        firstName: payload?.firstName ?? 'John',
        lastName: payload?.lastName ?? 'Doe',
        email: payload?.email ?? 'john.doe@example.com',
      }
    },
    logout() {
      this.user = null
    },
  },
})

