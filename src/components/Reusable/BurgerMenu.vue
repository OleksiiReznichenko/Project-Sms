<script setup lang="ts">
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useUserStore } from '@/stores/user';

// DEFINE PROPS
const props = defineProps(["isOpen", "handlers"]);

const user = useUserStore();

const router = useRouter();

// HANDLE LOGOUT
const handleLogout = () => {
    router.push({ name: 'home' });

    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/logout`,
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
        user.logout();
        //  console.log(res);
    }).catch(function (err) {
        console.log(err);
    });
}

</script>

<template>
    <div class="menu__overlay" @click="props.handlers.handleOpenMenu"></div>
    <div class="menu__content" :class="props.isOpen ? ' animation' : ''">
        <div class="menu__content__left">
            <div class="menu__content__left__el first">
                <div class="menu__content__left__el__wrapper">
                    <div class="menu__content__left__el__info">
                        <span v-if="user.auth && 'email' in user.auth" class="menu__content__left__el__info__username">
                        {{ user.auth?.email.email }}</span>
                        <span v-else-if="user.auth && 'telegram' in user.auth" class="menu__content__left__el__info__username">
                        {{ `@${user.auth?.telegram.username}` }}</span>
                        <span class="menu__content__left__el__info__money">${{ user.balance }}</span>
                    </div>
                    <button @click="props.handlers.handleOpenDepositPopup"
                        class="menu__content__left__el__button">Deposit</button>
                </div>
            </div>
            <div class="menu__content__left__el second">
                <nav class="menu__content__left__el__wrapper">
                    <router-link @click="props.handlers.handleOpenMenu" to="/main/profile"
                        class="menu__content__left__el__nav-link">Home</router-link>
                    <router-link @click="props.handlers.handleOpenMenu" to="/main/FAQ"
                        class="menu__content__left__el__nav-link">Guideline</router-link>
                    <router-link @click="props.handlers.handleOpenMenu" to="/main/transactions"
                        class="menu__content__left__el__nav-link">Transactions</router-link>
                    <a href="https://quicksms.io/" target="_blank" class="menu__content__left__el__nav-link">ABOUT QUICK</a>
                </nav>
            </div>
            <div class="menu__content__left__el third">
                <div class="menu__content__left__el__wrapper bottom">
                    <div class="menu__content__left__el__social">
                        <a href="https://discord.com/invite/sms" target="_blank"
                            class="menu__content__left__el__social__el">
                            <img src="@/assets/svg/BurgerMenu/discord.svg" alt="" class="menu__content__left__el__social__el__svg">
                            <span class="menu__content__left__el__social__el__text">discord</span>
                        </a>
                        <a href="https://t.me/QuickSMS_Bot" target="_blank" class="menu__content__left__el__social__el">
                            <img src="@/assets/svg/BurgerMenu/telegram.svg" alt="" class="menu__content__left__el__social__el__svg">
                            <span class="menu__content__left__el__social__el__text">telegram</span>
                        </a>
                    </div>
                    <button @click="handleLogout" class="logout-btn">Exit</button>
                </div>
            </div>
        </div>
        <div class="menu__content__right">
            <button @click="props.handlers.handleOpenMenu" class="menu__content__right__el first">
                <img src="@/assets/svg/BurgerMenu/cross.svg" alt="" class="menu__content__right__el__img">
            </button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.menu {

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
        position: fixed;
        z-index: 10000;
        left: 0;
        top: 1.8rem;
        width: 49.65rem;
        min-height: calc(100vh - 3.6rem);
        background: #0F0F0F;
        display: grid;
        grid-template-columns: auto 6.08rem;
        transform: translateX(-100%);
        transition: .3s;

        &.animation {
            transform: translateX(0);
        }


        .logout-btn {
            align-self: center;
            font-family: 'Bison';
            font-style: normal;
            font-weight: 300;
            font-size: 2.05rem;
            line-height: 2.5rem;
            color: #000000;
            background: #C04A4A;
            border-radius: 8px 8px 20px 8px;
            padding: 0.5rem 3rem;

            &:hover {
                opacity: 0.8;
            }
        }

        &__left {
            display: grid;
            grid-template-rows: 17.1rem auto 10.5rem;

            &__el {
                border-top: 1px solid #333333;
                border-bottom: 1px solid #333333;
                padding-left: 6rem;
                display: flex;
                flex-direction: column;
                justify-content: center;

                &__wrapper.bottom {
                    justify-content: space-between;
                    padding-right: 6rem;
                }

                &.first>&__wrapper {
                    background: #0F0F0F;
                    border: 1px solid #333333;
                    border-radius: 7px;
                    padding: 2.05rem 1.71rem;
                    margin-right: 4.3rem;
                    display: flex;
                    gap: 7.5rem;
                }

                &.first>div &__info {
                    display: flex;
                    flex-direction: column;

                    &__username {
                        font-family: 'Bison';
                        font-weight: 300;
                        font-size: 1.36rem;
                        line-height: 98%;
                        color: #7D808C;
                        white-space: nowrap;
                        word-wrap: break-word;
                        overflow: hidden;
                        text-overflow: ellipsis;
                        max-width: 8rem;
                    }

                    &__money {
                        font-family: 'Bison';
                        font-weight: 300;
                        font-size: 4.1rem;
                        line-height: 98%;
                        color: #FFFFFF;
                    }
                }

                &.first>div &__button {
                    align-self: center;
                    font-family: 'Bison';
                    font-style: normal;
                    font-weight: 300;
                    font-size: 2.05rem;
                    line-height: 2.5rem;
                    color: #000000;
                    background: #C0FB50;
                    border-radius: 8px 8px 20px 8px;
                    padding: 0.5rem 3rem;

                    &:hover {
                        opacity: 0.8;
                    }
                }

                &.second {
                    border: none;
                    // justify-content: flex-start;
                    justify-content: center;

                    &>nav {
                        display: flex;
                        flex-direction: column;
                        // margin-top: 7.7rem;
                    }
                }

                &.second>nav &__nav-link {
                    font-family: 'Bison';
                    font-weight: 300;
                    font-size: 5.5rem;
                    line-height: 98%;
                    color: #FFFFFF;
                    align-self: flex-start;
                    padding: 0.9rem 1.71rem;
                    border-radius: 8px 8px 20px 8px;
                    position: relative;
                    overflow: hidden;

                    &::before {
                        content: "";
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: #C0FB50;
                        z-index: -1;
                        border-radius: 8px 8px 20px 8px;
                        transition: all .3s;
                        opacity: 0;
                    }

                    &:hover {
                        color: #000000;

                        &::before {
                            opacity: 1;
                        }
                    }
                }


                &.third>div {
                    align-items: center;
                    display: flex;
                    gap: 5.5rem;
                }

                &.third>div &__connect {
                    align-self: flex-start;
                    font-family: 'Bison';
                    font-weight: 300;
                    font-size: 1.54rem;
                    line-height: 98%;
                    color: #FFFFFF;
                }

                &.third>div &__social {
                    display: flex;
                    flex-direction: column;
                    gap: 1.71rem;

                    &__el {
                        display: flex;
                        gap: 1rem;
                        align-items: center;

                        &:hover {
                            &>span {
                                opacity: 0.8;
                            }
                        }

                        &__svg {
                            height: 2.05rem;
                            width: 2.05rem;
                        }

                        &__text {
                            font-family: 'Bison';
                            font-weight: 300;
                            font-size: 1.71rem;
                            line-height: 98%;
                            color: #FFFFFF;
                        }
                    }
                }
            }
        }

        &__right {
            display: grid;
            grid-template-rows: 5.05rem auto;
            border-radius: 0px 12px 12px 0px;
            border: 1px solid #333333;

            &__el {
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 1px solid #333333;
                cursor: pointer;

                &__img {
                    height: 2.75rem;
                    width: 2.75rem;
                }
            }
        }
    }
}
</style>