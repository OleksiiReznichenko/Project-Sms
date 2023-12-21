<script setup lang="ts">
import axios from 'axios';
import { useAdminTransactions } from '@/stores/AdminPanel/adminTransactions';
import { inject, onMounted, onUnmounted, ref } from 'vue';
import Loader from '@/components/Reusable/Main/Loader.vue';

interface Props {
    id: number | string;
    status: 0 | 1;
    orders: [
        {
            type: 'product' | 'deposit';
            amount?: number;
            country?: {
                id: number | string;
                name: string;
                region: string;
                short_name: string;
            };
            service?: {
                id: number | string;
                name: string;
            };
        }
    ];
    user: number | string;
    email: string;
    code: string;
    uid: string;
    coupon: number | string | null;
    method: string;
    amount: number | string;
    date: number | string;
}

const props = defineProps<Props>();

const notifyError = inject<any>('notifyError');
const notifySuccess = inject<any>('notifySuccess');
const notifyWarning = inject<any>('notifyWarning');

const adminTransactions = useAdminTransactions();

const isLoading = ref<boolean>(false);

const formattedDate = (): string => {
    const dateObj = new Date(+props.date);
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    let monthFormatted: number | string = month;
    let dayFormatted: number | string = day;

    if (month < 10) {
        monthFormatted = '0' + month;
    }

    if (day < 10) {
        dayFormatted = '0' + day;
    }
    
    return `${dayFormatted}.${monthFormatted}.${year}`;
};

