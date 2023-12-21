<script setup lang="ts">
import BurgerMenu from '@/components/Reusable/BurgerMenu.vue';
import { useRecaptchaKey } from '@/stores/recaptcha';
import { useUserStore } from '@/stores/user';
import axios from 'axios';
import { onBeforeMount, onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

// STORES DECLARATION
const user = useUserStore();
const keyStore = useRecaptchaKey();

// NAVIGATION BUTTONS DATA 
const buttonsData = ref([
    {
        title: "Login",
        link: "/login",
        isActive: false
    },
    {
        title: "Create",
        link: "/registration",
        isActive: false
    }
]);

onMounted(() => {

    // SET ACTIVE BUTTON
    buttonsData.value.forEach(item => {
        if (route.fullPath.includes(item.link)) item.isActive = true;
        else item.isActive = false;
    })

    // GET USER`S ACCOUNT 
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getAccount`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {
        // REDIRECT IF LOGGED IN
        user.setUser(res.data.account);

        if (user.$state.status === 'admin') {
            router.push({ name: 'adminPanel' });
            return;
        }

        if (user.$state.status === 'user') router.push({ name: 'Profile' });

        console.log(res);
    }).catch(function (err) {
        console.log(err);
    });
});

// HANDLE ADD RECAPTCHA
onBeforeMount(() => {
    if (keyStore.getKey.length !== 0) return;

    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getRecaptchaKey`
    }).then(function (res) {
        console.log(res);
        keyStore.setKey(res.data.key);

        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/api.js?render=${res.data.key}`;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
    }).catch(function (err) {
        console.log(err);
    });
});

// SET ACTIVE BUTTON ON ROUTE CHANGE 
watch(route, (newValue) => {
    buttonsData.value.forEach(item => {
        if (newValue.fullPath.includes(item.link)) item.isActive = true;
        else item.isActive = false;
    })
});

// MENU HANDLER
const isMenuOpen = ref(false);

const handleOpenMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
}

</script>

<template>
    <div class="page page-login">
        <div class="inner-container">
            <div class="page-login__box">
                <div class="page-login__box__el first desktop">
                    <router-link to="/" class="page-login__box__el__nav-button">
                        <img src="@/assets/svg/Login/logo.svg" alt="" class="page-login__box__el__nav-button__img">
                    </router-link>
                </div>
                <div class="page-login__box__el second desktop">
                </div>
                <div class="page-login__box__el third desktop">
                </div>
                <div class="page-login__box__el fourth">
                    <div class="page-login__box__el__box desktop">
                        <div class="page-login__box__el__box__container">
                            <img src="@/assets/img/Login/login-img.png" alt=""
                                class="page-login__box__el__box__container__big-box">
                            <div class="page-login__box__el__box__container__small-box">
                                <div class="page-login__box__el__box__container__small-box__wrapper">
                                    <img src="@/assets/svg/Login/cross.svg" alt=""
                                        class="page-login__box__el__box__container__small-box__img">
                                    <p class="page-login__box__el__box__container__small-box__text">
                                        Custom numbers are important for your privacy
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div class="page-login__box__el__box__container">
                            <div class="page-login__box__el__box__container__big-box border">
                                <p v-if="route.fullPath.includes('registration')"
                                    class="page-login__box__el__box__container__big-box__text">
                                    C
                                </p>
                                <p v-else class="page-login__box__el__box__container__big-box__text">
                                    L
                                </p>
                            </div>
                            <div class="page-login__box__el__box__container__img">
                                <img src="@/assets/svg/Login/bigCross.svg" alt=""
                                    class="page-login__box__el__box__container__img__svg">
                            </div>
                        </div>
                    </div>
                    <div class="page-login__box__el__box second">
                        <router-link class="page-login__nav mobile" to="/">
                            <img src="@/assets/svg/Login/logoMobile.svg" alt="" class="page-login__nav__img">
                            <span class="page-login__nav__text"><span
                                    class="page-login__nav__text green">quick</span>sms.io</span>
                        </router-link>
                        <div class="page-login__box__el__box__buttons">
                            <router-link v-for="item in buttonsData" :to="item.link"
                                class="page-login__box__el__box__buttons__el" :class="{ active: item.isActive }">
                                {{ item.title }}
                            </router-link>
                        </div>
                        <RouterView />
                    </div>
                </div>
            </div>
        </div>
        <div class="page-login__menu" :class="{ closed: !isMenuOpen }">
            <BurgerMenu :isOpen="isMenuOpen" :handlers="{ handleOpenMenu }" />
        </div>
    </div>
</template>


<style lang="scss" scoped>
.page-login {
    min-height: 100vh;
    background: #000000;

    &__nav {
        display: flex;
        align-items: center;
        gap: 4px;
        margin-bottom: 30px;

        &__img {
            width: 24px;
            height: 15px;
        }

        &__text {
            font-family: 'Bison';
            font-weight: 300;
            font-size: 20px;
            line-height: 24px;
            text-transform: uppercase;

            &.green {
                color: #C0FB50;
            }
        }
    }

    &__menu {
        transition: .3s;
    }

    &__box {
        display: grid;
        grid-template-columns: 6rem auto;
        grid-template-rows: 6rem auto;
        overflow: hidden;
        min-height: calc(100vh - 3.42rem * 2);

        @media screen and (max-width: 850px) {
            grid-template-columns: auto;
            grid-template-rows: auto;
        }

        &__el {
            border: 1px solid #363636;

            @media screen and (max-width: 850px) {
                border: none;
            }

            &__reg {
                font-family: 'Bison';
                background: #C0FB50;
                border-radius: 26px;
                font-weight: 300;
                font-size: 1.71rem;
                line-height: 2.05rem;
                color: #0F0F0F;
                font-weight: 300;
                text-transform: uppercase;
                padding: 0.5rem 3.6rem;
                margin-left: auto;
                margin-right: 3rem;
            }

            &__box {
                width: 50%;
                height: 100%;
                display: flex;
                justify-content: center;
                gap: 2.56rem;
                padding: 7.7rem 0 7.7rem;
                align-items: center;

                @media screen and (max-width: 850px) {
                    width: 100%;
                }

                &.second {
                    flex-direction: column;
                    justify-content: flex-start;
                    align-items: center;
                    justify-content: center;
                    padding: 7.7rem 10rem 12rem 6.15rem;
                    gap: 0;

                    @media screen and (max-width: 1750px) {
                        padding: 7.7rem 7rem 12rem 4.5rem;
                    }

                    @media screen and (max-width: 1500px) {
                        padding: 7.7rem 3rem 12rem 3rem;
                    }

                    @media screen and (max-width: 850px) {
                        padding: 0 0 4rem 0;
                    }
                }

                &:first-child {
                    border-right: 1px solid #363636;
                }

                &__input-box {
                    display: flex;
                    border: 1px solid #7D808C;
                    border-radius: 5px;
                    width: 100%;
                    margin-top: 1.71rem;

                    &.first {
                        margin-top: 3.6rem;
                    }

                    &__img {
                        height: 3.1rem;
                        width: 3.1rem;
                        margin: 0 1.3rem;
                        align-self: center;
                    }

                    &__container {
                        padding: 0.9rem 2.15rem;
                        display: flex;
                        flex-direction: column;
                        border-left: 1px solid #7D808C;
                        gap: 0.2rem;
                        width: 100%;

                        &__text {
                            font-family: 'Rubik';
                            font-weight: 700;
                            font-size: 1.36rem;
                            line-height: 99.5%;
                            color: #7D808C;
                        }

                        &__input {
                            font-family: 'Rubik';
                            font-weight: 900;
                            font-size: 2.05rem;
                            line-height: 99.5%;
                            text-transform: uppercase;
                            color: #FFFFFF;
                            width: 100%;
                        }
                    }
                }

                &__continue {
                    align-self: flex-start;
                    margin-top: 3rem;
                    font-family: 'Rubik';
                    font-style: normal;
                    font-weight: 700;
                    font-size: 1.71rem;
                    line-height: 99.5%;
                    color: #C4C4C4;
                }

                &__social {
                    margin-top: 1.54rem;
                    gap: 1.3rem;
                    display: flex;
                    align-self: flex-start;
                    flex-wrap: wrap;

                    &__el {
                        border: 2px dashed #333333;
                        border-radius: 30px;
                        display: flex;
                        gap: 1rem;
                        padding: 0.5rem 3rem;

                        &__img {
                            height: 2.05rem;
                            width: 2.05rem;
                        }

                        &__text {
                            font-family: 'Bison';
                            font-style: normal;
                            font-weight: 300;
                            font-size: 1.71rem;
                            line-height: 98%;
                            color: #FFFFFF;
                        }
                    }
                }

                &__buttons {
                    display: flex;

                    @media screen and (max-width: 850px) {
                        margin-left: 5px;
                    }

                    &__el {
                        align-self: flex-start;
                        font-family: 'Rubik';
                        font-weight: 900;
                        font-size: 5.5rem;
                        line-height: 99.5%;
                        text-transform: uppercase;
                        background: #1C1C1C;
                        border: 1px dashed #333333;
                        color: #333333;
                        padding: 1rem 3.42rem 1rem;

                        @media screen and (max-width: 1500px) {
                            padding: 1rem 2rem 1rem;
                            font-size: 5rem;
                        }

                        @media screen and (max-width: 850px) {
                            font-size: 23px;
                            padding: 1rem 3.42rem 0.8rem;
                        }

                        &:hover {
                            background: #333333;
                            color: rgba(80, 80, 80, 1)
                        }

                        &.active {
                            border: 1px dashed #FFFFFF;
                            color: #FFFFFF;
                            z-index: 10;

                            &:hover {
                                background: #1C1C1C;
                                color: #FFFFFF;
                            }
                        }

                        &:first-child {
                            transform: rotate(-3.49deg);
                            margin-right: -1.8rem;
                        }
                    }
                }

                &__container {
                    display: flex;
                    flex-direction: column;
                    gap: 2.56rem;

                    &__big-box {
                        aspect-ratio: 326/460;
                        width: 28rem;

                        @media screen and (max-width: 1500px) {
                            width: 20rem;
                        }

                        &.border {
                            border: 3px solid #333333;
                            border-radius: 70px 0px;
                        }

                        &__text {
                            font-family: 'Bison';
                            font-style: normal;
                            text-align: center;
                            font-weight: 300;
                            font-size: 32.5rem;
                            line-height: 30rem;
                            color: #FFFFFF;
                        }
                    }

                    &__small-box {
                        background: #0F0F0F;
                        border: 3px solid #333333;
                        border-radius: 0px 0px 70px 0px;
                        width: 28rem;

                        @media screen and (max-width: 1500px) {
                            width: 20rem;
                        }

                        &__wrapper {
                            padding: 2.15rem 3.15rem;
                            display: flex;
                            flex-direction: column;
                            justify-content: space-between;
                            gap: 2.15rem;
                        }

                        &__text {
                            font-family: 'Bison';
                            font-weight: 300;
                            font-size: 1.54rem;
                            line-height: 1.88rem;
                            color: #FFFFFF;

                            @media screen and (max-width: 1500px) {
                                font-size: 1.3rem;
                            }
                        }

                        &__img {
                            width: 2.6rem;
                            height: 2.6rem;
                        }
                    }

                    &__img {
                        height: 28rem;
                        width: 28rem;
                        margin-top: -15rem;

                        @media screen and (max-width: 1500px) {
                            width: 20rem;
                        }

                        &__svg {
                            height: 28rem;
                            width: 28rem;

                            @media screen and (max-width: 1500px) {
                                width: 20rem;
                            }
                        }
                    }
                }

                &__next-buttons {
                    align-self: flex-start;
                    display: flex;
                    gap: 1.71rem;
                    margin-top: 2.56rem;
                    padding-bottom: 3.85rem;
                    border-bottom: 1px solid #333333;
                    width: 100%;

                    &__login {
                        display: flex;
                        align-items: center;
                        gap: 1.5rem;
                        padding: 1.1rem 1.71rem 1.1rem 2.1rem;
                        background: #C0FB50;
                        border-radius: 56px;
                        font-family: 'Rubik';
                        font-weight: 900;
                        font-size: 1.71rem;
                        line-height: 99.5%;
                        color: #0F0F0F;

                        &__text {
                            margin-bottom: -0.3rem;
                        }

                        &__img {
                            height: 2.05rem;
                            width: 2.05rem;
                        }
                    }

                    &__forgot {
                        font-family: 'Rubik';
                        font-weight: 700;
                        font-size: 1.71rem;
                        line-height: 99.5%;
                        display: flex;
                        align-items: center;
                        color: #C0FB50;
                    }
                }
            }

            &__nav {
                display: flex;
                gap: 2.56rem;
                margin-left: calc(50% - 16rem / 2);

                &__link {
                    font-family: 'Bison';
                    font-size: 1.71rem;
                    line-height: 2.05rem;
                    font-weight: 300;
                    color: #333333;
                    text-transform: uppercase;

                    &:hover {
                        opacity: 0.8;
                    }
                }
            }

            &__nav-button {
                height: 2.05rem;
                width: 2.05rem;

                &__img {
                    height: 2.05rem;
                    width: 2.05rem;
                }
            }

            &.first {
                border-radius: 10px 0 0 0;
                display: flex;
                align-items: center;
                justify-content: center;
            }

            &.second {
                border-radius: 0 10px 0 0;
                border-left: 0px;
                display: flex;
                align-items: center;
            }

            &.third {
                border-radius: 0 0 0 10px;
                border-top: 0px;
            }

            &.fourth {
                border-radius: 0 0 10px 0;
                display: flex;
                border-top: 0px;
                border-left: 0px;
            }
        }
    }

    .inner-container {
        @include width-restriction-old;
        max-width: none !important;
        padding: 3.42rem 6.42rem;
        min-height: 100vh;

        @media only screen and (max-width: 850px) {
            padding: 3.42rem 0;
        }
    }
}
</style>