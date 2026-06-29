<script setup>
import { ref } from 'vue'
import { useUserStore } from '../stores/userStore'

const user = useUserStore()

const name = ref(user.name)
const age = ref(user.age)
const email = ref(user.email)

function updateUser() {
    user.updateName(name.value)
    user.updateAge(age.value)
    user.updateEmail(email.value)
}
</script>

<template>

<div class="card">

<h2>User Profile</h2>

<p><b>Name:</b> {{ user.name }}</p>
<p><b>Age:</b> {{ user.age }}</p>
<p><b>Email:</b> {{ user.email }}</p>

<hr />

<h3>Update Form</h3>

<input v-model="name" placeholder="Name" />
<br />

<input v-model="age" type="number" placeholder="Age" />
<br />

<input v-model="email" placeholder="Email" />
<br />

<button @click="updateUser">
Update
</button>

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
margin: 5px;
padding: 8px;
width: 90%;
}

button {
margin-top: 10px;
padding: 10px 20px;
cursor: pointer;
}

</style>