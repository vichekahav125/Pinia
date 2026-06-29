<script setup>
import { ref } from 'vue'
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()
const newTodo = ref('')
</script>

<template>

<div class="card">

<h2>Todo List</h2>

<!-- Input -->
<input v-model="newTodo" placeholder="Enter todo" />
<button @click="() => { todoStore.addTodo(newTodo); newTodo = '' }">
Add
</button>

<hr />

<!-- Todo List -->
<div v-for="todo in todoStore.todos" :key="todo.id">

<label>
<input type="checkbox" @change="todoStore.toggleTodo(todo.id)" />
{{ todo.title }}
</label>

<button @click="todoStore.deleteTodo(todo.id)">
Delete
</button>

</div>

<hr />

<!-- Stats -->
<p>Total: {{ todoStore.totalTodos }}</p>
<p>Completed: {{ todoStore.completedTodos.length }}</p>
<p>Pending: {{ todoStore.pendingTodos.length }}</p>

</div>

</template>

<style scoped>

.card {
width: 400px;
margin: 30px auto;
padding: 20px;
border: 1px solid gray;
border-radius: 10px;
text-align: center;
}

input {
padding: 8px;
width: 70%;
margin-bottom: 10px;
}

button {
margin-left: 5px;
padding: 6px 10px;
cursor: pointer;
}

</style>