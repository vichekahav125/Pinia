<script setup>
import { computed } from 'vue'
import { useUserStore } from '../stores/userStore'

const userStore = useUserStore()

const loggedIn = computed(() => userStore.isLoggedIn)
const fullName = computed(() => userStore.fullName)

const fakeLogin = () => {
    userStore.login({ firstName: 'Vicheka', lastName: 'Hav', email: 'vicheka@example.com' })
}
</script>

<template>
    <section class="panel">
        <h2>User</h2>

        <div v-if="loggedIn" class="card">
            <p class="strong">Signed in as {{ fullName }}</p>
            <p class="muted">Email: {{ userStore.user?.email }}</p>
            <button class="danger" @click="userStore.logout">Logout</button>
        </div>

        <div v-else class="card">
            <p class="muted">Not logged in.</p>
            <button @click="fakeLogin">Login</button>
        </div>
    </section>
</template>

<style scoped>
.panel {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
}

.card {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 8px;
}

button {
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
    background: #fff;
    cursor: pointer;
    align-self: flex-start;
}

.danger {
    border-color: #fca5a5;
    color: #b91c1c;
}

.strong {
    font-weight: 700;
}

.muted {
    color: #6b7280;
    margin: 0;
}
</style>
