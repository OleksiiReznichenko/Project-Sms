<script setup lang="ts">

// DEFINE PROPS
const props = defineProps(["item"]);
const item = props.item;

// CONVERSION TIME TO THE CORRECT FORMAT
function formatDate(timestamp: number) {
    const date = new Date(timestamp);

    const day = date.getDate();
    const month = date.toLocaleString('en-US', { month: 'long' });
    const year = date.getFullYear();
    const time = date.toLocaleString('en-US', { hour: '2-digit', minute: '2-digit', hour12: false });

    return `${day} ${month} ${year}, ${time}`;
}

const formattedDate = formatDate(item.date * 1);

</script>

<template>
    <div class="transaction">
        <div class="transaction__wrapper">
            <div class="transaction__date">
                <span class="transaction__date__date">{{ formattedDate }}</span>
                <span :class="{ 'deposit': item.orders[0].type === 'deposit' }" class="transaction__date__price">${{
                    item.amount }}</span>
            </div>
            <div class="transaction__list">
                <div v-for="el in item.orders" class="transaction__list__el">
                    <div class="transaction__list__el__wrapper">
                        <div class="transaction__list__el__content">
                            <img src="@/assets/svg/Main/Transactions/transactionImg.svg" alt=""
                                class="transaction__list__el__content__img">
                            <div v-if="el.type !== 'deposit'" class="transaction__list__el__content__text">
                                <span class="transaction__list__el__content__text__type">Number
                                    purchase</span>
                                <span class="transaction__list__el__content__text__descr">{{ el.service.name }}, {{
                                    el.country.name }}</span>
                            </div>
                            <div v-else class="transaction__list__el__content__text">
                                <span class="transaction__list__el__content__text__type">Deposit</span>
                            </div>
                            <span v-if="el.type !== 'deposit'" class="transaction__list__el__content__price paid">${{
                                el.amount }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.transaction {
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
        gap: 1.8rem;
        width: 100%;

        @media screen and (max-width: 850px) {
            padding: 20px 10px;
        }
    }

    &__date {
        display: flex;
        width: 100%;
        justify-content: space-between;
        align-items: center;

        &__date {
            font-family: 'Rubik';
            font-weight: 350;
            font-size: 1.71rem;
            line-height: 99.5%;
            margin-left: 1.71rem;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                font-size: 19px;
            }
        }

        &__price {
            font-family: "Bison";
            font-weight: 300;
            font-size: 4rem;
            line-height: 99.5%;
            margin-right: 1.71rem;

            &.deposit {
                color: #C0FB50;
            }
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

                & .transaction__list__el__open {
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
            }

            &__open {
                padding-left: 5.6rem;
                transition: all 1s;
                margin-top: 0;

                overflow: hidden;
                display: none;
                flex-direction: column;

                @media screen and (max-width: 850px) {
                    padding-left: calc(33px + 1.3rem);
                }

                &__wrapper {
                    display: flex;
                    flex-direction: column;
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
                transition: all .5s;

                &.active {
                    padding-bottom: 1.71rem;
                }

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
</style>

