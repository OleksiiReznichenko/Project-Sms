<script setup lang="ts">
import { ref } from 'vue';
import { gsap, Power0 } from 'gsap';
import { useBaseStore } from '@/stores/index';

const baseStore = useBaseStore();

const iconSteam = ref<null | HTMLElement>(null);
const iconTwitter = ref<null | HTMLElement>(null);
const iconDiscord = ref<null | HTMLElement>(null);
const iconYoutube = ref<null | HTMLElement>(null);
const iconGoogle = ref<null | HTMLElement>(null);
const iconTinder = ref<null | HTMLElement>(null);
const iconUber = ref<null | HTMLElement>(null);

// PARALLAX ON MOUSE MOVE
const parallax = (mouse: MouseEvent, resistance: number, el: HTMLElement): void => {
    gsap.to(el, {duration: .2, ease: Power0.easeIn,
        x: -((mouse.clientX - window.innerWidth / 2) / resistance),
        y: -((mouse.clientY - window.innerHeight / 2) / resistance)
    });
};

// MOVE PACKAGES ON MOUSE MOVE
const mouseSocials = (event: MouseEvent): void => {
    if (baseStore.isTouchDevice() || !iconSteam.value || !iconTwitter.value
    || !iconDiscord.value || !iconYoutube.value || !iconGoogle.value
    || !iconTinder.value || !iconUber.value) return;
    parallax(event, -51, iconTwitter.value);
    parallax(event, -71, iconGoogle.value);
    parallax(event, -81, iconTinder.value);

    parallax(event, 61, iconDiscord.value);
    parallax(event, 71, iconSteam.value);
    parallax(event, 81, iconUber.value);
    parallax(event, 81, iconYoutube.value);
};
</script>

<template>
    <section @mousemove="mouseSocials" class="section section-support">
        <div class="inner-container">
            <div class="info">
                <h1 class="title">
                    <span class="grey-bold">
                        <span class="s">S</span>upport 
                    </span>
                    <br class="mobile">
                    <span class="black-bold"> For </span>
                    <span class="black"> Almost</span>
                    <br>
                    <span class="black-bold">any service</span>
                </h1>
                <p class="description">
                    We currently support a large variety of services including, but not limited to Steam, Tinder, Google, Uber, Discord, and even Twitter
                </p>
            </div>
        </div>
        <div class="grids">
            <img src="@/assets/svg/Landing/SectionSupportGridLeft.svg" alt="" class="grid grid-left">
            <img src="@/assets/svg/Landing/SectionSupportGridRight.svg" alt="" class="grid grid-right">
        </div>
        <!-- <div class="icon icon-small icon-steam">
            <div ref="iconSteam" class="icon-inner-container">
                <img src="@/assets/svg/Landing/Steam.svg" alt="">
            </div>
        </div> -->
        <div class="icon-image-container icon-small icon-steam">
            <img ref="iconSteam" src="@/assets/img/Landing/circleSteam.png" alt="" class="icon-image">
        </div>
        <div class="icon icon-big icon-twitter">
            <div ref="iconTwitter" class="icon-inner-container">
                <img src="@/assets/svg/Landing/Twitter.svg" alt="">
            </div>
        </div>
        <div class="icon icon-medium icon-discord">
            <div ref="iconDiscord" class="icon-inner-container">
                <img src="@/assets/svg/Landing/Discord.svg" alt="">
            </div>
        </div>
        <!-- <div class="icon icon-small icon-youtube">
            <div ref="iconYoutube" class="icon-inner-container">
                <img src="@/assets/svg/Landing/Youtube.svg" alt="">
            </div>
        </div> -->
        <div class="icon-image-container icon-small icon-youtube">
            <img ref="iconYoutube" src="@/assets/img/Landing/circleYoutube.png" alt="" class="icon-image">
        </div>
        <div class="icon icon-big icon-google">
            <div ref="iconGoogle" class="icon-inner-container">
                <img src="@/assets/svg/Landing/Google.svg" alt="">
            </div>
        </div>
        <div class="icon icon-big icon-tinder">
            <div ref="iconTinder" class="icon-inner-container">
                <img src="@/assets/svg/Landing/Tinder.svg" alt="">
            </div>
        </div>
        <!-- <div class="icon icon-small icon-uber">
            <div ref="iconUber" class="icon-inner-container">
                <img src="@/assets/svg/Landing/Uber.svg" alt="">
            </div>
        </div> -->
        <div class="icon-image-container icon-small icon-uber">
            <img ref="iconUber" src="@/assets/img/Landing/circleUber.png" alt="" class="icon-image">
        </div>
    </section>
</template>

