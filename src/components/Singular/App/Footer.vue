<script setup lang="ts">
const props = defineProps(["additionalLink"]);

</script>

<template>
    <footer class="footer">
        <div class="inner-container">
            <div class="main-content">
                <div class="left">
                    <div class="logo-container">
                        <!-- <img src="@/assets/svg/logoText.svg" alt="" class="logo"> -->
                        <router-link to="/" class="logo-link">
                            <img src="@/assets/svg/logoText.svg" alt="" class="logo">
                        </router-link>
                        <span class="slogan">High quality SMS verification</span>
                    </div>
                    <div class="socials">
                        <ul class="list">
                            <li class="item">
                                <a href="https://discord.com/invite/sms" target="_blank" class="link">
                                    <img src="@/assets/svg/navMenu/discord.svg" alt="" class="icon">
                                    <span>Discord</span>
                                </a>
                            </li>
                            <li class="item">
                                <a href="https://t.me/QuickSMS_Bot" target="_blank" class="link">
                                    <img src="@/assets/svg/navMenu/telegram.svg" alt="" class="icon">
                                    <span>Telegram</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div class="right">
                    <ul class="nav-list">
                        <li class="item">
                            <router-link to="/registration" class="link">Profile</router-link>
                        </li>
                        <!-- <li class="item">
                            <router-link to="/#" class="link">Support</router-link>
                        </li> -->
                        <li class="item">
                            <router-link :to="`${props.additionalLink || ''}/FAQ`" class="link">Guideline</router-link>
                        </li>
                        <li class="item">
                            <router-link :to="`${props.additionalLink || ''}/services`" class="link">Get a number</router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div class="bottom">
                <div class="item item-1">
                    <div class="item-padding-container">
                        <span>© QuickSMS, 2023. All rights reserved</span>
                    </div>
                </div>
                <div class="item item-2">
                    <div class="item-padding-container">
                        <router-link :to="`${props.additionalLink || ''}/TOS`" class="link">Terms of Service</router-link>
                    </div>
                </div>
                <div class="item item-3">
                    <div class="item-padding-container">
                        <a href="https://heavens.pro/" target="_blank" class="heavens-link">
                            <img src="@/assets/svg/heavensLogoText.svg" alt="" class="heavens-logo">
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </footer>
</template>

<style lang="scss" scoped>
.footer {
    position: relative;
    z-index: 10000;

    @media only screen and (max-width: 850px) {
        padding: 4rem 0;
    }

    .inner-container {

        @media only screen and (max-width: 850px) {
            @include width-restriction;
        }

        .main-content {
            width: 100vw;
            display: flex;

            @media only screen and (max-width: 850px) {
                flex-direction: column-reverse;
                width: 100%;
            }

            .left {
                width: 33%;
                border-right: 1px solid var(--color-grey);

                @media only screen and (max-width: 1050px) {
                    width: 37%;
                }

                @media only screen and (max-width: 850px) {
                    display: flex;
                    align-items: center;
                    width: 100%;
                    border-right: none;
                    border-top: 1px solid var(--color-grey);
                    border-bottom: 1px solid var(--color-grey);
                    height: 25rem;
                }

                .logo-container {
                    display: flex;
                    flex-direction: column;
                    border-bottom: 1px solid var(--color-grey);

                    padding: 7.1rem 0 3.6rem 14%;

                    @media only screen and (max-width: 850px) {
                        padding: 0;
                        width: 50%;
                        border-right: 1px solid var(--color-grey);
                        border-bottom: none;
                        height: 100%;
                        justify-content: center;
                        padding-right: 2rem;
                    }

                    .logo-link {
                        width: 25rem;
                        margin-bottom: 2.7rem;

                        @media only screen and (max-width: 850px) {
                            margin-bottom: 2rem;
                        }

                        @media only screen and (max-width: 450px) {
                            width: 93%;
                        }

                        .logo {
                            width: 100%;
                        }
                    }

                    .slogan {
                        font-size: 1.8rem;
                        color: var(--color-grey-2);

                        @media only screen and (max-width: 850px) {
                            font-size: 16px;
                        }
                    }
                }

                .socials {
                    padding: 5.1rem 0 8.3rem 14%;

                    @media only screen and (max-width: 850px) {
                        padding: 0;
                        width: 50%;
                        height: 100%;
                        padding-left: 3.3rem;
                    }

                    .list {
                        display: flex;
                        flex-direction: column;
                        align-items: flex-start;
                        justify-content: flex-start;

                        @media only screen and (max-width: 850px) {
                            height: 100%;
                            justify-content: center;
                        }

                        .item {

                            &:not(:last-of-type) {
                                margin-bottom: 1.5rem;

                                @media only screen and (max-width: 850px) {
                                    margin-bottom: 16px;
                                }
                            }

                            .link {
                                display: flex;
                                align-items: center;
                                justify-content: flex-start;

                                &:hover span {
                                    opacity: .7;
                                }

                                .icon {
                                    width: 2.2rem;
                                    margin-right: 1rem;

                                    @media only screen and (max-width: 850px) {
                                        width: 23px;
                                        margin-right: 10px;
                                    }
                                }

                                span {
                                    font-family: Bison;
                                    font-size: 1.8rem;
                                    transition: all .3s;

                                    @media only screen and (max-width: 850px) {
                                        font-size: 20px;
                                    }
                                }
                            }
                        }
                    }
                }
            }

            .right {
                padding: 6.7rem 0 3.6rem 7.1rem;

                @media only screen and (max-width: 850px) {
                    padding: 0;
                    padding-bottom: 5rem;
                    width: 100%;
                }

                .nav-list {


                    .item {


                        .link {
                            font-family: Bison;
                            font-size: 5.8rem;
                            border-radius: .6rem .6rem 1.8rem .6rem;
                            padding: .4rem 3.5rem .4rem 1.8rem;

                            &:hover {
                                background-color: var(--color-green-light);
                                color: var(--color-black);
                            }
                        }
                    }
                }
            }
        }

        .bottom {
            width: 100vw;
            border-top: 1px solid var(--color-grey);
            display: flex;

            @media only screen and (max-width: 850px) {
                flex-direction: column;
                width: 100%;
                border-top: none;
                padding-top: 3.6rem;
            }

            .item {
                width: 33%;

                @media only screen and (max-width: 850px) {
                    width: 100% !important;

                    &:not(:last-of-type) {
                        margin-bottom: 13px;
                    }
                }

                &-1 {

                    @media only screen and (max-width: 1050px) {
                        width: 37%;
                    }
                }

                &-2 {

                    @media only screen and (max-width: 1050px) {
                        width: 26%;
                        margin-bottom: 18px;
                    }
                }

                &-3 {

                    @media only screen and (max-width: 1050px) {
                        width: 37%;
                    }
                }

                .item-padding-container {
                    padding: 4.5rem 0 4.5rem 14%;

                    @media only screen and (max-width: 850px) {
                        padding: 0;
                    }
                }

                &:not(:last-of-type) {
                    border-right: 1px solid var(--color-grey);

                    @media only screen and (max-width: 850px) {
                        border-right: none;
                    }
                }

                span,
                .link {
                    color: var(--color-grey-2);
                    font-size: 1.8rem;

                    @media only screen and (max-width: 850px) {
                        font-size: 16px;
                    }
                }

                .link {

                    &:hover {
                        color: lighten(#7D808C, 13%);
                    }
                }

                .heavens-link {
                    width: 34rem;

                    @media only screen and (max-width: 850px) {
                        width: 330px;
                    }

                    .heavens-logo {
                        width: 100%;
                    }
                }
            }
        }
    }
}
</style>