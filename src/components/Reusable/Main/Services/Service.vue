<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue';
import { useCartList } from '@/stores/User/cart.js';
import axios from 'axios';

// DEFINE PROPS
const props = defineProps(["name", "ID", "country", "handler", "handleAddRequest", "handleEndRequest", "amountLoadingRequstCount"]);

const notifyError = inject<any>('notifyError');

// DEFINE SERVICE COUNT
const serviceCount = ref(0);

const cart = useCartList();

// HANDLE GET COUNT FROM CART ON RENDER
onMounted(() => {
    serviceCount.value = cart.$state.filter(
        (item) => item.country === props.country && item.service === props.ID
    )[0]?.count | 0;
});

// HANDLE ADD SERVICE TO CART
const serviceCountPlus = () => {
    if (serviceCount.value >= 30) return;
    serviceCount.value++;
}

// HANDLE DELETE SERVICE FROM CART
const serviceCountMinus = () => {
    serviceCount.value--;
}

// HANDLE CHANGE SERVICE COUNT
const handleChangeServiceCount = (e: Event) => {
    const value = parseInt((e.target as HTMLInputElement).value);
    if (value >= 30) serviceCount.value = 30;
    else serviceCount.value = value;
}

let serviceCountTimeout: ReturnType<typeof setTimeout> | undefined;
let newValueFromRequest: number = NaN;

