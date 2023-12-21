import { defineStore } from 'pinia';

interface State {
    id: number,
    status: string,
    auth: Auth | AuthTg | null,
    balance: number,
    referral: Referral,
    date: number,
    stats: Stats
}

interface Stats {
    active: number,
    total: number
}

interface Auth {
    email: {
        email: string
    }
}

interface AuthTg {
    telegram: {
        first_name: string,
        id: number,
        username: string
    }
}

interface Referral {
    link: string,
    uses: number,
    discount: number
}

function createInitialState(): State {
    return {
        id: 0,
        status: '',
        auth: null,
        balance: 0,
        referral: {
            link: '',
            uses: 0,
            discount: 0
        },
        date: 0,
        stats: {
            active: 0,
            total: 0
        }
    }
}

export const useUserStore = defineStore({
    id: 'userStore',

    state: (): State => createInitialState(),

    actions: {
        setUser(list: State): void {
            Object.assign(this.$state, list);
        },
        logout(): void {
            Object.assign(this.$state, createInitialState());
        }
    }
})