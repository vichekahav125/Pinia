<script setup>
import { useThemeStore } from '../stores/themeStore'

const theme = useThemeStore()
</script>

<template>

<div :class="theme.darkMode ? 'dark' : 'light'" class="card">

<h2>Theme Switcher</h2>

<p>Current Theme: {{ theme.themeName }}</p>

<button @click="theme.toggleTheme()">
Toggle Theme
</button>

</div>

</template>

<style scoped>

.card {
width: 400px;
margin: 30px auto;
padding: 20px;
text-align: center;
border-radius: 10px;
transition: 0.3s;
}

/* LIGHT MODE */
.light {
background: white;
color: black;
border: 1px solid #ccc;
}

/* DARK MODE */
.dark {
background: #1e1e1e;
color: white;
border: 1px solid #444;
}

button {
margin-top: 10px;
padding: 10px 20px;
cursor: pointer;
}

</style>