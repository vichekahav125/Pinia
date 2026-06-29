import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {

    state: () => ({
        todos: [],
        nextId: 1
    }),

    getters: {

        totalTodos: (state) => state.todos.length,

        completedTodos: (state) =>
            state.todos.filter(t => t.completed),

        pendingTodos: (state) =>
            state.todos.filter(t => !t.completed)

    },

    actions: {

        addTodo(title) {
            this.todos.push({
                id: this.nextId++,
                title,
                completed: false
            })
        },

        deleteTodo(id) {
            this.todos = this.todos.filter(todo => todo.id !== id)
        },

        toggleTodo(id) {
            const todo = this.todos.find(t => t.id === id)
            if (todo) {
                todo.completed = !todo.completed
            }
        }

    }

})