<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const isArrowSmall = ref<boolean>(false);

// ON WINDOW RESIZE
const onResize = (): void => {
    if (window.outerWidth <= 1100) {
        isArrowSmall.value = true;
    } else {
        isArrowSmall.value = false;
    }
    console.log(isArrowSmall.value);
};

onMounted(() => {
    if (window.outerWidth <= 1100) {
        isArrowSmall.value = true;
    }
  
    console.log(isArrowSmall.value);
    // ADD WINDOW EVENT LISTENER
    window.addEventListener('resize', onResize);
})

onUnmounted(() => {
    // REMOVE WINDOW EVENT LISTENER
    window.removeEventListener('resize', onResize);
})
</script>

<template>
    <section class="section section-steps">
        <div class="arrow-animation arrow-full">
            <img v-if="isArrowSmall" src="@/assets/img/Landing/SectionFromUsArrowMobile.png" alt="" class="arrow-image">
            <img v-else src="@/assets/img/Landing/SectionFromUsArrow.png" alt="" class="arrow-image">
        </div>
        <div class="block-how">
            <div class="info">
                <h1 class="title title-grey title-grey-1 mobile">work</h1>
                <h1 class="title title-grey title-grey-2">work</h1>
                <h1 class="title title-black">How does it work?</h1>
                <h1 class="title title-grey title-grey-3">work</h1>
                <h1 class="title title-grey title-grey-4 mobile">work</h1>
            </div>
        </div>
        <div class="steps">
            <img src="@/assets/svg/Landing/arrowGreen.svg" alt="" class="arrow-green">
            <div class="step step-1">
                <div class="step-header">
                    <strong class="border-item">Step 1</strong>
                    <div class="step-count">
                        <strong class="step-current">01</strong>
                        <span class="total-steps">/03</span>
                    </div>
                </div>
                <div class="info">
                    <h2 class="title">buy a number</h2>
                    <p class="description">
                        We’ll find a custom number from any country you want suitable for <span class="grey">(almost)</span> any service.
                        <br>
                        <br>
                        <span class="green-background">Anonymous</span> purchase available!
                    </p>
                </div>
                <img src="@/assets/svg/Landing/phoneStep1.svg" alt="" class="phone">
                <img src="@/assets/svg/Landing/Cross.svg" alt="" class="cross">
            </div>
            <img src="@/assets/svg/Landing/arrowGreen.svg" alt="" class="arrow-green">
            <div class="step step-2">
                <div class="step-header">
                    <strong class="border-item">Step 2</strong>
                    <div class="step-count">
                        <strong class="step-current">02</strong>
                        <span class="total-steps">/03</span>
                    </div>
                </div>
                <div class="info">
                    <h2 class="title">register it</h2>
                    <p class="description">
                        As soon as you get your number, you can use it as your own - feel free to register it to verify your account.
                        <br>
                        <br>
                        We offer only <span class="green-background">100% legit</span> numbers!
                    </p>
                </div>
                <img src="@/assets/svg/Landing/phoneStep2.svg" alt="" class="phone">
                <img src="@/assets/svg/Landing/CrossTransparent.svg" alt="" class="cross cross-1">
                <img src="@/assets/svg/Landing/CrossTransparent.svg" alt="" class="cross cross-2">
            </div>
            <img src="@/assets/svg/Landing/arrowGreen.svg" alt="" class="arrow-green">
            <div class="step step-3">
                <div class="step-header">
                    <strong class="border-item">Step 3</strong>
                    <div class="step-count">
                        <strong class="step-current">03</strong>
                        <span class="total-steps">/03</span>
                    </div>
                </div>
                <div class="info">
                    <h2 class="title">get an sms</h2>
                    <p class="description">
                        The SMS will appear right <span class="bold">in your profile!</span>
                        <br>
                        <br>
                        The time of the number <span class="green-background">usage is limited!</span>
                    </p>
                </div>
                <img src="@/assets/svg/Landing/phoneStep3.svg" alt="" class="phone">
                <img src="@/assets/svg/Landing/arrowBottom.svg" alt="" class="arrow arrow-1">
                <img src="@/assets/svg/Landing/arrowBottom.svg" alt="" class="arrow arrow-2">
                <img src="@/assets/svg/Landing/arrowBottom.svg" alt="" class="arrow arrow-3">
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.section-steps {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 600;
    display: flex;
    align-items: center;
    // overflow-x: scroll;
    will-change: transform;

    .arrow-animation {
        position: absolute;
        bottom: 98%;
        left: 0;
        width: 100%;
        min-width: 1200px;

        @media only screen and (max-width: 1050px) {
            left: auto;
            right: -90px;
        }

        @media only screen and (max-width: 850px) {
            z-index: 500;
            bottom: 92%;

            // @media only screen and (max-height: 700px) {
            //     bottom: -40px;
            // }
        }

        @media only screen and (max-width: 500px) {
            right: -120px;
        }

        @media only screen and (max-width: 450px) {
            right: -140px;
        }

        .arrow-image {
            width: 100%;
        }
    }
    
    .steps {
        height: 100vh;
        min-width: 330rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        margin-left: -25vw;

        @media only screen and (max-width: 850px) {
            min-width: 240rem;
        }

        @media only screen and (max-width: 500px) {
            min-width: calc(3 * 90vw + 3 * 14.5rem);
        }
    }
    .step {
        // height: 71vh;
        // width: 57vw;
        height: 51rem;
        width: 91rem;
        // height: 61rem;
        // width: 100rem;
        position: relative;
        border: 2px solid var(--color-green-light);
        border-radius: 7rem .5rem;
        // padding: 8.6rem 7rem 0 7.5rem;
        padding: 8rem 7rem 0 7.5rem;
        overflow: hidden;

        @media only screen and (max-width: 850px) {
            padding: 40px 20px 0;
            height: 80vh;
            max-height: 800px;
            min-width: 330px;
            width: 60rem;
        }

        @media only screen and (max-width: 500px) {
            width: 90vw;
        }

        &-1 {

            .cross {
                width: 5.5rem;
                position: absolute;
                bottom: 13%;
                left: 55%;
                transform: rotate(30deg);
                z-index: -1;
            }
        }

        &-2 {

            .info {

                .description {

                    .green-background {
                        margin-left: 1rem;
                    }
                }
            }

            .cross {
                width: 4.5rem;
                position: absolute;
                transform: rotate(-15deg);
                z-index: -1;

                &-1 {
                    top: 15%;
                    left: 51%;
                    transform: translateX(-50%) rotate(-15deg);
                }

                &-2 {
                    bottom: -1rem;
                    left: 1%;
                }

            }
        }

        &-3 {

            .info {

                .description {

                    .green-background {
                        margin-left: .7rem;
                        margin-right: 0 !important;

                        &::before {
                            transform: translate(-50%, -50%) !important;
                            width: 105% !important;
                        }
                    }
                }
            }

            .arrow {
                position: absolute;
                width: 7rem;
                z-index: -1;

                &-1 {
                    top: 5rem;
                    left: 17%;
                }

                &-2 {
                    top: 42%;
                    right: 28%;
                    transform: rotate(-31deg);
                }

                &-3 {
                    bottom: 5rem;
                    left: -4rem;
                    transform: rotate(10deg);
                }
            }
        }


        .step-header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            // margin-bottom: 6rem;
            margin-bottom: 1.5rem;

            .border-item {
                color: var(--color-green-light);
                border: 1px solid var(--color-green-light);
                padding: .75rem 2.1rem;
                border-radius: 100rem;

                @media only screen and (max-width: 850px) {
                    font-size: 16px;
                }
            }

            .step-count {
                display: flex;
                align-items: flex-start;

                .step-current {
                    font-family: Bison;
                    font-size: 6.7rem;
                    border: 1px solid var(--color-grey-2);
                    border-radius: 100%;
                    width: 10rem;
                    height: 10rem;
                    @include flex-center;

                    @media only screen and (max-width: 850px) {
                        font-size: 52px;
                    }
                }

                .total-steps {
                    font-size: 1.8rem;

                    @media only screen and (max-width: 850px) {
                        font-size: 13px;
                    }
                }
            }
        }

        .info {
            position: relative;
            z-index: 100;

            .title {
                font-weight: 900;
                // font-size: 6.7rem;
                font-size: 6rem;
                text-transform: uppercase;
                margin-bottom: 3.5rem;

                @media only screen and (max-width: 850px) {
                    font-size: 36px;
                }
            }

            .description {
                width: 47rem;
                font-size: 1.8rem;

                @media only screen and (max-width: 850px) {
                    font-size: 16px;
                }

                @media only screen and (max-width: 450px) {
                    width: 90%;
                }
                
                .grey {
                    color: var(--color-grey-2);
                }

                .bold {
                    font-weight: 500;
                }

                .green-background {
                    font-weight: 700;
                    color: #0F0F0F;
                    position: relative;
                    margin-right: 1rem;
                    z-index: 100;
                    display: inline-block;
                    height: 3rem;

                    &::before {
                        content: '';
                        display: block;
                        position: absolute;
                        top: 50%;
                        left: 50%;
                        transform: translate(-50%, -50%) rotate(5deg);
                        background-color: var(--color-green-light);
                        width: 120%;
                        height: 3.6rem;
                        z-index: -1;
                    }
                }
            }
        }

        .phone {
            position: absolute;
            bottom: 0;
            right: 6.5rem;
            // width: 18rem;
            height: 56%;

            @media only screen and (max-width: 850px) {
                right: auto;
                left: 50%;
                transform: translateX(-50%);
                height: 40%;

                @media only screen and (max-height: 650px) {
                    height: 35%;

                    @media only screen and (max-width: 400px) {
                        height: 31%;
                    }
                }
            }
        }
    }

    .arrow-green {
        width: 4rem;
        margin: 0 4.8rem;
    }

    .block-how {
        background-color: var(--color-green-light);
        height: var(--app-height);
        width: 100vw;
        min-width: 100vw;
        position: relative;
        overflow: hidden;
        z-index: 300;

        .info {
            @include abs-center;
            top: 40%;
            z-index: 50;
            width: 80rem;

            @media only screen and (max-width: 850px) {
                width: 70rem;
                top: 45%;
            }

            @media only screen and (max-width: 500px) {
                width: 55rem;
            }

            .title {
                font-family: PureHeart;
                font-weight: 400;
                font-size: 25rem;
                line-height: .9;
                color: var(--color-black);
                user-select: none;
                text-align: center;

                @media only screen and (max-width: 850px) {
                    font-size: 18rem;
                }

                @media only screen and (max-width: 500px) {
                    font-size: 15rem;
                }

                &-grey {
                    position: absolute;
                    color: #AEE349;

                    &-1 {

                        @media only screen and (max-width: 850px) {
                            top: -100%;
                            left: -20%;
                        }
                    }

                    &-2 {
                        top: 50%;
                        right: 99%;
                        transform: translateY(-50%);

                        @media only screen and (max-width: 850px) {
                            right: auto;
                            transform: none;
                            top: -50%;
                            left: -5%;
                        }
                    }

                    &-3 {
                        top: 50%;
                        left: 99%;
                        transform: translateY(-50%);

                        @media only screen and (max-width: 850px) {
                            left: auto;
                            transform: none;
                            top: 100%;
                            right: -5%;
                        }
                    }

                    &-4 {

                        @media only screen and (max-width: 850px) {
                            top: 150%;
                            right: -20%;
                        }
                    }
                }

                &-black {
                    position: relative;
                    z-index: 10;
                }
            }
        }
    }
}
</style>