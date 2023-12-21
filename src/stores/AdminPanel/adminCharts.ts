import { defineStore } from 'pinia';
import type { ChartInfo } from '@/interfaces/chartInfo';


interface State {
    chartUsers: ChartInfo;
    chartPayments: ChartInfo;
}

export const useAdminCharts = defineStore({
    id: 'adminCharts',

    state: (): State => ({
        chartUsers: {
            data: [],
            labels: [],
        },
        chartPayments: {
            data: [],
            labels: [],
        }
    }),

    actions: {
        setUsersChart(chartInfo: ChartInfo): void {
            this.$state.chartUsers = chartInfo;
        },
        setPaymentsChart(chartInfo: ChartInfo): void {
            this.$state.chartPayments = chartInfo;
        },
    }
})