<script setup>
import { useCartStore } from '../stores/cartStore'

const cartStore = useCartStore()
</script>

<template>

<div class="card">

<h2>Shopping Cart</h2>

<!-- PRODUCT LIST -->
<h3>Products</h3>

<div v-for="product in cartStore.products" :key="product.id">

{{ product.name }} - ${{ product.price }}

<button @click="cartStore.addToCart(product)">
Add
</button>

</div>

<hr />

<!-- CART LIST -->
<h3>Cart</h3>

<div v-for="(item, index) in cartStore.cart" :key="index">

{{ item.name }} - ${{ item.price }}

<button @click="cartStore.removeFromCart(index)">
Remove
</button>

</div>

<hr />

<!-- SUMMARY -->
<p>Total Items: {{ cartStore.totalItems }}</p>
<p>Total Price: ${{ cartStore.totalPrice }}</p>

<button @click="cartStore.clearCart()">
Clear Cart
</button>

</div>

</template>

<style scoped>

.card {
width: 450px;
margin: 30px auto;
padding: 20px;
border: 1px solid gray;
border-radius: 10px;
text-align: center;
}

button {
margin-left: 5px;
padding: 5px 10px;
cursor: pointer;
}

</style>