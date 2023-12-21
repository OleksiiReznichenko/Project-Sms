export interface Announcement {
    id: number | string;
    title: string;
    description: string;
    preview: string | null;
    start: string;
    end: string;
}