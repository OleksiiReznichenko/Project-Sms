import type { Order } from '@/interfaces/order';

export interface User {
    id: number | string;
    status: 'user' | 'admin' | 'banned';
    auth: {
        email?: {
            email: string;
        };
        telegram?: {
            first_name: string | null;
            id: number | string;
            username: string | null;
        };
    };
    balance: number | string;
    referral: {
        link: string;
        uses: number;
        discount: number;
    } | null;
    date: number | string;
    orders?: Order[];
    stats?: {
        active: number;
        total: number;
    };
}