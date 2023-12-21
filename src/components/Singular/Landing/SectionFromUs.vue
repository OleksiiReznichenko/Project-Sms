<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';

const props = defineProps(["additionalLink"]);


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
    <section class="section section-from-us">
        <div class="inner-container">
            <div class="info">
                <h1 class="title">
                    <span class="grey-bold">
                        <span class="n">N</span>o 
                    </span>
                    <span class="white"> Price</span>
                    <br>
                    <span class="white-bold">Fluctuation</span>
                </h1>
                <div class="flex-container">
                    <div class="button-container">
                        <router-link :to="`${props.additionalLink || ''}/services`" class="btn-green button-buy">Buy a number</router-link>
                    </div>
                    <p class="description">
                        Our prices begin with just $0.2. They're fixed and never fluctuate. Even at a high demand!
                    </p>
                </div>
            </div>
        </div>
        <h1 class="title-big">
            <span class="green">From </span>
            <span class="white"> 2¢</span>
        </h1>
        <img src="@/assets/svg/Landing/CrossTransparent.svg" alt="" class="cross cross-transparent">
        <img src="@/assets/svg/Landing/Cross.svg" alt="" class="cross cross-full-big">
        <img src="@/assets/svg/Landing/Cross.svg" alt="" class="cross cross-full-small">
        <!-- <img src="@/assets/svg/Landing/SectionFromUsArrowTransparent.svg" alt="" class="arrow arrow-transparent">
        <img src="@/assets/svg/Landing/SectionFromUsArrow.svg" alt="" class="arrow arrow-full"> -->
        <!-- <div class="arrow arrow-full">
            <img v-if="isArrowSmall" src="@/assets/img/Landing/SectionFromUsArrowMobile.png" alt="" class="arrow-image">
            <img v-else src="@/assets/img/Landing/SectionFromUsArrow.png" alt="" class="arrow-image">
        </div> -->
    </section>
</template>

<style lang="scss" scoped>
.section-from-us {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 700;
    will-change: transform;

    .inner-container {
        @include width-restriction;
        position: relative;
        height: 100%;
        z-index: 100;

        @media only screen and (max-width: 850px) {
            z-index: 400;
        }

        .info {
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
            width: 75rem;

            @media only screen and (max-width: 850px) {
                width: 53rem;
                top: 30%;
            }

            @media only screen and (max-width: 550px) {
                width: 360px;
                top: 27%;
            }

            @media only screen and (max-width: 400px) {
                width: 330px;
            }

            .title {
                font-weight: 900;
                font-size: 7rem;
                text-transform: uppercase;
                line-height: 1;
                margin-bottom: 2.25rem;

                @media only screen and (max-width: 550px) {
                    font-size: 35px;
                }

                .grey-bold {
                    font-style: italic;
                    color: var(--color-grey-2);

                    .n {
                        display: inline-block;
                        position: relative;
                        padding-right: 1rem;
                        padding-top: .4rem;
                        color: var(--color-black);

                        &::before {
                            content: '';
                            display: inline-block;
                            @include abs-center;
                            transform: translate(-50%, -50%) rotate(4.5deg);
                            background-color: var(--color-green-light);
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

                .white {
                    font-style: italic;
                    font-weight: 300;
                }
            }

            .flex-container {
                display: flex;
                align-items: center;

                @media only screen and (max-width: 850px) {
                    flex-direction: column-reverse;
                    align-items: flex-end;
                }
            }

            .button-buy {
                font-size: 2.1rem;
                padding: 1.2rem 6rem;
                margin-right: 2.6rem;

                @media only screen and (max-width: 850px) {
                    width: 250px;
                    margin-right: 0;
                }
            }

            .description {
                font-size: 1.8rem;
                width: 51rem;

                @media only screen and (max-width: 850px) {
                    font-size: 16px;
                    width: 250px;
                    margin-bottom: 18px;
                }
            }
        }
    }

    .title-big {
        position: absolute;
        // top: 0%;
        bottom: 27vw;
        right: 8%;
        z-index: 150;
        font-family: PureHeart;
        font-weight: 400;
        font-size: 27rem;
        transform: rotate(-11deg);

        @media only screen and (max-width: 1500px) {
            font-size: 24rem;
            bottom: auto;
            top: 0vw;
        }

        @media only screen and (max-width: 850px) {
            font-size: 17rem;
            bottom: 290px;
            top: auto;
            z-index: 80;

            @media only screen and (max-height: 700px) {
                bottom: 250px;
            }
        }

        .green {
            color: var(--color-green-light);
        }
    }

    .cross-transparent {
        position: absolute;
        top: 20%;
        left: 42%;
        width: 4.65rem;
        height: 4.65rem;
        transform: rotate(-14deg);

        @media only screen and (max-width: 850px) {
            width: 6.2rem;
            height: 6.2rem;
            top: 37%;
            left: 10%;
        }
    }

    .cross-full-big {
        position: absolute;
        top: 40%;
        right: 9%;
        width: 6rem;
        height: 6rem;
        transform: rotate(35deg);

        @media only screen and (max-width: 850px) {
            top: 11%;
        }
    }

    .cross-full-small {
        position: absolute;
        top: 48%;
        right: 16%;
        width: 2.1rem;
        height: 2.1rem;
        transform: rotate(41deg);

        @media only screen and (max-width: 850px) {
            top: 16%;
            right: 24%;
        }
    }

    // .arrow {
    //     position: absolute;
    //     bottom: 0;
    //     left: 0;
    //     width: 100%;
    //     min-width: 1100px;

    //     @media only screen and (max-width: 1050px) {
    //         left: auto;
    //         right: -50px;
    //     }

    //     @media only screen and (max-width: 850px) {
    //         z-index: 200;

    //         @media only screen and (max-height: 700px) {
    //             bottom: -40px;
    //         }
    //     }

    //     @media only screen and (max-width: 500px) {
    //         right: -80px;
    //     }

    //     @media only screen and (max-width: 450px) {
    //         right: -100px;
    //     }

    //     .arrow-image {
    //         width: 100%;
    //     }

    //     &-transparent {
    //         bottom: 3.6rem;

    //         @media only screen and (max-width: 850px) {

    //             @media only screen and (max-height: 700px) {
    //                 bottom: -13px;
    //             }
    //         }
    //     }
    // }
}
</style>