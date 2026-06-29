import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {

    state: () => ({
        name: 'Vicheka hav',
        age: 19,
        email: 'vichekahav@gmail.com'
    }),

    actions: {

        updateName(newName) {
            this.name = newName
        },

        updateAge(newAge) {
            this.age = newAge
        },

        updateEmail(newEmail) {
            this.email = newEmail
        }

    }

})