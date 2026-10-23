<script setup lang="ts">
import { inject, onMounted, ref, watch, watchEffect } from 'vue';
import { DEMO_MODE } from '@/demo/config';
import axios from 'axios';
import type { User } from '@/interfaces/user';
import { useRoute, useRouter } from 'vue-router';

const notifyError = inject<any>('notifyError');
const notifySuccess = inject<any>('notifySuccess');
const notifyWarning = inject<any>('notifyWarning');

const route = useRoute();
const router = useRouter();

const user = ref<User>({
    id: 0,
    status: 'user',
    auth: {
        email: {
            email: ''
        },
        telegram: {
            first_name: '',
            id: 0,
            username: ''
        }
    },
    balance: 0,
    referral: {
        link: '',
        uses: 0,
        discount: 0
    },
    date: '0'
});

const formattedDate = ref<number | string>(0);
const emailCopy = ref<string | null>('');
const passwordCopy = ref<string>('');

const isButtonDisabled = ref<boolean>(true);

const inputCopy = ref<HTMLInputElement | null>(null);

const bannedIdicator = ref<boolean>(false);
const popupSureBanOpenedIndicator = ref<boolean>(false);
const popupSureDeleteOpenedIndicator = ref<boolean>(false);
const popupBalanceOpenedIndicator = ref<boolean>(false);

const popupBalance = ref<number | string>(0);

const ban = (): void => {
    bannedIdicator.value = true;
    closePopupSureBan();

    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/editAccount`,
        data: JSON.stringify({
            "id": +route.params.id,
            "data": {
                "status": "banned",
            }
        }),
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
        if (res.data.error) {
            notifyError(res.data.message);
            return;
        }
        notifySuccess('User successfully banned');
    }).catch(function (err) {
        console.log(err);
        notifyError('Error occured');
    });
};

const unban = (): void => {
    bannedIdicator.value = false;

    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/editAccount`,
        data: JSON.stringify({
            "id": +route.params.id,
            "data": {
                "status": "user",
            }
        }),
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
        if (res.data.error) {
            notifyError(res.data.message);
            return;
        }
        notifySuccess('User successfully unbanned');
    }).catch(function (err) {
        console.log(err);
        notifyError('Error occured');
    });
};

