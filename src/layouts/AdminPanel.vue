<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { computed, onBeforeMount } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const pageName = computed(() => {
    if (route.name === 'adminPanelMain') {
        return 'Main';
    } else if (route.name === 'adminPanelMain') {
        return 'Main';
    } else if (route.name === 'adminPanelUsers') {
        return 'Users';
    } else if (route.name === 'adminPanelTransactions') {
        return 'Transactions';
    } else if (route.name === 'adminPanelAnnouncements') {
        return 'Announcements';
    } else if (route.name === 'adminPanelCoupons') {
        return 'Coupons';
    } else if (route.name === 'adminPanelUsersUser') {
        return 'User';
    } 
});

const signout = (): void => {
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/logout`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // },
        withCredentials: true
    }).then(function (res) {
        // console.log(res);
        router.push('/');
    }).catch(function (err) {
        console.log(err);
    });
};

const user = useUserStore();

onBeforeMount(() => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getAccount`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // },
        withCredentials: true
    }).then(function (res) {
        user.setUser(res.data.account);
        if(user.$state.status === 'user') {
            router.push({ name: 'mainpage' });
            return;
        }
        // if(user.$state.status !== 'admin') router.push({ name: 'home' });
        console.log(res);
    }).catch(function (err) {
        console.log(err);
    });
});
</script>

<template>
    <div class="layout layout-admin-panel">
        <div class="inner-container">
            <nav class="admin-navigation">
                <ul class="list">
                    <li class="item-empty desktop"></li>
                    <li :class="{active: route.name === 'adminPanelMain'}" class="item">
                        <router-link to="/adminPanel/main" class="link">
                            <img src="@/assets/svg/AdminPanel/pageMainIcon.svg" alt="" class="icon">
                        </router-link>
                    </li>
                    <li :class="{active: route.name === 'adminPanelUsers'}" class="item">
                        <router-link to="/adminPanel/users" class="link">
                            <img src="@/assets/svg/AdminPanel/pageUsersIcon.svg" alt="" class="icon">
                        </router-link>
                    </li>
                    <li :class="{active: route.name === 'adminPanelTransactions'}" class="item">
                        <router-link to="/adminPanel/transactions" class="link">
                            <img src="@/assets/svg/AdminPanel/pageTransactionsIcon.svg" alt="" class="icon">
                        </router-link>
                    </li>
                    <li :class="{active: route.name === 'adminPanelAnnouncements'}" class="item">
                        <router-link to="/adminPanel/announcements" class="link">
                            <img src="@/assets/svg/AdminPanel/pageAnnouncementsIcon.svg" alt="" class="icon">
                        </router-link>
                    </li>
                    <li :class="{active: route.name === 'adminPanelCoupons'}" class="item">
                        <router-link to="/adminPanel/coupons" class="link">
                            <img src="@/assets/svg/AdminPanel/pageCouponsIcon.svg" alt="" class="icon">
                        </router-link>
                    </li>
                </ul>
            </nav>
            <div class="top-grey-part">
                <strong class="page-name">#{{ pageName }}</strong>
                <button @click="signout" class="btn-transparent-red button-exit">Exit</button>
            </div>
            <div class="page-container">
                <router-view v-slot="{ Component }">
                    <Transition name="fade" mode="out-in">
                        <component :is="Component" />
                    </Transition>
                </router-view>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.layout-admin-panel {


    .inner-container {
        height: 94vh;
        overflow: hidden;

        @media only screen and (min-width: 850px) {
            @include width-restriction;
            @include abs-center;
            position: fixed;
            border: 1px solid #363636;
            border-radius: .9rem;
        }
            
        @media only screen and (max-width: 850px) {
            min-height: 100vh;
            height: auto;
        }

        .page-container {
            width: 100%;
            height: 100%;
            padding-left: 6rem;
            padding-top: 4.5rem;
            overflow-y: scroll;

            @media only screen and (max-width: 850px) {
                @include width-restriction;
                overflow-y: auto;
                padding-left: 0;
                padding-top: 60px;
                padding-bottom: 9rem;
            }
        }

        .admin-navigation {
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            border-right: 1px solid #363636;
            z-index: 12100;
            background-color: #000;

            @media only screen and (max-width: 850px) {
                position: fixed;
                top: auto;
                bottom: 0;
                width: 100vw;
                border-right: none;
                border-top: 1px solid #363636;
                height: auto;
                padding-top: 0;
                background-color: #0f0f0f;
            }

            .list {

                @media only screen and (max-width: 850px) {
                    display: flex;
                    @include width-restriction;
                    justify-content: center;
                }

                .item-empty {
                    height: 4.5rem;
                    border-bottom: 1px solid #363636;
                    background-color: #0F0F0F
                }

                .item {

                    .link {
                        @include flex-center;
                        padding: 1.8rem 1.3rem;
                        border-bottom: 1px solid var(--color-grey);

                        @media only screen and (max-width: 850px) {
                            border-bottom: none;
                            border-right: 1px solid #363636;
                            padding: 1.8rem 4.3rem;

                            &:first-of-type {
                                border-left: 1px solid #363636;
                            }
                        }

                        @media only screen and (max-width: 500px) {
                            padding: 1.8rem 3rem;
                        }

                        &:hover {
                            background-color: lighten(#000, 5%);
                        }

                        .icon {
                            width: 3.5rem;
                            height: 3.5rem;
                        }
                    }
                }

                .item.active {
                    

                    .link {
                        cursor: default;
                        background-color: var(--color-green-light) !important;

                        .icon {
                            filter: brightness(10%);
                        }
                    }
                }
            }
        }

        .top-grey-part {
            background-color: #0F0F0F;
            border-bottom: 1px solid #363636;
            border-radius: .9rem .9rem 0 0;
            width: 100%;
            height: 4.5rem;
            position: absolute;
            top: 0;
            left: 0;
            z-index: 11100;

            @media only screen and (max-width: 850px) {
                @include width-restriction;
                left: 50%;
                transform: translateX(-50%);
                background-color: transparent;
                height: 50px;
            }

            .page-name {
                color: var(--color-grey-2);
                text-transform: uppercase;
                position: absolute;
                top: 55%;
                left: 7.9rem;
                transform: translateY(-50%);

                @media only screen and (max-width: 850px) {
                    left: 0;
                    font-size: 18px;
                }
            }
            
            .button-exit {
                padding: 0 5rem;
                height: 80%;
                position: absolute;
                top: 50%;
                right: 2rem;
                transform: translateY(-50%);

                @media only screen and (max-width: 850px) {
                    font-size: 16px;
                    height: auto;
                    padding: 8px 40px;
                    right: 0;
                }

                &:hover {
                    color: var(--color-white);
                    background-color: var(--color-red);
                }
            }
        }
    }
}
</style>