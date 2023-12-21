<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import Referral from './Referral.vue';

// DEFINE PROPS
const props = defineProps(["handleOpenLogoutPopup", "handleCopyReferralLink", "handleCreateReferral", "handleChange2FA"]);

// USER`S STORE
const user = useUserStore();

</script>

<template>
    <div class="settings">
        <div class="settings__first">
            <div class="block inputs-container settings-inputs-container">
                <h3 class="title">Settings</h3>
                <div class="inputs">
                    <div class="input-container disabled">
                        <span class="subtitle">Email</span>
                        <input type="email" class="input" disabled>
                    </div>
                    <div class="input-container disabled">
                        <span class="subtitle">Password</span>
                        <input type="password" class="input" disabled>
                    </div>
                    <button @click="props.handleOpenLogoutPopup" class="settings__first__box__button">
                        <img src="@/assets/svg/Main/Profile/logout.svg" alt=""
                            class="settings__first__box__button__img">
                        <span class="settings__first__box__button__text">Exit</span>
                    </button>
                </div>
            </div>
        </div>
        <div class="settings__second">
            <div class="settings__second__wrapper">
                <div class="settings__second__box">
                    <div class="settings__second__box__el disabled">
                        <div class="settings__second__box__el__text">
                            <span class="settings__title">Notifications</span>
                            <span class="settings__second__box__el__text__bottom">Enable email
                                notifications</span>
                        </div>
                        <input disabled class="settings__second__box__el__input" type="checkbox" id="email-1" />
                        <label class="settings__second__box__el__label" for="email-1"></label>
                    </div>
                    <div :class="(user.auth && 'email' in user.auth) ? '' : 'disabled'"
                        class="settings__second__box__el">
                        <div class="settings__second__box__el__text">
                            <span class="settings__title">2FA</span>
                            <span class="settings__second__box__el__text__bottom">Enable 2FA with
                                email</span>
                        </div>
                        <input :disabled="(user.auth && 'email' in user.auth) ? false : true"
                            @change="e => props.handleChange2FA(e)" class="settings__second__box__el__input"
                            type="checkbox" id="email-2" />
                        <label class="settings__second__box__el__label" for="email-2"></label>
                    </div>
                </div>
            </div>
        </div>
        <div class="settings__third">
            <Referral :handleCopyReferralLink="props.handleCopyReferralLink"
                :handleCreateReferral="props.handleCreateReferral" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.settings {
    display: grid;
    grid-template-rows: 16rem 11.5rem auto;
    border-right: 1px solid #333333;
    border-bottom: 1px solid #333333;

    @media screen and (max-width: 850px) {
        grid-template-rows: auto;
        border-right: none;
        margin-right: 20px;
        margin-left: 20px;
    }


    .block {
        padding: 3rem 2.7rem 3rem;
        width: 100%;

        @media only screen and (max-width: 850px) {
            padding: 25px 0 !important;
        }
    }

    .inputs-container {

        .disabled {
            opacity: 0.2;
        }

        .title {
            font-family: Bison;
            font-size: 3.2rem;
            margin-bottom: 1.75rem;

            @media only screen and (max-width: 850px) {
                font-size: 34px;
                margin-bottom: 20px;
            }
        }

        .button-save {
            font-size: 2rem;
            padding: 0;
            width: 20%;

            @media only screen and (max-width: 850px) {
                width: 100%;
                padding: 10px 0;
                font-size: 20px;
            }

            &.disabled {
                pointer-events: none;
                opacity: .5;
            }
        }

        .inputs {
            display: flex;

            @media only screen and (max-width: 850px) {
                flex-direction: column;
            }

            .input-container {
                width: 40%;
                position: relative;

                @media only screen and (max-width: 850px) {
                    width: 100%;
                }

                // &:not(:last-of-type) {
                margin-right: 2.3rem;

                @media only screen and (max-width: 850px) {
                    margin-right: 0;
                    margin-bottom: 15px;
                }

                // }

                input {
                    padding: 2.15rem 2.2rem .4rem;
                    border: 1px solid var(--color-grey-2);
                    border-radius: .6rem;
                    width: 100%;
                    font-size: 1.8rem;

                    @media only screen and (max-width: 850px) {
                        font-size: 20px;
                        padding: 25px 25px 5px;
                    }
                }

                .subtitle {
                    position: absolute;
                    left: 2.2rem;
                    top: .6rem;
                    font-size: 1.4rem;
                    color: var(--color-grey-2);

                    @media only screen and (max-width: 850px) {
                        font-size: 14px;
                        left: 25px !important;
                    }
                }
            }
        }
    }

    &__first,
    &__second {
        display: flex;
        align-items: center;

        &__wrapper {
            padding: 0 4rem;
            display: flex;
            flex-direction: column;
            width: 100%;

            @media screen and (max-width: 1000px) {
                padding: 0 2rem;
            }

            @media screen and (max-width: 850px) {
                padding: 20px 0;
            }
        }
    }

    &__first {

        &__wrapper {
            gap: 1.71rem;
            width: 100%;

            @media screen and (max-width: 850px) {
                gap: 20px;
            }
        }

        &__box {
            display: grid;
            gap: 2.56rem;
            grid-template-columns: auto auto 12rem;

            @media screen and (max-width: 850px) {
                grid-template-columns: auto;
                gap: 15px;
            }

            &__input {
                border: 1px solid #7D808C;
                border-radius: 7px;

                &.disabled {
                    opacity: 0.4;
                }

                &__wrapper {
                    padding: 0.7rem 2.15rem;
                    height: 100%;
                    display: flex;
                    align-items: center;
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

                &__button {
                    margin-left: auto;
                    height: 2.05rem;
                    width: 2.05rem;
                    // cursor: pointer;
                    cursor: default;
                    transition: all .3s;

                    // &:hover {
                    //     opacity: 0.8;
                    // }

                    &:hover {
                        opacity: 1;
                    }

                    @media screen and (max-width: 850px) {
                        width: 24px;
                        height: 24px;
                    }

                    &__img {
                        height: 2.05rem;
                        width: 2.05rem;

                        @media screen and (max-width: 850px) {
                            width: 24px;
                            height: 24px;
                        }
                    }
                }
            }

            &__button {
                border: 1px solid #C04A4A;
                border-radius: 7px;
                display: flex;
                align-items: center;
                gap: 1.85rem;
                padding: 1.3rem;

                &:hover {
                    opacity: 0.8;
                }

                &__img {
                    height: 2.05rem;
                    width: 2.05rem;

                    @media screen and (max-width: 850px) {
                        display: none;
                    }
                }

                &__text {
                    font-family: 'Rubik';
                    font-weight: 700;
                    font-size: 1.71rem;
                    line-height: 140.5%;
                    color: #C04A4A;

                    @media screen and (max-width: 850px) {
                        font-size: 19px;
                        width: 100%;
                    }
                }
            }
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

    &__second {
        border-top: 1px solid #333333;
        border-bottom: 1px solid #333333;

        &__wrapper {
            height: 100%;
        }

        &__box {
            height: 100%;
            width: 100%;
            display: grid;
            grid-template-columns: 1fr 1fr;

            @media screen and (max-width: 850px) {
                grid-template-columns: auto;
            }

            &__el {
                height: 100%;
                display: flex;
                width: 100%;
                justify-content: space-between;
                align-items: center;

                &.disabled {
                    padding-right: 4rem;

                    // Включить
                    opacity: 0.5;

                    &>label {
                        cursor: auto;
                    }

                    // 
                    @media screen and (max-width: 1000px) {
                        padding-right: 2rem;
                    }

                    @media screen and (max-width: 850px) {
                        padding-right: 0;
                        padding-bottom: 20px;
                    }
                }

                &:last-child {
                    padding-left: 4rem;

                    @media screen and (max-width: 1000px) {
                        padding-left: 2rem;
                    }

                    @media screen and (max-width: 850px) {
                        padding-left: 0;
                        padding-top: 20px;
                    }
                }

                &__input {
                    height: 0;
                    width: 0;
                    visibility: hidden;
                }

                &__label {
                    cursor: pointer;
                    text-indent: -9999px;
                    width: 3.5rem;
                    height: 1.54rem;
                    background: #C04A4A;
                    display: block;
                    border-radius: 27px;
                    position: relative;

                    @media screen and (max-width: 850px) {
                        width: 41px;
                        height: 19px;
                    }
                }

                &__label:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    bottom: 0;
                    margin-top: auto;
                    margin-bottom: auto;
                    left: 1.5px;
                    width: 1.28rem;
                    height: 1.28rem;
                    background: #000000;
                    border-radius: 100%;
                    transition: .2s;

                    @media screen and (max-width: 850px) {
                        width: 16px;
                        height: 16px;
                    }
                }

                &__input:checked+&__label {
                    background: #C0FB50;
                }

                &__input:checked+&__label:after {
                    background: #000000;
                    left: calc(100% - 1.5px);
                    transform: translateX(-100%);
                }

                &:first-child {
                    border-right: 1px solid #333333;

                    @media screen and (max-width: 850px) {
                        border-right: none;
                        border-bottom: 1px solid #333333;
                    }
                }

                &__text {
                    display: flex;
                    flex-direction: column;
                    gap: 1.71rem;

                    &>.settings__title {
                        font-size: 23px;
                    }

                    &__bottom {
                        font-family: 'Rubik';
                        font-weight: 300;
                        font-size: 1.54rem;
                        line-height: 98%;
                        color: #FFFFFF;

                        @media screen and (max-width: 850px) {
                            font-size: 15px;
                        }
                    }
                }
            }
        }
    }

    &__third {
        min-height: 13.5rem;

        &__wrapper {
            align-self: flex-start;
            padding-top: 25px;
            padding-bottom: 25px;
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
    }
}
</style>