const deleteAccount = (): void => {
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/deleteAccount`,
        data: JSON.stringify({
            "id": +route.params.id
        }),
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
        if (res.data.error) {
            notifyError(res.data.message);
            return;
        }
        router.push({ name: 'adminPanelUsers' })
        notifySuccess('User successfully deleted');
    }).catch(function (err) {
        console.log(err);
        notifyError('Error occured');
    });
};

const copyText = (): void => {
    if (!inputCopy.value) return;
    inputCopy.value.select();
    inputCopy.value.setSelectionRange(0, 99999);

    navigator.clipboard.writeText(inputCopy.value.value);
    notifySuccess('Refferal copied');
};

const openPopupSureBan = (): void => {
    popupSureBanOpenedIndicator.value = true;
};

const openPopupSureDelete = (): void => {
    popupSureDeleteOpenedIndicator.value = true;
};

const openPopupBalance = (): void => {
    popupBalanceOpenedIndicator.value = true;
};

const closePopupSureBan = (): void => {
    popupSureBanOpenedIndicator.value = false;
};

const closePopupSureDelete = (): void => {
    popupSureDeleteOpenedIndicator.value = false;
};

const closePopupBalance = (): void => {
    popupBalanceOpenedIndicator.value = false;

    setTimeout(() => {
        popupBalance.value = user.value.balance;
    }, 300);
};

const closeOnWrapperPopupSure = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (!target || !target.classList.contains('popup-admin')) return;
    closePopupSureBan();
    closePopupSureDelete();
    closePopupBalance();
};

watchEffect(() => {
    if (user.value?.status === 'banned') {
        bannedIdicator.value = true;
    }
});

const formatDate = (): string => {
    const dateObj = +new Date() - +new Date(+user.value.date);
    const secondsAmount = dateObj / 1000;
    const minutesAmount = Math.floor(secondsAmount / 60);
    if (minutesAmount < 60) {
        return `${minutesAmount} minutes `;
    }

    const hoursAmount = Math.floor(minutesAmount / 60);
    if (hoursAmount < 24) {
        return `${hoursAmount} hours `;
    }

    const daysAmount = Math.floor(hoursAmount / 24);
    if (daysAmount < 30) {
        return `${daysAmount} days `;
    }

    const monthsAmount = Math.floor(daysAmount / 30);
    if (monthsAmount < 12) {
        return `${monthsAmount} months `;
    }

    const yearsAmount = Math.floor(monthsAmount / 12);
    return `${yearsAmount} years `;
};

watch(user, (newValue, oldValue) => {
    if (newValue.date !== oldValue.date) {
        formattedDate.value = formatDate();
    }

    if (newValue.auth?.email?.email !== oldValue.auth?.email?.email) {
        emailCopy.value = user.value.auth?.email?.email || null;
    }
    popupBalance.value = user.value.balance;
});

const saveInfoChanges = (): void => {
    if (emailCopy.value !== user.value.auth?.email?.email && passwordCopy.value) {
        axios({
            method: "post",
            url: `${import.meta.env.VITE_API_BASE_URL}/editAccount`,
            data: JSON.stringify({
                "id": +route.params.id,
                "data": {
                    "email": emailCopy.value,
                    "password": passwordCopy.value
                }
            }),
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
            },
            withCredentials: true
        }).then(function (res) {
            if (res.data.error) {
                notifyError(res.data.message);
                return;
            }
            if (!user.value.auth?.email?.email || !emailCopy.value) return;
            user.value.auth.email.email = emailCopy.value;
            passwordCopy.value = '';
            notifySuccess('User info successfully changed');
        }).catch(function (err) {
            console.log(err);
            notifyError('Error occured');
        });

        return;
    }

    if (emailCopy.value !== user.value.auth?.email?.email) {
        axios({
            method: "post",
            url: `${import.meta.env.VITE_API_BASE_URL}/editAccount`,
            data: JSON.stringify({
                "id": +route.params.id,
                "data": {
                    "email": emailCopy.value
                }
            }),
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
            },
            withCredentials: true
        }).then(function (res) {
            if (res.data.error) {
                notifyError(res.data.message);
                return;
            }
            if (!user.value.auth?.email?.email || !emailCopy.value) return;
            user.value.auth.email.email = emailCopy.value;
            notifySuccess('Email successfully changed');
        }).catch(function (err) {
            console.log(err);
            notifyError('Error occured');
        });

        return;
    }

    if (passwordCopy.value) {
        axios({
            method: "post",
            url: `${import.meta.env.VITE_API_BASE_URL}/editAccount`,
            data: JSON.stringify({
                "id": +route.params.id,
                "data": {
                    "password": passwordCopy.value
                }
            }),
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
            },
            withCredentials: true
        }).then(function (res) {
            if (res.data.error) {
                notifyError(res.data.message);
                return;
            }
            passwordCopy.value = '';
            notifySuccess('Password successfully changed');
        }).catch(function (err) {
            console.log(err);
            notifyError('Error occured');
        });

        return;
    }
};

const changeBalance = (): void => {
    // if () {
        axios({
            method: "post",
            url: `${import.meta.env.VITE_API_BASE_URL}/editAccount`,
            data: JSON.stringify({
                "id": +route.params.id,
                "data": {
                    "balance": popupBalance.value,
                }
            }),
            headers: {
                "Content-Type": "application/json",
                // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
            },
            withCredentials: true
        }).then(function (res) {
            if (res.data.error) {
                notifyError(res.data.message);
                return;
            }
            
            closePopupBalance();
            user.value.balance = popupBalance.value;
            notifySuccess('Balance successfully changed');
        }).catch(function (err) {
            console.log(err);
            notifyError('Error occured');
        });

        return;
    // }
};

watchEffect(() => {
    if (!user.value.auth?.email?.email) return;
    if (emailCopy.value !== user.value.auth?.email?.email || passwordCopy.value) {
        isButtonDisabled.value = false;
    } else {
        isButtonDisabled.value = true;
    }
});

onMounted(() => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getAccount?id=${route.params.id}`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {
        if (res.data.account) {
            user.value = res.data.account;
        }
    }).catch(function (err) {
        console.log(err);
    });
})
</script>

