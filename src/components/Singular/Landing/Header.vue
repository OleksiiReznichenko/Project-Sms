<script setup lang="ts">
import { DEMO_MODE } from '@/demo/config';
const props = defineProps(["additionalLink"]);

</script>

<template>
    <header class="section header">
        <div class="inner-container">
            <div class="info">
                <h1 class="title title-grey title-grey-1 desktop">SMSSMS</h1>
                <h1 class="title title-grey title-grey-2 desktop">SMSSMS</h1>
                <h1 class="title title-grey title-grey-1 mobile">SMS</h1>
                <h1 class="title title-grey title-grey-2 mobile">SMS</h1>
                <h1 class="title title-grey title-grey-3 mobile">SMS</h1>
                <h1 class="title title-green">Quick</h1>
                <p class="description">
                    Receive quick automated messages for registration in any service you need
                </p>
                <router-link v-if="DEMO_MODE" to="/adminPanel/main" class="btn-green button-buy ">Explore admin demo</router-link>
                <router-link v-else :to="`${props.additionalLink || ''}/services`" class="btn-green button-buy ">Buy a number</router-link>
            </div>
            <div class="message message-discord">
                <img src="@/assets/img/Landing/discord.png" alt="" class="icon">
                <div class="message-info">
                    <strong class="title">Discord</strong>
                    <p class="description">Your confirmation code is 13456</p>
                </div>
            </div>
            <div class="message message-google">
                <img src="@/assets/img/Landing/google.png" alt="" class="icon">
                <div class="message-info">
                    <strong class="title">Google</strong>
                    <p class="description">Your confirmation code is 13456</p>
                </div>
            </div>
            <div class="message message-steam">
                <img src="@/assets/img/Landing/steam.png" alt="" class="icon">
                <div class="message-info">
                    <strong class="title">Steam</strong>
                    <p class="description">Your confirmation code is 13456</p>
                </div>
            </div>
            <!-- <div class="message message-tinder">
                <img src="@/assets/img/Landing/Tinder.png" alt="" class="icon">
                <div class="message-info">
                    <strong class="title">Tinder</strong>
                    <p class="description">Your confirmation code is 13456</p>
                </div>
            </div> -->
            <img src="@/assets/img/Landing/messageTinder.png" alt="" class="message-image message-tinder">
            <!-- <div class="message message-uber">
                <img src="@/assets/img/Landing/uber.png" alt="" class="icon">
                <div class="message-info">
                    <strong class="title">Uber</strong>
                    <p class="description">Your confirmation code is 13456</p>
                </div>
            </div> -->
            <img src="@/assets/img/Landing/messageUber.png" alt="" class="message-image message-uber">
            <!-- <div class="message message-twitter">
                <img src="@/assets/img/Landing/twitter.png" alt="" class="icon">
                <div class="message-info">
                    <strong class="title">Twitter</strong>
                    <p class="description">Your confirmation code is 13456</p>
                </div>
            </div> -->
            <img src="@/assets/img/Landing/messageTwitter.png" alt="" class="message-image message-twitter">
        </div>
    </header>
</template>

