<script setup lang="ts">
import { onMounted, watch, type Ref, nextTick, ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import SuccessPopup from '@/components/Singular/Main/SuccessPopup.vue';
import Order from '@/components/Reusable/Main/Orders/Order.vue';
import Loader from '@/components/Reusable/Main/Loader.vue';
import NoNumbers from '@/components/Singular/Main/Orders/NoNumbers.vue';
import RefundMessage from '@/components/Singular/Main/Orders/RefundMessage.vue';
import MessageWithCode from '@/components/Reusable/Main/Orders/MessageWithCode.vue';
import FirstSms from '@/components/Singular/Main/Orders/FirstSms.vue';

// ORDERS DATA
interface Order {
    data: {
        pool: number,
        number: string,
        country: string,
        message: string,
        service: string,
        order_id: string,
        expires_in: number,
        expiry: number
    },
    status: string | null,
    sms: sms[]
}

const orders: Ref<Order[] | []> = ref([]);
const currentOrder: Ref<Order | null> = ref(null);

// SMS DATA
interface sms {
    sms: string,
    full_sms: string,
    expiration: number
}


const route = useRoute();
const router = useRouter();

// LOADER VARIABLE
const isOrdersLoaded = ref(false);

// MOBILE LOADER VARIABLE
const isMobileLoading = ref(false);


// CHAT ID VARIABLE
const showChat = ref(0);

const isMobile = ref(false);

// TIME UNTILL CURRENT NUMBER EXPIRES
const currentTime = ref(0);

// HANDLE SET CURRENT NUMBER TIME
const handleChangeTime = (time: number) => {
    currentTime.value = Math.floor(time / 1000);
}

// CURRENT CHAT SCROLL VARIABLE
const scrollEl = ref<HTMLDivElement | null>(null);

// HANDLE SCROLL CHAT TO THE END ON RENDER
watch(scrollEl, (newValue) => {
    if (scrollEl.value) scrollEl.value.scrollTop = scrollEl.value.scrollHeight;
});

// SUCCESS POPUP HANDLER
const isSuccessPopupOpen = ref(false);

const handleOpenSuccessPopup = () => {
    isSuccessPopupOpen.value = !isSuccessPopupOpen.value;
}

onMounted(async () => {
    // HANDLE OPEN SUCCESS POPUP
    if (route.params.status === 'success') {
        await nextTick();
        handleOpenSuccessPopup();
        router.replace({ params: { ...route.params, status: null } });
    }

    // HANDLE SCROLL CHAT TO THE END
    if (scrollEl.value) {
        scrollEl.value.scrollTop = scrollEl.value.scrollHeight;
    }

    // GET ORDERS
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getOrders`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {
        console.log(res);
        // SET ORDERS
        orders.value = res.data.orders.filter(item => item.error !== true);

        // SET LOADER VARIABLE TO TRUE
        isOrdersLoaded.value = true;

        // IF DEVICE ISN`T MOBILE
        if (window.innerWidth > 850) {
            isMobile.value = false;

            // IF ORDER IS CHOSEN SET CURRENT ORDER 
            if (route.params.id) {
                currentOrder.value = orders.value[parseInt(route.params.id[0]) - 1];
                return;
            }

            // IF ORDERS ISN`T CHOSEN SET FIRST ORDER AS CHOOSEN
            if (orders.value.length > 0) router.push(`/main/orders/1`);
            currentOrder.value = orders.value[parseInt(route.params.id[0]) - 1];
        } else {
            isMobile.value = true;

            // SET CHOSEN CHAT ON MOBILE
            route.params.id ? showChat.value = parseInt(route.params.id as string) || 0 : showChat.value = 0;
            currentOrder.value = orders.value[showChat.value - 1];
        }
    }).catch(function (err) {
        console.log(err);
    });

    // HANDLE CHECK NEW SMS
    startCountdown(onTick);
});

const interval = ref();

