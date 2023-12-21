<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { gsap, Back } from 'gsap';
import axios from 'axios';
import { useBaseStore } from '@/stores/index';
import { useUserStore } from '@/stores/user';
import AppNav from '@/components/Singular/App/Nav.vue';
import NavMenu from '@/components/Singular/App/NavMenu.vue';
import Preloader from '@/components/Singular/App/Preloader.vue';

import LandingHeader from '@/components/Singular/Landing/Header.vue';
import SectionQuality from '@/components/Singular/Landing/SectionQuality.vue';
import SectionSupport from '@/components/Singular/Landing/SectionSupport.vue';
import SectionFromUs from '@/components/Singular/Landing/SectionFromUs.vue';
import SectionSteps from '@/components/Singular/Landing/SectionSteps.vue';
import SectionReviews from '@/components/Singular/Landing/SectionReviews.vue';
import SectionCountries from '@/components/Singular/Landing/SectionCountries.vue';
import SectionSounds from '@/components/Singular/Landing/SectionSounds.vue';
import AppFooter from '@/components/Singular/App/Footer.vue';
import { storeToRefs } from 'pinia';

const additionalLink = ref('');
const user = useUserStore();

const userChecker = () => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getAccount`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {
        if (res.data.account.status === 'user') additionalLink.value = '/main';
        else additionalLink.value = '';
        user.setUser(res.data.account);
        console.log(res);
    }).catch(function (err) {
        console.log(err);
    });
}


const baseStore = useBaseStore();
const { startLandingCountriesAnimation } = storeToRefs(baseStore);

const initialWindowWidth = ref<number>(0);

const onResize = (): void => {
    // RELOAD PAGE ON RESIZE
    const newWindowWidth = Math.abs(initialWindowWidth.value - window.outerWidth);
    if (newWindowWidth < 100) return;
    location.reload();
};

const afterLoad = (): void => {
    gsap.from('.header .message-discord', { duration: .7, delay: 2.7, autoAlpha: 0 })
    gsap.from('.header .message-steam', { duration: .7, delay: 2.8, autoAlpha: 0 })
    gsap.from('.header .message-tinder', { duration: .7, delay: 2.9, autoAlpha: 0 })
    gsap.from('.header .message-uber', { duration: .7, delay: 3, autoAlpha: 0 })
    gsap.from('.header .message-twitter', { duration: .7, delay: 3.1, autoAlpha: 0 })
    gsap.from('.header .message-google', { duration: .7, delay: 3.2, autoAlpha: 0 })
};

const initAnimation = (): void => {

    let windowWidth = window.innerWidth;
    let windowHeight = window.innerHeight;

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // CSS UNITS IN PIXELS
    const baseFontSizeString = getComputedStyle(document.querySelector('html')!).fontSize;
    const baseFontSize = +baseFontSizeString.substring(0, baseFontSizeString.length - 2);
    let vw = windowWidth / 100;
    let vwRestricted = windowWidth / 100;
    let vh = windowHeight / 100;

    if (windowWidth > 1950) {
        vwRestricted = 1920 / 100;
    }

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // TIMELINE END
    let scrollTimelineEnd = 'top -860%';

    if (navigator.userAgent.match(/firefox|fxios/i)) {
        // scrollTimelineEnd = 'top -9500px';
        scrollTimelineEnd = 'top -900%';
    }

    if (windowWidth < 850 || baseStore.isTouchDevice()) {
        // scrollTimelineEnd = 'top -6200px';
        scrollTimelineEnd = 'top -4700px';
    }

    let scrollTimelineTrigger = '.animation-block-mobile';

    if (window.innerWidth < 850) {
        scrollTimelineTrigger = '.animation-block-mobile';
    }

    gsap.to('.section-quality .info .icon-red', { duration: 1, repeatDelay: 1.3, rotate: 180, yoyo: true, repeat: -1, ease: Back.easeInOut })

    ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    // GSAP TIMELINE
    const timeline = gsap.timeline({
        scrollTrigger: {
            trigger: scrollTimelineTrigger,
            start: 'top 0%',
            end: scrollTimelineEnd,
            scrub: 1,
            pin: scrollTimelineTrigger,
            onUpdate: self => {
                const scrollPercentage = self.progress;

                if (scrollPercentage > .9) {
                    startLandingCountriesAnimation.value = true;
                } else {
                    startLandingCountriesAnimation.value = false;
                }
            }
        }
    })

    if (windowWidth > 850) {
        const timeline2 = gsap.timeline({
            scrollTrigger: {
                trigger: '.animation-block',
                start: 'top 0%',
                end: 'top -90%',
                scrub: 1,
            }
        })
        let YSectionQualityBlock3 = -155 * vh - 100 * baseFontSize;
        
        timeline2
            .add('header-animation')
            // .to('.header', { duration: 1, y: -105 * vh, ease: 'linear' }, 'header-animation')
            // .from('.section-quality', { duration: 1, y: 105 * vh, ease: 'linear' }, 'header-animation')
            .from('.section-quality .block-3', { duration: 1, y: YSectionQualityBlock3, ease: 'linear' }, 'header-animation')
            .from('.section-quality .info', { duration: 1, y: 31 * vh }, 'header-animation')
            .from('.section-quality .info .description', { duration: 1, y: 12 * vh }, 'header-animation')
            .from('.section-quality .info .buttons', { duration: 1, y: 12 * vh }, 'header-animation')

        timeline
            .add('section-support-animation')
            .to('.section-quality', { duration: 1, x: -110 * vw, scale: .7, ease: 'linear' }, 'section-support-animation')
            .from('.section-support', { duration: 1, x: 100 * vw, ease: 'linear' }, 'section-support-animation')
            .from('.section-support .info', { duration: .7, delay: .3, x: 15 * vw }, 'section-support-animation')
            .from('.section-support .info .description', { duration: .7, delay: .3, x: 10 * vw }, 'section-support-animation')
            // .from('.section-support .icon', {duration: .7, delay: .3, y: 110 * vh, ease: 'linear' }, 'section-support-animation')
            .from('.section-support .icon-big', { duration: .6, delay: .4, y: 130 * vh, ease: 'linear' }, 'section-support-animation')
            .from('.section-support .icon-small', { duration: .7, delay: .3, y: 105 * vh, ease: 'linear' }, 'section-support-animation')
            .from('.section-support .icon-medium', { duration: .7, delay: .3, y: 115 * vh, ease: 'linear' }, 'section-support-animation')

            .add('section-from-us-animation')
            .from('.section-from-us', { duration: .1, autoAlpha: 0, ease: 'linear' }, 'section-from-us-animation+=.1')
            .to('.section-support', { duration: 1, x: -110 * vw, ease: 'linear' }, 'section-from-us-animation+=.1')
            .from('.section-from-us', { duration: 1, x: 100 * vw, ease: 'linear' }, 'section-from-us-animation+=.1')
            .from('.section-from-us .cross', { duration: .6, delay: .6, x: 50 * vw, y: 10 * vh }, 'section-from-us-animation+=.1')
            .from('.section-from-us .info .title', { duration: 1, delay: .2, x: 100 * vw }, 'section-from-us-animation+=.1')
            .from('.section-from-us .info .description', { duration: 1, delay: .2, x: 120 * vw }, 'section-from-us-animation+=.1')
            .from('.section-from-us .info .button-container', { duration: .7, delay: .5, x: -50 * vw }, 'section-from-us-animation+=.1')
            .from('.section-steps .arrow-animation', { duration: .7, delay: .7, y: 50 * vw, ease: 'linear' }, 'section-from-us-animation+=.1')
            // .from('.section-from-us .arrow-transparent', { duration: .5, delay: .9, y: 50 * vw, ease: 'linear' }, 'section-from-us-animation+=.1')
            .from('.section-from-us .title-big', { duration: .7, delay: .7, y: -90 * vh, ease: 'linear' }, 'section-from-us-animation+=.1')
            .from('.section-from-us .title-big', { duration: .4, delay: 1, rotate: 0, ease: 'linear' }, 'section-from-us-animation+=.1')
            .from('.section-steps', { duration: .05, delay: .7, autoAlpha: 0, ease: 'linear' }, 'section-from-us-animation+=.1')

            .add('section-steps-animation')
            .from('.section-steps', { duration: 1, y: 100 * vh, ease: 'linear' }, 'section-steps-animation')
            .to('.section-from-us', { duration: .95, y: -100 * vh, ease: 'linear' }, 'section-steps-animation')
            .to('.section-from-us .info', { duration: 1, y: -20 * vh, ease: 'linear' }, 'section-steps-animation')
            .to('.section-from-us .title-big', { duration: 1, y: -20 * vh, ease: 'linear' }, 'section-steps-animation')
            // .to('.section-from-us .arrow-transparent', { duration: .2, opacity: 0, ease: 'linear' }, 'section-steps-animation')
            .to('.section-from-us .cross', { duration: .2, opacity: 0, ease: 'linear' }, 'section-steps-animation')
            .to('.section-steps .arrow-animation', { duration: .1, delay: 1, autoAlpha: 0, ease: 'linear' }, 'section-steps-animation')
            .to('.section-from-us', { duration: .1, delay: 1, autoAlpha: 0, ease: 'linear' }, 'section-steps-animation')

            .add('section-steps-animation-2')
            .to('.section-steps .block-how', { duration: 1, scale: .7, x: -10 * vw, ease: 'linear' }, 'section-steps-animation-2')
            .to('.section-steps', { duration: 4, delay: 1, x: -330 * baseFontSize + 25 * vw, ease: 'linear' }, 'section-steps-animation-2')

    } else {
        let XSectionSteps = -240 * baseFontSize + 25 * vw;

        // let YSectionFromUsArrows = 60 * vw;
        let YSectionFromUsArrows = '100rem';

        if (window.innerWidth < 500) {
            XSectionSteps = -270 * vw + -3 * 14.5 * baseFontSize + 25 * vw;
            // YSectionFromUsArrows = 70 * vw;
        }

        if (window.innerWidth < 400) {
            // YSectionFromUsArrows = 80 * vw;
        }

        if (window.innerWidth < 370) {
            XSectionSteps = -270 * vw + -3 * 15.1 * baseFontSize + 25 * vw;
        }

        timeline
            // .add('header-animation')
            // .to('.header', {duration: 1, y: -105 * vh, ease: 'linear' }, 'header-animation')
            // .from('.section-quality', {duration: 1, y: 105 * vh, ease: 'linear' }, 'header-animation')
            // .from('.section-quality .blocks-composition', {duration: .7, delay: .3, x: 30 * vw }, 'header-animation')

            .add('section-support-animation')
            // .to('.section-quality', {duration: 1, x: -110 * vw, scale: .7, ease: 'linear' }, 'section-support-animation')
            // .to('.section-quality', {duration: 1, x: -110 * vw, ease: 'linear' }, 'section-support-animation')
            .to('.section-quality', { duration: .7, autoAlpha: 0, ease: 'linear' }, 'section-support-animation')
            .from('.section-support', { duration: 1, x: 100 * vw, ease: 'linear' }, 'section-support-animation')
            .from('.section-support .info', { duration: .7, delay: .3, x: 15 * vw }, 'section-support-animation')
            .from('.section-support .info .description', { duration: .7, delay: .3, x: 10 * vw }, 'section-support-animation')
            // .from('.section-support .icon', {duration: .7, delay: .3, y: 110 * vh, ease: 'linear' }, 'section-support-animation')
            .from('.section-support .icon-big', { duration: .6, delay: .4, y: 130 * vh, ease: 'linear' }, 'section-support-animation')
            .from('.section-support .icon-small', { duration: .7, delay: .3, y: 105 * vh, ease: 'linear' }, 'section-support-animation')
            .from('.section-support .icon-medium', { duration: .7, delay: .3, y: 115 * vh, ease: 'linear' }, 'section-support-animation')

            .add('section-from-us-animation')
            .from('.section-from-us', { duration: .1, autoAlpha: 0, ease: 'linear' }, 'section-from-us-animation+=.1')
            .to('.section-support', { duration: 1, x: -110 * vw, ease: 'linear' }, 'section-from-us-animation+=.1')
            .from('.section-from-us', { duration: 1, x: 100 * vw, ease: 'linear' }, 'section-from-us-animation+=.1')
            .from('.section-from-us .cross', { duration: .6, delay: .6, opacity: 0 }, 'section-from-us-animation+=.1')
            .from('.section-from-us .info .title', { duration: 1, delay: .2, x: 100 * vw }, 'section-from-us-animation+=.1')
            .from('.section-from-us .info .description', { duration: 1, delay: .2, x: 120 * vw }, 'section-from-us-animation+=.1')
            .from('.section-from-us .info .button-container', { duration: .7, delay: .5, x: -100 * vw }, 'section-from-us-animation+=.1')
            // .from('.section-steps .arrow-animation', { duration: .7, delay: .7, y: YSectionFromUsArrows, ease: 'linear' }, 'section-from-us-animation+=.1')
            .fromTo('.section-steps', 
            { duration: .7, delay: .7, y: 100 * baseFontSize + 100 * vh, ease: 'linear' },
            { duration: .7, delay: .7, y: 100 * vh, ease: 'linear' },
             'section-from-us-animation+=.1')
            // .from('.section-from-us .arrow-transparent', { duration: .5, delay: .9, y: YSectionFromUsArrows, ease: 'linear' }, 'section-from-us-animation+=.1')
            .from('.section-from-us .title-big', { duration: .7, delay: .7, y: 90 * vh, ease: 'linear' }, 'section-from-us-animation+=.1')
            .from('.section-from-us .title-big', { duration: .4, delay: 1, rotate: 0, ease: 'linear' }, 'section-from-us-animation+=.1')
            .from('.section-steps', { duration: .05, delay: .7, autoAlpha: 0, ease: 'linear' }, 'section-from-us-animation+=.1')

            .add('section-steps-animation')
            .to('.section-steps', { duration: 1, y: 0, ease: 'linear' }, 'section-steps-animation')
            .to('.section-from-us', { duration: .95, y: -100 * vh, ease: 'linear' }, 'section-steps-animation')
            // .to('.section-from-us .info', { duration: 1, y: -30 * vh, ease: 'linear' }, 'section-steps-animation')
            // .to('.section-from-us .title-big', { duration: 1, y: -30 * vh, ease: 'linear' }, 'section-steps-animation')
            // .to('.section-from-us .arrow-transparent', { duration: .2, opacity: 0, ease: 'linear' }, 'section-steps-animation')
            .to('.section-from-us .cross', { duration: .2, opacity: 0, ease: 'linear' }, 'section-steps-animation')
            .to('.section-steps .arrow-animation', { duration: .1, delay: 1, autoAlpha: 0, ease: 'linear' }, 'section-steps-animation')
            .to('.section-from-us', { duration: .1, delay: 1, autoAlpha: 0, ease: 'linear' }, 'section-steps-animation')

            .add('section-steps-animation-2')
            .to('.section-steps .block-how', { duration: .5, scale: .7, x: -10 * vw, ease: 'linear' }, 'section-steps-animation-2')
            .to('.section-steps', { duration: 2.1, delay: .5, x: XSectionSteps, ease: 'linear' }, 'section-steps-animation-2')

    }
};

onMounted(() => {
    afterLoad();
    initAnimation();
    userChecker();
    initialWindowWidth.value = window.innerWidth;

    // ADD WINDOW EVENT LISTENER
    window.addEventListener('resize', onResize);
})

onUnmounted(() => {
    // REMOVE WINDOW EVENT LISTENER
    window.removeEventListener('resize', onResize);
})
</script>

<template>
    <div class="page page-landing">
        <!-- <Preloader /> -->
        <AppNav />
        <NavMenu />

        <div class="animation-block">
            <!-- <div class="header-section-quality"> -->
            <!-- </div> -->
            <LandingHeader :additionalLink="additionalLink" />
            <div class="animation-block-mobile">
                <SectionQuality :additionalLink="additionalLink" />
                <SectionSupport />
                <SectionFromUs :additionalLink="additionalLink" />
                <SectionSteps />
            </div>
        </div>
        <SectionReviews />
        <SectionCountries :additionalLink="additionalLink" />
        <SectionSounds :additionalLink="additionalLink" />
        <AppFooter :additionalLink="additionalLink" />
    </div>
</template>

<style lang="scss" scoped>
.page-landing {
    overflow: hidden;

    .animation-block-mobile {
        position: relative;
        z-index: 1200;
        width: 100%;
        height: 100vh;
    }
}
</style>