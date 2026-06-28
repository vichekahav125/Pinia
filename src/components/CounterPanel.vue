<script setup>
import { computed } from 'vue'
import { useCounterStore } from '../stores/counterStore'

const counter = useCounterStore()

const doubleCount = computed(() => counter.doubleCount)
</script>

<template>
    <section class="panel">
        <h2>Counter</h2>
        <div class="row">
            <button @click="counter.decrement">-</button>
            <span class="count">{{ counter.count }}</span>
            <button @click="counter.increment">+</button>
        </div>

        <p class="muted">Double: <strong>{{ doubleCount }}</strong></p>
        <p class="muted">Actions update Pinia store state.</p>
    </section>
</template>

<style scoped>
.panel {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
}

.row {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-top: 8px;
}

button {
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: #fff;
    cursor: pointer;
}

.count {
    min-width: 56px;
    text-align: center;
    font-size: 24px;
    font-weight: 700;
}

.muted {
    margin: 8px 0 0;
    color: #6b7280;
}
</style>
