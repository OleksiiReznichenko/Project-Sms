<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { gsap } from 'gsap';
import { useRoute } from 'vue-router';

const route = useRoute();
const animationFinishedIndicator = ref<boolean>(false);
const preloaderTimeline = gsap.timeline({});

const timeout1 = ref<ReturnType<typeof setTimeout>>();
const timeout2 = ref<ReturnType<typeof setTimeout>>();

// watch(route, () => {
//     if (route.name === 'home' || route.name === 'ambassadors' || route.name?.toString().includes('course')) {
//         // console.log('ROUTE CHANGE')
//         clearTimeout(timeout1.value);
//         clearTimeout(timeout2.value);
//         preloaderTimeline
//         .to(
//             ".preloader .preloader__text",
//             { duration: 0.01, color: 'transparent', ease: "linear" },
//             0
//         )
//         .to(
//             ".preloader .preloader__description",
//             { duration: 0.01, opacity: 0, ease: "linear" },
//             0
//         )
//         .to(
//             ".preloader",
//             { duration: 0.01, autoAlpha: 1, ease: "linear" },
//             0
//         )
//         .to("html", { duration: 0, overflowY: "hidden" }, 0);
//         animationFinishedIndicator.value = false;
//         setTimeout(() => {
//             // initAnimation();
//         }, 300);
//     }
// })

// END PRELOADER ANIMATION AND CLOSE IT
const initAnimation = (): void => {
    const vh = window.innerHeight / 100;
    const vw = window.innerWidth / 100;

    let BorderRadiusFace: string | number = '8rem';

    if (window.innerWidth < 1400) {
        BorderRadiusFace = 80;
    }

    preloaderTimeline
    .from('.preloader .face', {duration: 1.25, opacity: .5, height: '60rem', y: '50rem'}, 0)
    .from('.preloader .face .eye', {duration: 1.25, height: '12rem', borderRadius: BorderRadiusFace}, 0)
    .to('.preloader .face', {duration: 1.25, delay: 1.25, scale: 8, y: 50 * vh}, 0)
    // .to('.face', {duration: 1.25, delay: 1.25, width: 110 * vw, height: 110 * vw, borderRadius: 20 * vw, y: 50 * vh}, 0)
    .to('.preloader .face .eye', {duration: .8, delay: 2.5, scale: 3, borderRadius: '1rem'}, 0)
    .to('.preloader .face .eye-1', {duration: .8, delay: 2.5, x: '-8rem'}, 0)
    .to('.preloader .face .eye-2', {duration: .8, delay: 2.5, x: '8rem'}, 0)
    .to('.preloader', {duration: .5, delay: 2.8, autoAlpha: 0}, 0)
    .to('.preloader-1', {duration: .5, delay: 1.5, autoAlpha: 0}, 0)
    .to("html", { duration: 0, overflowY: "visible", delay: 2.8 }, 0);
}

onMounted(() => {
    const html = document.querySelector('html')!;
    html.style.overflowY = 'hidden';
    initAnimation();
})
</script>

<template>
    <div :class="{'preloader__animation': !animationFinishedIndicator}" class="preloader">
        <div class="face">
            <div class="eye eye-1"></div>
            <div class="eye eye-2"></div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.preloader.preloader__animation {

    // .preloader__center {

    //     .preloader__title {

    //         .preloader__text.preloader__text-first {
    //             &::before {
    //                 animation: textFilling 1.25s .25s linear forwards;
    //             }
    //         }

    //         .preloader__text.preloader__text-second {
    //             &::before {
    //                 animation: textFilling 1.5s 1.5s linear forwards;
    //             }
    //         }
    //     }

    //     .preloader__description {
    //         animation: toOpacity .3s 3s linear forwards;
    //     }
    // }
}
.preloader {
    @include flex-center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: var(--app-height);
    z-index: 1000000;
    background-color: #000;

    .face {
        // width: 33rem;
        // height: 33rem;
        width: 20vw;
        height: 20vw;
        background-color: var(--color-green-light);
        // border-radius: 19rem;
        border-radius: 15vw;
        position: relative;
        overflow: hidden;

        @media only screen and (max-width: 1400px) {
            width: 330px;
            height: 330px;
            border-radius: 190px;
        }

        .eye {
            position: absolute;
            background-color: #0f0f0f;
            top: 4.5vw;
            height: 3.6vw;
            border-radius: 3vw;

            @media only screen and (max-width: 1400px) {
                top: 85px;
                height: 60px;
                border-radius: 30px;
            }

            &-1 {
                width: 6.4vw;
                left: 3.5vw;

                @media only screen and (max-width: 1400px) {
                    width: 100px;
                    left: 61px;
                }
            }

            &-2 {
                width: 5.7vw;
                right: 3.5vw;

                @media only screen and (max-width: 1400px) {
                    width: 90px;
                    right: 61px;
                }
            }
        }
    }
}

@keyframes textFilling {
  0% {
    width: 0%;
  }
  100% {
    width: 100%;
  }
}

@keyframes toOpacity {
  100% {
    opacity: 1;
  }
}
</style>