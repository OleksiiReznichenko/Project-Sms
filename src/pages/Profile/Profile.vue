<script setup lang="ts">
import { onMounted, ref, watch, type Ref, nextTick, inject } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import Loader from '@/components/Reusable/Main/Loader.vue';
import Session from '@/components/Reusable/Main/Profile/Session.vue';
import Order from '@/components/Reusable/Main/Orders/Order.vue';
import Billing from '@/components/Singular/Main/Profile/Billing.vue';
import UserInfo from '@/components/Singular/Main/Profile/UserInfo.vue';
import Settings from '@/components/Singular/Main/Profile/Settings.vue';
import LogoutPopup from '@/components/Singular/Main/LogoutPopup.vue';
import DepositPopup from '@/components/Singular/Main/DepositPopup.vue';
import VerificationPopup from '@/components/Singular/Main/VerificationPopup.vue';
import { useUserStore } from '@/stores/user';

const router = useRouter();

const notifySuccess = inject<any>('notifySuccess');

// LOGOUT POPUP HANDLER
const isLogoutPopupOpen = ref(false);

const handleOpenLogoutPopup = () => {
    isLogoutPopupOpen.value = !isLogoutPopupOpen.value;
}

// VERIFICATION POPUP HANDLER
const isVerificationPopupOpen = ref(false);

const handleOpenVerificationPopup = () => {
    isVerificationPopupOpen.value = !isVerificationPopupOpen.value;
}

// DEPOSIT POPUP HANDLER
const isDepositPopupOpen = ref(false);

const handleOpenDepositPopup = () => {
    isDepositPopupOpen.value = !isDepositPopupOpen.value;
}

// SESSIONS DATA
interface session {
    id: string,
    ip: string,
    last: number,
    agent: string,
    country: string,
    current: boolean
}

const sessions: Ref<session[] | []> = ref([]);

// ANNOUNCEMENTS DATA
interface announcement {
    id: number,
    title: string,
    description: string,
    preview: string,
    start: string,
    end: string
}

const announcements: Ref<announcement[] | []> = ref([]);

// LOADER VARIABLES
const isOrdersLoaded = ref(false);
const isBannerLoaded = ref(false);

// USER`S STORE
const user = useUserStore();

// DATA`S VARIABLES
const daysAgo = ref(0);
const orders = ref([]);
const lessTime = ref();

onMounted(() => {
    const timestamp = user.date;

    // REGISTRATION DATE COUNTING
    if (timestamp != 0) {
        const timestampInSeconds = timestamp / 1000;
        const now = new Date();
        const targetDate = new Date(timestampInSeconds * 1000);
        const diffInMilliseconds = now.getTime() - targetDate.getTime();
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        daysAgo.value = Math.floor(diffInMilliseconds / millisecondsPerDay);
    }

    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getAccount`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {
        // SET STORE DATA
        user.setUser(res.data.account);

        // SET DATA`S VARIABLES
        orders.value = res.data.account.orders.filter((item: any) => item.data.error !== true && item.error !== true);
        lessTime.value = minExpiresIn();
        sessions.value = res.data.account.sessions;

        // SET LOADER VARIABLE TO TRUE
        isOrdersLoaded.value = true;
        console.log(res);
    }).catch(function (err) {
        console.log(err);
    });

    // GET ANNOUNCEMENTS
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getAnnouncements`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {

        // SET ANNOUNCEMENTS VARIABLE 
        announcements.value = res.data.announcements;

        // SET LOADER VARIABLE TO TRUE
        isBannerLoaded.value = true;
        console.log(res);
    }).catch(function (err) {
        console.log(err);
    });

});

// DATA`S INTEFACES
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
    sms: sms[]
}

interface sms {
    sms: string,
    full_sms: string,
    expiration: number
}

// HANDLE FIND MINIMAL EXPIRES IN TIME  
const minExpiresIn = (): Order | null => {
    return orders.value.reduce((minOrder: Order | null, currentOrder: Order) => {
        if (!minOrder) {
            return currentOrder;
        }

        if (currentOrder.data.expiry - new Date().getTime() < 0) return minOrder;

        return (currentOrder.data.expiry - new Date().getTime() < minOrder.data.expiry - new Date().getTime() || (currentOrder.data.expiry - new Date().getTime() > 0 && minOrder.data.expiry - new Date().getTime() < 0))
            ? currentOrder
            : minOrder;
    }, null);
}

