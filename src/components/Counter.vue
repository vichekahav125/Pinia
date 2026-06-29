<script setup>
import { useCounterStore } from '../stores/counterStore'

const counter = useCounterStore()
</script>

<template>

<div class="card">

<h2>Counter Store</h2>

<h3>Current Count : {{ counter.count }}</h3>

<h3>Double Count : {{ counter.doubleCount }}</h3>

<button @click="counter.increment()">
Increment
</button>

<button @click="counter.decrement()">
Decrement
</button>

<button @click="counter.reset()">
Reset
</button>

</div>

</template>

<style scoped>

.card{
width:500px;
margin:30px auto;
padding:20px;
border:1px solid gray;
border-radius:10px;
text-align:center;
}

button{
margin:10px;
padding:10px 20px;
cursor:pointer;
}

</style>