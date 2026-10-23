<script setup lang="ts">
import { onMounted } from 'vue';
import axios from 'axios';
import Notification from '@/components/Reusable/Notification/Notification.vue';
import { useNotificationsList } from '@/stores/User/notifications';

// DEFINE PROPS
const props = defineProps(["isOpen", "handler"]);

// STORE DECLARATION
const notifications = useNotificationsList();

// HANDLE GET NOTIFICATIONS FROM SERVER
const getNotifications = async () => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getNotifications`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // },
        withCredentials: true,
    }).then(function (res) {
        notifications.setNotifications(res.data.notifications);
    }).catch(function (err) {
        console.log(err);
    });
};

// HANDLE DELETE NOTIFICATIONS
const handleDeleteNotification = (id: string) => {
    // LOCAL
    notifications.deleteNotification(id);

    // SERVER
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/deleteNotification`,
        data: JSON.stringify({
            "id": id
        }),
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
    }).catch(function (err) {
        console.log(err);
    });
}

onMounted(() => {
    getNotifications();
    setInterval(() => getNotifications(), 60 * 1000);
});

</script>

<template>
    <div class="notification__overlay" @click="props.handler.handleOpenNotification"></div>
    <div class="notification__content" :class="props.isOpen ? ' animation' : ''">
        <div class="notification__content__left">
            <button @click="props.handler.handleOpenNotification" class="notification__content__left__el">
                <img src="@/assets/svg/Notifications/closeMenu.svg" alt="" class="notification__content__left__el__img">
            </button>
        </div>
        <div class="notification__content__right">
            <h3 class="notification__content__right__title">notifications</h3>
            <div class="notification__content__right__box__scroll">
                <div class="notification__content__right__box">
                    <Notification v-for="item in notifications.$state" :item="item" :handler="handleDeleteNotification" />
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.notification {
    &__overlay {
        z-index: 1000;
        position: fixed;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background: rgba(0, 0, 0, 0.8);
        cursor: pointer;
    }

    &__content {
        position: absolute;
        z-index: 10000;
        right: 0;
        top: 1.8rem;
        width: 49.65rem;
        height: calc(100vh - 3.6rem);
        background: #0F0F0F;
        display: grid;
        grid-template-columns: 6.08rem auto;

        transform: translateX(100%);
        transition: .3s;

        &.animation {
            transform: translateX(0);
        }

        &__left {
            display: grid;
            border-left: 1px solid #333333;
            border-radius: 12px 0px 0px 12px;
            border-bottom: 1px solid #333333;
            grid-template-rows: 5.05rem auto;

            &__el {
                border-top: 1px solid #333333;
                border-bottom: 1px solid #333333;
                border-radius: 12px 0px 0px 0px;
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;

                &__img {
                    height: 2.75rem;
                    width: 2.75rem;
                }
            }
        }

        &__right {
            display: flex;
            flex-direction: column;
            border: 1px solid #333333;
            border-right: none;
            padding: 0 3rem;
            height: calc(100vh - 3.6rem);

            &__title {
                margin-top: 2.82rem;
                font-family: 'Bison';
                font-weight: 300;
                font-size: 5.5rem;
                line-height: 98%;
                color: #FFFFFF;
            }

            &__box {
                margin: 2.05rem 0;
                margin-right: 1rem;
                display: flex;
                flex-direction: column;
                gap: 1.71rem;

                &__scroll {
                    overflow: auto;
                }
            }
        }
    }
}
</style>