<script setup lang="ts">

</script>

<template>
    <div class="notFound">
        <div class="notFound__top-box">
            <img src="@/assets/svg/PageNotFound/cross.svg" alt="" class="notFound__top-box__cross">
            <p class="notFound__top-box__text">Something<br />went wrong<br />:(</p>
            <img src="@/assets/svg/PageNotFound/mainPic.svg" alt="" class="notFound__top-box__img">
        </div>
        <div class="notFound__bottom-box">
            <div class="notFound__bottom-box__text">
                <span class="notFound__bottom-box__text black">
                    <span class="transform">T </span>
                </span>
                <span class="notFound__bottom-box__text grey">here're&nbsp;&nbsp;</span>
                <span class="notFound__bottom-box__text white">Nothing </span><br />
                here yet.
                <router-link to="/" class="notFound__bottom-box__buy-button">
                    <span class="notFound__bottom-box__buy-button__text">MAIN PAGE</span>
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.notFound {
    padding: 5rem 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
    background: #000000;

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
            background: #C0FB50;
            border-radius: 56px;
            display: inline-block;
            align-items: center;
            vertical-align: middle;
            padding: 0 11.5rem;

            &:hover {
                opacity: 0.8;
            }

            @media screen and (max-width: 850px) {
                padding: 0 40px;
            }

            &__text {
                font-family: 'Bison';
                font-style: normal;
                font-weight: 300;
                font-size: 23.5294px;
                line-height: 98%;
                color: #000000;
                vertical-align: middle;

                @media screen and (max-width: 850px) {
                    font-size: 18px;
                }
            }

        }
    }
}
</style>