const confirmTransaction = (): void => {
    isLoading.value = true;
    if (props.status !== 0) return;
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/confirmTransaction`,
        data: JSON.stringify({
            "code": props.code,
            "uid": props.uid
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
        adminTransactions.confirmTransaction(props.id);
        isLoading.value = false;
        notifySuccess('Transaction successfully confirmed');
    }).catch(function (err) {
        console.log(err);
        notifyError('Error occured');
    });
};

const isMobile = ref<boolean>(false);

// ON WINDOW RESIZE
const onResize = (): void => {
    if (window.outerWidth <= 850) {
        isMobile.value = true;
    } else {
        isMobile.value = false;
    }
};

onMounted(() => {
    

    if (window.outerWidth <= 850) {
        isMobile.value = true;
    }
  
  // ADD WINDOW EVENT LISTENER
  window.addEventListener('resize', onResize);
})

onUnmounted(() => {
  // REMOVE WINDOW EVENT LISTENER
  window.removeEventListener('resize', onResize);
})

</script>

<template>
    <div :class="{'success': status === 1}" class="transaction-line">
        <div class="header-line inner-line-container desktop">
            <div class="column first">{{ id }}</div>
            <div class="column second">{{ orders.length }}</div>
            <div class="column third">{{ code }}</div>
            <div class="column fourth">{{ email }}</div>
            <div class="column fifth"><span class="grey">$</span>{{ amount }}</div>
            <div class="column sixth">{{ formattedDate() }} </div>
            <div :class="{'not-center': isLoading}" class="column seventh">
                <!-- <button v-if="status === 0 && !isLoading" @click="confirmTransaction" class="button-confirm">
                    <img src="@/assets/svg/AdminPanel/transactionConfirmButton.svg" alt="" class="icon">
                </button> -->
                <button v-if="!isLoading" class="button-arrow">
                    <img src="@/assets/svg/AdminPanel/arrowTransaction.svg" alt="" class="arrow">
                </button>
                <Loader v-if="isLoading && !isMobile" />
            </div>
        </div>
        <div class="header-line mobile-lines-container mobile">
            <div class="line first">
                <div class="column id-column">
                    <strong class="value">{{ id }}</strong>
                </div>
                <div class="column date-column">
                    <strong class="value">{{ formattedDate() }}</strong>
                </div>
            </div>
            <div class="line second">
                <div class="column amount-column">
                    <span class="subtitle">Amount</span>
                    <strong class="value">${{ amount }}</strong>
                </div>
            </div>
            <div class="line third">
                <div class="column">
                    <span class="subtitle">Code</span>
                    <strong class="value">{{ code }}</strong>
                </div>
                <div class="column">
                    <span class="subtitle">Orders</span>
                    <strong class="value">{{ orders.length }}</strong>
                </div>
            </div>
            <div class="line fourth">
                <div class="column">
                    <span class="subtitle">Email</span>
                    <strong class="value">{{ email }}</strong>
                </div>
            </div>
            <div class="buttons">
                <button class="button-open">
                    <span class="see">See</span>
                    <span class="hide hidden">Hide</span>
                     Detalis
                </button>
            </div>
        </div>
        <div class="toggle-container">
            <div class="inner-container">
                <ul class="order-items">
                    <li v-for="(order, index) in orders" 
                    :key="index" 
                    class="order-item">
                        <span class="service">{{ order.type === 'deposit' ? 'Deposit' : order.country?.name + ', ' + order.service?.name }}</span>
                        <span class="price">
                            {{ order.type === 'deposit' ? '+' : '-' }}
                            ${{ order.type === 'deposit' ? amount : order.amount }}
                        </span>
                    </li>
                </ul>
                <button v-if="status === 0 && !isLoading" @click="confirmTransaction" class="button-confirm btn-green">
                    Accept Payment
                </button>
                <Loader v-if="isLoading && isMobile" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>

::v-deep(.loading-container) {
    width: 2rem !important;
    height: auto !important;

    @media only screen and (max-width: 850px) {
        transform: scale(2);
        margin-top: 20px;
    }
}
.transaction-line {
    position: relative;
    cursor: pointer;
    transition: all .3s;

    &:hover {
        background-color: lighten(#000, 7%);
    }

    @media only screen and (max-width: 850px) {
        width: 50rem;
        margin: 0 auto;
        border: 1px solid var(--color-grey);
        margin-bottom: 15px;
        padding: 20px 0 0;
        border-radius: 10px;

        @media only screen and (max-width: 600px) {
            width: 43rem;
        }
    }

    &.success {

        @media only screen and (min-width: 850px) {
            color: #4B621F !important;
        }

        .toggle-container {

            .inner-container {
                align-items: center;
                justify-content: center;

                .order-items {
                    display: grid;
                    grid-template-columns: repeat(4, 1fr);
                    width: 100%;
                    // align-items: center;
                    justify-content: center;

                    @media only screen and (max-width: 850px) {
                        display: flex;
                        flex-direction: column;
                        align-items: center;
                        justify-content: center;
                        width: 100%;
                        grid-gap: 0;
                    }
                }
            }
        }

        .mobile-lines-container {
            width: 100%;

            .line {
                .column {

                    &.amount-column {
                        
                        .value {
                            color: var(--color-green-light) !important;
                        }
                    }
                }
            }
        }
    }
}

.header-line {
    cursor: pointer;
}

.toggle-container {
    display: none;
    // display: flex;
    // align-items: center;
    // justify-content: center;
    border-bottom: 1px solid var(--color-grey);
    padding: 2rem 0;
    color: var(--color-white) !important;

    @media only screen and (max-width: 850px) {
        border-bottom: none;
        padding-top: 0;
    }

    .inner-container {
        display: flex;
        align-items: flex-end;
        justify-content: space-between;
        padding: 0 2rem;

        @media only screen and (max-width: 850px) {
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }

        .order-items {
            // display: flex;
            // align-items: center;
            // justify-content: center;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            width: 80%;
            grid-gap: 1.5rem;

            @media only screen and (max-width: 850px) {
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: center;
                width: 100%;
                grid-gap: 0;
            }

            .order-item {
                background-color: #171717;
                border: 1px solid #333333;
                border-radius: .5rem;
                font-weight: 700;
                padding: 1rem 1.8rem;
                display: flex;
                justify-content: space-between;
                align-items: center;

                @media only screen and (max-width: 850px) {
                    font-size: 15px;
                    width: 100%;
                    padding: 12px;
                    // max-width: 90%;
                    background-color: transparent;

                    &:not(:last-of-type) {
                        margin-bottom: 10px;
                    }
                }

                .service {
                    display: inline-block;
                    margin-right: 4rem;
                }

                .price {
                    white-space: nowrap;
                }
            }
        }
    }
}

.button-arrow {
    width: 2.8rem;
    height: 2.8rem;
    // margin-left: 1.5rem;
    transition: all .5s;
    border-radius: .3rem;
    background-color: rgba(#fff, .1);
    @include flex-center;

    @media only screen and (max-width: 850px) {
        width: 30px;
        height: 30px;
    }

    .arrow {
        width: 50%;
        transition: all .5s;
    }

    .active {
        transform: rotate(-180deg);
    }
}

.button-confirm {
    padding: 1rem 3.5rem;
    border-radius: .45rem;
    white-space: nowrap;
    font-size: 2rem;

    @media only screen and (max-width: 850px) {
        margin-top: 20px;
        width: 100%;
        font-size: 18px;
        padding: 18px;
    }
}

.inner-line-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // font-size: 1.8rem;
    font-weight: 500;
    border-bottom: 1px solid var(--color-grey);
    padding: 1rem 0;

    .column {
        text-align: center;

        @media only screen and (max-width: 1200px) {
            font-size: 1.5rem;
        }
        
        &:not(:last-of-type) {
            margin-right: 1rem;
        }

        .grey {
            color: var(--color-grey-2);
        }

        &.first {
            width: 13%;
            overflow: hidden;
            text-overflow: ellipsis;
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
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &.fourth {
            width: 20%;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &.fifth {
            width: 10%;
        }

        &.sixth {
            width: 13%;
        }

        &.seventh {
            width: 23%;
            padding-right: 2rem;
            display: flex;
            align-items: center;
            justify-content: flex-end;

            // .arrow {
            //     width: 2.2rem;
            //     height: 2.2rem;
            //     margin-left: 1.5rem;
            // }
        }
    }
}

.mobile-lines-container {
    width: 100%;

    .line {
        display: flex;
        padding: 0 20px;

        .grey {
            color: var(--color-grey-2);
        }

        &.first {
            margin-bottom: 15px;
            align-items: center;
            justify-content: space-between;
        }

        &.second {
            margin-bottom: 15px;
            align-items: center;
            justify-content: space-between;
        }

        &.third {
            margin-bottom: 15px;

            .column {
                max-width: 55%;

                .value {
                    max-width: 100%;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }

        &.fourth {
            margin-bottom: 24px;

            .column {
                max-width: 100%;

                .value {
                    max-width: 100%;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }

        .column {
            display: flex;
            flex-direction: column;

            &:not(:last-of-type) {
                margin-right: 25px;
            }

            .subtitle {
                font-family: Bison;
                font-size: 16px;
                color: var(--color-grey-2);
                display: inline-block;
                margin-bottom: 3px;
            }

            .value {
                font-weight: 500;
                font-size: 18px;
            }

            &.date-column {
                color: var(--color-grey);

                .value {
                    font-size: 16px;
                }
            }

            &.id-column {
                // padding: 8px 15px;
                // background-color: var(--color-white);
                // color: #0F0F0F;
                // border-radius: 9px;
                line-height: 1;
                color: var(--color-grey);

                .value {
                    font-size: 16px;
                }
            }

            &.amount-column {
                
                .value {
                    color: #545761;
                    font-size: 32px;
                }
            }
        }
    }

    .buttons {
        border-top: 1px solid var(--color-grey);

        .button-open {
            width: 100%;
            text-align: center;
            padding: 17px 0;
            font-size: 18px;
        }
    }
}
</style>