// All demo records are fictional and live in browser memory only.
const now = Date.now();
const day = 86_400_000;
const date = (daysAgo: number) => now - daysAgo * day;

export const adminAccount = {
    id: 1000, status: 'admin', balance: 0,
    auth: { email: { email: 'demo.admin@example.com' } },
    referral: { link: '', uses: 0, discount: 0 },
    date: date(180), stats: { active: 0, total: 0 }
};

export const demoUsers = [
    ['alex@example.com', 'user', 25.50, 12, 46, 140],
    ['jordan@example.com', 'user', 14.20, 4, 21, 92],
    ['sam@example.com', 'user', 82.30, 7, 39, 76],
    ['taylor@example.com', 'user', 9.99, 2, 18, 50],
    ['casey@example.com', 'banned', 0, 0, 11, 35],
    ['morgan@example.com', 'user', 31.75, 5, 27, 12],
].map((entry, i) => ({
    id: i + 1, status: entry[1] as string,
    auth: { email: { email: entry[0] as string } },
    balance: entry[2] as number, date: date(entry[5] as number),
    referral: { link: '', uses: i + 1, discount: 0 },
    stats: { active: entry[3] as number, total: entry[4] as number },
    orders: []
}));

export const demoTransactions = [
    ['alex@example.com', 15.20, 1, 'deposit'],
    ['jordan@example.com', 8.50, 1, 'product'],
    ['sam@example.com', 22.10, 0, 'deposit'],
    ['taylor@example.com', 5.70, 1, 'product'],
    ['morgan@example.com', 12.80, 0, 'deposit'],
].map((entry, i) => ({
    id: 100 + i, status: entry[2] as 0 | 1, user: (i % 6) + 1,
    email: entry[0] as string, amount: entry[1] as number,
    code: `DEMO-${100 + i}`, uid: `demo-${i + 1}`, coupon: null,
    method: 'Demo balance', date: date(i * 3),
    orders: [{ type: entry[3] as 'product' | 'deposit', amount: entry[1] as number,
        country: { id: 1, name: 'United States', short_name: 'US', region: 'North America' },
        service: { id: 1, name: 'Telegram' } }]
}));

export const demoCoupons = [
    { id: 1, name: 'WELCOME10', discount: { type: '%' as const, value: 10 }, limit: 250 },
    { id: 2, name: 'DEMO5', discount: { type: '$' as const, value: 5 }, limit: 100 },
    { id: 3, name: 'SPRING15', discount: { type: '%' as const, value: 15 }, limit: 75 }
];

export const demoAnnouncements = [
    { id: 1, title: 'Welcome to the demo', description: 'Sample announcement for the restored frontend. No SMS messages or payments are processed.', preview: null, start: String(date(7)), end: String(date(-30)) },
    { id: 2, title: 'Dashboard preview', description: 'Explore the original admin interface using fictional records.', preview: null, start: String(date(2)), end: String(date(-60)) }
];

export const demoPopular = [
    ['Telegram', 'United States', 'US', 143],
    ['Discord', 'United Kingdom', 'GB', 112],
    ['Google', 'Germany', 'DE', 87],
    ['WhatsApp', 'France', 'FR', 61],
].map((entry, i) => ({
    id: i + 1, country: { ID: i + 1, name: entry[1] as string, short_name: entry[2] as string, region: 'Demo region' },
    service: { ID: i + 1, name: entry[0] as string },
    sales: entry[3] as number, date: null
}));