function startCountdown(onTick: (orderId: string) => Promise<void>): () => void {

    // CHECK FOR NEW SMS EVERY 15 SECONDS
    interval.value = setInterval(async () => {

        // IF ORDER ISN`T CHOSEN (ON MOBILE)
        if (!route.fullPath.includes('orders')) {
            clearInterval(interval.value);
            return;
        }

        // CLEAR INTERVAL IF ORDER IS EXPIRED
        if (currentTime.value === 0 || currentOrder.value?.status === "This order has been refunded" || currentOrder.value?.status === "This order is expired") {
            clearInterval(interval.value);
            return;
        }

        // GET ORDER ID
        const orderLocalId = parseInt(route.params.id as string) - 1;

        if (orderLocalId !== null && orderLocalId !== undefined) {
            // GET ORDER ID
            const orderId = orders.value[orderLocalId].data.order_id;

            // HANDLE GET NEW SMS
            let newSms;

            try {
                newSms = await onTick(orderId);
            } catch (error) {
                console.error(error.message);
                newSms = null;
            }

            // IF NEW SMS RECIVED
            if (newSms !== null && newSms !== undefined && newSms.message !== "pending" && newSms.error !== true) {

                // ADD NEW SMS
                if (orders.value[orderLocalId]) {
                    orders.value[orderLocalId].sms.push(newSms);
                }

                // HANDLE SCROLL CHAT TO THE END
                setTimeout(() => {
                    if (scrollEl.value && orderLocalId === parseInt(route.params.id as string) - 1) scrollEl.value.scrollTop = scrollEl.value.scrollHeight;
                }, 0);
            }
        }
    }, 15000);

    return () => clearInterval(interval.value);
}

// GET NEW SMS HANDLER
async function onTick(orderId: string): Promise<void> {
    try {
        // HANDLE GET NEW SMS
        const response = await axios({
            method: "get",
            url: `${import.meta.env.VITE_API_BASE_URL}/getSms?order=${orderId}`,
            // headers: {
            //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`,
            // },
            withCredentials: true
        });

        console.log(response);

        // IF ISN`T ERROR SET SMS
        if (response.error !== true) {
            return response.data;
        }
        throw new Error('Error in response data');
    } catch (err) {
        console.log(err);
        throw new Error('Error fetching SMS data');
    }
}

// HANDLE ON CHANGE CHAT
watch(route, (newValue) => {
    // IF DEVICE IS MOBILE
    if (isMobile) {

        // SET CURRENT NUMBER TIME TO 0
        currentTime.value = 0;

        // SET CHOSEN CHAT ID
        route.params.id ? showChat.value = parseInt(route.params.id as string) || 0 : showChat.value = 0;
        if (showChat.value === 0) return;

        // SET LOADER VARIABLE TO TRUE
        isMobileLoading.value = true;
        setTimeout(() => {
            isMobileLoading.value = false;
        }, 1000)
    }

    // SET CHOSEN CHAT ID
    currentOrder.value = orders.value[parseInt(route.params.id as string) - 1];

    // HANDLE SCROLL CHAT TO THE END
    setTimeout(() => {
        if (scrollEl.value) scrollEl.value.scrollTop = scrollEl.value.scrollHeight;
    }, 0);

    // GET ORDER ID
    const orderLocalId = parseInt(route.params.id as string) - 1;
    const orderId = orders.value[orderLocalId].data.order_id;

    setTimeout(() => {
        // IF NUMBER ISN`T EXPIRED
        if (currentTime.value !== 0) {

            // HANDLE GET NEW SMS
            axios({
                method: "get",
                url: `${import.meta.env.VITE_API_BASE_URL}/getSms?order=${orderId}`,
                // headers: {
                //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
                // },
                withCredentials: true
            }).then(function (res) {
                console.log(res);

                // IF NEW SMS RECIVED
                if (res.data !== null && res.data.message !== "pending") {

                    // ADD NEW SMS
                    orders.value[orderLocalId].sms.push(res.data);

                    // HANDLE SCROLL CHAT TO THE END
                    setTimeout(() => {
                        if (scrollEl.value && orderLocalId === parseInt(route.params.id as string) - 1) scrollEl.value.scrollTop = scrollEl.value.scrollHeight;
                    }, 0);
                }
            }).catch(function (err) {
                console.log(err);
            });
        }
    }, 1000);

    clearInterval(interval.value);
    startCountdown(onTick);
});


// CHANGE CHAT HANDLER
const handleChangeChat = (e: Event) => {
    const target = e.target as HTMLElement;
    const chat = target.closest('.order');
    router.push(`/main/orders/${chat?.id}`)
}

// BACK BUTTON HANDLER
const handleGoBack = () => {
    router.go(-1);
}

