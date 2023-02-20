import { defineStore } from 'pinia'

export const useStore = defineStore('main', {

    state: () => ({
        user: '',
    }),
    actions: {
        getUser(n) {
            this.user = n
        }
    }
})