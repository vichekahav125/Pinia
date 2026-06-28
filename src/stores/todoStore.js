import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
  state: () => ({
    todos: [],
  }),
  getters: {
    remaining: (state) => state.todos.filter((t) => !t.done).length,
    completed: (state) => state.todos.filter((t) => t.done).length,
  },
  actions: {
    addTodo(text) {
      const trimmed = String(text ?? '').trim()
      if (!trimmed) return
      this.todos.push({
        id: crypto?.randomUUID?.() ?? String(Date.now()),
        text: trimmed,
        done: false,
        createdAt: Date.now(),
      })
    },
    toggleTodo(id) {
      const todo = this.todos.find((t) => t.id === id)
      if (todo) todo.done = !todo.done
    },
    removeTodo(id) {
      this.todos = this.todos.filter((t) => t.id !== id)
    },
    clearCompleted() {
      this.todos = this.todos.filter((t) => !t.done)
    },
  },
})

