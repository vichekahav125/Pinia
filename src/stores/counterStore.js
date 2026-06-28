import { defineStore } from 'pinia'

export const useCounterStore = defineStore('counter', {
  state: () => ({
    count: 0,
  }),
  getters: {
    doubleCount: (state) => state.count * 2,
  },
  actions: {
    increment() {
      this.count += 1
    },
    decrement() {
      this.count -= 1
    },
    setCount(value) {
      this.count = Number(value) || 0
    },
  },
})

