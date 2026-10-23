<script setup lang="ts">
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Service from '@/components/Reusable/Main/Services/Service.vue';
import { useCartList } from '@/stores/User/cart.js';
import { useUserStore } from '@/stores/user';

const router = useRouter();

const cart = useCartList();

const user = useUserStore();

// HANDLE REDIRECT IF CART IS EMPTY
onBeforeMount(() => {
    if (cart.$state.length === 0) router.push({ name: 'Services' });
});

const origin = ref<string>('0');
const amount = ref<string>('0');
const showAmount = ref(false);
const isError = ref(false);

const amountLoadingRequstCount = ref(0);

onMounted(() => {
    amountLoadingRequstCount.value++;

    const data = {
        "products": [
            ...cart.$state.map(({ country, service, count }) => {
                return { country, service, count };
            })
        ]
    }

    // HANDLE GET TOTAL PRICE
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/getFinalPrice`,
        data: JSON.stringify({
            ...data
        }),
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
        if (res.data.error) isError.value = true;
        else isError.value = false;

        amountLoadingRequstCount.value--;

        origin.value = res.data.origin;
        amount.value = res.data.amount;

        showAmount.value = true;
        if (user.$state.balance < parseFloat(amount.value)) isBalanceAvailable.value = false;
        else isBalanceAvailable.value = true;
    }).catch(function (err) {
        console.log(err);
    });
})

const isCartEmpty = ref(true);
let sendRequest: ReturnType<typeof setTimeout> | undefined;

const isBalanceAvailable = ref(true);

const coupon = ref();
const isCouponFound = ref(true);

// HANDLE CHANGE CART
watch(cart.$state, (newValue) => {
    if (sendRequest) clearTimeout(sendRequest);
    isCartEmpty.value = newValue.length > 0 ? false : true;

    // IF CART IS EMPTY
    if (isCartEmpty.value) {
        origin.value = '0';
        return;
    }

    amountLoadingRequstCount.value++;
    setTimeout(() => {
        amountLoadingRequstCount.value--;
    }, 1001);

    sendRequest = setTimeout(() => {
        amountLoadingRequstCount.value++;

        let data;

        // IS COUPON USED
        if (isCouponFound.value) {
            data = {
                "products": [
                    ...cart.$state.map(({ country, service, count }) => {
                        return { country, service, count };
                    })
                ],
                coupon: `${coupon.value}`
            }
        } else {
            data = {
                "products": [
                    ...cart.$state.map(({ country, service, count }) => {
                        return { country, service, count };
                    })
                ]
            }
        }

        // GET NEW TOTAL PRICE
        axios({
            method: "post",
            url: `${import.meta.env.VITE_API_BASE_URL}/getFinalPrice`,
            data: JSON.stringify({
                ...data
            }),
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
            },
            withCredentials: true
        }).then(function (res) {
            // amountLoadingRequstCount.value--;

            if (res.data.error) isError.value = true;
            else isError.value = false;

            if (isCartEmpty.value) {
                origin.value = '0';
                return;
            }

            origin.value = res.data.origin;
            amount.value = res.data.amount;

            // IS MONEY ON BALANCE ENOGHT
            if (user.$state.balance < parseFloat(amount.value)) isBalanceAvailable.value = false;
            else isBalanceAvailable.value = true;
        }).catch(function (err) {
            console.log(err);
        });
    }, 1000);
});

// HANDLE UPDATE BALANCE INFORMATION
watch(user, (newValue) => {
    if (user.$state.balance < parseFloat(amount.value)) isBalanceAvailable.value = false;
    else isBalanceAvailable.value = true;
})

let changeSearch: ReturnType<typeof setTimeout> | undefined;

const paymentType = ref([true, false]);

// HANDLE CHANGE PAYMENT TYPE 
const handleChangePaymentType = (e: Event) => {
    const id = parseInt(((e.target as HTMLElement).closest('.cart__box__el__payment__el') as HTMLElement).id);
    if (id === 1) paymentType.value = [true, false];
    else paymentType.value = [false, true];
}

const isCouponActivePrev = ref(false);

const discount = ref(0);
const discountType = ref();

// ON COUPON INPUT CHANGE
watch(coupon, (newValue) => {

    // IF INPUT IS UNCHANGED FOR 2 SECONDS - SEND REQUEST
    if (changeSearch) clearTimeout(changeSearch);
    changeSearch = setTimeout(() => {
        if (newValue == coupon.value) {
            amountLoadingRequstCount.value++;
            axios({
                method: "post",
                url: `${import.meta.env.VITE_API_BASE_URL}/getCoupon`,
                data: JSON.stringify({
                    "name": `${coupon.value}`
                }),
                headers: {
                    "Content-Type": "application/json",
                    // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
                },
                withCredentials: true
            }).then(function (res) {
                // IF COUPON ISN`T FOUND
                if (res.data.error) {
                    isCouponFound.value = false;
                    discount.value = 0;
                    discountType.value = '';
                } else {
                    isCouponFound.value = true;
                    discount.value = res.data.value;
                    discountType.value = res.data.type;
                }

                // CURRENT REQUESTS COUNT
                amountLoadingRequstCount.value++;

                // SET DATA
                let data;

                if (isCouponFound.value) {
                    data = {
                        "products": [
                            ...cart.$state.map(({ country, service, count }) => {
                                return { country, service, count };
                            })
                        ],
                        coupon: `${coupon.value}`
                    }
                } else {
                    data = {
                        "products": [
                            ...cart.$state.map(({ country, service, count }) => {
                                return { country, service, count };
                            })
                        ]
                    }
                }

                isCouponActivePrev.value = isCouponFound.value;

                // GET PRICE WITH NEW COUPON
                axios({
                    method: "post",
                    url: `${import.meta.env.VITE_API_BASE_URL}/getFinalPrice`,
                    data: JSON.stringify({
                        ...data
                    }),
                    headers: {
                        "Content-Type": "application/json",
                        // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
                    },
                    withCredentials: true
                }).then(function (res) {
                    amountLoadingRequstCount.value--;
                    amountLoadingRequstCount.value--;
                    origin.value = res.data.origin;
                    amount.value = res.data.amount;
                    if (user.$state.balance < parseFloat(amount.value)) isBalanceAvailable.value = false;
                    else isBalanceAvailable.value = true;
                }).catch(function (err) {
                    console.log(err);
                });

            }).catch(function (err) {
                console.log(err);
            });
        }
    }, 2000);
});

