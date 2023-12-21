import { defineStore } from 'pinia';

interface notifications {
    "id": string,
    "date": number,
    "message": string
}

export const useNotificationsList = defineStore({
    id: 'notificationsInfo',

    state: (): notifications[] => ([]),
    actions: {
        setNotifications(array: notifications[]): void {
            this.$state = array;
        },
        deleteNotification(id: string): void {
            this.$state.splice(this.$state.findIndex(notification => notification.id === id), 1);
        },
        notificationsCount(): number {
            return this.$state.length;
        }
    },
});