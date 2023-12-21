<script setup lang="ts">

</script>

<template>
    <footer class="footer">
        <div class="inner-container">
            <div class="main-content">
                <div class="left">
                    <div class="logo-container">
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
                    <span class="right__title">Still need HELP?</span>
                    <p class="right__descr">Our support team is always ready to help you. You can find us in Discord
                    </p>
                    <a href="https://discord.com/invite/sms" target="_blank" class="right__button">Write</a>
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
                        <router-link to="/main/TOS" class="link">Terms of Service</router-link>
                    </div>
                </div>
                <div class="item item-3">
                    <div class="item-padding-container">
                        <a  href="https://heavens.pro/" target="_blank" class="heavens-link">
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
    z-index: 1000;

    @media only screen and (max-width: 850px) {
        padding: 4rem 0 80px;
    }

    .inner-container {

        @media only screen and (max-width: 850px) {
            @include width-restriction;
        }

        .main-content {
            display: flex;

            @media only screen and (max-width: 850px) {
                flex-direction: column-reverse;
                width: 100%;
            }

            .left {
                width: 33%;
                border-right: 1px solid var(--color-grey);

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
                display: flex;
                flex-direction: column;

                @media only screen and (max-width: 850px) {
                    padding: 0;
                    padding-bottom: 5rem;
                    width: 100%;
                }

                &__title {
                    font-family: 'Bison';
                    font-weight: 400;
                    font-size: 8.2rem;
                    line-height: 90.5%;
                    color: #FFFFFF;

                    @media screen and (max-width: 850px) {
                        font-size: 31px;
                    }
                }

                &__descr {
                    max-width: 42.8rem;
                    margin: 1.3rem 0 2.05rem;
                    font-family: 'Rubik';
                    font-weight: 400;
                    font-size: 2.05rem;
                    line-height: 120%;
                    color: #FFFFFF;

                    @media screen and (max-width: 850px) {
                        margin: 20px 0 25px;
                        font-size: 18px;
                    }
                }

                &__button {
                    background: #C0FB50;
                    border-radius: 24px;
                    font-family: 'Rubik';
                    font-weight: 700;
                    font-size: 1.54rem;
                    line-height: 120%;
                    color: #000000;
                    padding: 1.3rem 5.9rem;
                    align-self: flex-start;

                    @media screen and (max-width: 850px) {
                        font-size: 17px;
                    }

                    &:hover {
                        opacity: 0.8;
                    }
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
                display: flex;
                align-items: center;



                @media only screen and (max-width: 850px) {
                    width: 100% !important;

                    &:not(:last-of-type) {
                        margin-bottom: 13px;
                    }
                }

                .item-padding-container {
                    padding: 4.5rem 0 4.5rem 14%;

                    @media only screen and (max-width: 1400px) {
                        padding: 4.5rem 0;
                        width: 100%;
                        display: flex;
                        justify-content: center;
                    }

                    @media only screen and (max-width: 850px) {
                        justify-content: flex-start;
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