const handleRedirectWaiting = ref(false);

// HANDLE PAYMENT REDIRECT
const handlePay = () => {
    const payment = paymentType.value[0] ? "coinbase" : "balance";
    handleRedirectWaiting.value = true;
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/purchase`,
        data: JSON.stringify({
            "products": [
                ...cart.$state.map(({ country, service, count }) => {
                    return { country, service, count }
                })
            ],
            "payment": payment
        }),
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
        // UPDATE ACCOUNT INFORMATION AND REDIRECT TO ORDERS PAGE
        if (payment === "balance") {
            axios({
                method: "get",
                url: `${import.meta.env.VITE_API_BASE_URL}/getAccount`,
                // headers: {
                //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
                // }
                withCredentials: true
            }).then(function (res) {
                user.setUser(res.data.account);
                cart.clearCart();
                router.push('/main/orders/1/success');
            }).catch(function (err) {
                console.log(err);
            });
        }

        // REDIRECT TO COINBASE
        else if (payment === "coinbase") window.location.href = res.data.payment;
    }).catch(function (err) {
        console.log(err);
    });
}

const handleAddRequest = () => {
    amountLoadingRequstCount.value++;
}

const handleEndRequest = () => {
    amountLoadingRequstCount.value--;
}

</script>

<template>
    <div class="cart">
        <div class="inner-container">
            <button @click="router.go(-1)" class="cart__back-button">
                <svg class="cart__back-button__img" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_3670_16723)">
                        <path
                            d="M10.828 11.9997L15.778 16.9497L14.364 18.3637L8 11.9997L14.364 5.63574L15.778 7.04974L10.828 11.9997Z"
                            fill="white" />
                    </g>
                    <defs>
                        <clipPath id="clip0_3670_16723">
                            <rect width="24" height="24" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
                <span class="cart__back-button__text">Back</span>
            </button>
            <h2 class="cart__title">Cart</h2>
            <div class="cart__box">
                <div class="cart__box__el">
                    <div class="cart__box__el__wrapper first">
                        <Service v-for="item in cart.$state" :handleAddRequest="handleAddRequest"
                            :handleEndRequest="handleEndRequest" :amountLoadingRequstCount="amountLoadingRequstCount"
                            :key="item.service" :name="item.name" :ID="item.service" :country="item.country" />
                    </div>
                </div>
                <div class="cart__box__el">
                    <div class="cart__box__el__wrapper second">
                        <span class="cart__box__el__title">Your Cart</span>
                        <div class="cart__box__el__price">
                            <div class="cart__box__el__price__item">
                                <span class="cart__box__el__price__item__key">Products</span>
                                <span v-if="amountLoadingRequstCount === 0" class="cart__box__el__price__item__value">${{
                                    parseFloat(origin).toFixed(2) }}</span>
                                <span v-else class="cart__box__el__price__item__value">Counting...</span>
                            </div>
                            <div class="cart__box__el__price__item">
                                <span class="cart__box__el__price__item__key">Discount</span>
                                <span v-if="discount !== 0" class="cart__box__el__price__item__value discount">-{{ discount
                                }}{{ discountType }}</span>
                            </div>
                        </div>
                        <div class="cart__box__el__promo-container">
                            <div :class="!isCouponFound ? 'error' : ''" class="cart__box__el__promocode">
                                <div class="cart__box__el__promocode__wrapper">
                                    <div class="cart__box__el__promocode__text">
                                        <span class="cart__box__el__promocode__text__key">Promocode</span>
                                        <input v-model="coupon" type="text" class="cart__box__el__promocode__text__input" />
                                    </div>
                                    <span class="cart__box__el__promocode__discount" v-if="discount !== 0">-{{ discount }}{{
                                        discountType }}</span>
                                </div>
                            </div>
                        </div>
                        <div class="cart__box__el__payment">
                            <button @click="handleChangePaymentType" id="1" :class="paymentType[0] ? 'active' : ''"
                                class="cart__box__el__payment__el">
                                <div class="cart__box__el__payment__el__wrapper">
                                    <svg class="cart__box__el__payment__el__img" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            d="M20.062 1.79045C20.137 1.78107 20.4276 1.8467 20.6995 1.9217C21.0276 2.01545 21.3088 2.1842 21.562 2.43732C21.8151 2.69045 21.9838 2.9717 22.0776 3.29982C22.1713 3.63107 22.1963 3.93732 22.1526 4.21857C22.1151 4.45295 21.9557 4.82795 21.8057 5.06232C21.637 5.2967 21.3276 5.58732 21.0932 5.71857C20.7745 5.8967 20.5401 5.95295 20.1088 5.94357C19.7526 5.94357 19.4245 5.88732 19.2182 5.77482C19.0401 5.68107 18.787 5.51232 18.6745 5.39982C18.5526 5.2967 18.3651 5.0342 18.2526 4.82795C18.112 4.56545 18.0557 4.2842 18.0557 3.89045C18.0557 3.52482 18.112 3.21545 18.2245 2.99982C18.3182 2.8217 18.487 2.56857 18.5995 2.45607C18.7026 2.3342 18.9182 2.16545 19.0776 2.08107C19.237 2.00607 19.4807 1.90295 19.6401 1.86545C19.7995 1.82795 19.987 1.79982 20.062 1.79045ZM12.2807 3.89045C12.9651 3.9092 13.6307 3.99357 14.1088 4.12482C14.5213 4.22795 15.1963 4.49045 15.6088 4.6967C16.0213 4.90295 16.4807 5.16545 16.9213 5.5217L14.7182 7.7342L14.4182 7.60295C14.2495 7.53732 13.837 7.37795 13.4995 7.25607C13.0213 7.08732 12.6932 7.04045 11.9995 7.04045C11.3245 7.04045 10.9588 7.08732 10.4995 7.2467C10.162 7.3592 9.63697 7.60295 9.34634 7.78107C9.04634 7.9592 8.64322 8.27795 8.43697 8.4842C8.24009 8.69045 7.92134 9.11232 7.73384 9.4217C7.54634 9.73107 7.31197 10.2561 7.20884 10.5936C7.08697 11.0154 7.03072 11.4654 7.03072 12.0467C7.03072 12.6842 7.08697 13.0404 7.25572 13.4998C7.37759 13.8373 7.53697 14.2498 7.73384 14.7186L5.52134 16.9217L5.29634 16.6404C5.16509 16.4811 4.90259 16.0217 4.69634 15.6092C4.49009 15.1967 4.22759 14.5217 4.12447 14.1092C4.01197 13.6967 3.89947 12.9186 3.87134 12.3748C3.83384 11.6623 3.86197 11.1561 3.97447 10.5467C4.06822 10.0779 4.27447 9.36545 4.44322 8.95295C4.60259 8.54045 4.93072 7.90295 5.17447 7.5467C5.40884 7.19045 5.89634 6.59982 6.24322 6.24357C6.59947 5.8967 7.19009 5.4092 7.54634 5.17482C7.90259 4.93107 8.54009 4.60295 8.95259 4.4342C9.36509 4.26545 10.0401 4.06857 10.4526 3.99357C10.9588 3.89045 11.5588 3.86232 12.2807 3.89045ZM18.5151 7.15295C18.562 7.1717 18.7776 7.45295 18.9745 7.79045C19.1713 8.11857 19.4526 8.69045 19.6026 9.0467C19.7432 9.40295 19.9307 10.0592 20.0057 10.4998C20.0901 10.9404 20.1557 11.6342 20.1557 12.0467C20.1557 12.4592 20.0713 13.1811 19.9776 13.6404C19.8838 14.0998 19.6682 14.8029 19.5088 15.1873C19.3401 15.5717 19.0213 16.1623 18.7963 16.4998C18.5807 16.8373 18.1026 17.3998 17.7557 17.7561C17.3995 18.1029 16.8088 18.5904 16.4526 18.8248C16.0963 19.0686 15.4588 19.3967 15.0463 19.5654C14.6338 19.7342 13.8932 19.9404 13.4057 20.0248C12.7776 20.1373 12.2432 20.1654 11.5776 20.1279C11.062 20.0998 10.3026 19.9873 9.89009 19.8748C9.47759 19.7623 8.80259 19.5092 8.39009 19.3029C7.97759 19.0967 7.51822 18.8342 7.07759 18.4779L9.28072 16.2654L9.58072 16.3967C9.74947 16.4623 10.162 16.6217 10.4995 16.7436C10.9588 16.9123 11.3151 16.9686 11.9526 16.9686C12.5338 16.9686 12.9838 16.9123 13.4057 16.7904C13.7432 16.6873 14.2682 16.4529 14.5776 16.2654C14.887 16.0779 15.3088 15.7592 15.5151 15.5623C15.7213 15.3561 16.0401 14.9529 16.2182 14.6529C16.3963 14.3623 16.6401 13.8373 16.7526 13.4998C16.912 13.0404 16.9588 12.6748 16.9588 11.9998C16.9588 11.3061 16.912 10.9779 16.7432 10.4998C16.6213 10.1623 16.462 9.74982 16.2651 9.28107L17.3432 8.20295C17.9338 7.61232 18.4588 7.1342 18.5151 7.15295ZM4.03072 18.0373C4.26509 18.0561 4.62134 18.1592 4.82759 18.2623C5.03384 18.3654 5.29634 18.5529 5.39947 18.6748C5.51197 18.7873 5.68072 19.0404 5.77447 19.2186C5.88697 19.4248 5.94322 19.7529 5.94322 20.1092C5.95259 20.5404 5.89634 20.7748 5.71822 21.0936C5.58697 21.3279 5.29634 21.6373 5.06197 21.8061C4.82759 21.9561 4.45259 22.1154 4.21822 22.1529C3.93697 22.1967 3.63072 22.1717 3.29947 22.0779C2.97134 21.9842 2.69009 21.8154 2.43697 21.5623C2.18384 21.3092 2.01509 21.0279 1.92134 20.6998C1.83697 20.4092 1.79947 20.0436 1.82759 19.8279C1.85572 19.6217 2.00572 19.2561 2.15572 19.0123C2.31509 18.7592 2.54947 18.4873 2.69947 18.4029C2.84009 18.3092 3.10259 18.1873 3.28072 18.1123C3.45884 18.0467 3.79634 18.0186 4.03072 18.0373Z"
                                            fill="#6772E5" />
                                    </svg>
                                    <div class="cart__box__el__payment__el__text">
                                        <span class="cart__box__el__payment__el__text__key">Pay with</span>
                                        <span class="cart__box__el__payment__el__text__value">Crypto</span>
                                    </div>
                                    <img v-if="!paymentType[0]" src="@/assets/svg/Main/Cart/isChosen.svg" alt=""
                                        class="cart__box__el__payment__el__choose">
                                    <img v-else src="@/assets/svg/Main/Cart/isntChosen.svg" alt=""
                                        class="cart__box__el__payment__el__choose">
                                </div>
                            </button>
                            <button :disabled="!isBalanceAvailable || amountLoadingRequstCount !== 0"
                                @click="handleChangePaymentType" id="2"
                                :class="(paymentType[1] ? 'active' : '') + (!isBalanceAvailable ? ' disabled' : '')"
                                class="cart__box__el__payment__el">
                                <div class="cart__box__el__payment__el__wrapper">
                                    <svg class="cart__box__el__payment__el__img" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <g clip-path="url(#clip0_3747_5545)">
                                            <path
                                                d="M18 7H21C21.2652 7 21.5196 7.10536 21.7071 7.29289C21.8946 7.48043 22 7.73478 22 8V20C22 20.2652 21.8946 20.5196 21.7071 20.7071C21.5196 20.8946 21.2652 21 21 21H3C2.73478 21 2.48043 20.8946 2.29289 20.7071C2.10536 20.5196 2 20.2652 2 20V4C2 3.73478 2.10536 3.48043 2.29289 3.29289C2.48043 3.10536 2.73478 3 3 3H18V7ZM4 9V19H20V9H4ZM4 5V7H16V5H4ZM15 13H18V15H15V13Z"
                                                fill="white" />
                                        </g>
                                        <defs>
                                            <clipPath id="clip0_3747_5545">
                                                <rect width="24" height="24" fill="white" />
                                            </clipPath>
                                        </defs>
                                    </svg>
                                    <div class="cart__box__el__payment__el__text">
                                        <span class="cart__box__el__payment__el__text__key">Pay with</span>
                                        <span class="cart__box__el__payment__el__text__value">Balance</span>
                                    </div>
                                    <img v-if="!paymentType[1]" src="@/assets/svg/Main/Cart/isChosen.svg" alt=""
                                        class="cart__box__el__payment__el__choose">
                                    <img v-else src="@/assets/svg/Main/Cart/isntChosen.svg" alt=""
                                        class="cart__box__el__payment__el__choose">
                                </div>
                            </button>
                        </div>
                        <div class="cart__box__el__final">
                            <div class="cart__box__el__final__text-box">
                                <span v-if="amountLoadingRequstCount === 0"
                                    class="cart__box__el__final__text-box__value">${{
                                        parseFloat(amount).toFixed(2) }}</span>
                                <span v-else class="cart__box__el__final__text-box__value">Counting...</span>
                                <span class="cart__box__el__final__text-box__key">Final price</span>
                            </div>
                            <button @click="handlePay"
                                :disabled="(isError || handleRedirectWaiting || amountLoadingRequstCount !== 0) ? true : false"
                                :class="(isError || handleRedirectWaiting || amountLoadingRequstCount !== 0) ? 'loading' : ''"
                                class="cart__box__el__final__button">pay</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.cart {
    width: 100%;

    input:focus::placeholder {
        color: transparent;
    }

    .inner-container {
        @include width-restriction-old;
        padding: 3.7rem 4.35rem;
        display: flex;
        flex-direction: column;

        @media screen and (max-width: 850px) {
            padding: 80px 0 5rem 0;
        }
    }

    &__back-button {
        display: flex;
        align-items: center;
        gap: 0.85rem;
        transition: all .3s;

        &:hover {
            opacity: 0.8;
        }

        @media screen and (max-width: 850px) {
            gap: 9px;
        }

        &__img {
            height: 2.05rem;
            width: 2.05rem;

            @media screen and (max-width: 850px) {
                width: 24px;
                height: 24px;
            }
        }

        &__text {
            font-family: 'Bison';
            font-weight: 300;
            font-size: 2.05rem;
            line-height: 98%;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                font-size: 24px;
            }
        }
    }

    &__title {
        margin-top: 2.1rem;
        font-family: 'Bison';
        font-weight: 300;
        font-size: 5.5rem;
        line-height: 99.5%;
        text-transform: uppercase;
        color: #FFFFFF;

        @media screen and (max-width: 850px) {
            margin-top: 24px;
            font-size: 48px;
        }
    }

    &__box {
        margin-top: 5rem;
        display: flex;
        gap: 2.56rem;

        @media screen and (max-width: 850px) {
            flex-direction: column;
            width: 100%;
        }

        &__el {
            background: #151515;
            border: 1px solid #333333;
            border-radius: 9px;

            &:first-child {
                width: 100%;
            }

            &:last-child {
                width: 75rem;

                @media screen and (max-width: 850px) {
                    margin-bottom: 80px;
                }
            }

            @media screen and (max-width: 850px) {
                width: 100% !important;
            }

            &__payment {
                border-top: 1px solid #333333;
                padding: 2.15rem 0 3.3rem;
                width: 100%;
                display: flex;
                gap: 1.71rem;

                &__el {
                    display: flex;
                    width: 50%;

                    &.active>div {
                        background: linear-gradient(90deg, #C0FB50 0%, #7862FB 100%);
                    }

                    &.active span {
                        color: #000000;
                    }

                    &.active>div>svg>path {
                        fill: #000000;
                    }

                    &.active>div>svg>g>path {
                        fill: #000000;
                    }

                    &.disabled>div {
                        border: 1px solid #C04A4A;
                    }

                    &__wrapper {
                        width: 100%;
                        align-items: center;
                        padding: 1.71rem 2.05rem 1.71rem;
                        background: #000000;
                        border: 1px solid #333333;
                        border-radius: 12px;
                        display: flex;

                        @media screen and (max-width: 850px) {
                            padding: 1.71rem 10px 1.71rem;
                        }
                    }

                    &__img {
                        height: 2.05rem;
                        width: 2.05rem;
                        margin-right: 1.3rem;

                        @media screen and (max-width: 850px) {
                            width: 20px;
                            height: 20px;
                            margin-right: 5px;
                        }
                    }

                    &__choose {
                        width: 2.05rem;
                        height: 2.05rem;

                        @media screen and (max-width: 850px) {
                            width: 20px;
                            height: 20px;
                        }
                    }

                    &__text {
                        display: flex;
                        flex-direction: column;
                        margin-right: auto;

                        &__key {
                            font-family: 'Rubik';
                            font-style: normal;
                            font-weight: 400;
                            font-size: 1.2rem;
                            line-height: 140.5%;
                            color: #7D808C;
                            text-align: start;

                            @media screen and (max-width: 850px) {
                                font-size: 13px;
                            }
                        }

                        &__value {
                            font-family: 'Rubik';
                            font-weight: 500;
                            font-size: 1.71rem;
                            line-height: 140.5%;
                            color: #FFFFFF;

                            @media screen and (max-width: 850px) {
                                font-size: 17px;
                            }
                        }
                    }
                }
            }

            &__wrapper {
                padding: 3.6rem;

                &.first {
                    width: 100%;
                    display: grid;
                    grid-auto-rows: 5.56rem;
                }

                &.second {
                    display: flex;
                    flex-direction: column;
                }
            }

            &__title {
                font-family: 'Bison';
                font-weight: 300;
                font-size: 3rem;
                line-height: 99.5%;
                text-transform: uppercase;
                color: #FFFFFF;

                @media screen and (max-width: 850px) {
                    font-size: 30px;
                }
            }

            &__price {
                margin-top: 2.56rem;
                display: flex;
                flex-direction: column;
                gap: 1.71rem;
                width: 100%;

                @media screen and (max-width: 850px) {
                    gap: 20px;
                }

                &__item {
                    width: 100%;
                    display: flex;
                    justify-content: space-between;

                    &__key {
                        font-family: 'Rubik';
                        font-weight: 300;
                        font-size: 1.56rem;
                        line-height: 99.5%;
                        color: #FFFFFF;

                        @media screen and (max-width: 850px) {
                            font-size: 18px;
                        }
                    }

                    &__value {
                        font-family: 'Rubik';
                        font-weight: 300;
                        font-size: 1.56rem;
                        line-height: 99.5%;
                        text-align: right;
                        text-transform: uppercase;
                        color: #FFFFFF;

                        &.discount {
                            color: #C0FB50;
                        }

                        @media screen and (max-width: 850px) {
                            font-size: 18px;
                        }
                    }
                }
            }

            &__promo-container {
                margin-top: 2.15rem;
                padding: 2.15rem 0;
                border-top: 1px solid #333333;
                border-bottom: 1px solid #333333;
            }

            &__promocode {
                width: 100%;
                border: 1px solid #FFFFFF;
                border-radius: 7px;

                &.error {
                    border: 1px solid #C04A4A;
                }

                &__wrapper {
                    padding: 1rem 2.5rem 1rem 2.05rem;
                    width: 100%;
                    display: flex;
                    justify-content: space-between;
                    align-items: center;

                    @media screen and (max-width: 850px) {
                        padding: 11px 15px;
                    }
                }

                &__discount {
                    font-family: 'Rubik';
                    font-weight: 400;
                    font-size: 1.71rem;
                    line-height: 140.5%;
                    color: #C0FB50;

                    @media screen and (max-width: 850px) {
                        font-size: 19px;
                    }
                }

                &__text {
                    display: flex;
                    flex-direction: column;
                    width: 100%;
                    color: #FFFFFF;

                    &__key {
                        font-family: 'Rubik';
                        font-weight: 400;
                        font-size: 1.2rem;
                        line-height: 140.5%;
                        color: #FFFFFF;

                        @media screen and (max-width: 850px) {
                            font-size: 13px;
                        }
                    }

                    &__input {
                        font-family: 'Rubik';
                        font-weight: 400;
                        font-size: 1.71rem;
                        line-height: 140.5%;
                        color: #FFFFFF;

                        @media screen and (max-width: 850px) {
                            font-size: 19px;
                        }
                    }
                }
            }

            &__final {
                margin-top: 3.6rem;
                display: flex;
                align-items: center;
                justify-content: space-between;

                &__text-box {
                    display: flex;
                    flex-direction: column;
                    align-items: flex-start;
                    gap: 1.71rem;

                    @media screen and (max-width: 850px) {
                        gap: 20px;
                    }

                    &__value {
                        font-family: 'Rubik';
                        font-weight: 400;
                        font-size: 3.42rem;
                        line-height: 99.5%;
                        text-align: right;
                        text-transform: uppercase;
                        color: #FFFFFF;

                        @media screen and (max-width: 850px) {
                            font-size: 30px;
                        }
                    }

                    &__key {
                        font-family: 'Rubik';
                        font-weight: 400;
                        font-size: 1.2rem;
                        line-height: 99.5%;
                        text-align: right;
                        color: #7D808C;

                        @media screen and (max-width: 850px) {
                            font-size: 14px;
                        }
                    }
                }

                &__button {
                    font-family: 'Bison';
                    font-weight: 300;
                    font-size: 2.4rem;
                    line-height: 2.91rem;
                    color: #000000;
                    background: #C0FB50;
                    border-radius: 8px 8px 20px 8px;
                    padding: 0.4rem 5.56rem;

                    transition: all .3s;

                    &:hover {
                        opacity: 0.8;
                    }

                    &.loading {
                        cursor: default;
                        opacity: 0.4;
                    }

                    @media screen and (max-width: 850px) {
                        font-size: 24px;
                        padding: 5px 5.56rem;
                    }
                }
            }
        }
    }
}
</style>