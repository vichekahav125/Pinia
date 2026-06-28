<script setup>
import { computed } from 'vue'
import { useCartStore } from '../stores/cartStore'

const cart = useCartStore()

const items = [
    { id: 'a1', name: 'Keyboard', price: 49.99 },
    { id: 'b2', name: 'Mouse', price: 24.5 },
    { id: 'c3', name: 'Monitor Cable', price: 9.99 },
]

const itemCount = computed(() => cart.itemCount)
const subtotal = computed(() => cart.subtotal)

const add = (p) => cart.addToCart(p)
</script>

<template>
    <section class="panel">
        <h2>Cart</h2>

        <div class="summary">
            <span class="pill">Items: <strong>{{ itemCount }}</strong></span>
            <span class="pill">Subtotal: <strong>${{ subtotal.toFixed(2) }}</strong></span>
        </div>

        <div class="grid">
            <div v-for="p in items" :key="p.id" class="product">
                <p class="name">{{ p.name }}</p>
                <p class="price">${{ p.price.toFixed(2) }}</p>
                <button @click="add(p)">Add</button>
            </div>
        </div>

        <ul class="cartList">
            <li v-for="i in cart.items" :key="i.id" class="cartItem">
                <div class="left">
                    <div class="title">{{ i.name }}</div>
                    <div class="muted">${{ i.price.toFixed(2) }} × {{ i.quantity }}</div>
                </div>
                <div class="right">
                    <input type="number" min="0" step="1" :value="i.quantity"
                        @input="cart.setQuantity(i.id, ($event.target).value)" />
                    <button class="small" @click="cart.removeFromCart(i.id)">Remove</button>
                </div>
            </li>

            <li v-if="cart.items.length === 0" class="empty">Cart is empty.</li>
        </ul>

        <div class="actions">
            <button :disabled="cart.items.length === 0" @click="cart.clearCart">Clear cart</button>
        </div>
    </section>
</template>

<style scoped>
.panel {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 16px;
}

.summary {
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

.grid {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 12px;
    margin-top: 14px;
}

.product {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 12px;
    display: flex;
    flex-direction: column;
    gap: 6px;
}

.name {
    font-weight: 700;
    margin: 0;
}

.price {
    color: #6b7280;
    margin: 0;
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

.cartList {
    list-style: none;
    padding: 0;
    margin: 14px 0 0;
    display: flex;
    flex-direction: column;
    gap: 10px;
}

.cartItem {
    border: 1px solid #e5e7eb;
    border-radius: 12px;
    padding: 10px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
}

.left {
    display: flex;
    flex-direction: column;
    gap: 4px;
}

.right {
    display: flex;
    align-items: center;
    gap: 10px;
}

input {
    width: 88px;
    padding: 8px 10px;
    border-radius: 10px;
    border: 1px solid #e5e7eb;
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

@media (max-width: 900px) {
    .grid {
        grid-template-columns: 1fr;
    }
}
</style>
