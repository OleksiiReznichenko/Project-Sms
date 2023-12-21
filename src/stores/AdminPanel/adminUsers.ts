import { defineStore } from "pinia";
import type { User } from '@/interfaces/user';

interface State {
    users: User[];
}

export const useAdminUsers = defineStore({
    id: 'adminUsers',

    state: (): State => ({
        users: []
    }),

    actions: {
        setUsers(users: User[]): void {
            this.$state.users = users;
        }
    }
})