// HANDLE COUNT REGISTRATION DATE ON USER STORE CHANGE
watch(user.$state, (newValue) => {
    const timestamp = user.date;
    if (timestamp != 0) {
        const timestampInSeconds = timestamp / 1000;
        const now = new Date();
        const targetDate = new Date(timestampInSeconds * 1000);
        const diffInMilliseconds = now.getTime() - targetDate.getTime();
        const millisecondsPerDay = 24 * 60 * 60 * 1000;
        daysAgo.value = Math.floor(diffInMilliseconds / millisecondsPerDay);
    }
});

// CREATE REFERRAL LINK HANDLER
const handleCreateReferral = () => {
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/createReferral`,
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
        console.log(res);

        // USERS INFO UPD
        if (res.data.message === "Referral successfully created.") {
            axios({
                method: "get",
                url: `${import.meta.env.VITE_API_BASE_URL}/getAccount`,
                // headers: {
                //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
                // }
                withCredentials: true
            }).then(function (res) {
                user.setUser(res.data.account);
                console.log(res);
            }).catch(function (err) {
                console.log(err);
            });
        }
    }).catch(function (err) {
        console.log(err);
    });
}

// HANDLE COPY REFERRAL LINK
const handleCopyReferralLink = () => {
    navigator.clipboard.writeText(`https://quicksms.io/r/${user.referral.link}`);
    notifySuccess('Referral link successfully copied');
}

// TOGGLE 2FA
const handleChange2FA = (e: Event) => {
    const target = e.target as HTMLInputElement;

    // IF 2FA WAS OFF
    if (!target.checked) {
        handleOpenVerificationPopup();
        target.checked = true;
    } else {
        notifySuccess('2FA successfully enabled');
    }

    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/tfa/turn`,
        data: JSON.stringify({
            "status": target.checked
        }),
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
        console.log(res);
    }).catch(function (err) {
        console.log(err);
    });
}

const announcementTitle = ref('');
const announcementDescr = ref('');

// SET ANNOUNCEMENTS ANIMATION
watch(announcements, async (newValue) => {
    if (!announcements.value || announcements.value.length === 0) return;

    await nextTick();

    void function () {
        let i = 1;

        let bg = document.querySelector(".banner") as HTMLElement;

        if (!bg) {
            return;
        }

        announcementTitle.value = announcements.value[0].title;
        announcementDescr.value = announcements.value[0].description;

        if (announcements.value[0].preview) {
            bg.style.background = `center / contain no-repeat url(https://quicksms.io/img/announcements/${announcements.value[0].preview})`;
        };

        if (announcements.value.length < 2) {
            return false;
        };

        setInterval(() => {
            bg.style.top = "-150%";
            bg.style.left = "-5%";
            bg.style.transform = "rotate(-10deg)";
            setTimeout(() => {
                if (announcements.value[i].preview) {
                    bg.style.background = `center / contain no-repeat url(/assets/media/announcements/${announcements.value[i].preview})`;
                };
            }, 500);

            setTimeout(() => {
                bg.style.top = "0";
                bg.style.left = "0";
                bg.style.transform = "rotate(0deg)";

                announcementTitle.value = announcements.value[i].title;
                announcementDescr.value = announcements.value[i].description;

                i++;

                if (i >= announcements.value.length) {
                    i = 0;
                };
            }, 1000);

        }, 7000);
    }();
});


// CURRENT ORDERS TIME HANDLER
const currentTime = ref(0);

const handleChangeTime = (time: number) => {
    currentTime.value = Math.floor(time / 1000);
}

// HANDLE REDIRECT TO CHAT
const handleGoToChat = (e: Event) => {
    const id = (e.target as HTMLElement).closest('.order')?.id;
    router.push({ name: 'Orders', params: { id: id } });
}

// GET 3 LAST ORDERS
const filteredOrders = () => {
    if (orders.value.length === 0) return [];
    return orders.value.slice(0, 3);
};


