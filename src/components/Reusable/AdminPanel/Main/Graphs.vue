<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue';
import axios from 'axios';
import { useAdminCharts } from '@/stores/AdminPanel/adminCharts';
import Chart from '@/components/Reusable/AdminPanel/Chart.vue';
import { storeToRefs } from 'pinia';

const usersPeriodDropdownOpenIndicator = ref<boolean>(false);
const paymentsPeriodDropdownOpenIndicator = ref<boolean>(false);

const usersChartPeriod = ref<string>('month');
const paymentsChartPeriod = ref<string>('month');

const adminChartStore = useAdminCharts();
const { chartPayments, chartUsers } = storeToRefs(adminChartStore);

const closeDropdownUsers = (): void => {
    usersPeriodDropdownOpenIndicator.value = false;
};

const closeDropdownPayments = (): void => {
    paymentsPeriodDropdownOpenIndicator.value = false;
};

const toggleDropdownUsers = (): void => {
    if (usersPeriodDropdownOpenIndicator.value) {
        closeDropdownUsers();
    } else {
        usersPeriodDropdownOpenIndicator.value = true;
    }
};

const toggleDropdownPayments = (): void => {
    if (paymentsPeriodDropdownOpenIndicator.value) {
        closeDropdownPayments();
    } else {
        paymentsPeriodDropdownOpenIndicator.value = true;
    }
};

const selectOptionUsersPeriod = (period: 'month' | 'year'): void => {
    usersChartPeriod.value = period;
    getChartsData('users', period);
};

const selectOptionPaymentsPeriod = (period: 'month' | 'year'): void => {
    paymentsChartPeriod.value = period;
    getChartsData('payments', period);
};

const handleClick = (event: Event): void => {
    if (usersPeriodDropdownOpenIndicator.value || paymentsPeriodDropdownOpenIndicator.value) {
        const target = event?.target as HTMLElement;
        const isClickInsideElement = target.closest('.period-dropdown-container');

        if (!isClickInsideElement && usersPeriodDropdownOpenIndicator.value) {
            closeDropdownUsers();
        }

        if (!isClickInsideElement && paymentsPeriodDropdownOpenIndicator.value) {
            closeDropdownPayments();
        }
    }
};

