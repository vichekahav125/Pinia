<script setup>
import { computed, ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const todo = useTodoStore()
const text = ref('')

const remaining = computed(() => todo.remaining)
const completed = computed(() => todo.completed)


const add = () => {
    todo.addTodo(text.value)
    text.value = ''
}
</script>

<template>
    <section class="panel">
        <h2>Todo</h2>

        <div class="stats">
            <span class="pill">Remaining: <strong>{{ remaining }}</strong></span>
            <span class="pill">Completed: <strong>{{ completed }}</strong></span>
        </div>

        <div class="add">
            <input v-model="text" placeholder="What needs to be done?" @keyup.enter="add" />
            <button @click="add">Add</button>
        </div>

        <ul class="list">
            <li v-for="t in todo.todos" :key="t.id" class="item">
                <label class="label">
                    <input type="checkbox" :checked="t.done" @change="todo.toggleTodo(t.id)" />
                    <span :class="{ done: t.done }">{{ t.text }}</span>
                </label>
                <button class="small" @click="todo.removeTodo(t.id)">Remove</button>
            </li>

            <li v-if="todo.todos.length === 0" class="empty">No todos yet.</li>
        </ul>

        <div class="actions">
            <button :disabled="completed === 0" @click="todo.clearCompleted">Clear completed</button>
        </div>
    </section>
</template>

<style scoped>
.panel {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
}

.stats {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 8px;
}

.pill {
    background: #f3f4f6;
    border-radius: 999px;
    padding: 6px 10px;
    color: #111827;
}

.add {
    display: flex;
    gap: 10px;
    margin-top: 12px;
}

input {
    flex: 1;
    padding: 10px 12px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
}

button {
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: #fff;
    cursor: pointer;
}

button:disabled {
    opacity: .5;
    cursor: not-allowed;
}

.list {
    list-style: none;
    padding: 0;
    margin: 12px 0 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 10px;
}

.label {
    display: flex;
    align-items: center;
    gap: 10px;
}

.done {
    text-decoration: line-through;
    color: #6b7280;
}

.small {
    padding: 6px 10px;
    border-radius: 10px;
    font-size: 12px;
}

.empty {
    color: #6b7280;
}

.actions {
    margin-top: 12px;
}
</style>
