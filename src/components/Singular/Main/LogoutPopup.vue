<script setup lang="ts">
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { useRouter } from 'vue-router';

// DEFINE PROPS 
const props = defineProps(["isOpen", "handler"]);

// CLOSE POPUP HANDLER
const handleClick = (e: Event) => {
    const targer = e.target as HTMLElement;
    if (!targer.closest('.popup__content')) props.handler();
}

const user = useUserStore();

const router = useRouter();

// LOGOUT HANDLER
const handleLogout = () => {
    router.push({ name: 'home' });

    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/logout`,
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
        user.logout();
    }).catch(function (err) {
        console.log(err);
    });
    props.handler();
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
                    <p class="popup__content__text">Are you sure you want to log out from this device?</p>
                    <div class="popup__content__buttons">
                        <button @click="props.handler()" class="popup__content__button">Back</button>
                        <button @click="handleLogout" class="popup__content__continue">Continue</button>
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

    &__body {
        width: 100%;
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
        transition: all 0.5s ease 0s;
        border-radius: 9px;
        display: flex;

        @media screen and (max-width: 850px) {
            z-index: 9999999;
            width: 100%;
            height: auto;
            border-radius: 9px 9px 0 0;
            border-bottom: none;
        }

        &__wrapper {
            display: flex;
            flex-direction: column;
            justify-content: center;
        }

        &__buttons {
            gap: 1rem;
            margin-top: 3.15rem;
            display: flex;

            @media screen and (max-width: 850px) {
                justify-content: center;
            }
        }

        &__text {
            width: 37rem;
            font-family: 'Bison';
            font-weight: 300;
            font-size: 5.5rem;
            line-height: 99.5%;
            text-transform: uppercase;
            color: #FFFFFF;

            @media screen and (max-width: 850px) {
                font-size: 35px;
            }
        }

        &__button {
            width: 16.25rem;
            background: #C0FB50;
            border-radius: 34px;
            padding: 1.32rem 0;

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

            @media screen and (max-width: 850px) {
                font-size: 17px;
                padding: 17px 0;
                width: 50%;
                max-width: 200px;
            }
        }

        &__continue {
            width: 16.25rem;
            border: 1px solid #C0FB50;
            border-radius: 34px;
            padding: 1.32rem 0;

            font-family: 'Rubik';
            font-weight: 500;
            font-size: 1.71rem;
            line-height: 99.5%;
            text-transform: uppercase;
            color: #C0FB50;
            align-self: flex-start;

            margin-top: auto;

            &:hover {
                opacity: 0.8;
            }

            @media screen and (max-width: 850px) {
                font-size: 17px;
                padding: 17px 0;
                width: 50%;
                max-width: 200px;
            }
        }

        &__bg {
            position: absolute;

            &.first {
                top: 0;
                left: 0;
            }

            &.second {
                top: 0;
                right: 0;
            }
        }

        &__wrapper {
            width: 100%;
            padding: 7rem 3.42rem 3rem;
            display: flex;
            flex-direction: column;

            @media screen and (max-width: 850px) {
                padding: 42px 20px;
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

        &__bottom {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-top: auto;

            &__promocode {
                width: 100%;
                border: 1px solid #333333;
                border-radius: 7px;
                margin-bottom: 1.5rem;

                @media screen and (max-width: 850px) {
                    margin: 15px 0;
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
                margin-bottom: 1.5rem;


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

