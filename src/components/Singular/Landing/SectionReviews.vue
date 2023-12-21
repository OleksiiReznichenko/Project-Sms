<script setup lang="ts">

</script>

<template>
    <section class="section section-reviews">
        <div class="inner-container">
            <div class="info">
                <h1 class="title">
                    <span class="grey-bold">
                        <span class="q">Q</span>uick 
                    </span>
                    <br class="mobile">
                    <span class="white"> And </span>
                    <span class="white-bold"> Reliable</span>
                </h1>
                <div class="flex-container">
                    <span class="check">Check us on </span>
                    <a href="https://www.trustpilot.com" target="_blank" class="flex-container link">
                        <img src="@/assets/img/Landing/trustpilotStar.png" alt="" class="star">
                        <span class="trustpilot">Trustpilot</span>
                    </a>
                </div>
            </div>
            <div class="reviews">
                <div class="review">
                    <div class="review-body">
                        <img src="@/assets/svg/Landing/reviewBorder.svg" alt="" class="review-border review-svg">
                        <img src="@/assets/img/Landing/reviewBorder.png" alt="" class="review-border review-png">
                        <span class="icon">"</span>
                        <div class="review-info">
                            <h3 class="title">Cheap and quick</h3>
                            <p class="description">
                                Cheap af numbers, works great on all services (tried tinder and Google). Took like 5 mins to get a number AND register
                            </p>
                            <strong class="green-background">Superlike</strong>
                        </div>
                    </div>
                    <div class="publication-info">
                        <img src="@/assets/img/Landing/reviewAvatar1.png" alt="" class="avatar">
                        <div class="username-container">
                            <strong class="username">Heavenly</strong>
                            <div class="flex-container">
                                <img src="@/assets/svg/Landing/calendar.svg" alt="" class="icon">
                                <span class="date">11 Jan, 2023</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="review">
                    <div class="review-body">
                        <img src="@/assets/svg/Landing/reviewBorder.svg" alt="" class="review-border review-svg">
                        <img src="@/assets/img/Landing/reviewBorder.png" alt="" class="review-border review-png">
                        <span class="icon">"</span>
                        <div class="review-info">
                            <h3 class="title">Wasn’t scam</h3>
                            <p class="description">
                                Many countries available, nice cabinet (great design btw the best i’ve ever seen for such service), 
                                speed is good. registered successfully (Uber and Discord, hi midjourney xOxO)                            
                            </p>
                        </div>
                    </div>
                    <div class="publication-info">
                        <img src="@/assets/img/Landing/reviewAvatar2.png" alt="" class="avatar">
                        <div class="username-container">
                            <strong class="username">L.MCKING</strong>
                            <div class="flex-container">
                                <img src="@/assets/svg/Landing/calendar.svg" alt="" class="icon">
                                <span class="date">12 Jan, 2023</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="review">
                    <div class="review-body">
                        <img src="@/assets/svg/Landing/reviewBorder.svg" alt="" class="review-border review-svg">
                        <img src="@/assets/img/Landing/reviewBorder.png" alt="" class="review-border review-png">
                        <span class="icon">"</span>
                        <div class="review-info">
                            <h3 class="title">THE BEST. DOT</h3>
                            <p class="description">
                                My first time using a service like that. Not a fan of sharing personal stuff, cool one can buy 
                                numbers anonymously.
                            </p>
                            <strong class="green-background">10/10 for me</strong>
                        </div>
                    </div>
                    <div class="publication-info">
                        <img src="@/assets/img/Landing/reviewAvatar3.png" alt="" class="avatar">
                        <div class="username-container">
                            <strong class="username">ANDROWN</strong>
                            <div class="flex-container">
                                <img src="@/assets/svg/Landing/calendar.svg" alt="" class="icon">
                                <span class="date">13 Jan, 2023</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <img src="@/assets/svg/Landing/CrossTransparent.svg" alt="" class="cross-transparent">
        <img src="@/assets/svg/Landing/Cross.svg" alt="" class="cross-full-big">
        <img src="@/assets/svg/Landing/Cross.svg" alt="" class="cross-full-small">
    </section>
</template>

