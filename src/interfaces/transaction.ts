export interface Transaction {
    id: number | string;
    status: 0 | 1;
    orders: [
        {
            type: 'product' | 'deposit';
            amount?: number;
            country?: {
                id: number | string;
                name: string;
                region: string;
                short_name: string;
            };
            service?: {
                id: number | string;
                name: string;
            };
        }
    ];
    user: number | string;
    email: string;
    code: string;
    uid: string;
    coupon: number | string | null;
    method: string;
    amount: number | string;
    date: number | string;
}