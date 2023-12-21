<script setup lang="ts">
import { onMounted, watch } from 'vue';
import { gsap, Power1 } from 'gsap';
import { storeToRefs } from 'pinia';
import { useBaseStore } from '@/stores';

const props = defineProps(["additionalLink"]);

const baseStore = useBaseStore();
const { startLandingCountriesAnimation } = storeToRefs(baseStore);

const linesAnimation = (): void => {
    const baseFontSizeString = getComputedStyle(document.querySelector('html')!).fontSize;
    const baseFontSize = +baseFontSizeString.substring(0, baseFontSizeString.length - 2);
    let vw = window.innerWidth / 100;
    let vh = window.innerHeight / 100;

    gsap.to('.countries-line.to-left', {duration: 40, repeat: -1, yoyo: true, ease: Power1.easeInOut, x: -230 * baseFontSize})
    gsap.from('.countries-line.to-right', {duration: 40, repeat: -1, yoyo: true, ease: Power1.easeInOut, x: -240 * baseFontSize})
};

watch(startLandingCountriesAnimation, (newValue) => {
    if (startLandingCountriesAnimation.value) {
        setTimeout(() => {
            linesAnimation();
        }, 1000)
    }
})

onMounted(() => {
    linesAnimation();
})
</script>

<template>
    <section class="section section-countries">
        <div class="info">
            <h1 class="title">
                <span class="white-bold">
                    <span class="q">25</span>+ 
                </span>
                <span class="grey-bold"> Countries to </span>
                <br>
                <span class="white"> Choose from</span>
            </h1>
            <router-link :to="`${props.additionalLink || ''}/services`" class="btn-green button-buy">Buy a number</router-link>
        </div>
        <div v-if="startLandingCountriesAnimation" class="countries">
            <div class="countries-line to-left">
                <div class="country">
                    <img src="@/assets/img/Landing/countries/australia.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$15.00 / MONTH</span>
                        <strong class="country-name">Australia</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/austria.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$6.80 / MONTH</span>
                        <strong class="country-name">Austria</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/belgium.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$4.10 / MONTH</span>
                        <strong class="country-name">Belgium</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/canada.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$4.00 / MONTH</span>
                        <strong class="country-name">Canada</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/chile.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$7.00 / MONTH</span>
                        <strong class="country-name">Chile</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/sweden.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$9.60 / MONTH</span>
                        <strong class="country-name">Sweden</strong>
                    </div>
                </div>
                

                <div class="country">
                    <img src="@/assets/img/Landing/countries/australia.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$15.00 / MONTH</span>
                        <strong class="country-name">Australia</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/austria.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$6.80 / MONTH</span>
                        <strong class="country-name">Austria</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/belgium.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$4.10 / MONTH</span>
                        <strong class="country-name">Belgium</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/canada.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$4.00 / MONTH</span>
                        <strong class="country-name">Canada</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/chile.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$7.00 / MONTH</span>
                        <strong class="country-name">Chile</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/sweden.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$9.60 / MONTH</span>
                        <strong class="country-name">Sweden</strong>
                    </div>
                </div>
                

                <div class="country">
                    <img src="@/assets/img/Landing/countries/australia.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$15.00 / MONTH</span>
                        <strong class="country-name">Australia</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/austria.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$6.80 / MONTH</span>
                        <strong class="country-name">Austria</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/belgium.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$4.10 / MONTH</span>
                        <strong class="country-name">Belgium</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/canada.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$4.00 / MONTH</span>
                        <strong class="country-name">Canada</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/chile.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$7.00 / MONTH</span>
                        <strong class="country-name">Chile</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/sweden.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$9.60 / MONTH</span>
                        <strong class="country-name">Sweden</strong>
                    </div>
                </div>
            </div>
            <div class="countries-line to-right">
                <div class="country">
                    <img src="@/assets/img/Landing/countries/denmark.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$13.00 / MONTH</span>
                        <strong class="country-name">Denmark</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/estonia.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$5.50 / MONTH</span>
                        <strong class="country-name">Estonia</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/finland.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$9.50 / MONTH</span>
                        <strong class="country-name">Finland</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/germany.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$35.40 / MONTH</span>
                        <strong class="country-name">Germany</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/hongkong.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$9.60 / MONTH</span>
                        <strong class="country-name">Hong Kong</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/switzerland.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$11.80 / MONTH</span>
                        <strong class="country-name">Switzerland</strong>
                    </div>
                </div>
                

                <div class="country">
                    <img src="@/assets/img/Landing/countries/denmark.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$13.00 / MONTH</span>
                        <strong class="country-name">Denmark</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/estonia.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$5.50 / MONTH</span>
                        <strong class="country-name">Estonia</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/finland.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$9.50 / MONTH</span>
                        <strong class="country-name">Finland</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/germany.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$35.40 / MONTH</span>
                        <strong class="country-name">Germany</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/hongkong.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$9.60 / MONTH</span>
                        <strong class="country-name">Hong Kong</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/switzerland.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$11.80 / MONTH</span>
                        <strong class="country-name">Switzerland</strong>
                    </div>
                </div>
                

                <div class="country">
                    <img src="@/assets/img/Landing/countries/denmark.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$13.00 / MONTH</span>
                        <strong class="country-name">Denmark</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/estonia.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$5.50 / MONTH</span>
                        <strong class="country-name">Estonia</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/finland.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$9.50 / MONTH</span>
                        <strong class="country-name">Finland</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/germany.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$35.40 / MONTH</span>
                        <strong class="country-name">Germany</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/hongkong.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$9.60 / MONTH</span>
                        <strong class="country-name">Hong Kong</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/switzerland.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$11.80 / MONTH</span>
                        <strong class="country-name">Switzerland</strong>
                    </div>
                </div>
            </div>
            <div class="countries-line to-left">
                <div class="country">
                    <img src="@/assets/img/Landing/countries/ireland.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$9.50 / MONTH</span>
                        <strong class="country-name">Ireland</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/israel.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$17.60 / MONTH</span>
                        <strong class="country-name">Israel</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/italy.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$29.00 / MONTH</span>
                        <strong class="country-name">Italy</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/lithuania.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$7.00 / MONTH</span>
                        <strong class="country-name">Lithuania</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/netherlands.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$7.00 / MONTH</span>
                        <strong class="country-name">Netherlands</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/uk.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$4.10 / MONTH</span>
                        <strong class="country-name">United Kingdom</strong>
                    </div>
                </div>
                

                <div class="country">
                    <img src="@/assets/img/Landing/countries/ireland.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$9.50 / MONTH</span>
                        <strong class="country-name">Ireland</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/israel.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$17.60 / MONTH</span>
                        <strong class="country-name">Israel</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/italy.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$29.00 / MONTH</span>
                        <strong class="country-name">Italy</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/lithuania.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$7.00 / MONTH</span>
                        <strong class="country-name">Lithuania</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/netherlands.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$7.00 / MONTH</span>
                        <strong class="country-name">Netherlands</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/uk.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$4.10 / MONTH</span>
                        <strong class="country-name">United Kingdom</strong>
                    </div>
                </div>
                

                <div class="country">
                    <img src="@/assets/img/Landing/countries/ireland.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$9.50 / MONTH</span>
                        <strong class="country-name">Ireland</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/israel.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$17.60 / MONTH</span>
                        <strong class="country-name">Israel</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/italy.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$29.00 / MONTH</span>
                        <strong class="country-name">Italy</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/lithuania.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$7.00 / MONTH</span>
                        <strong class="country-name">Lithuania</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/netherlands.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$7.00 / MONTH</span>
                        <strong class="country-name">Netherlands</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/uk.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$4.10 / MONTH</span>
                        <strong class="country-name">United Kingdom</strong>
                    </div>
                </div>
            </div>
            <div class="countries-line to-right">
                <div class="country">
                    <img src="@/assets/img/Landing/countries/norway.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$15.30 / MONTH</span>
                        <strong class="country-name">Norway</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/puertorico.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$5.80 / MONTH</span>
                        <strong class="country-name">Puerto Rico</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/slovakia.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$13.00 / MONTH</span>
                        <strong class="country-name">Slovakia</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/southkorea.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$5.80 / MONTH</span>
                        <strong class="country-name">South Korea</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/spain.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$8.30 / MONTH</span>
                        <strong class="country-name">Spain</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/usa.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$4.00 / MONTH</span>
                        <strong class="country-name">United States</strong>
                    </div>
                </div>
                

                <div class="country">
                    <img src="@/assets/img/Landing/countries/norway.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$15.30 / MONTH</span>
                        <strong class="country-name">Norway</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/puertorico.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$5.80 / MONTH</span>
                        <strong class="country-name">Puerto Rico</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/slovakia.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$13.00 / MONTH</span>
                        <strong class="country-name">Slovakia</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/southkorea.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$5.80 / MONTH</span>
                        <strong class="country-name">South Korea</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/spain.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$8.30 / MONTH</span>
                        <strong class="country-name">Spain</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/usa.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$4.00 / MONTH</span>
                        <strong class="country-name">United States</strong>
                    </div>
                </div>
                

                <div class="country">
                    <img src="@/assets/img/Landing/countries/norway.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$15.30 / MONTH</span>
                        <strong class="country-name">Norway</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/puertorico.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$5.80 / MONTH</span>
                        <strong class="country-name">Puerto Rico</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/slovakia.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$13.00 / MONTH</span>
                        <strong class="country-name">Slovakia</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/southkorea.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$5.80 / MONTH</span>
                        <strong class="country-name">South Korea</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/spain.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$8.30 / MONTH</span>
                        <strong class="country-name">Spain</strong>
                    </div>
                </div>
                <div class="country">
                    <img src="@/assets/img/Landing/countries/usa.png" alt="" class="flag">
                    <div class="country-info">
                        <span class="price">$4.00 / MONTH</span>
                        <strong class="country-name">United States</strong>
                    </div>
                </div>
            </div>
        </div>
        <img src="@/assets/svg/Landing/CrossTransparent.svg" alt="" class="cross-transparent mobile">
        <img src="@/assets/svg/Landing/CrossTransparent2.svg" alt="" class="cross-transparent desktop">
        <img src="@/assets/svg/Landing/Cross.svg" alt="" class="cross-full-big">
        <img src="@/assets/svg/Landing/Cross.svg" alt="" class="cross-full-small">
    </section>