<template>
    <div class="page page-admin-user">
        <div class="banned-window" :class="{ 'closed': !bannedIdicator }">
            <div class="info">
                <router-link to="/adminPanel/users" class="button-back">
                    <img src="@/assets/svg/AdminPanel/arrowWhiteLeft.svg" alt="" class="arrow">
                    <span>Back</span>
                </router-link>
                <h2 class="username">{{ user.auth?.email?.email || user.auth?.telegram?.username }}</h2>
                <strong class="status">Banned</strong>
                <div class="buttons">
                    <button @click="unban" class="btn-green-rounded button-unban">Unban</button>
                    <button @click="openPopupSureDelete" class="btn-red-rounded button-delete">Delete account</button>
                </div>
            </div>
        </div>
        <div @click="closeOnWrapperPopupSure" class="popup-admin popup-sure popup-sure-ban"
            :class="{ 'closed': !popupSureBanOpenedIndicator }">
            <div class="popup-content">
                <button @click="closePopupSureBan" class="button-close">
                    <img src="@/assets/svg/AdminPanel/cross.svg" alt="" class="cross">
                </button>
                <div class="info">
                    <h3 class="title">Are you sure you want to ban this User?</h3>
                    <div class="buttons">
                        <button @click="closePopupSureBan" class="btn-green button-back">Back</button>
                        <button @click="ban" class="btn-transparent-green button-continue">Ban</button>
                    </div>
                </div>
            </div>
        </div>
        <div @click="closeOnWrapperPopupSure" class="popup-admin popup-sure popup-sure-delete"
            :class="{ 'closed': !popupSureDeleteOpenedIndicator }">
            <div class="popup-content">
                <button @click="closePopupSureDelete" class="button-close">
                    <img src="@/assets/svg/AdminPanel/cross.svg" alt="" class="cross">
                </button>
                <div class="info">
                    <h3 class="title">Are you sure you want to delete this User?</h3>
                    <div class="buttons">
                        <button @click="closePopupSureDelete" class="btn-green button-back">Back</button>
                        <button @click="deleteAccount" class="btn-red button-continue">Delete</button>
                    </div>
                </div>
            </div>
        </div>
        <div @click="closeOnWrapperPopupSure" class="popup-admin popup-balance"
            :class="{ 'closed': !popupBalanceOpenedIndicator }">
            <div class="popup-content">
                <button @click="closePopupBalance" class="button-close">
                    <img src="@/assets/svg/AdminPanel/cross.svg" alt="" class="cross">
                </button>
                <div class="info">
                    <h3 class="title">change the balance to <span class="green">*User*</span></h3>
                    <div class="input-container">
                        <span class="subtitle">Edit balance ($)</span>
                        <input v-model="popupBalance" type="number" class="input" required>
                        <button @click="changeBalance" class="btn-green button-change">Now ${{ (+user.balance).toFixed(2) }}</button>
                    </div>
                </div>
            </div>
        </div>
        <div class="inner-container">
            <div class="left">
                <div class="block user-info">
                    <div class="email-balance-container">
                        <div class="email-container">
                            <img v-if="user.auth?.telegram" src="@/assets/svg/AdminPanel/telegram.svg" alt=""
                                class="icon icon-telegram">
                            <img v-else src="@/assets/svg/AdminPanel/google.svg" alt="" class="icon">
                            <span class="email">{{ user.auth?.email?.email || user.auth?.telegram?.username }}</span>
                        </div>
                        <div class="balance-container">
                            <span class="balance">Balance: ${{ (+user.balance).toFixed(2) }}</span>
                        </div>
                    </div>
                    <h2 class="username">{{ user.auth?.email?.email || user.auth?.telegram?.username }}</h2>
                    <div class="flex-container">
                        <span class="line">
                            <span class="grey">Id: </span> {{ user.id }}
                        </span>
                        <span class="line">
                            <span class="grey">Registered: </span> {{ formattedDate }} ago
                        </span>
                    </div>
                </div>
                <div class="block buttons">
                    <button @click="openPopupSureDelete" class="btn-transparent-red button-delete">
                        <img src="@/assets/svg/AdminPanel/buttonDeleteIcon.svg" alt="" class="icon">
                        <span>Delete account</span>
                    </button>
                    <button @click="openPopupSureBan" class="btn-transparent-white button-ban">
                        <img src="@/assets/svg/AdminPanel/buttonBanIcon.svg" alt="" class="icon">
                        <span>Ban account</span>
                    </button>
                    <button @click="openPopupBalance" class="btn-transparent-white button-edit">
                        <img src="@/assets/svg/AdminPanel/pen.svg" alt="" class="icon">
                        <span>Edit balance</span>
                    </button>
                </div>
                <div class="block statistics mobile">
                    <h4 class="title">Billing summary</h4>
                    <ul class="list">
                        <li class="item item-1">
                            <div class="icon-container">
                                <img src="@/assets/svg/AdminPanel/statisticsDeposit.svg" alt="" class="icon">
                            </div>
                            <div class="item-info">
                                <span class="subtitle">Deposit</span>
                                <strong class="number">${{ user.balance }}</strong>
                            </div>
                        </li>
                        <li class="item item-2">
                            <div class="icon-container">
                                <img src="@/assets/svg/AdminPanel/statisticsPhone.svg" alt="" class="icon">
                            </div>
                            <div class="item-info">
                                <span class="subtitle">Active</span>
                                <strong class="number">{{ user.stats?.active ?? 0 }}</strong>
                            </div>
                        </li>
                        <li class="item item-3">
                            <div class="icon-container">
                                <img src="@/assets/svg/AdminPanel/statisticsPhone.svg" alt="" class="icon">
                            </div>
                            <div class="item-info">
                                <span class="subtitle">Purchased</span>
                                <strong class="number">{{ user.stats?.total ?? 0 }}</strong>
                            </div>
                        </li>
                    </ul>
                </div>
                <div class="block inputs-container settings-inputs-container">
                    <h3 class="title">Settings</h3>
                    <div class="inputs">
                        <div class="input-container">
                            <span class="subtitle">Email</span>
                            <input type="email" class="input" v-model="emailCopy">
                        </div>
                        <div class="input-container">
                            <span class="subtitle">Password</span>
                            <input type="password" class="input" v-model="passwordCopy" :disabled="DEMO_MODE" :placeholder="DEMO_MODE ? 'Not available in demo' : ''">
                        </div>
                        <button @click="saveInfoChanges" class="btn-green-rounded button-save"
                            :class="{ 'disabled': isButtonDisabled }">Save</button>
                    </div>
                </div>
                <div class="block inputs-container refferal-inputs-container">
                    <h3 class="title">Settings</h3>
                    <div class="inputs">
                        <div class="input-container input-container-refferal">
                            <span class="subtitle">Refferal link</span>
                            <input ref="inputCopy" type="text" class="input" :value="user.referral?.link ?? ''" readonly>
                            <button @click="copyText" class="button-copy">
                                <span class="desktop">Copy</span>
                                <img src="@/assets/svg/AdminPanel/copyIcon.svg" alt="" class="icon mobile">
                            </button>
                        </div>
                        <div class="input-container input-container-signed">
                            <span class="subtitle">Signed</span>
                            <input type="number" class="input" :value="user.referral?.uses ?? 0" readonly>
                        </div>
                        <div class="input-container input-container-discount">
                            <span class="subtitle">Your discount (%)</span>
                            <input type="number" class="input" :value="user.referral?.discount ?? 0" readonly>
                        </div>
                    </div>
                </div>
            </div>
            <div class="right">
                <div class="block statistics desktop">
                    <h4 class="title">Billing summary</h4>
                    <ul class="list">
                        <li class="item item-1">
                            <div class="icon-container">
                                <img src="@/assets/svg/AdminPanel/statisticsDeposit.svg" alt="" class="icon">
                            </div>
                            <div class="item-info">
                                <span class="subtitle">Deposit</span>
                                <strong class="number">${{ (+user.balance).toFixed(2) }}</strong>
                            </div>
                        </li>
                        <li class="item item-2">
                            <div class="icon-container">
                                <img src="@/assets/svg/AdminPanel/statisticsPhone.svg" alt="" class="icon">
                            </div>
                            <div class="item-info">
                                <span class="subtitle">Active</span>
                                <strong class="number">{{ user.stats?.active ?? 0 }}</strong>
                            </div>
                        </li>
                        <li class="item item-3">
                            <div class="icon-container">
                                <img src="@/assets/svg/AdminPanel/statisticsPhone.svg" alt="" class="icon">
                            </div>
                            <div class="item-info">
                                <span class="subtitle">Purchased</span>
                                <strong class="number">{{ user.stats?.total ?? 0 }}</strong>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-admin-user {
    min-height: calc(93vh - 4.5rem);
    width: 100%;

    .banned-window {
        @include flex-center;
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(#000, .8);
        backdrop-filter: blur(5px);
        z-index: 10000;
        transition: all .3s;

        .info {
            display: flex;
            flex-direction: column;
            align-items: center;
            text-align: center;

            .button-back {
                position: relative;
                z-index: 100;
                display: flex;
                align-items: center;
                font-family: Bison;
                font-size: 2.15rem;
                margin-bottom: 1rem;

                @media only screen and (max-width: 850px) {
                    font-size: 24px;
                }

                &:hover {
                    opacity: .8;
                }

                &:hover span {
                    padding-left: .6rem;
                }

                span {
                    transition: all .3s;
                }

                .arrow {
                    width: .8rem;
                    margin-right: 1.6rem;

                    @media only screen and (max-width: 850px) {
                        width: 8px;
                    }
                }
            }

            .username {
                font-family: Bison;
                font-size: 14rem;
                line-height: .8;
                word-break: break-all;

                @media only screen and (max-width: 850px) {
                    font-size: 64px;
                }
            }

            .status {
                font-family: PureHeart;
                font-weight: 400;
                color: var(--color-green-light);
                font-size: 5.5rem;
                display: inline-block;
                margin-bottom: 4.4rem;
            }

            .buttons {
                display: flex;

                button {
                    font-size: 2.4rem;
                    padding: .5rem 5rem !important;

                    &:not(:last-of-type) {
                        margin-right: 1.3rem;
                    }

                    @media only screen and (max-width: 850px) {
                        font-size: 22px;
                    }
                }
            }
        }
    }

    .popup-sure-delete {
        z-index: 11000;
    }

    .popup-balance {


        .popup-content {
            padding-top: 13rem;

            .info {


                .title {
                    font-family: Bison;
                    font-size: 5.65rem;
                    margin-bottom: 3rem;
                    line-height: 1.05;

                    .green {
                        color: var(--color-green-light);
                    }
                }

                .input-container {


                    .subtitle {
                        top: .8rem;
                        // color: var(--color-grey);
                    }

                    input {
                        padding: 2.75rem 2.2rem 1rem;
                        border: 1px solid var(--color-grey);
                    }

                    .button-change {
                        position: absolute;
                        top: 50%;
                        right: 2.2rem;
                        transform: translateY(-50%);
                        border-radius: .6rem;
                        padding: .5rem 3rem;
                    }
                }
            }
        }
    }

    .inner-container {
        min-height: calc(93vh - 4.5rem);
        display: flex;

        @media only screen and (max-width: 850px) {
            flex-direction: column;
        }

        .left {
            width: 55%;
            border-right: 1px solid var(--color-grey);
            min-height: 100%;

            @media only screen and (max-width: 850px) {
                width: 100%;
                border-right: none;
            }

            .block {
                padding: 3rem 2.7rem 3rem;
                border-bottom: 1px solid var(--color-grey);

                @media only screen and (max-width: 850px) {
                    padding: 25px 0 !important;
                }
            }

            .user-info {
                padding: 3.55rem 2.7rem 3rem;
                display: flex;
                flex-direction: column;
                align-items: flex-start;

                .email-balance-container {
                    display: flex;
                    align-items: center;
                    margin-bottom: 1.25rem;

                    .email-container {
                        @include flex-center;
                        background-color: #86FA50;
                        border-radius: 100rem;
                        padding: .7rem 2.9rem;
                        color: var(--color-black);
                        margin-right: 1.3rem;

                        .icon {
                            width: 1.8rem;
                            margin-right: 1.1rem;

                            &-telegram {
                                filter: brightness(0);
                                width: 2.1rem;
                            }
                        }

                        .email {
                            font-family: Bison;
                            font-size: 1.8rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 18px;
                            }
                        }
                    }

                    .balance-container {
                        @include flex-center;
                        padding: .6rem 1.6rem;
                        border-radius: .6rem;
                        background-color: var(--color-green-light);
                        color: var(--color-black);

                        .balance {
                            font-family: Bison;
                            font-size: 1.8rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 18px;
                            }
                        }
                    }
                }

                .username {
                    font-family: Bison;
                    // font-size: 13rem;
                    font-size: 11rem;
                    line-height: .8;
                    word-break: break-all;
                    margin-bottom: 2rem;

                    @media only screen and (max-width: 850px) {
                        font-size: 48px;
                    }
                }

                .flex-container {


                    .line {
                        font-family: Bison;
                        font-size: 1.8rem;

                        @media only screen and (max-width: 850px) {
                            font-size: 20px;
                        }

                        &:not(:last-of-type) {
                            margin-right: 1.5rem;
                        }

                        .grey {
                            color: var(--color-grey-2);
                        }
                    }
                }
            }

            .buttons {
                display: flex;
                align-items: center;

                @media only screen and (max-width: 850px) {
                    overflow-x: scroll;
                }

                button {
                    @include flex-center;
                    font-size: 1.8rem;
                    // padding: 1.55rem 5.2rem;
                    padding: 1.55rem 1.2rem;
                    border-radius: .6rem;
                    width: 33.3%;
                    white-space: nowrap;
                    text-align: center;

                    &:not(:last-of-type) {
                        margin-right: 2.3rem;
                    }

                    @media only screen and (max-width: 850px) {
                        font-size: 18px;
                        white-space: nowrap;
                        border-radius: 6px;
                        width: auto;
                        padding: 12px 25px
                    }

                    .icon {
                        width: 1.8rem;
                        margin-right: 1rem;
                        transition: all .3s;

                        @media only screen and (max-width: 1100px) and (min-width: 850px) {
                            display: none;
                        }

                        @media only screen and (max-width: 850px) {
                            width: 18px;
                        }
                    }

                    span {}
                }

                .btn-transparent-red {

                    &:hover {
                        background-color: var(--color-red);
                        color: var(--color-white);

                        .icon {
                            filter: brightness(1000%);
                        }
                    }
                }

                .btn-transparent-white {

                    &:hover {
                        background-color: var(--color-white);
                        color: var(--color-black);

                        .icon {
                            filter: brightness(0%);
                        }
                    }
                }
            }

            .inputs-container {


                .title {
                    font-family: Bison;
                    font-size: 3.2rem;
                    margin-bottom: 1.75rem;

                    @media only screen and (max-width: 850px) {
                        font-size: 34px;
                        margin-bottom: 20px;
                    }
                }

                .button-save {
                    font-size: 2rem;
                    padding: 0;
                    width: 20%;

                    @media only screen and (max-width: 850px) {
                        width: 100%;
                        padding: 10px 0;
                        font-size: 20px;
                    }

                    &.disabled {
                        pointer-events: none;
                        opacity: .5;
                    }
                }

                .inputs {
                    display: flex;

                    @media only screen and (max-width: 850px) {
                        flex-direction: column;
                    }

                    .input-container {
                        width: 40%;
                        position: relative;

                        @media only screen and (max-width: 850px) {
                            width: 100%;
                        }

                        // &:not(:last-of-type) {
                        margin-right: 2.3rem;

                        @media only screen and (max-width: 850px) {
                            margin-right: 0;
                            margin-bottom: 15px;
                        }

                        // }

                        input {
                            padding: 2.15rem 2.2rem .4rem;
                            border: 1px solid var(--color-grey-2);
                            border-radius: .6rem;
                            width: 100%;
                            font-size: 1.8rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 20px;
                                padding: 25px 25px 5px;
                            }
                        }

                        .subtitle {
                            position: absolute;
                            left: 2.2rem;
                            top: .6rem;
                            font-size: 1.4rem;
                            color: var(--color-grey-2);

                            @media only screen and (max-width: 850px) {
                                font-size: 14px;
                                left: 25px !important;
                            }
                        }

                        .button-copy {
                            @include flex-center;
                            position: absolute;
                            top: 0;
                            left: 0;
                            z-index: 100;
                            width: 100%;
                            height: 100%;
                            text-align: center;
                            background-color: var(--color-grey);
                            border-radius: .6rem;
                            opacity: 0;

                            @media only screen and (max-width: 850px) {
                                left: auto;
                                right: 0;
                                width: 50px;
                                opacity: 1;
                                background-color: transparent !important;
                            }

                            &:hover {
                                opacity: 1;
                            }

                            &:active {
                                background-color: #222;
                            }

                            .icon {
                                width: 19px;
                            }
                        }
                    }
                }
            }

            .refferal-inputs-container {


                .inputs {

                    @media only screen and (max-width: 850px) {
                        display: grid;
                        grid-template-columns: repeat(2, 1fr);
                        grid-gap: 15px;
                    }

                    .input-container {

                        &:not(:last-of-type) {
                            margin-right: 1.4rem;
                        }

                        @media only screen and (max-width: 850px) {
                            width: 100% !important;
                            margin-right: 0 !important;
                            margin-bottom: 0 !important;
                        }
                    }

                    .input-container-refferal {
                        width: 60%;

                        @media only screen and (max-width: 850px) {
                            grid-column: 1 / -1;
                        }
                    }

                    .input-container-signed {
                        width: 14%;
                        min-width: 9.5rem;

                        .subtitle {
                            left: 1.8rem;
                        }
                    }

                    .input-container-discount {
                        width: 18%;
                        min-width: 14rem;

                        input {
                            color: var(--color-green-light);
                        }

                        .subtitle {
                            left: 1.8rem;
                        }
                    }
                }
            }
        }

        .right {
            width: 45%;
            padding: 3.55rem 4% 3rem;

            @media only screen and (max-width: 850px) {
                width: 100%;
                padding: 25px 0 !important;
            }

            .block {
                width: 100%;
                margin-bottom: 2.2rem;
            }

            .sessions {


                .session {
                    background-color: #1C1C1C;
                    border: 1px dashed #FFFFFF;
                    border-radius: .6rem;
                    display: flex;
                    padding: 2.2rem 2.2rem;
                    position: relative;

                    &:not(:last-of-type) {
                        margin-bottom: 2.2rem;
                    }

                    .icon-container {
                        @include flex-center;
                        background-color: var(--color-green-light-2);
                        min-width: 3.9rem;
                        width: 3.9rem;
                        height: 3.9rem;
                        border-radius: 100rem;
                        margin-right: 1.75rem;
                        margin-top: -.3rem;

                        @media only screen and (max-width: 850px) {
                            min-width: 42px;
                            width: 42px;
                            height: 42px;
                        }

                        .icon {
                            width: 40%;
                        }
                    }

                    .info {


                        .title {
                            font-weight: 700;
                            font-size: 2.8rem;
                            margin-bottom: .6rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 31px;
                            }
                        }

                        .green {
                            color: var(--color-green-light);
                        }

                        span {
                            display: inline-block;
                            font-size: 1.5rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 15px;
                            }

                            &:not(:last-of-type) {
                                // margin-bottom: .2rem;
                                margin-bottom: .4rem;

                                @media only screen and (max-width: 850px) {
                                    margin-bottom: 4px;
                                }
                            }
                        }

                        .flex-container {
                            display: flex;
                            flex-direction: column;

                            .item {
                                display: flex;
                                flex-direction: column;

                                &:not(:last-of-type) {
                                    // margin-right: 1.4rem;
                                    margin-bottom: .4rem;

                                    @media only screen and (max-width: 850px) {
                                        margin-bottom: 4px;
                                    }
                                }
                            }
                        }
                    }

                    .button-cross {
                        position: absolute;
                        top: 2.45rem;
                        right: 2.45rem;
                        width: 1.1rem;

                        &:hover {
                            opacity: .7;
                        }
                    }
                }
            }
        }

        .statistics {
            background-color: #171717;
            border: 1px solid var(--color-grey);
            border-radius: .6rem;
            padding: 2.7rem 3.5rem 4rem;

            @media only screen and (max-width: 850px) {
                background-color: transparent;
                border: none;
                padding: 10px 0;
            }

            .title {
                font-weight: 900;
                text-transform: uppercase;
                font-size: 1.8rem;
                margin-bottom: 1.75rem;

                @media only screen and (max-width: 850px) {
                    font-size: 20px;
                }
            }

            .list {
                display: flex;
                justify-content: space-between;

                @media only screen and (max-width: 1450px) {
                    display: grid;
                    grid-template-columns: 1.1fr 2fr;
                    grid-gap: 2.2rem;
                }

                @media only screen and (max-width: 850px) {
                    grid-gap: 26px;
                }

                .item {
                    display: flex;
                    align-items: center;

                    .icon-container {
                        @include flex-center;
                        width: 4.1rem;
                        height: 4.1rem;
                        margin-right: 1.3rem;
                        border-radius: .4rem;

                        @media only screen and (max-width: 850px) {
                            width: 43px;
                            height: 43px;
                            margin-right: 14px;
                            border-radius: 4px;
                        }

                        .icon {
                            width: 52%;
                            height: 52%;
                            margin-left: -1px;
                            margin-bottom: -1px;
                        }
                    }

                    &-info {
                        display: flex;
                        flex-direction: column;

                        .subtitle {
                            color: var(--color-grey-2);
                            display: inline-block;
                            margin-bottom: .3rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 16px;
                            }
                        }

                        .number {
                            font-size: 1.8rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 20px;
                            }
                        }
                    }

                    &-1 {

                        .icon-container {
                            background-color: #E3FA61;
                        }
                    }

                    &-2 {
                        @media only screen and (max-width: 1450px) {
                            // margin-left: -5.5rem;
                        }

                        .icon-container {
                            background-color: #61FAC5;
                        }
                    }

                    &-3 {
                        white-space: nowrap;

                        .icon-container {
                            background-color: #FA6197;
                        }
                    }
                }
            }
        }

        .time-block {

            @media only screen and (max-width: 850px) {
                // margin-bottom: 25px;
                padding-bottom: 25px;
                border-bottom: 1px solid var(--color-grey);
            }


            .time-container {
                background-color: #1C1C1C;
                border: 1px dashed #FFFFFF;
                border-radius: .6rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                padding: 4.1rem 4.7rem;

                .time {
                    font-family: Bison;
                    font-size: 5.5rem;
                    line-height: 1;
                    color: var(--color-green-light);
                    margin-bottom: 1.3rem;

                    @media only screen and (max-width: 850px) {
                        font-size: 34px;
                    }

                    .grey {
                        color: var(--color-grey-2);
                    }
                }

                .orders {
                    color: var(--color-grey-2);

                    @media only screen and (max-width: 850px) {
                        font-size: 15px;
                    }
                }
            }
        }
    }
}
</style>