// GET CHARTS
const getChartsData = (chartType: 'payments' | 'users' | 'both', period = 'month') => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getStats/${period}`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {
        if (res.data.users.chart && (chartType === 'users' || chartType === 'both')) {
            adminChartStore.setUsersChart(res.data.users.chart);
        }

        if (res.data.transactions.chart && (chartType === 'payments' || chartType === 'both')) {
            adminChartStore.setPaymentsChart(res.data.transactions.chart);
        }
    }).catch(function (err) {
        console.log(err);
    });
}

onMounted(() => {
    getChartsData('both');
    
    window.addEventListener('click', handleClick);
});

onUnmounted(() => {
    window.removeEventListener('click', handleClick);
});
</script>

<template>
    <div class="graphs">
        <div class="graph-container">
            <div class="header">
                <span class="name">Users</span>
                <div class="dropdown-container users-period-dropdown-container period-dropdown-container">
                    <div @click="toggleDropdownUsers" class="dropdown-opener">
                        <span class="current-value">
                            {{usersChartPeriod}}
                        </span>
                        <img :class="{ 'arrow-active': usersPeriodDropdownOpenIndicator }" 
                        src="@/assets/svg/AdminPanel/arrowWhite.svg" alt="" class="arrow">
                    </div>
                    <div :class="{ 'closed': !usersPeriodDropdownOpenIndicator }" class="dropdown">
                        <ul @click="closeDropdownUsers" class="list">
                            <li class="item">
                                <button @click="selectOptionUsersPeriod('month')" class="parameter">month</button>
                            </li>
                            <li class="item">
                                <button @click="selectOptionUsersPeriod('year')" class="parameter">year</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Chart color="#C0FB50" :chartInfo="chartUsers" />
        </div>
        <div class="graph-container">
            <div class="header">
                <span class="name">Payments</span>
                <div class="dropdown-container payments-period-dropdown-container period-dropdown-container">
                    <div @click="toggleDropdownPayments" class="dropdown-opener">
                        <span class="current-value">
                            {{paymentsChartPeriod}}
                        </span>
                        <img :class="{ 'arrow-active': paymentsPeriodDropdownOpenIndicator }" 
                        src="@/assets/svg/AdminPanel/arrowWhite.svg" alt="" class="arrow">
                    </div>
                    <div :class="{ 'closed': !paymentsPeriodDropdownOpenIndicator }" class="dropdown">
                        <ul @click="closeDropdownPayments" class="list">
                            <li class="item">
                                <button @click="selectOptionPaymentsPeriod('month')" class="parameter">month</button>
                            </li>
                            <li class="item">
                                <button @click="selectOptionPaymentsPeriod('year')" class="parameter">year</button>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <Chart color="#3274D7" :chartInfo="chartPayments" />
        </div>
    </div>
</template>

<style lang="scss" scoped>
.graphs {
    width: 40%;
    flex-grow: 1;

    @media only screen and (max-width: 1850px) {
        display: flex;
        width: 100%;
        margin-bottom: 3.6rem;
    }

    @media only screen and (max-width: 1500px) {
        flex-direction: column;
    }

    @media only screen and (max-width: 850px) {
        margin-bottom: 5rem;
    }

    .graph-container {
        background-image: linear-gradient(96.47deg, #0F0F0F 0%, rgba(0, 0, 0, 0) 100%);
        border-radius: .5rem;
        border: 1px solid var(--color-grey);
        width: 100%;
        height: 33rem;
        padding: 1.8rem 1.8rem 2.5rem;

        @media only screen and (max-width: 1850px) {
            height: 35rem;
        }

        &:not(:last-of-type) {
            margin-bottom: 2.7rem;

            @media only screen and (max-width: 1850px) {
                margin-bottom: 0;
                margin-right: 3.1rem;
            }

            @media only screen and (max-width: 1500px) {
                margin-right: 0;
                margin-bottom: 3.1rem;
            }
        }

        .header {
            display: flex;
            align-items: center;
            justify-content: space-between;
            margin-bottom: 1rem;

            .name {
                font-family: Bison;
                font-size: 2.2rem;

                @media only screen and (max-width: 850px) {
                    font-size: 24px;
                }
            }

            .dropdown-container {
                position: relative;

                .dropdown-opener {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    padding: .4rem 3.1rem;
                    border: 1px solid var(--color-grey);
                    border-radius: .9rem;
                    transition: all .3s;

                    &:hover {
                        background-color: rgba(#333, .2);
                    }

                    .current-value {
                        font-family: Bison;
                        font-size: 2.2rem;
                        display: inline-block;

                        @media only screen and (max-width: 850px) {
                            font-size: 22px;
                        }

                        .grey {
                            color: var(--color-grey);
                        }
                    }

                    .arrow {
                        margin-left: 1rem;
                        width: 1rem;
                        transition: all .3s;
                    }

                    .arrow-active {
                        transform: rotate(-180deg);
                    }
                }

                .dropdown {
                    position: absolute;
                    top: 110%;
                    left: 0;
                    width: 100%;
                    background-color: #0F0F0F;
                    border: 1px solid var(--color-grey);
                    border-radius: .9rem;
                    padding: .9rem 0;

                    .list {


                        .item {


                            .parameter {
                                font-family: Bison;
                                font-size: 2.2rem;
                                width: 100%;
                                padding: .2rem 0;
                                border-radius: .8rem;

                                @media only screen and (max-width: 850px) {
                                    font-size: 22px;
                                }

                                &:hover {
                                    background-color: rgba(#333, .5);
                                }
                            }
                        }
                    }
                }
            }
        }
    }
}
</style>