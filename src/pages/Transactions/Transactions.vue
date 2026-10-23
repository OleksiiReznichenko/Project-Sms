<script setup lang="ts">
import axios from 'axios';
import { onMounted, ref } from 'vue';
import Transaction from '@/components/Reusable/Main/Transactions/Transaction.vue';
import Error from '@/components/Singular/Main/Transactions/Error.vue';
import Loader from '@/components/Reusable/Main/Loader.vue';

const transaction = ref();
const isTransactionsLoaded = ref(false);

// GET TRANSACTIONS
onMounted(() => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getTransactions`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {
        transaction.value = res.data.transactions;
        isTransactionsLoaded.value = true;
    }).catch(function (err) {
        console.log(err);
    });
});

</script>

<template>
    <div class="transactions">
        <Loader v-if="!isTransactionsLoaded" />
        <div v-else-if="transaction.length !== 0" class="inner-container">
            <div class="transactions__box">
                <h2 class="transactions__box__title mobile">Transactions</h2>
                <Transaction v-for="item in transaction" :item="item" />
                <div>
                    <div class="transaction-padding"></div>
                </div>
            </div>
        </div>
        <Error v-else />
    </div>
</template>


<style lang="scss" scoped>
.transactions {
    width: 100%;
    display: flex;

    .transaction-padding {
        padding-top: 2.56rem;
    }

    &__filters {
        width: 25.6rem;
        background: #171717;
        border: 1px solid #333333;
        border-radius: 7px;
        align-self: flex-start;

        @media screen and (max-width: 850px) {
            background: #000000;
        }

        &__back-button {
            align-self: flex-start;
            margin-top: 50px;
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

        @media screen and (max-width: 850px) {
            width: 100%;
            z-index: -1;
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            border-radius: 0px;
            border: none;
            min-height: 300px;
            opacity: 0;
            transition: opacity .3s;

            &.open {
                display: block;
                z-index: 0;
                opacity: 1;
            }
        }

        &__wrapper {
            padding: 2.56rem 2.1rem 5.9rem;
            display: flex;
            flex-direction: column;
            gap: 2.5rem;

            @media screen and (max-width: 850px) {
                padding: 0 2.1rem 5.9rem;
                max-width: 450px;
                margin-left: auto;
                margin-right: auto;
            }
        }

        &__title {
            font-family: 'Bison';
            font-weight: 300;
            font-size: 4.1rem;
            line-height: 58px;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                font-size: 35px;
            }
        }

        &__box {
            display: flex;
            flex-direction: column;

            &__period {
                font-family: 'Bison';
                font-weight: 300;
                font-size: 1.71rem;
                line-height: 2.05rem;
                color: #7D808C;

                @media screen and (max-width: 850px) {
                    font-size: 19px;
                }
            }

            &__time {
                cursor: pointer;
                margin-top: 0.5rem;
                display: flex;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                padding-bottom: 0.85rem;
                border-bottom: 1px solid #333333;
                position: relative;

                &__calendar {
                    position: absolute;
                    top: 110%;
                }

                &__text {
                    font-family: 'Bison';
                    font-weight: 300;
                    font-size: 2.05rem;
                    line-height: 2.5rem;
                    color: #FFFFFF;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none;
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;

                    @media screen and (max-width: 850px) {
                        font-size: 23px;
                    }
                }

                &__img {
                    width: 2.05rem;
                    height: 2.05rem;

                    @media screen and (max-width: 850px) {
                        width: 24px;
                        height: 24px;
                    }
                }
            }

            &__inputs {
                margin-top: 3rem;
                display: flex;
                flex-direction: column;
                gap: 1.54rem;

                @media screen and (max-width: 850px) {
                    gap: 15px;
                }

                &__el {
                    display: flex;
                    align-items: center;
                    cursor: pointer;
                    gap: 0.85rem;

                    @media screen and (max-width: 850px) {
                        gap: 10px;
                    }

                    &__input {
                        position: absolute;
                        z-index: -1;
                        opacity: 0;

                        &:checked+label::before {
                            background-image: url('@/assets/svg/Main/check.svg');
                            background-size: 2.06rem;

                            @media screen and (max-width: 850px) {
                                background-size: 24px;
                            }
                        }

                        &+label {
                            display: inline-flex;
                            align-items: center;
                            user-select: none;
                        }

                        &+label::before {
                            content: '';
                            display: inline-block;
                            width: 1.54rem;
                            height: 1.54rem;
                            flex-shrink: 0;
                            flex-grow: 0;
                            border: 1px solid var(--color-white);
                            border-radius: 0%;
                            background-repeat: no-repeat;
                            background-position: center center;
                            background-size: 50% 50%;
                            cursor: pointer;

                            @media screen and (max-width: 850px) {
                                width: 24px;
                                height: 24px;
                            }
                        }
                    }

                    &__text {
                        font-family: 'Rubik';
                        font-weight: 400;
                        font-size: 1.71rem;
                        line-height: 0.85rem;
                        color: #FFFFFF;
                        cursor: pointer;
                        -webkit-touch-callout: none;
                        -webkit-user-select: none;
                        -khtml-user-select: none;
                        -moz-user-select: none;
                        -ms-user-select: none;
                        user-select: none;

                        @media screen and (max-width: 850px) {
                            font-size: 19px;
                        }
                    }
                }
            }
        }
    }

    &__box {
        display: flex;
        flex-direction: column;
        gap: 2.56rem;
        width: 77rem;

        @media screen and (max-width: 850px) {
            width: 100%;
            gap: 0;
        }

        &__title {
            margin: 50px 0 25px;
            font-family: 'Bison';
            font-weight: 300;
            font-size: 3rem;
            line-height: 99.5%;
            text-transform: uppercase;
            color: #FFFFFF;
        }

        &__filter-button {
            border: 1px solid #B8B8B8;
            border-radius: 8px 8px 29px 8px;
            display: flex;
            align-items: center;
            gap: 10px;
            justify-content: center;
            padding: 9px;

            &__text {
                font-family: 'Rubik';
                font-weight: 900;
                font-size: 1.36rem;
                line-height: 99.5%;
                text-transform: uppercase;
                color: #FFFFFF;

                @media screen and (max-width: 850px) {
                    font-size: 15px;
                    padding-top: 4px;
                }
            }

            &__img {
                height: 1.71rem;
                width: 1.71rem;

                @media screen and (max-width: 850px) {
                    height: 20px;
                    width: 20px;
                }
            }
        }

        &__el {
            background: #171717;
            border: 1px solid #333333;
            border-radius: 7px;

            @media screen and (max-width: 850px) {
                background: inherit;
                border: none;
                border-bottom: 1px solid #333333;
                border-radius: 0;
            }

            &__wrapper {
                display: flex;
                flex-direction: column;
                padding: 3.25rem 2.15rem;
                gap: 0.8rem;
                width: 100%;

                @media screen and (max-width: 850px) {
                    padding: 20px 10px;
                }
            }

            &__date {
                font-family: 'Rubik';
                font-weight: 350;
                font-size: 1.71rem;
                line-height: 99.5%;
                color: #FFFFFF;

                @media screen and (max-width: 850px) {
                    font-size: 19px;
                }
            }

            &__list {
                display: flex;
                flex-direction: column;
                width: 100%;

                &__el {
                    width: 100%;
                    border-top: 1px solid #333333;
                    transition: .3s;
                    cursor: pointer;

                    @media screen and (max-width: 850px) {
                        border: none;
                    }

                    &:first-child {
                        border: none;
                    }

                    &.active {

                        &>div {
                            background-color: #333333;

                            @media screen and (max-width: 850px) {
                                background-color: inherit;
                            }
                        }

                        & .transactions__box__el__list__el__open {
                            margin-top: 1.3rem;
                            transition: all 1s;
                            max-height: 20rem;

                            @media screen and (max-width: 850px) {
                                margin-top: 15px;
                            }
                        }
                    }

                    &__wrapper {
                        width: 100%;
                        display: flex;
                        flex-direction: column;
                        padding: 1.71rem;
                        border-radius: 7px;
                        transition: .3s;

                        &:hover {
                            background-color: #333333;

                            @media screen and (max-width: 850px) {
                                background-color: inherit;
                            }
                        }
                    }

                    &__open {
                        padding-left: 5.6rem;
                        transition: all 1s;

                        overflow: hidden;
                        display: flex;
                        flex-direction: column;
                        max-height: 0px;
                        margin-top: 0;

                        @media screen and (max-width: 850px) {
                            padding-left: calc(33px + 1.3rem);
                        }

                        &__details {
                            font-family: 'Rubik';
                            font-weight: 500;
                            font-size: 1.71rem;
                            line-height: 99.5%;
                            color: #FFFFFF;
                            margin: 2.56rem 0 1.3rem;
                        }

                        &__box {
                            display: grid;
                            grid-template-columns: 11.2rem auto;
                            gap: 1rem 1.71rem;

                            &__key {
                                font-family: 'Rubik';
                                font-weight: 400;
                                font-size: 1.36rem;
                                line-height: 99.5%;
                                color: #FFFFFF;
                            }

                            &__value {
                                font-family: 'Rubik';
                                font-weight: 350;
                                font-size: 1.36rem;
                                line-height: 99.5%;
                            }
                        }
                    }

                    &__content {
                        width: 100%;
                        display: flex;
                        align-items: center;
                        gap: 1.3rem;

                        &__img {
                            height: 4.3rem;
                            width: 4.3rem;

                            @media screen and (max-width: 850px) {
                                width: 33px;
                                height: 33px;
                            }
                        }

                        &__text {
                            display: flex;
                            flex-direction: column;
                            gap: 0.5rem;

                            &__type {
                                font-family: 'Rubik';
                                font-weight: 500;
                                font-size: 2.05rem;
                                line-height: 99.5%;
                                color: #FFFFFF;

                                @media screen and (max-width: 850px) {
                                    font-size: 15px;
                                }
                            }

                            &__descr {
                                font-family: 'Rubik';
                                font-weight: 350;
                                font-size: 1.36rem;
                                line-height: 99.5%;
                                color: #7D808C;

                                @media screen and (max-width: 850px) {
                                    font-size: 14px;
                                }
                            }
                        }

                        &__price {
                            margin-left: auto;
                            font-family: 'Bison';
                            font-style: normal;
                            font-weight: 300;
                            font-size: 3rem;
                            line-height: 99.5%;
                            text-align: right;
                            color: #C0FB50;

                            @media screen and (max-width: 850px) {
                                font-size: 23px;
                            }

                            &.paid {
                                color: #C04A4A;
                            }
                        }
                    }
                }

            }
        }
    }

    .inner-container {
        @include width-restriction-old;
        padding: 3.42rem 6rem;
        width: 100%;
        display: flex;
        justify-content: center;
        gap: 2.56rem;

        @media only screen and (max-width: 850px) {
            padding: 0 0 100px;
        }
    }
}
</style>