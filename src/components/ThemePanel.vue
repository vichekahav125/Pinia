<script setup>
import { onMounted } from 'vue'
import { useThemeStore } from '../stores/themeStore'

const theme = useThemeStore()

onMounted(() => {
    theme.init()
})

const setTheme = (t) => theme.setTheme(t)
</script>

<template>
    <section class="panel">
        <h2>Theme</h2>
        <p class="muted">Persisted in localStorage.</p>

        <div class="seg">
            <button :class="{ active: theme.theme === 'light' }" @click="setTheme('light')">Light</button>
            <button :class="{ active: theme.theme === 'dark' }" @click="setTheme('dark')">Dark</button>
            <button class="ghost" @click="theme.toggleTheme">Toggle</button>
        </div>
    </section>
</template>

<style scoped>
.panel {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
}

.muted {
    margin: 6px 0 0;
    color: #6b7280;
}

.seg {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    margin-top: 12px;
}

button {
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: #fff;
    cursor: pointer;
}

.active {
    border-color: #111827;
    font-weight: 700;
}

.ghost {
    background: transparent;
}
</style>
