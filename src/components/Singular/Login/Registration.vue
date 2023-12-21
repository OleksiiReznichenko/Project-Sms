<script setup lang="ts">
import { ref, watch, type Ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import { useRecaptchaKey } from '@/stores/recaptcha';
import { useUserStore } from '@/stores/user';

const router = useRouter();
const route = useRoute();

// DATA VARIABLES
const email = ref();
const password = ref();
const rePassword = ref();

// IS DATA CORRECT VARIABLE
const isPasswordCorrect = ref(true);
const isEmailCorrect = ref(true);

// DEFINE STORES
const userStore = useUserStore();
const keyStore = useRecaptchaKey();


// HANDLE GET RECAPTCHA TOKEN
const getRecaptchaToken = async (siteKey: string) => {
    return new Promise(async (resolve, reject) => {
        if (!window.grecaptcha) {
            reject("reCAPTCHA not loaded");
        } else {
            try {
                const token = await window.grecaptcha.execute(siteKey, { action: "submit" });
                resolve(token);
            } catch (error) {
                reject(error);
            }
        }
    });
};

// HANDLE REGISTER
const handleRegister = async () => {
    try {

        // IF PASSWORD ISN`T CORRECT
        if (!isPasswordCorrect.value || password.value.length == 0 || password.value != rePassword.value) {
            isPasswordCorrect.value = false;
            return;
        }

        // IF EMAIL ISN`T CORRECT
        const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

        if (email.value.length == 0 && emailRegex.test(email.value)) {
            isEmailCorrect.value = false;
            return;
        }

        // HANDLE GET RECAPTCHA TOKEN
        const key = keyStore.getKey();
        const recaptchaToken = await getRecaptchaToken(key);

        // HANDLE ADD REFERRAL TO DATA IF EXIST
        let data;

        if (route.query.uuid) {
            data = {
                "email": email.value,
                "password": password.value,
                "referral": route.query.uuid,
                "recaptcha": recaptchaToken
            }
        } else {
            data = {
                "email": email.value,
                "password": password.value,
                "recaptcha": recaptchaToken
            }
        }

        // HANDLE REGISTER
        const registerRes = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_BASE_URL}/register`,
            data: {
                ...data
            },
            headers: {
                "Content-Type": "application/json"
            },
            withCredentials: true
        });

        // HANDLE REDIRECT
        router.push({ name: 'Profile' });
    } catch (err) {
        console.error(err);
    }
};

// HANDLE LOGIN VIA TELEGRAM
const handleLoginViaTelegram = async () => {
    const onSuccess = async (user: any) => {
        if (user) {
            try {
                const key = keyStore.getKey();
                const recaptchaToken = await getRecaptchaToken(key);

                const response = await axios({
                    method: "post",
                    url: `${import.meta.env.VITE_API_BASE_URL}/login`,
                    data: {
                        telegram: {
                            ...user
                        },
                        recaptcha: recaptchaToken
                    },
                    headers: {
                        "Content-Type": "application/json"
                    },
                    withCredentials: true
                });

                handleRedirect(response.data.account.status);
            } catch (error) {
                console.error(error);
            }
        }
    };

    const handleRedirect = (status: string) => {
        if (status === 'user') router.push({ name: 'Profile' });
        if (status === 'admin') router.push({ name: 'adminPanelMain' });
    };

    window.Telegram.Login.auth({
        bot_id: '6094167108',
        request_access: 'write',
    }, onSuccess);
};

// HANDLE CHECK PASSWORD AND REPASSWORD ON CHANGE
watch(rePassword, (newValue) => {
    if (password.value != newValue) isPasswordCorrect.value = false;
    else isPasswordCorrect.value = true;
});


// HANDLE FOCUS ON INPUT
const handleFocus = (e: Event) => {
    const target = e.target as HTMLElement;
    const input = target.getElementsByTagName('input');
    input[0].focus();
}

// HANDLE FOCUN ON NEXT INPUD AFRET PRESSING "ENTER"
const passwordInput: Ref<HTMLInputElement | null> = ref(null);

const handleGoPassword = () => {
    if (passwordInput.value === null) return;
    passwordInput.value.focus();
}

// HANDLE FOCUN ON NEXT INPUD AFRET PRESSING "ENTER"
const rePasswordInput: Ref<HTMLInputElement | null> = ref(null);

const handleGoRePassword = () => {
    if (rePasswordInput.value === null) return;
    rePasswordInput.value.focus();
}

</script>

<template>
    <div class="registration">
        <div @click="e => handleFocus(e)" :class="!isEmailCorrect ? 'error' : ''" class="registration__input-box first">
            <img src="@/assets/svg/Login/email.svg" alt="" class="registration__input-box__img">
            <div class="input-container">
                <span class="subtitle">Email</span>
                <input v-on:keyup.enter="handleGoPassword" v-model="email" type=" " class="input">
            </div>
        </div>
        <div @click="e => handleFocus(e)" :class="!isPasswordCorrect ? 'error' : ''" class="registration__input-box">
            <img src="@/assets/svg/Login/password.svg" alt="" class="registration__input-box__img">
            <div class="input-container">
                <span class="subtitle">Password</span>
                <input ref="passwordInput" v-on:keyup.enter="handleGoRePassword" v-model="password" type="password"
                    class="input">
            </div>
        </div>
        <div @click="e => handleFocus(e)" :class="!isPasswordCorrect ? 'error' : ''" class="registration__input-box">
            <img src="@/assets/svg/Login/password.svg" alt="" class="registration__input-box__img">
            <div class="input-container">
                <span class="subtitle">rePassword</span>
                <input ref="rePasswordInput" v-on:keyup.enter="handleRegister" v-model="rePassword" type="password"
                    class="input">
            </div>
        </div>
        <div class="registration__next-buttons">
            <button @click="handleRegister" class="registration__next-buttons__login">
                <span class="registration__next-buttons__login__text">SIGN UP</span>
                <img src="@/assets/svg/Login/arrow.svg" alt="" class="registration__next-buttons__login__img">
            </button>
        </div>
        <span class="registration__continue">Continue via</span>
        <div class="registration__social">
            <button @click="handleLoginViaTelegram" class="registration__social__el">
                <img src="@/assets/svg/Login/telegram.svg" alt="" class="registration__social__el__img">
                <span class="registration__social__el__text">telegram</span>
            </button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.registration {
    display: flex;
    flex-direction: column;
    width: 100%;

    .input-container {
        width: 100%;
        position: relative;

        @media only screen and (max-width: 850px) {
            width: 100%;
            margin-right: 0;
        }

        input {
            padding: 2.15rem 2.2rem .4rem;
            border-left: 1px solid var(--color-grey-2);
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
    }

    &.second {
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        padding: 7.7rem 10rem 12rem 6.15rem;
        gap: 0;
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

        &.error {
            border: 1px solid #C04A4A;
        }

        &.first {
            margin-top: 3.6rem;
        }

        &__img {
            height: 3.1rem;
            width: 3.1rem;
            margin: 0 1.3rem;
            align-self: center;

            @media screen and (max-width: 850px) {
                height: 24px;
                width: 24px;
            }
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

                @media screen and (max-width: 850px) {
                    font-size: 13px;
                }
            }

            &__input {
                font-family: 'Rubik';
                font-weight: 900;
                font-size: 2.05rem;
                height: 2.1rem;
                line-height: 99.5%;
                color: #FFFFFF;
                width: 100%;

                @media screen and (max-width: 850px) {
                    font-size: 15px;
                    height: 16px;
                }
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

        @media screen and (max-width: 850px) {
            width: 100%;
        }

        &__el {
            border: 2px dashed #7D808C;
            border-radius: 30px;
            display: flex;
            gap: 1rem;
            padding: 0.5rem 3rem;
            align-items: center;

            &:hover {
                background: #333333;
            }

            @media screen and (max-width: 850px) {
                padding: 7px 3rem;
                width: 100%;
                justify-content: center;
            }

            &__img {
                height: 2.05rem;
                width: 2.05rem;

                @media screen and (max-width: 850px) {
                    height: 18px;
                    width: 18px;
                }
            }

            &__text {
                font-family: 'Bison';
                font-style: normal;
                font-weight: 300;
                font-size: 1.71rem;
                line-height: 98%;
                color: #FFFFFF;

                @media screen and (max-width: 850px) {
                    font-size: 15px;
                }
            }
        }
    }

    &__buttons {
        display: flex;

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
            padding: 2.15rem 3.42rem 0.2rem;

            &.active {
                border: 1px dashed #FFFFFF;
                color: #FFFFFF;
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
            border-radius: 70px 0px;
            height: 39.4rem;
            width: 28rem;

            &.border {
                border: 3px solid #333333;
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
            }
        }

        &__img {
            height: 28rem;
            width: 28rem;
            margin-top: -15rem;
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

            &:hover {
                opacity: 0.8;
            }

            &__text {
                margin-bottom: -0.3rem;

                @media screen and (max-width: 850px) {
                    font-size: 15px;
                }
            }

            &__img {
                height: 2.05rem;
                width: 2.05rem;


                @media screen and (max-width: 850px) {
                    height: 16px;
                    width: 16px;
                }
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

            &:hover {
                opacity: 0.8;
            }

            @media screen and (max-width: 850px) {
                font-size: 15px;
            }
        }
    }
}
</style>