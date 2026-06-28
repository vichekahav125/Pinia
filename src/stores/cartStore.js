import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    itemCount: (state) => state.items.reduce((sum, i) => sum + i.quantity, 0),
    subtotal: (state) => state.items.reduce((sum, i) => sum + i.price * i.quantity, 0),
  },
  actions: {
    addToCart(product) {
      const id = product?.id ?? 'unknown'
      const price = Number(product?.price ?? 0)
      const name = product?.name ?? 'Product'
      const existing = this.items.find((i) => i.id === id)
      if (existing) {
        existing.quantity += 1
        return
      }
      this.items.push({
        id,
        name,
        price,
        quantity: 1,
      })
    },
    removeFromCart(id) {
      this.items = this.items.filter((i) => i.id !== id)
    },
    setQuantity(id, quantity) {
      const qty = Number(quantity)
      const item = this.items.find((i) => i.id === id)
      if (!item) return
      if (!Number.isFinite(qty) || qty <= 0) {
        this.removeFromCart(id)
        return
      }
      item.quantity = qty
    },
    clearCart() {
      this.items = []
    },
  },
})