// HANDLE CHANGE CART ON COUNT CHANGE
watch(serviceCount, (newValue) => {

    // RETURN IF SET NEW VALUE ON RENDER
    if (newValue === cart.$state.filter(
        (item) => item.country === props.country && item.service === props.ID
    )[0]?.count) return;

    if (serviceCountTimeout || newValue === 0 || newValue === newValueFromRequest) clearTimeout(serviceCountTimeout);

    if (newValue === 0) {
        cart.changeCart(props.country, props.ID, 0, props.name);
    }

    if (newValue === 0 || newValue === newValueFromRequest) {
        newValueFromRequest = NaN;
        return;
    }

    serviceCountTimeout = setTimeout(() => {
        if (newValue == serviceCount.value) {
            setTimeout(() => {
                props.handleAddRequest();

                axios({
                    method: "post",
                    url: `${import.meta.env.VITE_API_BASE_URL}/getStock`,
                    data: JSON.stringify({
                        "country": props.country,
                        "service": props.ID
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
                    },
                    withCredentials: true
                }).then(function (res) {
                    console.log(res);
                    if (res.data.amount < newValue) {
                        notifyError("There is not enough product.");
                        
                        newValueFromRequest = res.data.amount;
                        serviceCount.value = res.data.amount;
                        cart.changeCart(props.country, props.ID, res.data.amount, props.name);
                    } else {
                        cart.changeCart(props.country, props.ID, newValue, props.name);
                    }
                    props.handleEndRequest();
                }).catch(function (err) {
                    console.log(err);
                    props.handleEndRequest();
                });
            }, props.amountLoadingRequstCount * 150);
        }
    }, 1000);
});


</script>

<template>
    <div class="service" :class="serviceCount > 0 ? 'choosen' : ''">
        <div class="service__left">
            <div class="service__left__imgs">
                <span class="service__left__imgs__text">{{ props.name[0] }}</span>
            </div>
            <span class="service__left__title">{{ props.name }}</span>
        </div>
        <div v-if="serviceCount == 0" class="service__right">
            <button v-if="props.handler != null" @click="props.handler()" class="service__right__buy-button">
                <img src="@/assets/svg/Main/Services/buyButton.svg" alt="" class="service__right__buy-button__img">
            </button>
            <button v-else @click="serviceCountPlus" class="service__right__buy-button">
                <img src="@/assets/svg/Main/Services/buyButton.svg" alt="" class="service__right__buy-button__img">
            </button>
        </div>
        <div v-else class="service__right">
            <div class="service__right__amount desktop">
                <button @click="serviceCountMinus" class="service__right__amount__minus">
                    <img src="@/assets/svg/Main/Services/minus.svg" alt="" class="service__right__amount__minus__img">
                </button>
                <input @change="handleChangeServiceCount" :value="serviceCount" class="service__right__amount__number"
                    type="number" />
                <button @click="serviceCountPlus" class="service__right__amount__plus">
                    <img src="@/assets/svg/Main/Services/plus.svg" alt="" class="service__right__amount__plus__img">
                </button>
            </div>
            <div class="service__right__amount-mobile mobile">
                <input @change="handleChangeServiceCount" :value="serviceCount" class="service__right__amount-mobile__input"
                    type="number">
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.service {
    border-top: 1px solid #333333;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 2.15rem 0 2.56rem;
    cursor: pointer;
    transition: all .3s;

    @media screen and (max-width: 850px) {
        padding: 5px;
    }

    &:hover {
        background-color: rgba(51, 51, 51, 0.7);
    }

    &.choosen {
        background-color: #C0FB50;

        & span {
            color: #000000;
        }

        & .service__left__imgs__text {
            background: #000000;
            color: white;
        }
    }

    &__left {
        display: flex;
        align-items: center;
        gap: 1.2rem;

        &__imgs {
            padding-right: 1.2rem;
            border-right: 1px solid #333333;
            display: flex;
            align-items: center;

            @media screen and (max-width: 360px) {
                display: none;
            }

            &__text {
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

            // &__country {
            //     width: 2rem;
            //     height: 1.56rem;
            //     margin-left: -0.3rem;
            //     border-radius: 3px;

            //     @media screen and (max-width: 850px) {
            //         height: 15px;
            //         width: 21px;
            //         margin-left: -3px;
            //     }
            // }
        }

        &__title {
            font-family: 'Rubik';
            font-weight: 500;
            font-size: 1.71rem;
            line-height: 0.85rem;
            text-transform: uppercase;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                font-size: 13px;
            }
        }
    }

    &__right {
        display: flex;
        align-items: center;
        gap: 1.28rem;

        &__amount-mobile {
            background-color: #000000;
            padding: 7px;
            border-radius: 8px 8px 20px 8px;

            &__input {
                width: 20px;
                height: 20px;
                text-align: center;
                font-family: 'Rubik';
                font-weight: 500;
                font-size: 15px;
                line-height: 99.5%;
                text-transform: uppercase;
                color: #FFFFFF;
            }
        }

        &__amount {
            margin-left: 0.85rem;
            display: flex;
            gap: 1.28rem;

            &__plus,
            &__minus {
                height: 2.06rem;
                width: 2.06rem;

                svg {
                    height: 2.06rem;
                    width: 2.06rem;
                }
            }

            &__number {
                width: 3.1rem;
                text-align: center;
                font-family: 'Rubik';
                font-weight: 500;
                font-size: 1.71rem;
                line-height: 99.5%;
                text-transform: uppercase;
                color: #0F0F0F;
                padding-bottom: 0.5rem;
                border-bottom: 2px solid #0F0F0F;
            }
        }

        &__count {
            font-family: 'Rubik';
            font-weight: 500;
            font-size: 1.36;
            line-height: 99.5%;
            text-transform: uppercase;
            color: #7D808C;

            @media screen and (max-width: 850px) {
                font-size: 13px;
            }
        }

        &__price {
            font-family: 'Rubik';
            font-weight: 500;
            font-size: 1.71rem;
            line-height: 99.5%;
            text-align: right;
            text-transform: uppercase;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                font-size: 13px;
            }
        }

        &__buy-button {
            background: #C0FB50;
            border-radius: 8px 8px 20px 8px;
            display: flex;
            align-items: center;
            padding: 1rem;

            @media screen and (max-width: 850px) {
                padding: 7px;
            }

            &:hover {
                opacity: 0.8;
            }

            &__img {
                height: 2.05rem;
                width: 2.05rem;

                @media screen and (max-width: 850px) {
                    width: 20px;
                    height: 20px;
                }
            }
        }
    }
}
</style>
