<script setup lang="ts">
import { useUserStore } from '@/stores/user';

// DEFINE PROPS
const props = defineProps(["handleOpenDepositPopup"]);

// USER`S STORE
const user = useUserStore();

</script>

<template>
    <div class="billing">
        <span class="billing__title desktop">Billing summary</span>
        <div class="billing__box">
            <button @click="props.handleOpenDepositPopup" class="billing__box__el">
                <img src="@/assets/svg/Main/Profile/billing1.svg" alt="" class="billing__box__el__img">
                <div class="billing__box__el__box">
                    <span class="billing__box__el__box__key">Deposit</span>
                    <span class="billing__box__el__box__value">${{ user.balance }}</span>
                </div>
            </button>
            <div class="billing__box__el">
                <img src="@/assets/svg/Main/Profile/billing2.svg" alt="" class="billing__box__el__img">
                <div class="billing__box__el__box">
                    <span class="billing__box__el__box__key">Active</span>
                    <span class="billing__box__el__box__value">{{ user.stats.active }}</span>
                </div>
            </div>
            <div class="billing__box__el">
                <img src="@/assets/svg/Main/Profile/billing3.svg" alt="" class="billing__box__el__img">
                <div class="billing__box__el__box">
                    <span class="billing__box__el__box__key">Purchased</span>
                    <span class="billing__box__el__box__value">{{ user.stats.total }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.billing {
    display: flex;
    flex-direction: column;
    justify-content: center;
    gap: 2.1rem;
    padding: 0 4rem;
    background: #171717;
    border: 1px solid #333333;
    border-radius: 7px;

    @media screen and (max-width: 1400px) {
        padding: 0 2rem;
    }

    @media screen and (max-width: 950px) {
        padding: 0 1rem;
    }

    @media screen and (max-width: 850px) {
        padding: 0;
        background-color: inherit;
        border: none;
    }

    &__title {
        font-family: 'Rubik';
        font-weight: 900;
        font-size: 1.71rem;
        line-height: 99.5%;
        text-transform: uppercase;
        color: #FFFFFF;
    }

    &__box {
        display: flex;
        justify-content: space-between;

        @media screen and (max-width: 850px) {
            gap: 26px 60px;
            flex-wrap: wrap;
            justify-content: start;
        }

        @media screen and (min-width: 500px) and (max-width: 850px) {
            justify-content: center;
        }

        &__el {
            display: flex;
            gap: 1.3rem;

            &__img {
                height: 3.85rem;
                width: 3.85rem;

                @media screen and (max-width: 850px) {
                    height: 45px;
                    width: 45px;
                }
            }

            &__box {
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                height: 100%;

                &__key {
                    font-family: 'Rubik';
                    font-weight: 400;
                    font-size: 1.36rem;
                    line-height: 99.5%;
                    color: #7D808C;

                    @media screen and (max-width: 850px) {
                        font-size: 15px;
                    }
                }

                &__value {
                    font-family: 'Rubik';
                    font-weight: 900;
                    font-size: 1.71rem;
                    line-height: 99.5%;
                    text-transform: uppercase;
                    color: #FFFFFF;

                    @media screen and (max-width: 850px) {
                        font-size: 19px;
                    }
                }
            }
        }
    }
}
</style>