<style lang="scss" scoped>
.section-support {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 800;
    background-color: var(--color-green-light);
    height: var(--app-height);
    will-change: transform;

    @media only screen and (max-width: 850px) {
        z-index: 1200;
    }

    .inner-container {
        @include width-restriction;
        position: relative;
        height: 100%;
        z-index: 100;

        .info {
            position: absolute;
            top: 50%;
            right: 0;
            transform: translateY(-50%);
            width: 88rem;
            color: var(--color-black);

            @media only screen and (max-width: 850px) {
                width: 53rem;
                right: auto;
                left: 0;
            }

            .title {
                font-weight: 900;
                font-size: 7rem;
                text-transform: uppercase;
                line-height: 1;
                margin-bottom: 2.5rem;

                @media only screen and (max-width: 550px) {
                    font-size: 35px;
                }

                .grey-bold {
                    font-style: italic;
                    color: var(--color-grey);
                    padding-right: 1.2rem;

                    .s {
                        display: inline-block;
                        position: relative;
                        padding-right: 1rem;
                        padding-top: .4rem;
                        color: var(--color-green-light);

                        &::before {
                            content: '';
                            display: inline-block;
                            @include abs-center;
                            transform: translate(-50%, -50%) rotate(4.5deg);
                            background-color: var(--color-white);
                            width: 7rem;
                            height: 7.8rem;
                            z-index: -1;

                            @media only screen and (max-width: 550px) {
                                width: 34px;
                                // height: 35px;
                                top: 45%;
                                height: 39px;
                            }
                        }
                    }
                }

                .black {
                    font-style: italic;
                    font-weight: 300;
                }
            }

            .description {
                font-size: 1.8rem;
                width: 55rem;
                // text-shadow: 0 .4rem 1rem #B7D113;

                @media only screen and (max-width: 850px) {
                    font-size: 16px;
                    width: 285px;
                }
            }
        }
    }

    .grids {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 1;

        .grid {
            position: absolute;
            width: 45%;
            min-width: 70rem;

            @media only screen and (max-width: 450px) {
                min-width: 60rem;
            }

            &-left {
                bottom: 0;
                left: 0;
            }

            &-right {
                top: 0;
                right: 0;
            }
        }
    }

    .icon-image-container {
        position: absolute;
        z-index: 20;

        .icon-image {
            width: 100%;
            height: 100%;
        }

        &.icon-steam {
            top: 8%;
            left: -6.5rem;
            width: 23rem;
            height: 23rem;

            @media only screen and (max-width: 850px) {
                top: 10%;
                left: 4rem;
                width: 14rem;
                height: 14rem;
            }
        }

        &.icon-youtube {
            bottom: -4rem;
            left: 4%;
            width: 11rem;
            height: 11rem;

            @media only screen and (max-width: 850px) {
                left: auto;
                bottom: 11%;
                right: 21%;
                width: 10rem;
                height: 10rem;
            }
        }

        &.icon-uber {
            top: 5%;
            right: 18%;
            width: 13rem;
            height: 13rem;

            @media only screen and (max-width: 850px) {
                top: -.5%;
                right: 22%;
            }
        }
    }

    .icon {
        position: absolute;
        width: 27rem;
        height: 27rem;
        z-index: 20;

        @media only screen and (max-width: 850px) {
            width: 24rem;
            height: 24rem;
        }

        &-inner-container {
            width: 100%;
            height: 100%;
            background-color: var(--color-white);
            border-radius: 100%;
            border: .9rem dotted var(--color-grey-2);
            @include flex-center;
        }

        img {
            width: 60%;
        }

        &-discord {
            bottom: 10%;
            left: 18%;

            @media only screen and (max-width: 850px) {
                left: 0;
            }
        }

        &-twitter {
            top: -3%;
            // left: 23%;
            left: 33%;
            transform: translateX(-50%) scale(1.35);
            z-index: 110;
            // filter: drop-shadow(0 .4rem 5rem #B7D113);

            @media only screen and (max-width: 850px) {
                left: auto;
                right: -13rem;
                top: 15%;
                filter: none;
            }
        }

        // &-steam {
        //     top: 5%;
        //     left: -9rem;
        //     transform: scale(.8);
        //     filter: blur(2px);

        //     @media only screen and (max-width: 850px) {
        //         top: 5%;
        //         left: -1rem;
        //         transform: scale(.6);
        //         filter: blur(4px);
        //     }
        // }

        // &-youtube {
        //     bottom: -12rem;
        //     left: -1%;
        //     transform: scale(.35);
        //     filter: blur(5px);

        //     @media only screen and (max-width: 850px) {
        //         left: auto;
        //         bottom: 5%;
        //         right: 10%;
        //         filter: blur(6px);
        //     }
        // }

        &-google {
            bottom: -12%;
            left: 45%;
            transform: scale(1.2);

            @media only screen and (max-width: 850px) {
                left: auto;
                bottom: 18%;
                right: -7rem;
                transform: scale(.7);
            }
        }

        &-tinder {
            bottom: 12%;
            right: 5%;
            transform: scale(1.12);

            @media only screen and (max-width: 850px) {
                right: auto;
                bottom: -5%;
                left: 30%;
                transform: scale(.25);
            }

            img {
                width: 55%;
            }
        }

        // &-uber {
        //     top: -5%;
        //     right: 14%;
        //     transform: scale(.45);
        //     filter: blur(5px);
        // }
    }
}
</style>