</template>

<style lang="scss" scoped>
.section-countries {
    position: relative;
    z-index: 1000;
    height: auto;
    min-height: 127rem;
    padding-top: 15rem;
    // overflow: hidden;

    .info {
        position: relative;
        z-index: 100;
        text-align: center;
        margin-bottom: 7rem;

        @media only screen and (max-width: 850px) {
            margin-bottom: 11rem;
        }

        .title {
            font-weight: 900;
            font-size: 7rem;
            text-transform: uppercase;
            line-height: 1;
            margin-bottom: 2rem;

            @media only screen and (max-width: 550px) {
                font-size: 35px;
                margin-bottom: 3rem;
            }

            @media only screen and (max-width: 380px) {
                font-size: 32px;
            }

            .white-bold {
                font-style: italic;

                .q {
                    display: inline-block;
                    position: relative;
                    padding-right: 1.2rem;
                    padding-top: .7rem;
                    color: var(--color-black);

                    &::before {
                        content: '';
                        display: inline-block;
                        @include abs-center;
                        transform: translate(-50%, -50%) rotate(4.5deg);
                        background-color: var(--color-green-light);
                        width: 10.5rem;
                        height: 7.5rem;
                        z-index: -1;

                        @media only screen and (max-width: 550px) {
                            width: 51px;
                            // height: 35px;
                            top: 45%;
                            height: 42px;
                        }
                    }
                }
            }

            .grey-bold {
                color: var(--color-grey-2);
            }

            .white {
                font-style: italic;
                font-weight: 300;
            }
        }

        .button-buy {
            font-size: 2.1rem;
            width: 25rem;

            @media only screen and (max-width: 850px) {
                font-size: 18px;
            }
        }
    }

    .countries {
        position: relative;
        z-index: 100;
        transform: rotate(3deg);

        .countries-line {
            display: flex;

            &:not(:last-of-type) {
                margin-bottom: 9rem;
            }


            .country {
                display: flex;
                align-items: center;
                // min-width: 34rem;
                flex-grow: 1;

                &:not(:last-of-type) {
                    margin-right: 5rem;
                }

                .flag {
                    width: 10rem;
                    height: 10rem;
                    border-radius: 100%;
                    margin-right: 1.6rem;  
                }

                &-info {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    flex-grow: 1;

                    .price {
                        color: var(--color-green-light);
                        font-size: 1.5rem;
                        display: inline-block;
                        border: 1px solid var(--color-green-light);
                        border-radius: 100rem;
                        padding: .6rem 1.4rem;
                        margin-bottom: 1rem;
                        white-space: nowrap;
                    }

                    .country-name {
                        font-weight: 700;
                        font-size: 3.6rem;
                        white-space: nowrap;
                    }
                }
            }
        }
    }

    .cross-transparent {
        position: absolute;
        top: 30rem;
        right: 10.5%;
        width: 10rem;

        @media only screen and (max-width: 850px) {
            width: 4rem;
            transform: rotate(-17deg);
            top: 34rem;
        }
    }

    .cross-full-big {
        position: absolute;
        top: 15rem;
        left: 7%;
        width: 6rem;
        transform: rotate(12deg);

        @media only screen and (max-width: 850px) {
            width: 4rem;
            top: 5rem;
        }
    }

    .cross-full-small {
        position: absolute;
        top: 23rem;
        left: 12%;
        width: 2.1rem;
        transform: rotate(19deg);

        @media only screen and (max-width: 850px) {
            top: 10rem;
            left: 17%;
        }
    }
}
</style>