import { defineStore } from "pinia";

interface State {
    profit: number;
    sales: number;
    accounts: number;
}

export const useAdminStatistics = defineStore({
    id: 'adminStatistics',

    state: (): State => ({
        profit: 0,
        sales: 0,
        accounts: 0
    }),

    actions: {
        setStatistics(profit: number, sales: number, accounts: number): void {
            this.$state.profit = profit;
            this.$state.sales = sales;
            this.$state.accounts = accounts;
        }
    }
})