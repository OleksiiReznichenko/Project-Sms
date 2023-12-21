<script setup lang="ts">

// DEFINE PROPS 
const props = defineProps(["isOpen", "handler"]);

// CLOSE POPUP HANDLER
const handleClick = (e: Event) => {
    const targer = e.target as HTMLElement;
    if (!targer.closest('.popup__content')) props.handler();
}

</script>

<template>
    <div @click="handleClick" :class="!props.isOpen ? 'closed' : ''" class="popup">
        <div class="popup__body">
            <div class="popup__content">
                <button @click="props.handler()" class="popup__content__close desktop">
                    <img src="@/assets/svg/Main/Popup/cross.svg" alt="" class="popup__content__close__img">
                </button>
                <img src="@/assets/svg/Main/Popup/successBg.svg" alt="" class="popup__content__bg first">
                <div class="popup__content__wrapper">
                    <button @click="props.handler()" class="popup__content__back-button mobile">
                        <img src="@/assets/svg/Main/Popup/backButton.svg" alt="">
                        <span class="popup__content__back-button__text">Back</span>
                    </button>
                    <span class="popup__content__title">success</span>
                    <span class="popup__content__text">The transaction is completed</span>
                    <button @click="props.handler()" class="popup__content__button">Back</button>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.popup {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 10000;
    background-color: #000c;
    backdrop-filter: blur(5px);
    @include flex-center;
    transition: all .3s;

    &__body {
        min-height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        @media screen and (max-width: 850px) {
            align-items: flex-end;
        }
    }

    &__content {
        width: 49rem;
        height: calc(100vh - 10.25rem);
        max-height: 75rem;
        position: relative;
        background: #151515;
        border: 1px solid #333333;
        color: #000;
        border-radius: 9px;
        display: flex;

        @media screen and (max-width: 850px) {
            z-index: 9999999;
            width: 100%;
            height: auto;
            border-radius: 9px 9px 0 0;
            border-bottom: none;
            max-height: none;
        }

        &__back-button {
            display: flex;
            gap: 10px;
            align-items: center;
            z-index: 10;

            &__text {
                font-family: 'Bison';
                font-weight: 300;
                font-size: 23px;
                line-height: 98%;
                color: #FFFFFF;
            }
        }

        &__bg {
            position: absolute;

            &.first {
                top: 0;
                right: 0;
                left: 0;
                width: 100%;
                z-index: 10;
            }

            &.second {
                top: 0;
                left: 0;
            }

            &.third {
                top: -200px;
                right: 0;
            }
        }

        &__wrapper {
            width: 100%;
            padding: 7rem 3.42rem 3rem;
            display: flex;
            flex-direction: column;

            @media screen and (max-width: 850px) {
                padding: 42px 20px;
            }

            @media screen and (max-height: 600px) {
                padding: 20px 20px;
            }
        }

        &__close {
            height: 3.33rem;
            width: 3.33rem;
            position: absolute;
            top: 3.15rem;
            right: 3.15rem;
            z-index: 100;
            transition: all .3s;

            &:hover {
                opacity: 0.8;
            }

            &__img {
                height: 3.33rem;
                width: 3.33rem;
            }
        }

        &__title {
            margin-top: 30rem;
            font-family: 'Bison';
            font-weight: 300;
            font-size: 15.5rem;
            line-height: 99.5%;
            text-transform: uppercase;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                font-size: 63px;
            }
        }

        &__text {
            margin-top: 1.36rem;
            font-family: 'Rubik';
            font-weight: 350;
            font-size: 1.36rem;
            line-height: 99.5%;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                font-size: 15px;
            }
        }

        &__button {
            background: #C0FB50;
            border-radius: 34px;
            padding: 1.32rem 5.56rem;

            font-family: 'Rubik';
            font-weight: 500;
            font-size: 1.71rem;
            line-height: 99.5%;
            text-transform: uppercase;
            color: #0F0F0F;
            align-self: flex-start;

            margin-top: auto;

            &:hover {
                opacity: 0.8;
            }

            @media screen and (max-width: 850px) {
                margin-top: 100px;
                font-size: 19px;
                padding: 15.5px 66px;
            }
        }
    }


    &.open {
        opacity: 1;
        visibility: visible;
        z-index: 99999;

        @media screen and (max-width: 850px) {
            overflow: hidden;
        }

        @media screen and (max-height: 500px) {
            overflow-y: auto;
        }
    }

    &.open .popup__content {
        transform: translate(0px, 0px) scale(1);
        opacity: 1;
    }
}
</style>

