import { defineStore } from 'pinia'

interface recaptcha {
    key: string
}

export const useRecaptchaKey = defineStore({
    id: 'recaptchaKey',

    state: (): recaptcha => ({
        key: ''
    }),
    actions: {
        setKey(string: string): void {
            this.$state = {
                key: string
            };
        },
        getKey(): string {
            return this.$state.key;
        }
    },
});
