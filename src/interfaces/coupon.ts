export interface Coupon {
    id: number | string;
    name: string;
    discount: {
        type: '%' | '$';
        value: number;
    };
    limit: number;
}