import axios from 'axios';
import { adminAccount, demoAnnouncements, demoCoupons, demoPopular, demoTransactions, demoUsers } from './data';

// Uses the existing Axios API calls but never sends them over the network in demo mode.
// Everything is fictional and resets on a page reload.
let nextId = 200;
function readData(raw: any): any {
    if (!raw) return {};
    if (raw instanceof FormData) {
        const data = raw.get('data');
        let parsed: any = {};
        try { parsed = data ? JSON.parse(String(data)) : {}; } catch {}
        return { ...parsed, id: raw.get('id') ?? parsed.id };
    }
    if (typeof raw === 'string') { try { return JSON.parse(raw); } catch { return {}; } }
    return raw;
}
function asTimestamp(value: unknown): string {
    const raw = String(value ?? Date.now());
    const parsed = Number(raw);
    return String(Number.isFinite(parsed) && raw !== '' ? parsed : (Date.parse(raw) || Date.now()));
}
function graph(period: string, scale: number) {
    const labels = period === 'year'
        ? ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
        : ['1', '5', '10', '15', '20', '25', '30'];
    return { labels, data: labels.map((_, i) => Math.round((8 + i * 2 + (i % 3) * 4) * scale)) };
}
function handle(urlString: string, raw: any): any {
    const url = new URL(urlString || '/', 'https://demo.invalid');
    const endpoint = url.pathname.split('/').filter(Boolean).pop() || '';
    const data = readData(raw);
    const id = Number(data.id || url.searchParams.get('id'));
    const ok = { error: false };
    switch (endpoint) {
        case 'getCountries':
            return { countries: [
                { ID: 1, name: 'United States', region: 'North America', short_name: 'US' },
                { ID: 2, name: 'United Kingdom', region: 'Europe', short_name: 'GB' },
                { ID: 3, name: 'Canada', region: 'North America', short_name: 'CA' },
                { ID: 4, name: 'Germany', region: 'Europe', short_name: 'DE' },
                { ID: 5, name: 'Norway', region: 'Europe', short_name: 'NO' }
            ] };
        case 'getServices': {
            const sampleServices = [
                { ID: 101, name: 'Google' },
                { ID: 102, name: 'Discord' },
                { ID: 103, name: 'Telegram' },
                { ID: 104, name: 'Instagram' },
                { ID: 105, name: 'Steam' },
                { ID: 106, name: 'WhatsApp' },
                { ID: 107, name: 'Microsoft' },
                { ID: 108, name: 'TikTok' }
            ];
            const countryId = Number(url.searchParams.get('country') || 1);
            const byCountry: Record<number, number[]> = {
                1: [101, 102, 103, 104, 105, 106, 107, 108],
                2: [101, 102, 103, 104, 105, 106, 107],
                3: [101, 102, 103, 104, 105, 107],
                4: [101, 102, 103, 105, 107],
                5: [101, 102, 103, 105, 106]
            };
            const allowedIds = byCountry[countryId] || byCountry[1];
            return { services: sampleServices.filter(service => allowedIds.includes(service.ID)) };
        }
        case 'getAccount': return { account: url.searchParams.has('id')
            ? demoUsers.find(u => u.id === id) || null : adminAccount };
        case 'getAccounts': return { accounts: demoUsers };
        case 'getTransactions': return { transactions: demoTransactions };
        case 'getCoupons': return { coupons: demoCoupons };
        case 'getAnnouncements': return { announcements: demoAnnouncements };
        case 'getMostPopular': return { products: demoPopular };
        case 'month':
        case 'year':
            if (url.pathname.includes('/getStats/')) return {
                profit: { value: 1248 },
                transactions: { value: 318, chart: graph(endpoint, 7) },
                users: { value: demoUsers.length, chart: graph(endpoint, 3) }
            };
            break;
        case 'getSearchData': {
            const search = (url.searchParams.get('search') || '').toLowerCase();
            if (url.searchParams.get('category') === 'accounts') return { data: demoUsers.filter(u =>
                String(u.id).includes(search) || u.auth.email.email.toLowerCase().includes(search)) };
            return { data: demoTransactions.filter(t =>
                String(t.id).includes(search) || t.email.toLowerCase().includes(search)) };
        }
        case 'createAccount': {
            const user = {
                id: ++nextId, status: 'user', balance: 0, date: Date.now(),
                auth: { email: { email: String(data.email || `sample${nextId}@example.com`) } },
                referral: { link: '', uses: 0, discount: 0 },
                stats: { active: 0, total: 0 }, orders: []
            };
            demoUsers.unshift(user); return { ...ok, account: user };
        }
        case 'editAccount': {
            const user = demoUsers.find(u => u.id === id);
            if (!user) return { error: true, message: 'Demo user not found' };
            if (data.data?.status) user.status = data.data.status;
            if (data.data?.balance !== undefined) user.balance = Number(data.data.balance);
            if (data.data?.email) user.auth.email.email = String(data.data.email);
            // Passwords are never saved or used in demo mode.
            return ok;
        }
        case 'deleteAccount': {
            const index = demoUsers.findIndex(u => u.id === id);
            if (index !== -1) demoUsers.splice(index, 1);
            return ok;
        }
        case 'confirmTransaction': {
            const item = demoTransactions.find(t => t.code === data.code || t.uid === data.uid);
            if (item) item.status = 1;
            return ok;
        }
        case 'addCoupon':
            demoCoupons.unshift({ id: ++nextId, name: String(data.name || 'DEMO'),
                discount: { type: data.discount?.type === '$' ? '$' : '%',
                    value: Number(data.discount?.value || 0) }, limit: Number(data.limit || 0) });
            return ok;
        case 'editCoupon': {
            const item = demoCoupons.find(c => c.id === id);
            if (item) {
                item.name = String(data.name || item.name);
                item.discount.value = Number(data.discount?.value ?? item.discount.value);
                item.discount.type = data.discount?.type === '$' ? '$' : '%';
                item.limit = Number(data.limit ?? item.limit);
            }
            return ok;
        }
        case 'deleteCoupon': {
            const i = demoCoupons.findIndex(c => c.id === id);
            if (i !== -1) demoCoupons.splice(i, 1); return ok;
        }
        case 'addAnnouncement':
            demoAnnouncements.unshift({ id: ++nextId, title: String(data.title || 'Demo announcement'),
                description: String(data.description || ''), preview: null,
                start: asTimestamp(data.start), end: asTimestamp(data.end) });
            return ok;
        case 'editAnnouncement': {
            const item = demoAnnouncements.find(a => a.id === id);
            if (item) {
                item.title = String(data.title || item.title);
                item.description = String(data.description || item.description);
                item.start = asTimestamp(data.start || item.start);
                item.end = asTimestamp(data.end || item.end);
            }
            return ok;
        }
        case 'deleteAnnouncement': {
            const i = demoAnnouncements.findIndex(a => a.id === id);
            if (i !== -1) demoAnnouncements.splice(i, 1); return ok;
        }
        case 'logout': return ok;
    }
    // Fail closed: unknown API operations cannot accidentally contact real services.
    return { error: true, message: `This operation is not available in the portfolio demo (${endpoint}).` };
}

export function installDemoApi(): void {
    axios.defaults.adapter = async (config: any): Promise<any> => {
        const responseData = handle(String(config.url || ''), config.data);
        return { data: responseData, status: 200, statusText: 'OK', headers: {}, config };
    };
}
