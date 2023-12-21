<script setup lang="ts">
import { storeToRefs } from 'pinia';
import { useBaseStore } from '@/stores/index';
import { useUserStore } from '@/stores/user';
import { ref } from 'vue';
import DepositPopup from '../Main/DepositPopup.vue';

const baseStore = useBaseStore();
const { mobileNavMenuOpenedIndicator } = storeToRefs(baseStore);

const user = useUserStore();

const isDepositPopupOpen = ref(false);

const handleOpenDepositPopup = () => {
    isDepositPopupOpen.value = !isDepositPopupOpen.value;
}

</script>

<template>
    <DepositPopup :isOpen="isDepositPopupOpen" :handler="handleOpenDepositPopup" />
    <div class="navigation-menu mobile" :class="{'menu-closed': !mobileNavMenuOpenedIndicator}">
        <div class="inner-container">
            <button @click="baseStore.closeMobileNavMenu" class="button-back">
                <img src="@/assets/svg/navMenu/arrow.svg" alt="" class="arrow">
                <span>Back</span>
            </button>
            <div class="profile-info">
                <div class="left">
                    <strong class="username"></strong>
                    <strong class="balance">{{ user.balance }}</strong>
                </div>
                <button @click="handleOpenDepositPopup" class="btn-green-rounded button-deposit">Deposit</button>
            </div>
            <ul class="links-list">
                <li class="item">
                    <router-link @click="baseStore.closeMobileNavMenu" to="/main/profile" class="link">Home</router-link>
                </li>
                <!-- <li class="item">
                    <router-link to="/" class="link">Support</router-link>
                </li> -->
                <li class="item">
                    <router-link @click="baseStore.closeMobileNavMenu" to="/main/FAQ" class="link">Guideline</router-link>
                </li>
                <li class="item">
                    <router-link @click="baseStore.closeMobileNavMenu" to="/main/transactions" class="link">Transactions</router-link>
                </li>
            </ul>
            <div class="socials">
                <a href="https://t.me/QuickSMS_Bot" target="_blank" class="social">
                    <img src="@/assets/svg/navMenu/telegram.svg" alt="" class="icon">
                    <span>Telegram</span>
                </a>
                <a href="https://discord.com/invite/sms" target="_blank" class="social">
                    <img src="@/assets/svg/navMenu/discord.svg" alt="" class="icon">
                    <span>Discord</span>
                </a>
            </div>
        </div>
        <div class="bottom-navigation">
            <ul class="list">
                <li class="item">
                    <router-link @click="baseStore.closeMobileNavMenu" to="/main/profile" class="link">
                        <img src="@/assets/svg/navMenu/navItem1.svg" alt="" class="icon">
                    </router-link>
                </li>
                <li class="item">
                    <router-link @click="baseStore.closeMobileNavMenu" to="/main/orders" class="link">
                        <img src="@/assets/svg/navMenu/navItem2.svg" alt="" class="icon">
                    </router-link>
                </li>
                <li class="item">
                    <router-link @click="baseStore.closeMobileNavMenu" to="/main/services" class="link">
                        <img src="@/assets/svg/navMenu/navItem3.svg" alt="" class="icon">
                    </router-link>
                </li>
                <li class="item">
                    <router-link @click="baseStore.closeMobileNavMenu" to="/main/transactions" class="link">
                        <img src="@/assets/svg/navMenu/navItem4.svg" alt="" class="icon">
                    </router-link>
                </li>
                <li class="item">
                    <router-link @click="baseStore.closeMobileNavMenu" to="/main/FAQ" class="link">
                        <img src="@/assets/svg/navMenu/navItem5.svg" alt="" class="icon">
                    </router-link>
                </li>
            </ul>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.menu-closed {
    transform: translateY(110vh);
}
.navigation-menu {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: var(--app-height);
    z-index: 90000;
    background-color: #131313;
    padding-top: 70px;
    padding-bottom: 70px;
    overflow-y: scroll;
    transition: all .5s;

    @media only screen and (min-height: 700px) {
        @include flex-center;
    }

    .inner-container {
        @include width-restriction;

        .button-back {
            display: flex;
            align-items: center;
            margin-bottom: 2.5rem;

            .arrow {
                width: 7px;
                margin-right: 16px;
                margin-bottom: -1px;
            }

            span {
                font-family: Bison;
                font-size: 23px;
                line-height: .9;
            }
        }

        .profile-info {
            display: flex;
            align-items: center;
            justify-content: space-between;
            padding: 23px 20px 21px;
            background-color: #0F0F0F;
            border: 1px solid #333333;
            border-radius: 7px;
            margin-bottom: 30px;

            .left {
                display: flex;
                flex-direction: column;
                font-family: Bison;

                .username {
                    color: var(--color-grey-2);
                    font-size: 16px;
                    display: inline-block;
                    margin-bottom: 4px;
                }

                .balance {
                    font-size: 46px;
                    line-height: .9;
                }
            }

            .button-deposit {
                font-size: 23px;
                padding: 6px 20px;
            }
        }

        .links-list {
            margin-bottom: 40px;

            .item {

                &:not(:last-of-type) {
                    margin-bottom: 7px;
                }

                .link {
                    font-family: Bison;
                    font-size: 60px;
                    line-height: 1;
                }
            }
        }

        .socials {
            display: flex;
            align-items: center;
            justify-content: center;

            .social {
                display: flex;
                align-items: center;

                &:not(:last-of-type) {
                    margin-right: 23px;
                }

                .icon {
                    width: 23px;
                    margin-right: 6px;
                }

                span {
                    font-family: Bison;
                    font-size: 20px;
                }
            }
        }
    }

    .bottom-navigation {
        position: fixed;
        bottom: -2px;
        left: 0;
        width: 100%;
        height: 50px;
        background-color: #0F0F0F;
        border-top: 1px solid #333333;

        .list {
            display: flex;
            justify-content: center;
            height: 100%;

            .item {
                height: 100%;
                width: 55px;

                &:not(:last-of-type) {
                    border-right: 1px solid #333
                }

                .link {
                    @include flex-center;
                    height: 100%;
                    width: 100%;

                    .icon {
                        width: 24px;
                    }
                }
            }
        }
    }
}
</style>