<style lang="scss" scoped>
.header {
    position: relative;
    z-index: 1000;

    .inner-container {


        .info {
            @include abs-center;
            top: 38%;
            z-index: 50;

            .title {
                font-family: PureHeart;
                font-weight: 400;
                font-size: 39rem;
                user-select: none;

                @media only screen and (max-width: 850px) {
                    font-size: 29rem;
                }

                @media only screen and (max-width: 400px) {
                    font-size: 25rem;
                }

                &-green {
                    color: var(--color-green-light);
                }

                &-grey {
                    color: var(--color-grey);
                    position: absolute;
                    bottom: 9rem;
                    z-index: -1;
                    filter: blur(2px);

                    &-1 {
                        right: 90%;

                        @media only screen and (max-width: 850px) {
                            right: -15%;
                            bottom: 29rem;
                        }

                        @media only screen and (max-width: 400px) {
                            bottom: 27rem;
                        }
                    }

                    &-2 {
                        left: 90%;

                        @media only screen and (max-width: 850px) {
                            left: auto;
                            right: -52%;
                            bottom: 47rem;
                        }

                        @media only screen and (max-width: 400px) {
                            bottom: 45rem;
                        }
                    }

                    &-3 {

                        @media only screen and (max-width: 850px) {
                            right: -79%;
                            bottom: 65rem;
                        }

                        @media only screen and (max-width: 400px) {
                            bottom: 62rem;
                        }
                    }
                }
            }

            .description {
                font-size: 1.8rem;
                width: 44rem;
                margin-bottom: 3rem;
            }

            .button-buy {
                font-size: 2.1rem;
                padding: 1.1rem 4.5rem;
            }
        }

        .message-image {
            position: absolute;

            &.message-tinder {
                top: 25%;
                right: 41%;
                transform: translate(50%, -50%);
                z-index: 30;
                width: 25rem;

                @media only screen and (max-width: 850px) {
                    top: auto;
                    right: auto;
                    bottom: 13%;
                    left: 27%;
                    transform: translate(-50%, -50%);
                }
            }

            &.message-uber {
                top:-2%;
                right: -2%;
                z-index: 30;
                width: 45rem;

                @media only screen and (max-width: 850px) {
                    top: auto;
                    bottom: 5%;
                    right: 5%;
                    width: 26rem;
                }
            }

            &.message-twitter {
                top: 88%;
                left: 2%;
                transform: translate(-50%, -50%);
                z-index: 30;
                width: 21rem;

                @media only screen and (max-width: 850px) {
                    top: 20%;
                    left: 11%;
                    transform: translate(0%, -50%);
                }
            }
        }

        .message {
            position: absolute;
            display: flex;
            align-items: center;
            background-color: rgba(#333, .4);
            border-radius: 1.25rem 1.25rem 1.25rem 0;
            padding: .8rem 1.6rem .8rem .8rem;
            z-index: 150;
            white-space: nowrap;

            .icon {
                width: 5.3rem;
                height: 5.3rem;
                border-radius: 100%;
                margin-right: 1.2rem;
            }

            &-info {
                font-size: 1.8rem;

                .title {
                    font-weight: 700;
                }
            }

            &-discord {
                top: 50%;
                left: 33%;
                transform: translate(-50%, -50%) scale(1.3);
                backdrop-filter: blur(3px);

                @media only screen and (max-width: 850px) {
                    top: 32%;
                    left: 53%;
                    transform: translate(-50%, -50%) scale(1.2);
                }
            }

            &-steam {
                top: 80%;
                right: 22%;
                transform: translate(50%, -50%);

                @media only screen and (max-width: 850px) {
                    top: 12%;
                    right: 25%;
                    transform: translate(50%, 0%) scale(.8);
                }
            }

            // &-tinder {
            //     top: 25%;
            //     right: 41%;
            //     transform: translate(50%, -50%) scale(.7);
            //     filter: blur(2px);
            //     z-index: 30;

            //     @media only screen and (max-width: 850px) {
            //         top: auto;
            //         right: auto;
            //         bottom: 12%;
            //         left: 27%;
            //         transform: translate(-50%, -50%) scale(.7);
            //     }
            // }

            // &-uber {
            //     top: 0%;
            //     right: 1%;
            //     transform: scale(1.2);
            //     filter: blur(2px);
            //     z-index: 30;

            //     @media only screen and (max-width: 850px) {
            //         top: auto;
            //         bottom: 5%;
            //         right: -2%;
            //         transform: scale(.7);
            //     }
            // }

            // &-twitter {
            //     top: 88%;
            //     left: 2%;
            //     transform: translate(-50%, -50%) scale(.6);
            //     filter: blur(2px);
            //     z-index: 30;

            //     @media only screen and (max-width: 850px) {
            //         top: 20%;
            //         left: 0%;
            //         transform: translate(0%, -50%) scale(.6);
            //     }
            // }

            &-google {
                top: 2%;
                left: -1%;

                @media only screen and (max-width: 850px) {
                    left: auto;
                    top: 70%;
                    right: 3%;
                    transform: translate(0%, -50%);
                }
            }

        }
    }
}
</style>