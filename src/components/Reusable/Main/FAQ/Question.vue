<script setup lang="ts">

// DEFINE PROPS
const props = defineProps(["item"]);

</script>

<template>
    <div class="question">
        <div class="question__title-box">
            <span class="question__title">Frequently asked</span>
            <img src="@/assets/svg/Main/FAQ/arrowMobile.svg" alt="" class="question__box__img mobile">
        </div>
        <div class="question__box">
            <span class="question__box__question">{{ props.item.question }}</span>
            <img src="@/assets/svg/Main/FAQ/arrow.svg" alt="" class="question__box__img desktop">
        </div>
        <p class="question__answer">{{ props.item.answer }}</p>
    </div>
</template>

<style lang="scss" scoped>
.question {
    padding: 2.56rem 2rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    border-bottom: 1px solid #333333;
    cursor: pointer;

    @media screen and (max-width: 850px) {
        padding: 20px 0;
    }


    &__title-box {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin-bottom: 0.9rem;

        @media screen and (max-width: 850px) {
            margin-bottom: 15px;
        }
    }

    &__title {
        background: #C0FB50;
        border-radius: 43px;

        font-family: 'Rubik';
        font-weight: 900;
        font-size: 1.2rem;
        line-height: 90.5%;
        text-transform: uppercase;
        color: #000000;

        padding: 0.6rem 2rem 0.45rem;
        align-self: flex-start;

        @media screen and (max-width: 850px) {
            font-size: 10px;
        }
    }

    &__answer {
        display: none;
        font-family: 'Rubik';
        font-size: 1.56rem;
        color: #FFFFFF;

        @media screen and (max-width: 850px) {
            margin-top: 0;
            font-size: 15px;
        }
    }

    &__box {
        display: flex;
        justify-content: space-between;
        align-items: center;
        transition: all .5s;

        &.active {
            padding-bottom: 2rem;
        }

        &__question {
            font-family: 'Bison';
            font-weight: 400;
            font-size: 5.5rem;
            line-height: 90.5%;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                font-size: 23px;
            }
        }

        &__img {
            height: 3.75rem;
            width: 3.75rem;
            transition: .3s;

            @media screen and (max-width: 850px) {
                height: 15px;
                width: 15px;
            }

            &.active {
                transform: rotate(90deg);

                &>g>path {
                    fill: #C0FB50;
                }
            }
        }
    }
}
</style>