// HANDLE END SESSION
const handleEndSession = (id: string) => {
    sessions.value = sessions.value.filter(item => item.id !== id);
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/deleteSession`,
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true,
        data: JSON.stringify({
            "id": id
        }),
    }).then(function (res) {
        console.log(res);
    }).catch(function (err) {
        console.log(err);
    });
}

// SET SESSIONS OS NAME HANDLER
const handleSetOSName = (string: string): string => {
    if (string.toLowerCase().includes('ios') || string.toLowerCase().includes('mac os')) return 'IOS';
    if (string.toLowerCase().includes('windows')) return 'Windows';
    if (string.toLowerCase().includes('android')) return 'Android';
    return 'Linux';
}

</script>

<template>
    <div class="profile">
        <DepositPopup :isOpen="isDepositPopupOpen" :handler="handleOpenDepositPopup" />
        <LogoutPopup :isOpen="isLogoutPopupOpen" :handler="handleOpenLogoutPopup" />
        <VerificationPopup :isOpen="isVerificationPopupOpen" :handler="handleOpenVerificationPopup" />
        <h2 class="profile__title mobile">Home</h2>
        <div class="profile__banner">
            <Loader v-if="!isBannerLoaded" />
            <div v-else class="banner">
                <div class="banner__wrapper">
                    <span class="banner__title">{{ announcementTitle }}</span>
                    <span class="banner__text">{{ announcementDescr }}</span>
                </div>
            </div>
        </div>
        <div class="profile__last-sms">
            <Loader v-if="!isOrdersLoaded" />
            <div v-else-if="filteredOrders().length === 0" class="profile__last-sms__wrapper__no-orders">
                <img src="@/assets/svg/Main/Profile/noOrders.svg" alt="" class="profile__last-sms__wrapper__no-orders__img">
                <span class="profile__last-sms__wrapper__no-orders__title">You haven't bought a sms yet</span>
                <span class="profile__last-sms__wrapper__no-orders__descr">Click "Buy" button</span>
                <router-link class="profile__last-sms__wrapper__no-orders__button" to="/main/services">Buy</router-link>
            </div>
            <div v-else class="profile__last-sms__wrapper">
                <span class="profile__last-sms__title">the last few orders</span>
                <div class="profile__last-sms__box">
                    <Order v-for="(item, index) in filteredOrders()" :profileID="lessTime.data.order_id"
                        :setTime="handleChangeTime" :data="item" :id="index + 1" :handler="handleGoToChat" />
                    <div class="hidden">
                        <Order v-for="(item, index) in orders" :profileID="lessTime.data.order_id"
                            :setTime="handleChangeTime" :data="item" :id="index + 1" :handler="handleGoToChat" />
                    </div>
                </div>
                <router-link to="/main/orders" class="profile__last-sms__button">see all</router-link>
            </div>
        </div>
        <UserInfo :daysAgo="daysAgo" />
        <div class="profile__data">
            <div class="profile__data__wrapper">
                <Billing :handleOpenDepositPopup="handleOpenDepositPopup" />
                <div v-if="!isOrdersLoaded || !currentTime && (currentTime !== 0)" class="profile__data__bottom">
                    <Loader />
                </div>
                <div v-else-if="currentTime <= 0 || !currentTime" class="profile__data__bottom">
                    <span class="profile__data__bottom__no-orders__text">You don't have any<br />purchased numbers
                        yet</span>
                    <router-link class="profile__data__bottom__no-orders__button" to="/main/services">Buy</router-link>
                </div>
                <div v-else class="profile__data__bottom">
                    <span class="profile__data__bottom__text">You {{ lessTime.data.service }}, {{ lessTime.data.country }}
                        expires in</span>
                    <span class="profile__data__bottom__time"><span class="profile__data__bottom__time green">{{
                        Math.floor(currentTime / 60) }}</span>min:<span class="profile__data__bottom__time green">{{
        currentTime % 60 }}</span>sec</span>
                </div>
            </div>
        </div>
        <Settings :handleOpenLogoutPopup="handleOpenLogoutPopup" :handleCopyReferralLink="handleCopyReferralLink"
            :handleCreateReferral="handleCreateReferral" :handleChange2FA="handleChange2FA" />
        <div class="profile__login">
            <div class="profile__login__wrapper">
                <Session v-for="item in sessions" :item="item" :handleSetOSName="handleSetOSName"
                    :handleEndSession="handleEndSession" />
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.profile {


    input:focus::placeholder {
        color: transparent;
    }

    width: 100%;
    display: grid;
    grid-template-columns: 990fr 800fr;
    grid-template-rows: 34rem 41rem auto;

    @media screen and (max-width: 850px) {
        width: 100vw;
        grid-template-columns: auto;
        grid-template-rows: auto;
    }

    .hidden {
        position: absolute;
        opacity: 0;
        visibility: hidden;
        left: -99999999px;
        top: 0;
    }

    &__title {
        margin-top: 80px;
        font-family: 'Rubik';
        font-weight: 900;
        font-size: 3rem;
        line-height: 99.5%;
        text-transform: uppercase;
        color: #FFFFFF;
        padding: 0 20px;
        width: 100vw;
    }

    &__banner {
        border-right: 1px solid #333333;

        @media screen and (max-width: 850px) {
            border-right: none;
        }
    }

    &__last-sms,
    &__banner,
    &__data,
    &__login {
        border-bottom: 1px solid #333333;

        @media screen and (max-width: 850px) {
            margin-right: 20px;
            margin-left: 20px;
        }
    }

    &__banner {
        display: flex;
        align-items: center;
        justify-content: center;
        min-width: 0;

        @media screen and (max-width: 850px) {
            padding: 15px 0;
            min-height: 150px;
            border-bottom: none;
        }

        .banner {
            aspect-ratio: 910/345;
            width: 95%;
            position: relative;
            display: flex;
            background: center / cover no-repeat url('/img/Profile/default-banner.png');
            transition: all .3s;
            top: 0px;
            left: 0px;
            transform: rotate(0deg);

            @media screen and (max-width: 850px) {
                width: 100%;
            }

            &__img {
                position: absolute;
                object-fit: cover;
                width: 100%;
            }

            &__wrapper {
                display: flex;
                flex-direction: column;
                justify-content: center;
                padding: 5.15rem;
                gap: 1rem;
                z-index: 10;
                width: 100%;
            }

            &__title {
                font-family: 'Rubik';
                font-weight: 900;
                font-size: 3rem;
                line-height: 99.5%;
                text-transform: uppercase;
                color: #FFFFFF;
                max-width: 70%;
            }

            &__text {
                font-family: 'Rubik';
                font-style: normal;
                font-size: 1.54rem;
                line-height: 140%;
                color: #FFFFFF;
                max-width: 60%;
            }
        }
    }

    &__last-sms {
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;

        @media screen and (max-width: 850px) {
            width: auto;
            min-height: 150px;
        }

        &__wrapper {
            padding: 2.56rem 2.1rem;

            @media screen and (max-width: 850px) {
                padding: 15px 0;
            }

            &__no-orders {
                flex-direction: column;
                display: flex;
                width: 100%;
                padding: 2.56rem 2.1rem;
                align-items: center;

                &__img {
                    aspect-ratio: 368/133;
                    width: 31.5rem;

                    @media screen and (max-width: 850px) {
                        width: 90%;
                    }
                }

                &__title {
                    margin-top: 2.8rem;
                    font-weight: 500;
                    font-size: 1.71rem;
                    line-height: 150%;
                    text-align: center;
                    letter-spacing: -0.022em;
                    color: #7D808C;

                    @media screen and (max-width: 850px) {
                        font-size: 19px;
                    }
                }

                &__descr {
                    font-weight: 400;
                    font-size: 1.56rem;
                    line-height: 150%;
                    text-align: center;
                    letter-spacing: -0.022em;
                    color: #7D808C;

                    @media screen and (max-width: 850px) {
                        font-size: 15px;
                    }
                }

                &__button {
                    margin-top: 0.8rem;
                    font-weight: 500;
                    font-size: 1.71rem;
                    line-height: 150%;
                    text-align: center;
                    letter-spacing: -0.022em;
                    color: #C0FB50;
                    transition: all .3s;

                    &:hover {
                        opacity: 0.8;
                    }

                    @media screen and (max-width: 850px) {
                        margin-top: 9px;
                        font-size: 19px;
                    }
                }
            }
        }

        &__title {
            font-family: 'Rubik';
            font-weight: 900;
            font-size: 3rem;
            line-height: 99.5%;
            text-transform: uppercase;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                font-size: 19px;
            }
        }

        &__box {
            display: grid;
            grid-auto-rows: 6.85rem;
            margin: 1.3rem 0 1.71rem;

            @media screen and (max-width: 850px) {
                grid-auto-rows: 68px;
            }

            &__el {
                transition: .3s;
                display: flex;
                align-items: center;
                justify-content: center;
                width: 100%;

                &:first-child &__wrapper {
                    border-top: 1px solid #333333;
                }

                &__wrapper {
                    border-bottom: 1px solid #333333;
                    height: 100%;
                    display: flex;
                    gap: 1.3rem;
                    align-items: center;
                    width: 100%;

                    @media screen and (max-width: 850px) {
                        margin: 0;
                    }
                }

                &__svg {
                    height: 3.42rem;
                    width: 3.42rem;

                    @media screen and (max-width: 850px) {
                        height: 34px;
                        width: 34px;
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
                    }
                }
            }
        }

        &__button {
            font-family: 'Bison';
            font-weight: 300;
            font-size: 2.05rem;
            line-height: 99.5%;
            color: #C0FB50;

            &:hover {
                opacity: 0.8;
            }

            @media screen and (max-width: 850px) {
                font-size: 16px;
            }
        }
    }

    &__data {
        &__wrapper {
            padding: 3.42rem 4.3rem 2.6rem;
            width: 100%;
            height: 100%;
            display: grid;
            grid-template-rows: 1fr 1fr;
            gap: 2rem;

            @media screen and (max-width: 1000px) {
                padding: 3.42rem 2rem 2.6rem;
            }

            @media screen and (max-width: 850px) {
                padding: 3.42rem 0 2.6rem;
                grid-template-rows: auto;
                gap: 25px;
            }
        }

        &__bottom {
            background: #171717;
            border: 1px solid #333333;
            border-radius: 7px;
        }

        &__bottom {
            display: flex;
            align-items: center;
            flex-direction: column;
            justify-content: center;

            @media screen and (max-width: 850px) {
                height: 130px;
                gap: 8px;
            }

            &__no-orders {
                &__text {
                    font-weight: 400;
                    font-size: 1.56rem;
                    line-height: 150%;
                    text-align: center;
                    letter-spacing: -0.022em;
                    color: #7D808C;

                    @media screen and (max-width: 850px) {
                        font-size: 15px;
                    }
                }

                &__button {
                    margin-top: 0.8rem;
                    font-weight: 500;
                    font-size: 1.71rem;
                    line-height: 150%;
                    text-align: center;
                    letter-spacing: -0.022em;
                    color: #C0FB50;
                    transition: all .3s;

                    &:hover {
                        opacity: 0.8;
                    }

                    @media screen and (max-width: 850px) {
                        margin-top: 9px;
                        font-size: 19px;
                    }
                }
            }

            &__text {
                font-family: 'Rubik';
                font-weight: 400;
                font-size: 1.36rem;
                line-height: 99.5%;
                color: #7D808C;

                @media screen and (max-width: 850px) {
                    font-size: 13px;
                }
            }

            &__time {
                font-family: 'Bison';
                font-weight: 300;
                font-size: 5.5rem;
                line-height: 99.5%;
                color: #7D808C;
                width: 22rem;
                text-align: right;

                @media screen and (max-width: 850px) {
                    font-size: 31px;
                    width: 125px;
                }

                &.green {
                    color: #C0FB50;
                }
            }
        }
    }

    &__login {
        width: 100%;

        @media screen and (max-width: 850px) {
            width: auto;
        }

        &__wrapper {
            display: flex;
            flex-direction: column;
            width: 100%;
            height: 100%;
            padding: 4.3rem;
            gap: 1.71rem;

            @media screen and (max-width: 1000px) {
                padding: 3.42rem 2rem 2.6rem;
            }

            @media screen and (max-width: 850px) {
                padding: 20px 0 80px;
                gap: 20px;
            }
        }
    }
}
</style>