<style lang="scss" scoped>
.section-reviews {
    position: relative;
    z-index: 1000;

    @media only screen and (max-width: 850px) {
        height: auto;
        padding-top: 4rem;
    }

    .inner-container {
        @include width-restriction;
        position: relative;
        // height: 100%;

        @media only screen and (min-width: 850px) {
            @include abs-center;
        }

        .info {
            text-align: center;
            margin-bottom: 3.5rem;

            @media only screen and (max-width: 850px) {
                margin-bottom: 40px;
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

                    .q {
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
                align-items: flex-end;
                justify-content: center;
            }

            .flex-container.link {
                padding-bottom: .1rem;
            }

            .check {
                font-size: 1.8rem;
                display: inline-block;
                margin-right: 1.1rem;

                @media only screen and (max-width: 850px) {
                    font-size: 16px;
                }
            }

            .star {
                width: 2.2rem;
                margin-right: .2rem;

                @media only screen and (max-width: 850px) {
                    width: 20px;
                    margin-right: 3px;
                    padding-bottom: 1px;
                }
            }

            .trustpilot {
                font-weight: 500;
                font-size: 1.8rem;
                text-transform: uppercase;
                line-height: .9;

                @media only screen and (max-width: 850px) {
                    font-size: 17px;
                }
            }
        }

        .reviews {
            position: relative;
            z-index: 100;
            display: flex;
            align-items: flex-start;

            @media only screen and (max-width: 850px) {
                align-items: center;
                flex-direction: column;
            }

            .review {
                width: 33%;

                @media only screen and (max-width: 850px) {
                    width: 330px;
                }

                &:not(:last-of-type) {
                    margin-right: 2.6rem;

                    @media only screen and (max-width: 850px) {
                        margin-right: 0;
                        margin-bottom: 5.5rem;
                    }
                }

                &-body {
                    position: relative;
                    width: 100%;
                    height: 25rem;
                    margin-bottom: 2.1rem;

                    @media only screen and (max-width: 850px) {
                        height: 280px;
                    }

                    .review-border {
                        @include abs-center;
                        width: 100%;
                        z-index: -1;

                        @media only screen and (max-width: 1500px) {
                            height: 100%;
                        }

                        &.review-svg {

                            @media only screen and (max-width: 1500px) {
                                display: none;
                            }
                        }

                        &.review-png {

                            @media only screen and (min-width: 1500px) {
                                display: none;
                            }
                        }
                    }
                    
                    .icon {
                        position: absolute;
                        top: 1.25rem;
                        left: 0rem;
                        font-family: PureHeart;
                        color: var(--color-green-light);
                        font-size: 10.3rem;
                        line-height: .8;
                        display: inline-block;
                        width: 6rem;
                        // height: 7rem;
                        height: 4.5rem;
                        @include flex-center;
                        // padding: 1rem;

                        @media only screen and (max-width: 850px) {
                            font-size: 95px;
                            width: 45px;
                            height: 40px;
                            top: 10px;
                            left: 5px;
                        }
                    }

                    .review-info {
                        @include abs-center;
                        width: 82%;
                        top: 43%;
                        left: 52%;

                        .title {
                            font-family: Bison;
                            font-size: 2.8rem;
                            margin-bottom: 1.3rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 32px;
                            }
                        }

                        .description {
                            font-size: 1.5rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 16px;
                            }
                        }

                        .green-background {
                            display: inline-block;
                            position: relative;
                            font-weight: 700;
                            color: var(--color-black);
                            text-transform: uppercase;
                            margin-top: 1rem;

                            &::before {
                                content: '';
                                display: block;
                                @include abs-center;
                                background-color: var(--color-green-light);
                                height: 3.3rem;
                                width: 115%;
                                z-index: -1;
                                transform: translate(-50%, -50%) rotate(2deg);
                            }
                        }
                    }
                }

                .publication-info {
                    display: flex;
                    align-items: center;

                    .avatar {
                        width: 7rem;
                        height: 7rem;
                        border-radius: 100%;
                        margin-right: 2.5rem;
                    }

                    .username-container {


                        .username {
                            font-family: Bison;
                            font-size: 2.8rem;
                            display: inline-block;
                            margin-bottom: .9rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 32px;
                            }
                        }

                        .flex-container {
                            display: flex;
                            align-items: center;
                        }

                        .icon {
                            width: 1.4rem;
                            margin-right: .8rem;

                            @media only screen and (max-width: 850px) {
                                width: 16px;
                            }
                        }

                        .date {
                            color: #626262;
                            font-size: 1.5rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 15px;
                            }
                        }
                    }
                }
            }
        }
    }

    .cross-transparent {
        position: absolute;
        top: 17%;
        left: 10.5%;
        width: 4.7rem;
        transform: rotate(-12deg);

        @media only screen and (max-width: 850px) {
            top: 1rem;
            left: 3rem;
        }
    }

    .cross-full-big {
        position: absolute;
        top: 22%;
        right: 11.5%;
        width: 6rem;
        transform: rotate(32deg);

        @media only screen and (max-width: 850px) {
            top: 18rem;
            right: 3rem;
            width: 3.2rem;
        }
    }

    .cross-full-small {
        position: absolute;
        top: 30%;
        right: 18%;
        width: 2.1rem;
        transform: rotate(37deg);

        @media only screen and (max-width: 850px) {
            top: 21rem;
            right: 8rem;
            width: 1.7rem;
        }
    }
}
</style>