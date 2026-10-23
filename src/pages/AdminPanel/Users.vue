<script setup lang="ts">
import { inject, onMounted, ref } from 'vue';
import { DEMO_MODE } from '@/demo/config';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { useAdminUsers } from '@/stores/AdminPanel/adminUsers';
import UserLine from '@/components/Reusable/AdminPanel/Users/UserLine.vue';
import Loader from '@/components/Reusable/Main/Loader.vue';

const notifyError = inject<any>('notifyError');
const notifySuccess = inject<any>('notifySuccess');
const notifyWarning = inject<any>('notifyWarning');

const adminUsersStore = useAdminUsers();
const { users } = storeToRefs(adminUsersStore);

const popupCreateOpenedIndicator = ref<boolean>(false);

const createAccountEmail = ref<string>('');
const createAccountPassword = ref<string>('');

const searchString = ref<string>('');

const isLoaded = ref<boolean>(false);

const openPopupCreate = (): void => {
    popupCreateOpenedIndicator.value = true;
};

const closePopupCreate = (): void => {
    popupCreateOpenedIndicator.value = false;
};

const closeOnWrapperPopupCreate = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (!target || !target.classList.contains('popup-admin')) return;
    closePopupCreate();
};

const getUsers = (): void => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getAccounts`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {
        // console.log('USERS', res);

        if (res.data.accounts) {
            adminUsersStore.setUsers(res.data.accounts);
            isLoaded.value = true;
        }
    }).catch(function (err) {
        console.log(err);
    });
};

const createAccount = (): void => {
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/createAccount`,
        data: JSON.stringify({
            "email": createAccountEmail.value,
            "password": createAccountPassword.value
        }),
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
       console.log(res);
        if (res.data.error) {
            notifyError(res.data.message);
            return;
        }
        getUsers();
        closePopupCreate();

        setTimeout(() => {
            createAccountEmail.value = '';
            createAccountPassword.value = '';
            notifySuccess('User successfully added');
        }, 300);
    }).catch(function (err) {
        console.log(err);
        notifyError('Error occured');
    });
};

