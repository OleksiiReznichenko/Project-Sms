import { defineStore } from 'pinia';

interface Product {
    id: number | string;
    country: {
        ID: number | string;
        name: string;
        short_name: string;
        region: string;
    };
    service: {
        ID: number | string;
        name: string;
    };
    sales: number;
    date: null | string | number;
}

export const useAdminPopularProducts = defineStore({
    id: 'adminPopularProducts',

    state: (): Product[] => ([
        // {
        //     id: 1,
        //     country: {
        //         ID: 1,
        //         name: 'United States',
        //         short_name: 'US',
        //         region: 'Americas'
        //     },
        //     service: {
        //         ID: 1,
        //         name: 'Discord'
        //     },
        //     sales: 2
        // }
    ]),

    actions: {
        setPopularProducts(products: Product[]): void {
            this.$state = products;
        }
    }
})