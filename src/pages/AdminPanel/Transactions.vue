<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { useAdminTransactions } from '@/stores/AdminPanel/adminTransactions';
import { useSlideFunctionsStore } from '@/stores/slideFunctions';
import TransactionLine from '@/components/Reusable/AdminPanel/Transactions/TransactionLine.vue';
import Loader from '@/components/Reusable/Main/Loader.vue';

const adminTransactionsStore = useAdminTransactions();
const { transactions } = storeToRefs(adminTransactionsStore);

const searchString = ref<string>('');

const isLoaded = ref<boolean>(false);

const getTransactions = (): void => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getTransactions`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // },
        withCredentials: true
    }).then(function (res) {
        // console.log('transactions', res);

        if (res.data.transactions) {
            adminTransactionsStore.setTransactions(res.data.transactions);
            isLoaded.value = true;
        }
    }).catch(function (err) {
        console.log(err);
    });
};

const search = (): void => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getSearchData?category=transactions&search=${searchString.value}`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // },
        withCredentials: true
    }).then(function (res) {

        if (res.data.data) {
            // console.log('SEARCH', res.data.data);
            adminTransactionsStore.setTransactions(res.data.data);
        }
    }).catch(function (err) {
        console.log(err);
    });

    if (!searchString.value) {
        getTransactions();
    }
};

const slideFunctionsStore = useSlideFunctionsStore();

const slideToggle = (event: Event, duration = 500): void => {
    const target = event.target as HTMLElement;
    const parent = target?.closest('.transaction-line');
    // const headerLine = target?.closest('.header-line');
    const buttonArrowDesktop = parent?.querySelector('.inner-line-container .button-arrow .arrow') as HTMLElement;
    const buttonArrowMobile = parent?.querySelector('.mobile-lines-container .button-arrow .arrow') as HTMLElement;
    const toggleContainer = parent?.querySelector('.toggle-container') as HTMLElement;

    if (parent && toggleContainer && !parent.classList.contains('animating')) {

        if (window.outerWidth > 850) {
            buttonArrowDesktop?.classList.toggle('active');
        } else {
            buttonArrowMobile?.classList.toggle('active');

            const buttonSeeSpan = parent?.querySelector('.button-open .see') as HTMLElement;
            const buttonHideSpan = parent?.querySelector('.button-open .hide') as HTMLElement;

            buttonSeeSpan?.classList.toggle('hidden');
            buttonHideSpan?.classList.toggle('hidden');
        }

        slideFunctionsStore.slideToggle(toggleContainer, 500);

        parent.classList.add('animating');

        setTimeout(() => {
            parent.classList.remove('animating');
        }, duration);
    }
}

onMounted(() => {
    getTransactions();
})
</script>

<template>
    <div class="page page-admin-users">
        <div class="inner-container">
            <div class="main-content">
                <div class="search-filter-container">
                    <div v-if="isLoaded" class="search-container">
                        <img src="@/assets/svg/AdminPanel/search.svg" alt="" class="icon">
                        <input @input="search" v-model="searchString" type="text" class="search-input" placeholder="Search...">
                    </div>
                    <div class="filter-dropdown-container">
                        <div class="dropdown-opener">
                            <img src="@/assets/svg/AdminPanel/filter.svg" alt="" class="icon">
                            <span>Filter</span>
                        </div>
                    </div>
                </div>
                <div v-if="isLoaded" @click="slideToggle" class="table">
                    <div class="title-line desktop">
                        <div class="column first">Id</div>
                        <div class="column second">Orders</div>
                        <div class="column third">Code</div>
                        <div class="column fourth">Email</div>
                        <div class="column fifth">Amount</div>
                        <div class="column sixth">Date</div>
                        <div class="column seventh"></div>
                    </div>
                    <TransactionLine
                        v-for="transaction in transactions" 
                        :key="transaction.id"
                        :id="transaction.id"
                        :status="transaction.status"
                        :orders="transaction.orders"
                        :user="transaction.user"
                        :email="transaction.email"
                        :code="transaction.code"
                        :uid="transaction.uid"
                        :coupon="transaction.coupon"
                        :method="transaction.method"
                        :amount="transaction.amount"
                        :date="transaction.date"
                    />
                </div>
                <Loader v-if="!isLoaded" class="admin-loader" />
            </div>
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

    .inner-container {

        @media only screen and (max-width: 850px) {
            flex-direction: column;
        }

        .main-content {
            flex-grow: 1;
            min-height: 100%;

            .search-filter-container {
                position: fixed;
                top: .35rem;
                right: 18rem;
                z-index: 21000;
                display: flex;
                align-items: center;

                @media only screen and (max-width: 850px) {
                    position: relative;
                    top: auto;
                    right: auto;
                    width: 100%;
                    flex-direction: column;
                    justify-content: center;
                    margin-bottom: 40px;
                }

                .search-container {
                    position: relative;
                    background-color: #0F0F0F;
                    border: 1px solid #333333;
                    border-radius: .8rem;
                    height: 3.8rem;
                    width: 20rem;
                    margin-right: 2rem;

                    @media only screen and (max-width: 850px) {
                        background-color: transparent;
                        border: none;
                        // border-top: 1px solid var(--color-grey);
                        border-bottom: 1px solid var(--color-grey);
                        height: 7.3rem;
                        margin-bottom: 20px;
                        margin-right: 0;
                        width: 100%;
                    }

                    .icon {
                        width: 1.8rem;
                        position: absolute;
                        top: 50%;
                        // left: 6.9rem;
                        left: 1.5rem;
                        transform: translateY(-50%);
                        filter: brightness(1000%);

                        @media only screen and (max-width: 850px) {
                            left: 4rem;
                            width: 21px;
                            filter: none;
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
                        font-size: 2rem;
                        color: var(--color-white);
                        height: 100%;
                        width: 100%;
                        padding-left: 4.7rem;

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
                            font-size: 2rem;
                            color: var(--color-white);

                            @media only screen and (max-width: 850px) {
                                font-size: 32px;
                            }
                        }
                    }
                }

                .filter-dropdown-container {

                    @media only screen and (max-width: 850px) {
                        width: 100%;
                    }

                    .dropdown-opener {
                        background-color: #0F0F0F;
                        border: 1px solid #333333;
                        border-radius: .8rem;
                        height: 3.8rem;
                        display: flex;
                        align-items: center;
                        // width: 20rem;
                        padding: 0 1.5rem;
                        cursor: pointer;

                        @media only screen and (max-width: 850px) {
                            justify-content: center;
                            height: 42px;
                            border-radius: 8px 8px 20px 8px;
                        }

                        .icon {
                            width: 1.65rem;
                            margin-right: 1rem;

                            @media only screen and (max-width: 850px) {
                                width: 19px;
                            }
                        }

                        span {
                            font-family: Bison;
                            font-size: 2rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 18px;
                            }
                        }
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
                    // background-color: #0F0F0F;
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
                            padding-left: 1.5rem;

                            @media only screen and (max-width: 1000px) {
                                padding-left: 15px;
                            }
                        }

                        &.second {
                            width: 7%;  
                        }

                        &.third {
                            width: 14%;
                        }

                        &.fourth {
                            width: 20%;
                        }

                        &.fifth {
                            width: 10%;
                        }

                        &.sixth {
                            width: 13%;
                        }

                        &.seventh {
                            width: 23%;
                            padding-right: 2.5rem;            
                        }
                    }
                }
            }
        }
    }
}
</style>