const search = (): void => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getSearchData?category=accounts&search=${searchString.value}`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {

        if (res.data.data) {
            // console.log('SEARCH', res.data.data);
            adminUsersStore.setUsers(res.data.data);
        }
    }).catch(function (err) {
        console.log(err);
    });

    if (!searchString.value) {
        getUsers();
    }
};

onMounted(() => {
    getUsers();

    // setInterval(() => {
    //     notifySuccess('Succesful message');
    //     notifyWarning('Warning message');
    //     notifyError('Error message');
    // }, 3000)
})
</script>

<template>
    <div class="page page-admin-users">
        <div @click="closeOnWrapperPopupCreate" class="popup-admin popup-create" :class="{'closed': !popupCreateOpenedIndicator}">
            <div class="popup-content">
                <button @click="closePopupCreate" class="button-close">
                    <img src="@/assets/svg/AdminPanel/cross.svg" alt="" class="cross">
                </button>
                <div class="info">
                    <h3 class="title">{{ DEMO_MODE ? "Create sample user" : "Create account" }}</h3>
                    <p v-if="DEMO_MODE" class="demo-description">
                        Only use fictional details. Changes reset when you refresh.
                    </p>
                    <form @submit.prevent class="form">
                        <div class="input-container">
                            <span class="subtitle">Email</span>
                            <input v-model="createAccountEmail" type="email" class="input">
                        </div>
                        <div v-if="!DEMO_MODE" class="input-container">
                            <span class="subtitle">Password</span>
                            <input v-model="createAccountPassword" type="text" class="input">
                        </div>
                        <div class="buttons">
                            <button @click="createAccount" class="btn-green-rounded button-add">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div class="inner-container">
            <div v-if="isLoaded" class="main-content">
                <div class="search-container">
                    <img src="@/assets/svg/AdminPanel/search.svg" alt="" class="icon">
                    <input @input="search" v-model="searchString" type="text" class="search-input" placeholder="Search...">
                    <button @click="openPopupCreate" class="btn-green-rounded button-create">Create user</button>
                </div>
                <div class="table">
                    <div class="title-line desktop">
                        <div class="column first">Id</div>
                        <div class="column second">Email</div>
                        <div class="column third">Amount</div>
                        <div class="column fourth">Registration</div>
                        <div class="column fifth">Active</div>
                        <div class="column sixth">Purchased</div>
                        <div class="column seventh"></div>
                    </div>
                    <!-- <UserLine
                        v-for="user in users" 
                        :key="user.id"
                        :id="user.id"
                        :email="user.email"
                        :amount="user.amount"
                        :registration-date="user.registrationDate"
                        :active="user.active"
                        :purchased="user.purchased"
                    /> -->
                    <UserLine
                        v-for="user in users" 
                        :key="user.id"
                        :id="user.id"
                        :status="user.status"
                        :email="user.auth?.email?.email || user.auth?.telegram?.username || null"
                        :balance="user.balance"
                        :referral="user.referral"
                        :date="user.date"
                        :stats="user.stats"
                    />
                </div>
            </div>
            <Loader v-if="!isLoaded" class="admin-loader" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-admin-users {
    min-height: calc(93vh - 4.5rem);
    width: 100%;

    @media only screen and (max-width: 850px) {
        margin-top: -9px;
    }

    .popup-create {

        .popup-content {
            @include flex-center;
            justify-content: flex-start;
            height: 53rem;

            .info {
                width: 100%;
                
                .title {
                    font-family: Bison;
                    font-size: 5.6rem;
                    line-height: 1;
                    margin-bottom: 3.2rem;
                }

                .demo-description {
                    margin-bottom: 1.2rem;
                    color: var(--color-grey-2);
                    font-size: 1.4rem;
                    line-height: 1.5;
                }

                .form {

                    .input-container {


                        &:not(:last-of-type) {
                            margin-bottom: 1.9rem;
                        }

                        input {
                            border: 1px solid lighten(#333, 8%);
                            padding: 2.15rem 2.2rem .7rem;

                            @media only screen and (max-width: 850px) {
                                padding: 25px 25px 5px;
                            }
                        }

                        .subtitle {
                            color: lighten(#333, 8%);
                        }
                    }

                    .buttons {
                        display: flex;
                        margin-top: 3.5rem;

                        button {
                            font-size: 2.5rem;
                            width: 15rem;
                            padding: .5rem;

                            &:not(:last-of-type) {
                                margin-right: 1.3rem;
                            }
                        }
                    }
                }
            }
        }
    }

    .inner-container {
        min-height: calc(93vh - 4.5rem);
        // display: flex;

        @media only screen and (max-width: 850px) {
            flex-direction: column;
        }

        .current-user {
            min-height: 100%;
            border-right: 1px solid var(--color-grey);
            width: 32rem;

            @media only screen and (max-width: 1000px) {
                display: none;
            }

            .block {
                border-bottom: 1px solid var(--color-grey);
                padding: 3.2rem;
            }

            .info {
                display: flex;
                flex-direction: column;
                padding-top: 4.4rem;

                .username {
                    font-family: Bison;
                    font-size: 2.9rem;
                    margin-bottom: 1.3rem;
                }

                .email {
                    display: inline-block;
                    margin-bottom: .9rem;
                }

                .email,
                .id {


                    .grey {
                        color: var(--color-grey-2);
                    }
                }
            }

            .statistics {


                .list {
                    display: grid;
                    grid-template-columns: repeat(2, 1fr);
                    grid-gap: 2.2rem;

                    .item {
                        display: flex;
                        align-items: center;

                        .icon-container {
                            @include flex-center;
                            width: 4.1rem;
                            height: 4.1rem;
                            margin-right: 1.3rem;
                            border-radius: .4rem;

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
                            }

                            .number {
                                font-size: 1.8rem;
                            }
                        }

                        &-1 {

                            .icon-container {
                                background-color: #E3FA61;
                            }
                        }

                        &-2 {
                            margin-left: -8.5rem;

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


                .time-container {
                    background-color: #1C1C1C;
                    border: 1px dashed #FFFFFF;
                    border-radius: .6rem;
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    padding: 1.9rem 0;

                    .time {
                        font-family: Bison;
                        font-size: 2.8rem;

                        .grey {
                            color: var(--color-grey-2);
                        }
                    }

                    .orders {
                        color: var(--color-grey-2);
                    }
                }
            }
        }

        .main-content {
            flex-grow: 1;
            min-height: 100%;

            .search-container {
                position: relative;
                background-image: linear-gradient(96.47deg, #0F0F0F 0%, rgba(0, 0, 0, 0) 100%);
                border-bottom: 1px solid var(--color-grey);
                width: 100%;
                height: 7.3rem;

                @media only screen and (max-width: 850px) {
                    background-image: none;
                    // border-top: 1px solid var(--color-grey);
                    margin-bottom: 3rem;
                }

                .icon {
                    width: 2.1rem;
                    position: absolute;
                    top: 50%;
                    // left: 6.9rem;
                    left: calc(8.5% - 1rem);
                    transform: translateY(-50%);

                    @media only screen and (max-width: 850px) {
                        left: 4rem;
                        width: 21px;
                    }

                    @media only screen and (max-width: 600px) {
                        left: 2rem;
                    }

                    @media only screen and (max-width: 450px) {
                        left: 1rem;
                    }
                }
                
                .search-input {
                    font-family: Bison;
                    font-size: 3.5rem;
                    color: var(--color-white);
                    height: 100%;
                    width: 100%;
                    // padding-left: 10.5rem;
                    padding-left: calc(8.5% + 3rem);
                    padding-right: 18.5rem;

                    @media only screen and (max-width: 850px) {
                        padding-left: 8.5rem;
                        font-size: 32px;
                    }

                    @media only screen and (max-width: 600px) {
                        padding-left: 6.5rem;
                    }

                    @media only screen and (max-width: 450px) {
                        padding-left: 5.5rem;
                    }

                    &::placeholder {
                        font-family: Bison;
                        font-size: 3.5rem;
                        color: var(--color-white);

                        @media only screen and (max-width: 850px) {
                            font-size: 32px;
                        }
                    }
                }

                .button-create {
                    font-size: 2.5rem;
                    padding: .6rem 2.2rem;
                    position: absolute;
                    top: 50%;
                    right: 2.6rem;
                    transform: translateY(-50%);

                    @media only screen and (max-width: 850px) {
                        font-size: 21px;
                    }

                    @media only screen and (max-width: 600px) {
                        font-size: 19px;
                        right: 2rem;
                    }

                    @media only screen and (max-width: 450px) {
                        right: 1rem;
                    }
                }
            }

            .table {
                
                .title-line {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                    font-family: Bison;
                    color: var(--color-green-light);
                    font-size: 1.8rem;
                    background-color: #0F0F0F;
                    border-bottom: 1px solid var(--color-grey);
                    padding: 1rem 0;

                    .column {
                        text-align: center;
        
                        &:not(:last-of-type) {
                            margin-right: 1rem;
                        }

                        .grey {
                            color: var(--color-grey-2);
                        }

                        &.first {
                            width: 13%;
                            padding-left: .5rem;
                        }

                        &.second {
                            width: 25%;
                        }

                        &.third {
                            width: 13%;
                        }

                        &.fourth {
                            width: 19%;
                        }

                        &.fifth {
                            width: 10%;
                        }

                        &.sixth {
                            width: 10%;
                        }

                        &.seventh {
                            width: 10%;
                        }
                    }
                }
            }
        }
    }
}
</style>