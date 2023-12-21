import { defineStore } from 'pinia';
import type { Announcement } from '@/interfaces/announcement';

interface State {
    announcements: Announcement[];
    isEditedIndicator: boolean;
}

export const useAdminAnnouncements = defineStore({
    id: 'adminAnnouncements',

    state: (): State => ({
        announcements: [],
        isEditedIndicator: false,
    }),

    actions: {
        setAnnouncements(announcements: Announcement[]): void {
            this.$state.announcements = announcements;
        },
        deleteAnnouncement(id: number | string): void {
            const index = this.$state.announcements.findIndex(el => {
                return el.id === id;
            });
            this.$state.announcements.splice(index, 1);
        },
        editAnnouncement(
            id: number | string, title: string, 
            description: string, preview: string | null,
            start: string, end: string
            ): void {
            this.$state.announcements.forEach(el => {
                if (el.id === id) {
                    el.title = title;
                    el.description = description;
                    el.preview = preview;
                    el.start = start;
                    el.end = end;
                }
            });
        }
    }
})