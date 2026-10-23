<script setup lang="ts">
import axios from 'axios';
import { ref, watch } from 'vue';

// DEFINE PROPS 
const props = defineProps(["isOpen", "handler"]);

// CLOSE POPUP HANDLER
const handleClick = (e: Event) => {
    const targer = e.target as HTMLElement;
    if (!targer.closest('.popup__content')) props.handler();
}

// HANDLE CHOSE PAYMENT TYPE
const paymentType = ref([false, true]);

const handleChangePaymentType = (e: Event) => {
    const id = parseInt(((e.target as HTMLElement).closest('.popup__content__bottom__buttons__el') as HTMLElement).id);
    if (id === 1) paymentType.value = [true, false];
    else paymentType.value = [false, true];
}

// HANDLE DEPOSIT
const handleDeposit = () => {
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/deposit`,
        data: JSON.stringify({
            "amount": parseInt(amount.value),
            "payment": "coinbase"
        }),
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
        // HANDLE REDIRECT
        window.location.href = res.data.payment;
    }).catch(function (err) {
        console.log(err);
    });
}

const amount = ref('');

const isReady = ref(false);
const isReadyCoupon = ref(true);

// NUMBER INPUT HANDLER
const handleCheckNumber = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    const newValue = value.replace(/[^0-9]/g, "");
    (e.target as HTMLInputElement).value = newValue;
    amount.value = newValue;
}

// HANDLE AMOUNT CHECKER
watch(amount, (newValue) => {
    if (newValue.length !== 0) isReady.value = true;
    else isReady.value = false;
});

// $ COLOR CHANGING
const isWhite = ref(false);

const handleGoGrey = () => {
    isWhite.value = false;
}

const handleGoWhite = () => {
    isWhite.value = true;
}

</script>

<template>
    <div @click="handleClick" :class="!props.isOpen ? 'closed' : ''" class="popup">
        <div class="popup__body">
            <div class="popup__content">
                <button @click="props.handler()" class="popup__content__close desktop">
                    <img src="@/assets/svg/Main/Popup/cross.svg" alt="" class="popup__content__close__img">
                </button>
                <div class="popup__content__wrapper">
                    <button @click="props.handler()" class="popup__content__back-button mobile">
                        <img src="@/assets/svg/navMenu/arrow.svg" alt="" class="arrow">
                        <span class="popup__content__back-button__text">Back</span>
                    </button>
                    <span class="popup__content__title">enter the deposit amount</span>
                    <div class="popup__content__input">
                        <span :class="{ 'white': (amount != '' || isWhite) }" class="popup__content__input__text">$</span>
                        <input @focusout="handleGoGrey" @focusin="handleGoWhite" @input="e => handleCheckNumber(e)"
                            :value="amount" type="number" class="popup__content__input__number" placeholder="0" />
                    </div>
                    <div class="popup__content__bottom__buttons">
                        <!-- <button @click="handleChangePaymentType" id="1" :class="paymentType[0] ? 'active' : ''"
                                                                class="popup__content__bottom__buttons__el">
                                                                <div class="popup__content__bottom__buttons__el__wrapper">
                                                                    <svg class="popup__content__bottom__buttons__el__img" width="24" height="24"
                                                                        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g clip-path="url(#clip0_2960_9733)">
                                                                            <path fill-rule="evenodd" clip-rule="evenodd"
                                                                                d="M51.873 6.35234L51.6465 5.27684H48.4995V18.0298H52.1355V9.37484C52.9958 8.24984 54.447 8.46884 54.909 8.61209V5.27834C54.4245 5.10434 52.7243 4.78484 51.873 6.35084V6.35234ZM44.5755 2.11784L41.0235 2.87234L41.0085 14.5438C41.0085 16.6963 42.627 18.2886 44.787 18.2886C45.9757 18.2886 46.854 18.0621 47.3407 17.8063V14.8438C46.8742 15.0298 44.5785 15.6973 44.5785 13.5538V8.37884H47.3407V5.27609H44.5785L44.5755 2.11784ZM34.725 8.97734C34.725 8.40884 35.1975 8.18984 35.961 8.18984C37.2249 8.2172 38.465 8.53816 39.5835 9.12734V5.69984C38.4302 5.24638 37.2001 5.02023 35.961 5.03384C33.018 5.03384 31.0432 6.57584 31.0432 9.14984C31.0432 13.1773 36.5745 12.5233 36.5745 14.2596C36.5745 14.9391 35.9895 15.1491 35.1772 15.1491C33.9727 15.1491 32.4172 14.6511 31.197 13.9866V17.4591C32.4532 18.0055 33.8074 18.2905 35.1772 18.2968C38.202 18.2968 40.287 16.8028 40.287 14.1831C40.287 9.83609 34.7243 10.6131 34.7243 8.97584L34.725 8.97734ZM10.41 7.13609C10.41 6.10859 11.265 5.71109 12.6465 5.71109C14.9329 5.76049 17.1766 6.34103 19.2 7.40684V1.20434C17.1135 0.384375 14.8882 -0.0243786 12.6465 0.000590333C7.3215 0.000590333 3.75 2.78984 3.75 7.44734C3.75 14.7343 13.7565 13.5508 13.7565 16.6918C13.7565 17.9203 12.7065 18.3013 11.229 18.3013C9.05025 18.3013 6.23625 17.3998 4.029 16.1998V22.4833C6.30151 23.4721 8.75147 23.9881 11.2297 23.9998C16.7025 23.9998 20.475 21.2961 20.475 16.5576C20.475 8.69309 10.41 10.0978 10.41 7.13759V7.13609Z"
                                                                                fill="#6772E5" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_2960_9733">
                                                                                <rect width="24" height="24" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                    <div class="popup__content__bottom__buttons__el__text">
                                                                        <span class="popup__content__bottom__buttons__el__text__key">Pay with</span>
                                                                        <span class="popup__content__bottom__buttons__el__text__value">Stripe</span>
                                                                    </div>
                                                                    <svg v-if="!paymentType[0]" class="popup__content__bottom__buttons__el__choose" width="24"
                                                                        height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g clip-path="url(#clip0_2960_9739)">
                                                                            <path
                                                                                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20Z"
                                                                                fill="#7D808C" />
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_2960_9739">
                                                                                <rect width="24" height="24" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                    <svg v-else class="popup__content__bottom__buttons__el__choose" width="24" height="24"
                                                                        viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <g clip-path="url(#clip0_2960_9763)">
                                                                            <g clip-path="url(#clip1_2960_9763)">
                                                                                <path
                                                                                    d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM11.003 16L6.76 11.757L8.174 10.343L11.003 13.172L16.659 7.515L18.074 8.929L11.003 16Z"
                                                                                    fill="white" />
                                                                            </g>
                                                                        </g>
                                                                        <defs>
                                                                            <clipPath id="clip0_2960_9763">
                                                                                <rect width="24" height="24" fill="white" />
                                                                            </clipPath>
                                                                            <clipPath id="clip1_2960_9763">
                                                                                <rect width="24" height="24" fill="white" />
                                                                            </clipPath>
                                                                        </defs>
                                                                    </svg>
                                                                </div>
                                                            </button> -->
                        <button @click="handleChangePaymentType" id="2" :class="paymentType[1] ? 'active' : ''"
                            class="popup__content__bottom__buttons__el">
                            <div class="popup__content__bottom__buttons__el__wrapper">
                                <svg class="popup__content__bottom__buttons__el__img" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        d="M20.062 1.79045C20.137 1.78107 20.4276 1.8467 20.6995 1.9217C21.0276 2.01545 21.3088 2.1842 21.562 2.43732C21.8151 2.69045 21.9838 2.9717 22.0776 3.29982C22.1713 3.63107 22.1963 3.93732 22.1526 4.21857C22.1151 4.45295 21.9557 4.82795 21.8057 5.06232C21.637 5.2967 21.3276 5.58732 21.0932 5.71857C20.7745 5.8967 20.5401 5.95295 20.1088 5.94357C19.7526 5.94357 19.4245 5.88732 19.2182 5.77482C19.0401 5.68107 18.787 5.51232 18.6745 5.39982C18.5526 5.2967 18.3651 5.0342 18.2526 4.82795C18.112 4.56545 18.0557 4.2842 18.0557 3.89045C18.0557 3.52482 18.112 3.21545 18.2245 2.99982C18.3182 2.8217 18.487 2.56857 18.5995 2.45607C18.7026 2.3342 18.9182 2.16545 19.0776 2.08107C19.237 2.00607 19.4807 1.90295 19.6401 1.86545C19.7995 1.82795 19.987 1.79982 20.062 1.79045ZM12.2807 3.89045C12.9651 3.9092 13.6307 3.99357 14.1088 4.12482C14.5213 4.22795 15.1963 4.49045 15.6088 4.6967C16.0213 4.90295 16.4807 5.16545 16.9213 5.5217L14.7182 7.7342L14.4182 7.60295C14.2495 7.53732 13.837 7.37795 13.4995 7.25607C13.0213 7.08732 12.6932 7.04045 11.9995 7.04045C11.3245 7.04045 10.9588 7.08732 10.4995 7.2467C10.162 7.3592 9.63697 7.60295 9.34634 7.78107C9.04634 7.9592 8.64322 8.27795 8.43697 8.4842C8.24009 8.69045 7.92134 9.11232 7.73384 9.4217C7.54634 9.73107 7.31197 10.2561 7.20884 10.5936C7.08697 11.0154 7.03072 11.4654 7.03072 12.0467C7.03072 12.6842 7.08697 13.0404 7.25572 13.4998C7.37759 13.8373 7.53697 14.2498 7.73384 14.7186L5.52134 16.9217L5.29634 16.6404C5.16509 16.4811 4.90259 16.0217 4.69634 15.6092C4.49009 15.1967 4.22759 14.5217 4.12447 14.1092C4.01197 13.6967 3.89947 12.9186 3.87134 12.3748C3.83384 11.6623 3.86197 11.1561 3.97447 10.5467C4.06822 10.0779 4.27447 9.36545 4.44322 8.95295C4.60259 8.54045 4.93072 7.90295 5.17447 7.5467C5.40884 7.19045 5.89634 6.59982 6.24322 6.24357C6.59947 5.8967 7.19009 5.4092 7.54634 5.17482C7.90259 4.93107 8.54009 4.60295 8.95259 4.4342C9.36509 4.26545 10.0401 4.06857 10.4526 3.99357C10.9588 3.89045 11.5588 3.86232 12.2807 3.89045ZM18.5151 7.15295C18.562 7.1717 18.7776 7.45295 18.9745 7.79045C19.1713 8.11857 19.4526 8.69045 19.6026 9.0467C19.7432 9.40295 19.9307 10.0592 20.0057 10.4998C20.0901 10.9404 20.1557 11.6342 20.1557 12.0467C20.1557 12.4592 20.0713 13.1811 19.9776 13.6404C19.8838 14.0998 19.6682 14.8029 19.5088 15.1873C19.3401 15.5717 19.0213 16.1623 18.7963 16.4998C18.5807 16.8373 18.1026 17.3998 17.7557 17.7561C17.3995 18.1029 16.8088 18.5904 16.4526 18.8248C16.0963 19.0686 15.4588 19.3967 15.0463 19.5654C14.6338 19.7342 13.8932 19.9404 13.4057 20.0248C12.7776 20.1373 12.2432 20.1654 11.5776 20.1279C11.062 20.0998 10.3026 19.9873 9.89009 19.8748C9.47759 19.7623 8.80259 19.5092 8.39009 19.3029C7.97759 19.0967 7.51822 18.8342 7.07759 18.4779L9.28072 16.2654L9.58072 16.3967C9.74947 16.4623 10.162 16.6217 10.4995 16.7436C10.9588 16.9123 11.3151 16.9686 11.9526 16.9686C12.5338 16.9686 12.9838 16.9123 13.4057 16.7904C13.7432 16.6873 14.2682 16.4529 14.5776 16.2654C14.887 16.0779 15.3088 15.7592 15.5151 15.5623C15.7213 15.3561 16.0401 14.9529 16.2182 14.6529C16.3963 14.3623 16.6401 13.8373 16.7526 13.4998C16.912 13.0404 16.9588 12.6748 16.9588 11.9998C16.9588 11.3061 16.912 10.9779 16.7432 10.4998C16.6213 10.1623 16.462 9.74982 16.2651 9.28107L17.3432 8.20295C17.9338 7.61232 18.4588 7.1342 18.5151 7.15295ZM4.03072 18.0373C4.26509 18.0561 4.62134 18.1592 4.82759 18.2623C5.03384 18.3654 5.29634 18.5529 5.39947 18.6748C5.51197 18.7873 5.68072 19.0404 5.77447 19.2186C5.88697 19.4248 5.94322 19.7529 5.94322 20.1092C5.95259 20.5404 5.89634 20.7748 5.71822 21.0936C5.58697 21.3279 5.29634 21.6373 5.06197 21.8061C4.82759 21.9561 4.45259 22.1154 4.21822 22.1529C3.93697 22.1967 3.63072 22.1717 3.29947 22.0779C2.97134 21.9842 2.69009 21.8154 2.43697 21.5623C2.18384 21.3092 2.01509 21.0279 1.92134 20.6998C1.83697 20.4092 1.79947 20.0436 1.82759 19.8279C1.85572 19.6217 2.00572 19.2561 2.15572 19.0123C2.31509 18.7592 2.54947 18.4873 2.69947 18.4029C2.84009 18.3092 3.10259 18.1873 3.28072 18.1123C3.45884 18.0467 3.79634 18.0186 4.03072 18.0373Z"
                                        fill="#6772E5" />
                                </svg>
                                <div class="popup__content__bottom__buttons__el__text">
                                    <span class="popup__content__bottom__buttons__el__text__key">Pay with</span>
                                    <span class="popup__content__bottom__buttons__el__text__value">Crypto</span>
                                </div>
                                <svg v-if="!paymentType[1]" class="popup__content__bottom__buttons__el__choose" width="24"
                                    height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_2960_9739)">
                                        <path
                                            d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20Z"
                                            fill="#7D808C" />
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2960_9739">
                                            <rect width="24" height="24" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                                <svg v-else class="popup__content__bottom__buttons__el__choose" width="24" height="24"
                                    viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <g clip-path="url(#clip0_2960_9763)">
                                        <g clip-path="url(#clip1_2960_9763)">
                                            <path
                                                d="M12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM11.003 16L6.76 11.757L8.174 10.343L11.003 13.172L16.659 7.515L18.074 8.929L11.003 16Z"
                                                fill="white" />
                                        </g>
                                    </g>
                                    <defs>
                                        <clipPath id="clip0_2960_9763">
                                            <rect width="24" height="24" fill="white" />
                                        </clipPath>
                                        <clipPath id="clip1_2960_9763">
                                            <rect width="24" height="24" fill="white" />
                                        </clipPath>
                                    </defs>
                                </svg>
                            </div>
                        </button>
                    </div>
                    <div class="popup__content__bottom__box">
                        <button :class="!isReady || !isReadyCoupon ? 'loading' : ''"
                            :disabled="!isReady || !isReadyCoupon ? true : false" @click="handleDeposit"
                            class="popup__content__button">Buy</button>
                    </div>
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

    input:focus::placeholder {
        color: transparent;
    }

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
        height: 62rem;
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

            &.loading {
                opacity: 0.5;
            }

            @media screen and (max-width: 850px) {
                width: 100%;
                font-size: 19px;
            }
        }

        &__title {
            font-family: 'Bison';
            font-weight: 300;
            font-size: 2.05rem;
            line-height: 99.5%;
            text-transform: uppercase;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                font-size: 35px;
                margin-top: 30px;
            }
        }

        &__subtitle {
            margin-top: 1.3rem;
            font-family: 'Rubik';
            font-weight: 350;
            font-size: 1.36rem;
            line-height: 99.5%;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                font-size: 20px;
                margin-top: 10px;
            }
        }

        &__back-button {
            display: flex;
            align-items: center;

            &__text {
                font-family: 'Bison';
                font-weight: 300;
                font-size: 23px;
                line-height: 98%;
                color: #FFFFFF;
            }

            .arrow {
                width: 7px;
                margin-right: 16px;
                margin-bottom: -1px;
            }
        }

        &__bg {
            position: absolute;

            &.first {
                top: 0;
                right: 0;
                left: 0;
                margin-left: auto;
                margin-right: auto;
            }
        }

        &__wrapper {
            width: 100%;
            // padding: 7rem 3.42rem 2.22rem;
            padding: 7rem 3.42rem 3rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            justify-content: center;

            @media screen and (max-width: 850px) {
                padding: 42px 20px;
                justify-content: flex-start;
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
            transition: all .3s;

            &:hover {
                opacity: 0.8;
            }

            &__img {
                height: 3.33rem;
                width: 3.33rem;
            }
        }

        &__top {
            display: flex;
            flex-direction: column;

            &__balance {
                background: #C0FB50;
                border-radius: 30px;
                font-family: 'Bison';
                font-weight: 300;
                font-size: 1.71rem;
                line-height: 2.05rem;
                color: #000000;
                padding: 0.5rem 2.2rem;
                align-self: flex-start;

                @media screen and (max-width: 850px) {
                    margin-top: 30px;
                    font-size: 19px;
                    padding: 5.5px 25.5px;
                }
            }

            &__title {
                margin-top: 1rem;
                font-family: 'Bison';
                font-weight: 300;
                font-size: 5.5rem;
                line-height: 99.5%;
                text-transform: uppercase;
                color: #FFFFFF;

                @media screen and (max-width: 850px) {
                    font-size: 35px;
                    margin-top: 15px;
                }
            }

            &__box {
                margin-top: 2.56rem;
                width: 100%;
                border-top: 1px solid #333333;
                border-bottom: 1px solid #333333;
                padding: 1.3rem 0;
                display: flex;
                align-items: center;

                @media screen and (max-width: 850px) {
                    margin-top: 35px;
                    padding: 15px 0;
                }

                &__info {
                    display: flex;
                    align-items: center;

                    &__name {
                        padding-left: 1.2rem;
                        font-family: 'Rubik';
                        font-weight: 500;
                        font-size: 1.71rem;
                        line-height: 0.85rem;
                        display: flex;
                        align-items: center;
                        text-transform: uppercase;
                        color: #FFFFFF;

                        @media screen and (max-width: 850px) {
                            font-size: 15px;
                        }
                    }

                    &__imgs {
                        padding-right: 1.2rem;
                        border-right: 1px solid #333333;
                        display: flex;
                        align-items: center;

                        &__service {
                            height: 3rem;
                            width: 3rem;
                            border-radius: 6px;

                            @media screen and (max-width: 850px) {
                                height: 24px;
                                width: 24px;
                            }
                        }

                        &__country {
                            width: 2rem;
                            height: 1.56rem;
                            margin-left: -0.3rem;
                            border-radius: 3px;

                            @media screen and (max-width: 850px) {
                                height: 15px;
                                width: 21px;
                                margin-left: -3px;
                            }
                        }
                    }
                }

                &__price {
                    margin-left: auto;
                    font-family: 'Rubik';
                    font-weight: 500;
                    font-size: 1.71rem;
                    line-height: 0.85rem;
                    display: flex;
                    align-items: center;
                    text-transform: uppercase;
                    color: #FFFFFF;

                    @media screen and (max-width: 850px) {
                        font-size: 13px;
                    }
                }
            }
        }

        &__input {
            display: flex;
            align-items: center;
            border-bottom: 1px solid #333333;
            padding-bottom: 2rem;

            &__number,
            &__text {
                font-family: 'Bison';
                font-weight: 300;
                font-size: 12.8rem;
                line-height: 12.8rem;
                color: #7D808C;

                @media screen and (max-width: 850px) {
                    font-size: 95px;
                }

                &.white {
                    color: #FFFFFF;
                }

                &::placeholder {
                    color: #7D808C;
                }
            }

            &__number {
                width: 100%;
                color: #FFFFFF;
            }
        }

        &__bottom {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: auto;

            &__buttons {
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

                    &__wrapper {
                        width: 100%;
                        align-items: center;
                        padding: 1.71rem 2.05rem 1.71rem;
                        background: #000000;
                        border: 1px solid #333333;
                        border-radius: 12px;
                        display: flex;
                    }

                    &__img {
                        height: 2.05rem;
                        width: 2.05rem;
                        margin-right: 1.3rem;

                        @media screen and (max-width: 850px) {
                            width: 24px;
                            height: 24px;
                            margin-right: 10px;
                        }
                    }

                    &__choose {
                        width: 2.05rem;
                        height: 2.05rem;

                        @media screen and (max-width: 850px) {
                            width: 24px;
                            height: 24px;
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

            &__promocode {
                width: 100%;
                border: 1px solid #333333;
                border-radius: 7px;
                margin-bottom: 2.05rem;

                @media screen and (max-width: 850px) {
                    margin: 15px 0;
                }

                &.error {
                    border: 1px solid #C04A4A;
                }

                &__wrapper {
                    padding: 0.85rem 2.5rem 0.5rem 2.05rem;
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

                    &__key {
                        font-family: 'Rubik';
                        font-weight: 400;
                        font-size: 1.2rem;
                        line-height: 140.5%;
                        color: #333333;

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

            &__button {
                font-family: 'Rubik';
                font-weight: 400;
                font-size: 1.71rem;
                line-height: 140.5%;
                color: #C0FB50;
                margin: 2.15rem 0 3.42rem;


                @media screen and (max-width: 850px) {
                    font-size: 19px;
                    margin-top: 15px;
                }

                &:hover {
                    opacity: 0.8;
                }
            }

            &__box {
                display: flex;
                justify-content: space-between;
                width: 100%;
                align-items: center;

                @media screen and (max-width: 850px) {
                    align-items: flex-start;
                    flex-direction: column;
                    margin-top: 55px;
                }

                @media screen and (max-height: 600px) {
                    margin-top: 15px;
                }

                &__price {
                    display: flex;

                    &__current {
                        font-family: 'Bison';
                        font-weight: 300;
                        font-size: 8.2rem;
                        line-height: 6.2rem;
                        color: #FFFFFF;

                        @media screen and (max-width: 850px) {
                            font-size: 95px;
                            line-height: 95px;
                        }
                    }

                    &__previous {
                        margin-left: 1rem;
                        font-family: 'Bison';
                        font-weight: 300;
                        font-size: 3rem;
                        line-height: 3.25rem;
                        color: #333333;

                        @media screen and (max-width: 850px) {
                            font-size: 31px;
                            line-height: 60px;
                        }
                    }
                }

                &__button {
                    font-family: 'Bison';
                    font-weight: 300;
                    font-size: 2.4rem;
                    line-height: 3rem;
                    color: #000000;

                    background: #C0FB50;
                    border-radius: 8px 8px 20px 8px;
                    padding: 0.5rem 5.5rem;

                    &:hover {
                        opacity: 0.8;
                    }

                    @media screen and (max-width: 850px) {
                        margin-top: 25px;
                        font-size: 19px;
                        border-radius: 34px;
                        width: 100%;
                    }
                }
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

