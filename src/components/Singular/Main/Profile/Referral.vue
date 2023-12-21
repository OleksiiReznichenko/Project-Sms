<script setup lang="ts">
import { useUserStore } from '@/stores/user';

// DEFINE PROPS
const props = defineProps(["handleCopyReferralLink", "handleCreateReferral"]);

// USER`S STORE
const user = useUserStore();

</script>

<template>
    <div class="referral">
        <div class="referral__wrapper">
            <span class="referral__title">Referral</span>
            <div v-if="user.referral && user.referral.link" class="referral__box">
                <div class="referral__item third link box-1">
                    <span class="referral__item__key">Your referral link</span>
                    <span class="referral__item__value link">
                        https://quicksms.io/r/{{ user.referral.link }}
                    </span>
                    <button @click="props.handleCopyReferralLink" class="referral__item__img">
                        <img src="@/assets/svg/Main/Profile/copyLink.svg" alt="" class="referral__item__img__svg">
                    </button>
                </div>
                <div class="referral__item third box-2">
                    <span class="referral__item__key">signed</span>
                    <span class="referral__item__value">{{ user.referral.uses }}</span>
                </div>
                <div class="referral__item third box-3">
                    <span class="referral__item__key">Your discount</span>
                    <span class="referral__item__value green">{{ user.referral.discount }}%</span>
                </div>
            </div>
            <button v-else @click="props.handleCreateReferral" class="referral__create-link">
                Create Referral link
            </button>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.referral {
    display: flex;
    width: 100%;

    &__wrapper {
        padding: 3rem 4rem;
        display: flex;
        flex-direction: column;
        width: 100%;

        @media screen and (max-width: 1000px) {
            padding: 3rem 2rem;
        }

        @media screen and (max-width: 850px) {
            padding: 20px 0;
        }
    }

    &__title {
        font-family: 'Bison';
        font-weight: 300;
        font-size: 3rem;
        line-height: 98%;
        color: #FFFFFF;

        @media screen and (max-width: 850px) {
            font-size: 35px;
        }
    }

    &__text {
        display: flex;
        flex-direction: column;
        padding-right: 5px;

        &__img {
            position: absolute;
            width: 2.05rem;
            height: 2.05rem;
            top: 0;
            bottom: 0;
            margin-top: auto;
            margin-bottom: auto;
            right: 1.3rem;
            cursor: pointer;
            transition: all .3s;

            &:hover {
                opacity: 0.8;
            }

            @media screen and (max-width: 850px) {
                width: 24px;
                height: 24px;
                right: 15px;
            }


            &__svg {
                width: 2.05rem;
                height: 2.05rem;

                @media screen and (max-width: 850px) {
                    width: 24px;
                    height: 24px;
                }
            }
        }

        @media screen and (max-width: 850px) {
            width: 100%;

            &.box-1 {
                @media screen and (max-width: 850px) {
                    grid-area: A;
                }
            }

            &.box-2 {
                @media screen and (max-width: 850px) {
                    grid-area: B;
                }
            }

            &.box-3 {
                @media screen and (max-width: 850px) {
                    grid-area: C;
                }
            }
        }

        &.third {
            border: 1px solid #7D808C;
            border-radius: 7px;
            padding: 0.5rem 1.3rem;
            display: flex;
            align-self: center;

            &.link {
                padding: 0.5rem 1.71rem;
                position: relative;
            }
        }

        &__key {
            font-family: 'Rubik';
            font-weight: 400;
            font-size: 1.2rem;
            line-height: 140.5%;
            color: #7D808C;

            @media screen and (max-width: 850px) {
                font-size: 13px;
            }
        }

        &__value {
            font-family: 'Rubik';
            font-weight: 400;
            font-size: 1.71rem;
            line-height: 140.5%;
            color: #FFFFFF;
            width: 100%;

            @media screen and (max-width: 850px) {
                font-size: 19px;
            }

            &.link {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 30rem;
                margin-right: calc(2.05rem + 5px);

                @media screen and (max-width: 850px) {
                    max-width: calc(100vw - 29px - 1.71rem * 2 - 40px);
                    margin-right: calc(24px + 5px);
                }
            }

            &.green {
                color: #C0FB50;
            }
        }
    }

    &__create-link {
        margin-top: 2.1rem;
        border: 1px solid #7D808C;
        border-radius: 7px;
        padding: 1.71rem 2.1rem;
        text-transform: uppercase;
        font-family: "Rubik";
        font-weight: 300;
        font-size: 2.1rem;
        line-height: 98%;
        color: #FFFFFF;
        transition: all .3s;

        &:hover {
            opacity: 0.6;
        }

        @media screen and (max-width: 850px) {
            font-size: 20px;
            padding: 15px;
            margin-top: 20px;
        }
    }

    &__box {
        margin-top: 2.05rem;
        display: grid;
        gap: 1.36rem;
        width: 100%;
        grid-template-columns: auto 8.5rem 10.7rem;

        @media screen and (max-width: 850px) {
            grid-template-columns: auto;
            grid-template-areas:
                "A A"
                "B C";
        }
    }

    &__item {
        display: flex;
        flex-direction: column;
        padding-right: 5px;

        &__img {
            position: absolute;
            width: 2.05rem;
            height: 2.05rem;
            top: 0;
            bottom: 0;
            margin-top: auto;
            margin-bottom: auto;
            right: 1.3rem;
            cursor: pointer;
            transition: all .3s;

            &:hover {
                opacity: 0.8;
            }

            @media screen and (max-width: 850px) {
                width: 24px;
                height: 24px;
                right: 15px;
            }


            &__svg {
                width: 2.05rem;
                height: 2.05rem;

                @media screen and (max-width: 850px) {
                    width: 24px;
                    height: 24px;
                }
            }
        }

        @media screen and (max-width: 850px) {
            width: 100%;

            &.box-1 {
                @media screen and (max-width: 850px) {
                    grid-area: A;
                }
            }

            &.box-2 {
                @media screen and (max-width: 850px) {
                    grid-area: B;
                }
            }

            &.box-3 {
                @media screen and (max-width: 850px) {
                    grid-area: C;
                }
            }
        }

        &.third {
            border: 1px solid #7D808C;
            border-radius: 7px;
            padding: 0.5rem 1.3rem;
            display: flex;
            align-self: center;

            &.link {
                padding: 0.5rem 1.71rem;
                position: relative;
            }
        }

        &__key {
            font-family: 'Rubik';
            font-weight: 400;
            font-size: 1.2rem;
            line-height: 140.5%;
            color: #7D808C;

            @media screen and (max-width: 850px) {
                font-size: 13px;
            }
        }

        &__value {
            font-family: 'Rubik';
            font-weight: 400;
            font-size: 1.71rem;
            line-height: 140.5%;
            color: #FFFFFF;
            width: 100%;

            @media screen and (max-width: 850px) {
                font-size: 19px;
            }

            &.link {
                white-space: nowrap;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 30rem;
                margin-right: calc(2.05rem + 5px);

                @media screen and (max-width: 850px) {
                    max-width: calc(100vw - 29px - 1.71rem * 2 - 40px);
                    margin-right: calc(24px + 5px);
                }
            }

            &.green {
                color: #C0FB50;
            }
        }
    }
}
</style>