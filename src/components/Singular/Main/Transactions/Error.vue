<script setup lang="ts">

</script>

<template>
    <div class="error">
        <div class="error__top-box">
            <img src="@/assets/svg/Main/Transactions/cross.svg" alt="" class="error__top-box__cross">
            <p class="error__top-box__text">Something<br />went wrong<br />:(</p>
            <img src="@/assets/svg/Main/Transactions/img.svg" alt="" class="error__top-box__img">
        </div>
        <div class="error__bottom-box">
            <span class="error__bottom-box__text">
                <span class="error__bottom-box__text black">
                    <span class="transform">T </span>
                </span>
                <span class="error__bottom-box__text grey">here're&nbsp;&nbsp;</span>
                <span class="error__bottom-box__text white">no<br />transactions yet.<br /></span>
                Buy number and come</span>
            <router-link to="/main/services" class="error__bottom-box__buy-button">
                <span class="error__bottom-box__buy-button__text">buy</span>
                <img src="@/assets/svg/Main/Transactions/arrow.svg" alt="" class="error__bottom-box__buy-button__img">
            </router-link>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.error {
    padding: 5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: #000000;
    margin-top: auto;
    margin-bottom: auto;

    &__top-box {
        width: 60rem;
        position: relative;
        display: flex;
        position: relative;

        @media screen and (max-width: 850px) {
            width: 288px;
        }

        &__cross {
            height: 4.45rem;
            width: 4.45rem;
            position: absolute;
            top: 0;
            right: calc(100% + 1.5rem);

            @media screen and (max-width: 850px) {
                height: 27px;
                width: 27px;
                right: calc(100% - 27px);
                top: -27px;
            }
        }

        &__text {
            display: flex;
            align-items: center;
            font-family: 'Rubik';
            font-weight: 400;
            font-size: 1.71rem;
            line-height: 109.3%;
            text-transform: uppercase;
            color: #FFFFFF;
            position: absolute;
            left: 0;
            top: 0;
            bottom: 0;
            margin-top: 0;
            margin-bottom: 0;

            @media screen and (max-width: 850px) {
                font-size: 12px;
                align-items: flex-end;
            }
        }

        &__img {
            aspect-ratio: 586/327.74;
            width: 50.1rem;
            margin-left: auto;

            @media screen and (max-width: 850px) {
                width: 250px;
            }
        }
    }

    &__bottom-box {
        margin-top: 2.4rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        width: 80rem;

        @media screen and (max-width: 850px) {
            width: 100%;
        }

        &__text {
            text-align: center;
            font-family: 'Rubik';
            font-style: italic;
            font-weight: 350;
            font-size: 5.3rem;
            line-height: 99.5%;
            text-transform: uppercase;

            @media screen and (max-width: 850px) {
                font-size: 23px;
            }

            &.white {
                font-style: normal;
            }

            &.grey {
                color: rgba(125, 128, 140, 1);
                font-weight: 900;
            }

            &.black {
                display: inline-block;
                transform: rotate(5deg);
                font-weight: 900;
                background: #C0FB50;
                padding: 1rem 1.2rem 0.2rem 0.4rem;

                @media screen and (max-width: 850px) {
                    padding: 4px 7px 2px 4px;
                }

                &>.transform {
                    display: inline-block;
                    transform: rotate(-5deg);
                    color: #000000;
                }
            }

            &.white {
                font-weight: 900;
            }
        }

        &__buy-button {
            margin-top: 1rem;
            background: #C0FB50;
            border-radius: 56px;
            display: flex;
            gap: 3rem;
            padding: 1.3rem 1.71rem 1.3rem 2.15rem;
            align-items: center;

            @media screen and (max-width: 850px) {
                gap: 6px;
                padding: 12px 43px 9px 43px;
            }

            &:hover {
                opacity: 0.8;
            }

            &__text {
                font-family: 'Rubik';
                font-weight: 900;
                font-size: 1.71rem;
                line-height: 99.5%;
                color: #0F0F0F;
                text-transform: uppercase;

                @media screen and (max-width: 850px) {
                    font-size: 15px;
                    padding-top: 3px;
                }
            }

            &__img {
                height: 1.71rem;
                width: 1.71rem;

                @media screen and (max-width: 850px) {
                    height: 14px;
                    width: 14px;
                }
            }
        }
    }
}
</style>