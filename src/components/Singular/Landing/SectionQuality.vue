<script setup lang="ts">
const props = defineProps(["additionalLink"]);

</script>

<template>
    <section class="section section-quality">
        <div class="inner-container">
            <div class="info">
                <h1 class="title">
                    <span class="grey-bold">
                        <span class="h">H</span>igh
                    </span>
                    <span class="white-bold">Quality </span>
                    <span class="white"> Sms <br> Verification</span>
                </h1>
                <div class="flex-container">
                    <div class="icons">
                        <img src="@/assets/svg/Landing/TickGreenCircle.svg" alt="" class="icon">
                        <img src="@/assets/svg/Landing/EmojiRed.svg" alt="" class="icon icon-red">
                    </div>
                    <p class="description">
                        At QUICK SMS we are proud of the quality we're providing to our customers with SMS verifications. <br> <br>
                        We make sure that our users are working with only non-VOIP phone numbers so they can be accepted by any service.
                    </p>
                </div>
                <div class="buttons">
                    <router-link :to="`${props.additionalLink || ''}/services`" class="btn-green button">Buy a number</router-link>
                    <router-link to="/registration" class="btn-transparent-green button">Register</router-link>
                </div>
            </div>
            <div class="blocks-composition desktop">
                <div class="block-1">
                    <img src="@/assets/svg/Landing/SectionQualityBlockEmoji.svg" alt="" class="block-image desktop">
                    <img src="@/assets/svg/Landing/SectionQualityBlockEmojiMobile.svg" alt="" class="block-image mobile">
                </div>
                <div class="block-2">
                    <img src="@/assets/svg/Landing/CrossTransparent.svg" alt="" class="cross">
                    <p class="description">
                        Custom numbers are important for your privacy
                    </p>
                </div>
                <div class="block-3">
                    <img src="@/assets/svg/Landing/SectionQualityBlockWhite.svg" alt="" class="block-image desktop">
                    <img src="@/assets/svg/Landing/SectionQualityBlockWhiteMobile.svg" alt="" class="block-image mobile">
                </div>
            </div>
            <img src="@/assets/svg/Landing/BlocksCompositionMobile.svg" alt="" class="blocks-composition mobile">
        </div>
    </section>
</template>

