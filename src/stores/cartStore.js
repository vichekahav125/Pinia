import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {

    state: () => ({
        products: [
            { id: 1, name: 'Apple', price: 2 },
            { id: 2, name: 'Banana', price: 1 },
            { id: 3, name: 'Orange', price: 3 }
        ],

        cart: []
    }),

    getters: {

        totalItems: (state) => state.cart.length,

        totalPrice: (state) =>
            state.cart.reduce((sum, item) => sum + item.price, 0)

    },

    actions: {

        addToCart(product) {
            this.cart.push(product)
        },

        removeFromCart(index) {
            this.cart.splice(index, 1)
        },

        clearCart() {
            this.cart = []
        }

    }

})