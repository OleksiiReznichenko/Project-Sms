<script setup lang="ts">

// DEFINE PROPS
const props = defineProps(["item", "handleSetOSName", "handleEndSession"]);

</script>

<template>
    <div class="session">
        <div class="session__wrapper">
            <div class="session__top">
                <img :src="`/svg/Profile/${props.handleSetOSName(props.item.agent)}.svg`" alt=""
                    class="session__top__icon">
                <span class="session__top__name">{{ props.handleSetOSName(props.item.agent) }}</span>
                <button v-if="!props.item.current" @click="() => props.handleEndSession(props.item.id)"
                    class="session__top__close">
                    <img src="@/assets/svg/Main/Profile/endSession.svg" alt="" class="session__top__close__img">
                </button>
            </div>
            <div class="session__bottom">
                <div class="session__bottom__first">
                    <span v-if="props.item.current" class="session__bottom__text green">Current
                        session</span>
                    <span class="session__bottom__text">{{ props.item.agent }}</span>
                </div>
                <div class="session__bottom__second">
                    <span class="session__bottom__text">IP: {{ props.item.ip }}</span>
                    <span class="session__bottom__text">Last entry: {{ new
                        Date(props.item.last).toLocaleString() }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.session {
    background: #1C1C1C;
    border: 1px dashed #7D808C;
    border-radius: 6px;

    &__wrapper {
        padding: 1.71rem 2.05rem 2.05rem;
        display: flex;
        flex-direction: column;
        gap: 0.4rem;

        @media screen and (max-width: 850px) {
            position: relative;
        }
    }

    &__top {
        display: flex;
        align-items: center;

        @media screen and (max-width: 850px) {
            flex-direction: column;
            align-items: flex-start;
        }

        &__icon {
            height: 3.75rem;
            width: 3.75rem;
            margin-right: 1.71rem;

            @media screen and (max-width: 850px) {
                width: 44px;
                height: 44px;
            }
        }

        &__name {
            font-family: 'Rubik';
            font-weight: 700;
            font-size: 3rem;
            line-height: 140.5%;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                margin-top: 10px;
                font-size: 31px;
            }
        }

        &__close {
            height: 2.05rem;
            width: 2.05rem;
            align-self: flex-start;
            margin-left: auto;
            cursor: pointer;
            transition: all .3s;

            &:hover {
                opacity: 0.8;
            }

            @media screen and (max-width: 850px) {
                position: absolute;
                top: 15px;
                right: 15px;
                width: 28px;
                height: 28px;
            }

            &__img {
                height: 2.05rem;
                width: 2.05rem;

                @media screen and (max-width: 850px) {
                    width: 24px;
                    height: 24px;
                }
            }
        }
    }

    &__bottom {
        display: flex;
        flex-direction: column;
        gap: 2.1rem;
        padding-left: calc(3.75rem + 1.71rem);

        @media screen and (max-width: 850px) {
            padding-left: 0;
            flex-direction: column;
            gap: 14px;
        }

        &__text {
            font-family: 'Rubik';
            font-weight: 400;
            font-size: 1.36rem;
            line-height: 140.5%;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                font-size: 15px;
            }

            &.green {
                color: #C0FB50;
            }
        }

        &__first,
        &__second {
            display: flex;
            flex-direction: column;
        }
    }
}
</style>

