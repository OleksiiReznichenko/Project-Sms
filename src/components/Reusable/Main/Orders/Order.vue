<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import { useRoute } from 'vue-router';

// DEFINE PROPS
const props = defineProps(["profileID", "setTime", "id", "data", "handler"]);

const route = useRoute();

// SET EXPIRES IN TIME
const expiresIn = ref(Math.floor((props.data.data.expiry - new Date().getTime()) / 1000));

// IF NUMBER INS`T CLOSED START TIME COUNTDOWN
onMounted(() => {
    if (!props.data.closed) startCountdown(props.data.data.expiry - new Date().getTime(), onTick);
});

let interval: number;

// HANDLE START TIME COUNTDOWN
function startCountdown(timestamp: number, onTick: (time: number) => void): () => void {
    let remainingTime = timestamp;
    // IF NUMBER EXPIRED
    if (remainingTime <= 0) {

        // IF CHOSEN NUMBER IS THIS NUMBER
        if (parseInt(route.params.id as string) === props.id || props.profileID && (props.profileID === props.data.data.order_id)) props.setTime(0);
        onTick(0);
        return () => clearInterval(interval);
    } else {
        // TIMER
        interval = setInterval(() => {
            remainingTime -= 1000;

            // IF CHOSEN NUMBER IS THIS NUMBER
            if (parseInt(route.params.id as string) === props.id || props.profileID && (props.profileID === props.data.data.order_id)) props.setTime(remainingTime);

            // IF NUMBER BECOME EXPIRED
            if (remainingTime <= 0) {
                onTick(0);
                clearInterval(interval);
            } else {
                onTick(Math.floor(remainingTime / 1000));
            }
        }, 1000);

        return () => clearInterval(interval);
    }
}

// HANDLE SET EXPIRES IN TIME
const onTick = (time: number) => {
    expiresIn.value = time;
}

// CLEAR TIMER`S INTERVAL ON UNMOUNT
onUnmounted(() => {
    clearInterval(interval);
});

// CONVERSION TIME TO THE CORRECT FORMAT
const padLeft = (num: string, length: number, padChar = '0') => {
    const str = num.toString();
    return str.length >= length ? str : new Array(length - str.length + 1).join(padChar) + str;
}

const formatTimestamp = (timestamp: number): string => {
    const minutes = Math.floor(timestamp / 60);
    const seconds = timestamp % 60;

    return `${padLeft(minutes.toString(), 2)}:${padLeft(seconds.toString(), 2)}`;
}

</script>

<template>
    <div @click="e => props.handler(e)" :key="props.id" :id="`${props.id}`"
        :class="{ 'choosen': route.params.id && route.params.id == props.id, 'expired': (expiresIn === 0 || props.data.closed) }"
        class="order">
        <div class="order__wrapper">
            <div class="order__img">{{ data.data.service[0] }}</div>
            <div class="order__box">
                <span class="order__box__text">
                    <span :class="(expiresIn === 0 || props.data.closed) ? 'expired' : ''"
                        class="order__box__text white">+{{ data.data.number }}</span>
                </span>
                <span :class="(expiresIn === 0 || props.data.closed) ? 'expired' : ''" class="order__box__descr">{{
                    data.data.service }}, {{ data.data.country }}</span>
            </div>
            <span v-if="expiresIn !== 0 && !props.data.closed" class="order__time">{{ formatTimestamp(expiresIn) }}</span>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.order {
    transition: .3s;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;

    &:first-child &__wrapper {
        border-top: 1px solid #333333;
    }

    &:last-child &__wrapper {
        border: none;
    }

    &:hover {
        background: #333333;

        @media screen and (max-width: 850px) {
            background: #131313;
        }
    }

    &.expired:hover span {
        color: #131313;
    }

    &.choosen {
        background: #C0FB50;

        @media screen and (max-width: 850px) {
            background: #131313;
        }
    }

    &.choosen &__wrapper {
        border: none;

        @media screen and (max-width: 850px) {
            border-bottom: 1px solid #333333;
        }
    }

    &.choosen:first-child &__wrapper {
        @media screen and (max-width: 850px) {
            border-top: 1px solid #333333;
        }
    }

    &.choosen:last-child &__wrapper {
        @media screen and (max-width: 850px) {
            border: none;
        }
    }

    &.choosen &__box {

        &__text,
        &__descr {
            color: #0F0F0F;

            @media screen and (max-width: 850px) {
                color: inherit;
            }
        }
    }

    &.choosen &__img {
        background: #000000;
        color: white;
    }

    &__wrapper {
        margin: 0 2rem;
        border-bottom: 1px solid #333333;
        height: 100%;
        display: flex;
        gap: 1.3rem;
        align-items: center;
        width: 100%;

        @media screen and (max-width: 850px) {
            margin: 0;
            padding: 0 5px;
        }
    }

    &__img {
        height: 3rem;
        width: 3rem;
        border-radius: 6px;
        background: #C0FB50;
        font-family: 'Rubik';
        font-weight: 500;
        font-size: 1.71rem;
        line-height: 0.85rem;
        text-transform: uppercase;
        color: #000000;
        display: flex;
        align-items: center;
        justify-content: center;

        @media screen and (max-width: 850px) {
            height: 24px;
            width: 24px;
        }
    }

    &__time {
        font-family: 'Bison';
        font-style: normal;
        font-weight: 300;
        font-size: 1.71rem;
        line-height: 98%;
        color: #FFFFFF;
        background: #000000;
        border-radius: 53px;
        padding: 0.6rem 1.5rem;
        margin-left: auto;

        @media screen and (max-width: 850px) {
            font-size: 19px;
        }
    }

    &__box {
        display: flex;
        flex-direction: column;
        gap: 0.7rem;

        &__descr {
            font-family: 'Bison';
            font-weight: 300;
            font-size: 1.54rem;
            line-height: 98%;
            color: #7D808C;

            &.expired {
                color: #333333;
            }

            @media screen and (max-width: 850px) {
                font-size: 15px;
                color: #7D808C !important;
            }
        }

        &__text {
            display: flex;
            align-items: center;
            gap: 0.85rem;

            &.white {
                font-family: 'Bison';
                font-weight: 300;
                font-size: 2.05rem;
                line-height: 98%;
                color: #FFFFFF;

                @media screen and (max-width: 850px) {
                    font-size: 19px;
                }
            }

            &.grey,
            &.small {
                font-family: 'Bison';
                font-style: normal;
                font-weight: 300;
                font-size: 1.36rem;
                line-height: 98%;
                color: #333333;

                @media screen and (max-width: 850px) {
                    font-size: 15px;
                    color: #333333 !important;
                }
            }

            &.small {
                color: #FFFFFF;

                @media screen and (max-width: 850px) {
                    font-size: 15px;
                    color: #FFFFFF !important;
                }
            }

            &.expired {
                color: #333333;
            }
        }
    }
}
</style>
