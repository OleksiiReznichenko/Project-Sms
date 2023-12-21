import { defineStore } from 'pinia'

interface cartInfo {
    country: number,
    service: number,
    count: number,
    name: string,
    price: number
}

export const useCartList = defineStore({
    id: 'cartList',

    state: (): cartInfo[] => ([

    ]),
    actions: {
        changeCart(country: number, service: number, count: number, name: string): void {
            if (count === 0) {
                const indexToRemove = this.$state.findIndex(
                    (item) => item.country === country && item.service === service
                );

                if (indexToRemove !== -1) {
                    this.$state.splice(indexToRemove, 1);
                }
            } else {
                const itemToUpdate = this.$state.find(
                    (item) => item.country === country && item.service === service
                );

                if (itemToUpdate) {
                    itemToUpdate.count = count;
                } else {
                    this.$state = [
                        ...this.$state,
                        {
                            country: country,
                            service: service,
                            count: count,
                            name: name,
                            price: NaN
                        },
                    ];
                }
            }
        },
        setPrice(country: number, service: number, price: number): void {
            const itemToUpdate = this.$state.find(
                (item) => item.country === country && item.service === service
            );

            if (itemToUpdate) {
                itemToUpdate.price = price;
            }
        },
        getSevicePrice(country: number, service: number): number | undefined {
            const itemToUpdate = this.$state.find(
                (item) => item.country === country && item.service === service
            );

            if (!itemToUpdate) return undefined;

            return itemToUpdate.price;
        },
        getTotalPrice(): number {
            return this.$state.reduce((total, item) => {
                return total + (item.count * item.price);
            }, 0);
        },
        clearCart(): void {
            this.$state.splice(0);
        },
    },
});