// RESEND CODE HANDLER
const handleResendCode = () => {

    // GET ORDER ID
    const orderLocalId = parseInt(route.params.id as string) - 1;
    const orderId = orders.value[orderLocalId].data.order_id;

    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/resendSms?order=${orderId}`,
        withCredentials: true
    }).then(function (res) {
        startCountdown(onTick);
        console.log(res);
    }).catch(function (err) {
        console.log(err);
    });
}

// HANDLE COPY NUMBER ON CLICK
const isCopyInscriptionShowed = ref(false);

const handleCopyNumber = () => {
    navigator.clipboard.writeText(`+${currentOrder.value?.data.number}`);
    isCopyInscriptionShowed.value = true;

    setTimeout(() => {
        isCopyInscriptionShowed.value = false;
    }, 2000);
}

</script>

<template>
    <div class="get-number">
        <SuccessPopup :isOpen="isSuccessPopupOpen" :handler="handleOpenSuccessPopup" />
        <Loader v-if="!isOrdersLoaded" />
        <div v-else-if="orders.length !== 0" class="inner-container">
            <div class="get-number__left-box" :class="(showChat != 0 && isMobile) ? 'hidden' : ''">
                <h2 class="get-number__left-box__title mobile">orders</h2>
                <div class="get-number__left-box__chats">
                    <div class="get-number__left-box__chats__scroll">
                        <Order v-for="(item, index) in orders" :key="item.data.number" :setTime="handleChangeTime"
                            :data="item" :id="index + 1" :handler="handleChangeChat" />
                    </div>
                </div>
            </div>
            <div v-if="!currentTime && (currentTime !== 0) && (isMobile || showChat != 0) || isMobileLoading"
                class="get-number__right-box loader">
                <Loader />
            </div>
            <div v-else-if="showChat != 0 || !isMobile" class="get-number__right-box">
                <button @click="handleGoBack" class="get-number__right-box__back-button mobile">
                    <img src="@/assets/svg/Main/Orders/mobileBackButton.svg" alt="">
                    <span class="get-number__right-box__back-button__text">Back</span>
                </button>
                <div class="get-number__right-box__info">
                    <div class="get-number__right-box__info__wrapper">
                        <button @click="handleCopyNumber" class="get-number__right-box__info__left">
                            <div :class="!isCopyInscriptionShowed ? 'closed' : ''"
                                class="get-number__right-box__info__left__copy">
                                <div class="get-number__right-box__info__left__copy__wrapper">copied to clipboard</div>
                            </div>
                            <span class="get-number__right-box__info__left__text">
                                <span class="get-number__right-box__info__left__text white">+{{
                                    currentOrder?.data.number }}</span>
                                <span class="get-number__right-box__info__left__text grey">/</span>
                                <span class="get-number__right-box__info__left__text small">{{ currentOrder?.data.service
                                }},
                                    {{ currentOrder?.data.country }}</span>
                            </span>
                        </button>
                        <div v-if="currentTime > 0" class="get-number__right-box__info__right">
                            <span class="get-number__right-box__info__right__text">
                                <span class="get-number__right-box__info__right__text">{{ Math.floor(currentTime / 60)
                                }}</span>
                                <span class="get-number__right-box__info__right__text grey">MIN</span>
                                <span class="get-number__right-box__info__right__text">{{ currentTime % 60 }}</span>
                                <span class="get-number__right-box__info__right__text grey">SEC</span>
                            </span>
                            <div class="get-number__right-box__info__right__status">Active</div>
                        </div>
                        <div v-else class="get-number__right-box__info__right">
                            <div class="get-number__right-box__info__right__status expired">expired</div>
                        </div>
                    </div>
                </div>
                <div ref="scrollEl" class="get-number__right-box__chat">
                    <div class="get-number__right-box__chat__wrapper">
                        <FirstSms />
                        <MessageWithCode v-for="item in currentOrder?.sms" :sms="item.sms" :currentTime="currentTime"
                            :handleResendCode="handleResendCode" />
                        <RefundMessage
                            v-if="(currentOrder?.sms && currentOrder?.sms.length === 0 && currentTime === 0) || currentOrder?.status === `This order has been refunded`" />
                    </div>
                </div>
            </div>
        </div>
        <NoNumbers v-else />
    </div>
</template>


<style lang="scss" scoped>
.get-number {
    height: calc(100vh - 6rem - 3.5rem * 2);
    width: 100%;
    display: flex;

    @media screen and (max-width: 850px) {
        grid-template-columns: auto;
        background: #000000;
        height: auto;
    }

    &__error {
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

    &__right-box {
        width: 100%;
        display: grid;
        grid-template-rows: 9rem auto;
        overflow: hidden;

        @media screen and (max-width: 850px) {
            display: flex;
            flex-direction: column;
        }

        &.loader {
            height: 100%;
            display: flex;
        }

        &__back-button {
            align-self: flex-start;
            margin-top: 80px;
            display: flex;
            align-items: center;
            gap: 10px;

            &__text {
                font-family: 'Bison';
                font-weight: 300;
                font-size: 23px;
                line-height: 98%;
                color: #FFFFFF;
            }
        }

        &__chat {
            overflow-y: auto;
            margin-right: 1rem;
            height: 100%;
            display: flex;

            @media screen and (max-width: 850px) {
                height: auto;
                min-height: 300px;
                margin-bottom: 92px;
                height: calc(100vh - 70px - 150px - 95px);
            }

            &__wrapper {
                margin-top: auto;
                padding: 4rem 0 5.15rem 5.15rem;
                width: 100%;
                display: grid;
                gap: 1.71rem;

                @media screen and (max-width: 850px) {
                    display: flex;
                    flex-direction: column;
                    padding: 0;
                    height: 100%;
                    -ms-overflow-style: none;
                    overflow: -moz-scrollbars-none;

                    ::-webkit-scrollbar {
                        width: 0;
                    }
                }
            }

            ::v-deep(.message) {
                border: 1px solid #7D808C;
                border-radius: 16px 16px 16px 0px;
                width: 49rem;

                @media screen and (max-width: 850px) {
                    width: 100%;
                    margin-right: 20px;

                    .message:first-child {
                        margin-top: auto;
                    }
                }

                .message__code {
                    font-family: 'Bison';
                    font-weight: 300;
                    font-size: 3rem;
                    line-height: 90.5%;
                    color: #7D808C;

                    @media screen and (max-width: 850px) {
                        font-size: 23px;
                    }

                    &.white {
                        color: white;
                    }

                    &__text {
                        font-weight: 400;
                        font-size: 1.56rem;
                        line-height: 140.5%;
                        color: #7D808C;

                        @media screen and (max-width: 850px) {
                            font-size: 13px;
                        }

                        &__button {
                            color: rgba(192, 251, 80, 1);

                            &:hover {
                                opacity: 0.8;
                            }
                        }
                    }
                }

                .message__wrapper {
                    padding: 2.56rem 3rem;
                    display: flex;
                    flex-direction: column;
                    gap: 1.3rem;
                }

                .message__title {
                    font-family: 'Bison';
                    font-weight: 300;
                    font-size: 3rem;
                    line-height: 90.5%;
                    color: #FFFFFF;

                    @media screen and (max-width: 850px) {
                        font-size: 23px;
                    }
                }

                .message__text {
                    font-family: 'Rubik';
                    font-weight: 400;
                    font-size: 1.54rem;
                    line-height: 140.5%;
                    color: #7D808C;

                    @media screen and (max-width: 850px) {
                        font-size: 15px;
                    }

                    &.white {
                        color: #FFFFFF;
                    }

                    &.green {
                        color: rgba(192, 251, 80, 1);
                    }
                }
            }
        }

        &__info {
            width: 100%;

            &__wrapper {
                height: 9rem;
                margin: 0 3.25rem 0 5.15rem;
                display: flex;
                justify-content: space-between;
                border-bottom: 1px solid #333333;
                display: flex;
                align-items: center;

                @media screen and (max-width: 850px) {
                    height: auto;
                    margin: 16px 0;
                    align-items: flex-start;
                    flex-direction: column;
                    border: none;
                }
            }

            &__right {
                display: flex;
                gap: 1.71rem;
                align-items: center;

                @media screen and (max-width: 850px) {
                    justify-content: space-between;
                    width: 100%;
                    padding: 20px 0;
                    border-bottom: 1px solid #333333;
                }

                &__status {
                    font-family: 'Bison';
                    font-weight: 300;
                    font-size: 1.3rem;
                    line-height: 98%;
                    color: #C0FB50;
                    border: 1px solid #C0FB50;
                    border-radius: 35px;
                    padding: 0.6rem 2.56rem;

                    &.expired {
                        color: #333333;
                        border: 1px solid #333333;
                    }

                    @media screen and (max-width: 850px) {
                        font-size: 13px;
                    }
                }

                &__text {
                    font-family: 'Bison';
                    font-weight: 300;
                    font-size: 3rem;
                    line-height: 90.5%;
                    color: #FFFFFF;

                    @media screen and (max-width: 850px) {
                        font-size: 19px;
                    }

                    &.grey {
                        color: rgba(125, 128, 140, 1);
                    }
                }
            }

            &__left {
                position: relative;
                display: flex;
                gap: 1.54rem;
                align-items: center;

                @media screen and (max-width: 850px) {
                    width: 100%;
                    padding-bottom: 15px;
                    border-bottom: 1px solid #333333;
                }

                &:hover {
                    .get-number__right-box__info__left__text.white {
                        opacity: 0.8;
                    }
                }

                &__copy {
                    position: absolute;
                    top: -50%;
                    left: 50%;
                    background: #C0FB50;
                    box-shadow: -6px 7px 6px rgba(0, 0, 0, 0.25);
                    border-radius: 8px 8px 8px 0px;
                    transition: all .3s;
                    z-index: 9999;

                    @media screen and (max-width: 850px) {
                        top: -80%;
                        left: 20%;
                    }

                    &__wrapper {
                        padding: 1rem 2.56rem;
                        font-family: 'Bison';
                        font-weight: 300;
                        font-size: 1.71rem;
                        line-height: 2.05rem;
                        color: #0F0F0F;
                        white-space: nowrap;

                        @media screen and (max-width: 850px) {
                            padding: 10px 20px;
                            font-family: 'Bison';
                            font-weight: 300;
                            font-size: 16px;
                            line-height: 20px;
                        }
                    }
                }

                &__svg {
                    height: 3.42rem;
                    width: 3.42rem;

                    @media screen and (max-width: 850px) {
                        height: 40px;
                        width: 40px;
                    }
                }

                &__text {
                    display: flex;
                    align-items: center;
                    gap: 0.9rem;

                    &.white {
                        font-family: 'Bison';
                        font-weight: 300;
                        font-size: 3.42rem;
                        line-height: 98%;
                        color: #FFFFFF;

                        @media screen and (max-width: 850px) {
                            font-size: 23px;
                        }
                    }

                    &.grey {
                        font-family: 'Bison';
                        font-weight: 300;
                        font-size: 1.54rem;
                        line-height: 98%;
                        color: #333333;

                        @media screen and (max-width: 850px) {
                            font-size: 15px;
                        }
                    }

                    &.small {
                        font-family: 'Bison';
                        font-weight: 300;
                        font-size: 1.71rem;
                        line-height: 98%;
                        color: #FFFFFF;

                        @media screen and (max-width: 850px) {
                            font-size: 19px;
                        }
                    }
                }
            }
        }
    }

    &__left-box {
        height: 100%;
        border-right: 1px solid #333333;
        background: #131313;
        overflow: hidden;
        display: grid;
        grid-template-rows: auto;

        @media screen and (max-width: 850px) {
            display: flex;
            flex-direction: column;
            border-right: none;
            background: #000000;
            height: calc(100vh - 80px);
        }

        &.hidden {
            position: absolute;
            left: -999999px;
            top: 0;
            opacity: 0;
            visibility: hidden;
        }

        &__title {
            margin-top: 80px;
            font-family: 'Rubik';
            font-weight: 900;
            font-size: 31px;
            line-height: 99.5%;
            text-transform: uppercase;
            color: #FFFFFF;
        }

        &__search {
            height: 9rem;
            width: 100%;

            &__wrapper {
                margin: 0 2rem;
                height: 100%;
                display: flex;
                align-items: center;
                justify-content: center;

                @media screen and (max-width: 850px) {
                    margin: 0;
                }
            }

            &__input {
                border: 1px solid #B8B8B8;
                border-radius: 8px 8px 29px 8px;
                width: 100%;
                font-family: 'Rubik';
                font-weight: 500;
                font-size: 1.54rem;
                line-height: 99.5%;
                text-transform: uppercase;
                color: #FFFFFF;

                padding: 1.5rem 4.53rem;

                background-image: url('@/assets/svg/Main/search.svg');
                background-repeat: no-repeat;
                background-position: 1.71rem center;
                background-size: 2.04rem;

                &::placeholder {
                    font-family: 'Rubik';
                    font-weight: 500;
                    font-size: 1.54rem;
                    line-height: 99.5%;
                    text-transform: uppercase;
                    color: #FFFFFF;

                    @media screen and (max-width: 850px) {
                        font-size: 17px;
                    }
                }

                @media screen and (max-width: 850px) {
                    font-size: 17px;
                    background-size: 17px;
                    background-position: 9px center;
                }
            }
        }

        &__chats {
            overflow-y: auto;
            width: 100%;

            @media screen and (max-width: 850px) {
                margin: 20px 0 49px 0;
            }

            &__scroll {
                display: grid;
                grid-auto-rows: 6.85rem;

                @media screen and (max-width: 850px) {
                    grid-auto-rows: 68px;
                }
            }
        }
    }

    .inner-container {
        display: grid;
        grid-template-columns: 37.6rem auto;
        height: calc(100vh - 6rem - 3.5rem * 2);
        width: 100%;

        @media only screen and (max-width: 850px) {
            grid-template-columns: auto;
            height: auto;
            min-height: calc(100vh - 48px);
            padding: 0;
            @include width-restriction-old;
        }
    }
}
</style>