interface Sms {
    sms: string;
    full_sms: string;
    expiration: number;
}

export interface Order {
    sms: Sms[];
    data: {
        pool: string,
        number: number | string;
        country: string;
        message: string;
        service: string;
        order_id: string;
        expires_in: number;
    };
}