<style lang="scss" scoped>
.section-quality {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1100;

    @media only screen and (max-width: 850px) {
        position: relative;
        top: auto;
        left: auto;
    }

    .inner-container {
        @include width-restriction;
        position: relative;
        height: 100%;

        .info {
            position: absolute;
            top: 55%;
            left: 0;
            transform: translateY(-50%);
            width: 72rem;

            @media only screen and (max-width: 1100px) and (min-width: 850px) {
                width: 66rem;
            }

            @media only screen and (max-width: 850px) {
                transform: none;
                top: 15%;
                width: 56rem;
                left: auto;
                right: 0;

                @media only screen and (max-height: 850px) {
                    top: 12%;
                }
            }

            @media only screen and (max-width: 500px) {
                width: 350px;
            }

            @media only screen and (max-height: 750px) and (max-width: 400px) {
                top: 10%;
            }

            .title {
                font-weight: 900;
                font-size: 7rem;
                text-transform: uppercase;
                text-align: right;
                line-height: 1;
                margin-bottom: 2.5rem;

                @media only screen and (max-width: 1100px) and (min-width: 850px) {
                    font-size: 6.5rem;
                }

                @media only screen and (max-width: 850px) {
                    font-size: 5.4rem;
                }

                @media only screen and (max-width: 500px) {
                    font-size: 34px;
                }

                @media only screen and (max-width: 390px) {
                    font-size: 31px;
                }

                .grey-bold {
                    font-style: italic;
                    color: var(--color-grey-2);

                    .h {
                        display: inline-block;
                        position: relative;
                        padding-right: 1rem;
                        padding-top: .4rem;
                        color: var(--color-black);

                        @media only screen and (max-width: 500px) {
                            // padding-top: 8px;
                        }

                        &::before {
                            content: '';
                            display: inline-block;
                            @include abs-center;
                            transform: translate(-50%, -50%) rotate(4.5deg);
                            background-color: var(--color-green-light);
                            width: 7rem;
                            height: 7.8rem;
                            z-index: -1;

                            @media only screen and (max-width: 850px) {
                                width: 6rem;
                                height: 6.7rem;
                            }

                            @media only screen and (max-width: 500px) {
                                width: 35px;
                                // height: 37px;
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
                justify-content: space-between;
            }

            .icons {
                display: flex;
                align-items: center;

                @media only screen and (max-width: 850px) {
                    flex-direction: column;
                    margin-left: 40px;
                }

                @media only screen and (max-width: 500px) {
                    margin-left: 20px;
                }

                .icon {
                    width: 9.5rem;
                    height: 9.5rem;

                    &:not(:first-of-type) {
                        margin-left: -3.3rem;

                        @media only screen and (max-width: 850px) {
                            margin-left: 0;
                            margin-top: -2rem;
                        }
                    }
                }
            }

            .description {
                font-size: 1.8rem;
                width: 49rem;
                margin-bottom: 3.3rem;
                margin-right: -1rem;

                @media only screen and (max-width: 850px) {
                    font-size: 16px;
                    width: 250px;
                }
            }

            .buttons {
                display: flex;
                justify-content: flex-end;

                @media only screen and (max-width: 850px) {
                    flex-direction: column;
                    align-items: flex-end;
                }

                .button {
                    font-size: 2.1rem;
                    padding: 1.2rem 5.5rem;
                    width: 23rem;

                    @media only screen and (max-width: 850px) {
                        font-size: 17px;
                        width: 250px;
                    }

                    &:not(:last-of-type) {
                        margin-right: 1.7rem;

                        @media only screen and (max-width: 850px) {
                            margin-right: 0;
                            margin-bottom: 10px;
                        }
                    }
                }
            }
        }

        .blocks-composition {
            width: 100rem;
            // width: 90rem;
            height: 93rem;
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            grid-template-rows: repeat(4, 25%);
            grid-gap: 4.2rem;
            position: absolute;
            top: -9rem;
            left: 65rem;
            transform: scale(.8);

            @media only screen and (max-width: 1300px) {
                left: 62rem;
                top: 50%;
                transform: translateY(-50%) scale(.75);
            }

            @media only screen and (max-width: 1100px) and (min-width: 850px) {
                left: 57rem;
            }

            @media only screen and (max-width: 850px) {
                top: auto;
                // bottom: -3rem;
                // bottom: -16%;
                bottom: -24vw;
                left: 50%;
                transform: translateX(-50%);
                // height: 54rem;
                height: auto;
                width: 90%;
                // grid-template-columns: repeat(4, 1fr);
                // grid-template-rows: repeat(2, 50%);
                display: block;

                @media only screen and (max-height: 900px) {
                    bottom: -32vw;
                }

                @media only screen and (max-height: 850px) {
                    bottom: -34vw;
                }

                @media only screen and (max-height: 800px) {
                    bottom: -37vw;
                }

                @media only screen and (max-height: 750px) and (min-width: 400px) {
                    bottom: -42vw;
                }

                @media only screen and (max-height: 700px) and (min-width: 400px) {
                    bottom: -48vw;
                }
            }

            @media only screen and (min-width: 1900px) {
                // width: 100rem;
                // height: 93rem;
                // top: 0;
                // left: 75rem;
                width: 100rem;
                height: 93rem;
                top: -5rem;
                left: 70rem;
                transform: scale(.9);
            }

            @media only screen and (min-width: 1900px) and (min-height: 1050px) {
                top: 50%;
                transform: translateY(-50%) scale(.9);
            }
            
            .flex-container {
                display: flex;
                margin-top: 2rem;
            }

            .block-image {
                width: 100%;
                // height: 100%;
            }

            .block-1 {
                grid-row: 1 / 4;
                grid-column: 1 / 2;

                @media only screen and (max-width: 850px) {
                    grid-row: 2 / -1;
                    grid-column: 2 / -1;
                    transform: rotate(-90deg);
                    position: absolute;
                    top: 100%;
                    right: -5rem;
                    height: 70rem;
                    
                    .block-image {
                        height: 100%;
                    }
                }
            }

            .block-2 {
                grid-row: 4 / -1;
                grid-column: 1 / 2;
                background-color: var(--color-black);
                border: .5rem solid var(--color-grey);
                border-radius: 0 0 10rem 0;
                padding: 3.7rem 5.5rem;
                margin-top: -11rem;
                margin-bottom: 13rem;

                @media only screen and (max-width: 850px) {
                    grid-row: 2 / -1;
                    grid-column: 1 / 2;
                    margin: 0;
                    transform: rotate(-90deg);
                    // border-radius: 0 10rem 0 0;
                    // margin-top: 20rem;
                    position: absolute;
                    top: 113%;
                    left: -15rem;
                }

                .cross {
                    width: 3.5rem;
                    height: 3.5rem;
                    transform: rotate(-14deg);
                    margin-bottom: 3.3rem;
                }

                .description {
                    font-family: Bison;
                    font-weight: 400;
                    font-size: 2.6rem;
                    width: 30rem;

                    @media only screen and (max-width: 850px) {
                        width: auto;
                    } 
                }
            }

            .block-3 {
                grid-row: 1 / -1;
                grid-column: 2 / -1;

                @media only screen and (max-width: 850px) {
                    grid-row: 1 / 2;
                    grid-column: 1 / -1;
                }
            }
        }
    }
}
</style>