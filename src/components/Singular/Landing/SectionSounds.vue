<script setup lang="ts">
const props = defineProps(["additionalLink"]);

</script>

<template>
    <section class="section section-sounds">
        <div class="inner-container">
            <div class="benefits">
                <div class="benefit">
                    <img src="@/assets/svg/Landing/benefitIcon1.svg" alt="" class="icon">
                    <p class="description">
                        Our users are working with only <span class="green">non-VOIP</span> phone numbers so they are absolutely safe
                    </p>
                </div>
                <div class="benefit">
                    <img src="@/assets/svg/Landing/benefitIcon2.svg" alt="" class="icon">
                    <p class="description">
                        Our numbers are accepted by <span class="green">any service</span> including Google, Twitter and many more
                    </p>
                </div>
                <div class="benefit">
                    <img src="@/assets/svg/Landing/benefitIcon3.svg" alt="" class="icon">
                    <p class="description">
                        Prices start <span class="green">from 2 cents</span> and remain stable even during high demand
                    </p>
                </div>
                <div class="benefit">
                    <img src="@/assets/svg/Landing/benefitIcon4.svg" alt="" class="icon">
                    <p class="description">
                        You can choose a number from any of <span class="green">25+ countries</span> available at the moment
                    </p>
                </div>
            </div>
        </div>
        <div class="sounds-good">
            <div class="info">
                <h1 class="title">Sounds good?</h1>
                <router-link :to="`${props.additionalLink || ''}/services`" class="btn-black button-start">Start now</router-link>
            </div>
        </div>
    </section>
</template>

<style lang="scss" scoped>
.section-sounds {
    background-color: var(--color-green-light);
    height: auto;
    min-height: 100vh;

    .inner-container {
        background-color: var(--color-black);
        border-radius: 0 0 0 7.3rem;
        padding: 13rem 0 8.8rem;
        margin-top: -2rem;

        .benefits {
            @include width-restriction;
            display: flex;

            @media only screen and (max-width: 1400px) {
                display: grid;
                grid-template-columns: repeat(2, 1fr);
                gap: 2.7rem;
            }

            @media only screen and (max-width: 850px) {
                grid-template-columns: 1fr;
            }

            .benefit {
                background-color: #1C1C1C;
                border-radius: 1.8rem 0;
                display: flex;
                align-items: center;
                padding: 2.6rem 1.6rem 2.6rem 1.8rem;

                @media only screen and (min-width: 1400px) {
                    width: 25%;

                    &:not(:last-of-type) {
                        margin-right: 2.7rem;
                    }
                }

                @media only screen and (max-width: 850px) {
                    padding: 25px 19px 20px;
                }

                .icon {
                    width: 3.6rem;
                    margin-right: 1.8rem;
                }

                .description {
                    font-size: 1.8rem;

                    @media only screen and (max-width: 850px) {
                        font-size: 16px;
                    }

                    .green {
                        font-weight: 700;
                        color: var(--color-green-light);
                    }
                }
            }
        }
    }

    .sounds-good {
        position: relative;
        height: 100vh;
        width: 100vw;

        @media only screen and (max-width: 850px) {
            height: 80vh;
            min-height: 85rem;
        }

        @media only screen and (max-width: 450px) {
            height: 70vh;
            min-height: 75rem;
        }
    }

    .info {
        @include abs-center;
        text-align: center;

        .title {
            font-family: PureHeart;
            font-weight: 400;
            // font-size: 33rem;
            font-size: 20vw;
            line-height: .9;
            color: var(--color-black);
            white-space: nowrap;
            margin-bottom: 10rem;

            @media only screen and (min-width: 1900px) {
                font-size: 33rem;
            }

            @media only screen and (max-width: 850px) {
                white-space: unset;
                font-size: 23rem;
                line-height: .8;
                margin-bottom: 12rem;
            }

            @media only screen and (max-width: 450px) {
                font-size: 20rem;
            }
        }

        .button-start {
            font-size: 2.1rem;
            text-transform: uppercase;
            // width: 50rem;
            width: 50%;

            @media only screen and (max-width: 850px) {
                font-size: 18px;
                width: 90%;
            }
        }
    }
}
</style>