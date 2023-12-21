import { defineStore } from 'pinia';
import type { Coupon } from '@/interfaces/coupon';

interface State {
    coupons: Coupon[];
}

export const useAdminCoupons = defineStore({
    id: 'adminCoupons',

    state: (): State => ({
        coupons: []
    }),

    actions: {
        setCoupons(coupons: Coupon[]): void {
            this.$state.coupons = coupons;
        },
        deleteCoupon(id: number | string): void {
            const index = this.$state.coupons.findIndex(el => {
                return el.id === id;
            });
            this.$state.coupons.splice(index, 1);
        },
        editCoupon(id: number | string, name: string, discountValue: number, limit: number): void {
            this.$state.coupons.forEach(el => {
                if (el.id === id) {
                    el.name = name;
                    el.limit = limit;
                    el.discount.value = discountValue;
                }
            });
        }
    }
})