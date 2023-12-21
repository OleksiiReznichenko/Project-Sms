import { defineStore } from "pinia";
import type { Transaction } from '@/interfaces/transaction';

interface State {
    transactions: Transaction[];
}

export const useAdminTransactions = defineStore({
    id: 'adminTransactions',

    state: (): State => ({
        transactions: []
    }),

    actions: {
        setTransactions(transactions: Transaction[]): void {
            this.$state.transactions = transactions;
        },
        confirmTransaction(id: number | string): void {
            this.$state.transactions.forEach(el => {
                if (el.id === id) {
                    el.status = 1;
                }
            });
        }
    }
})