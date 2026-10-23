<script setup lang="ts">
import { inject, ref, type Ref } from 'vue';
import { DEMO_MODE } from '@/demo/config';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useRecaptchaKey } from '@/stores/recaptcha';

const notifyError = inject<any>('notifyError');
const router = useRouter();

// DATA VARIABLES
const email = ref('');
const password = ref('');

// VALIDATION VARIABLES
const isPasswordCorrect = ref(true);
const isEmailCorrect = ref(true);

// RECAPTCHA KEY STORE
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

// HANDLE LOGIN
const handleLogin = async () => {

    // EMAIL VALIDATION
    if (email.value.length === 0) {
        isEmailCorrect.value = false;
        notifyError("Data is incorrect");
        return;
    }

    // PASSWORD VALIDATION
    if (password.value.length === 0) {
        isPasswordCorrect.value = false;
        notifyError("Data is incorrect");
        return;
    }

    try {
        // HANDLE GET RECAPTCHA TOKEN
        const key = keyStore.getKey();
        const recaptchaToken = await getRecaptchaToken(key);

        // LOGIN REQUEST
        const loginRes = await axios({
            method: "post",
            url: `${import.meta.env.VITE_API_BASE_URL}/login`,
            data: {
                email: email.value,
                password: password.value,
                recaptcha: recaptchaToken
            },
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        console.log(loginRes);

        // IF ERROR
        if (loginRes.data.error) {
            isPasswordCorrect.value = false;
            notifyError("Data is incorrect");
            return;
        }

        // GET ACCOUNT INFO IF LOGIN IS SUCCESSFUL
        const accountRes = await axios({
            method: "get",
            url: `${import.meta.env.VITE_API_BASE_URL}/getAccount`,
            headers: {
                "Content-Type": "application/json",
            },
            withCredentials: true,
        });
        console.log(accountRes);

        // HANDLE REDIRECT
        if (accountRes.data.account.status === "user") router.push({ name: "Profile" });
        if (accountRes.data.account.status === "admin") router.push({ name: "adminPanelMain" });

    } catch (err) {
        console.log(err);
        isPasswordCorrect.value = false;
        notifyError("Data is incorrect");
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

</script>

<template>
    <div class="login">
        <div v-if="DEMO_MODE" class="login__demo">
            <h2 class="login__demo__title">Explore Quick SMS</h2>
            <p class="login__demo__description">
                This is an archived frontend demo. All accounts, transactions and statistics
                are fictional. SMS sending and payments are disabled.
            </p>
            <div class="login__demo__actions">
                <router-link to="/adminPanel/main" class="login__demo__button">
                    Explore admin demo →
                </router-link>
                <router-link to="/" class="login__demo__back-link">
                    Back to homepage
                </router-link>
            </div>
        </div>
        <template v-else>
        <div @click="e => handleFocus(e)" :class="!isEmailCorrect ? 'error' : ''" class="login__input-box first">
            <img src="@/assets/svg/Login/email.svg" alt="" class="login__input-box__img">
            <div class="input-container">
                <span class="subtitle">Email</span>
                <input v-on:keyup.enter="handleGoPassword" v-model="email" type="email" class="input">
            </div>
        </div>
        <div @click="e => handleFocus(e)" :class="!isPasswordCorrect ? 'error' : ''" class="login__input-box">
            <img src="@/assets/svg/Login/password.svg" alt="" class="login__input-box__img">
            <div class="input-container">
                <span class="subtitle">Password</span>
                <input ref="passwordInput" v-on:keyup.enter="handleLogin" v-model="password" type="password" class="input">
            </div>
        </div>
        <div class="login__next-buttons">
            <button @click="handleLogin" class="login__next-buttons__login">
                <span class="login__next-buttons__login__text">SIGN IN</span>
                <img src="@/assets/svg/Login/arrow.svg" alt="" class="login__next-buttons__login__img">
            </button>
            <router-link to="/recoverByEmail" class="login__next-buttons__forgot">
                Forgot my password
            </router-link>
        </div>
        <span class="login__continue">Continue via</span>
        <div class="login__social">
            <button class="login__social__el">
                <img src="@/assets/svg/Login/telegram.svg" alt="" class="login__social__el__img">
                <button @click="handleLoginViaTelegram" class="login__social__el__text">telegram</button>
            </button>
        </div>
        </template>
    </div>
</template>


<style lang="scss" scoped>
.login {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__demo {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 1.8rem;
        width: 100%;
        min-width: 0;
        padding: 3rem 0;

        &__title {
            font-family: 'Bison';
            font-weight: 700;
            font-size: clamp(3.6rem, 4vw, 5rem);
            line-height: 1.1;
            color: var(--color-white);
        }

        &__description {
            max-width: 44rem;
            font-family: 'Rubik';
            font-size: 1.6rem;
            line-height: 1.6;
            color: var(--color-grey-2);
            overflow-wrap: break-word;
        }

        &__actions {
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            gap: 1.5rem 2.4rem;
            width: 100%;
            margin-top: .6rem;
        }

        &__button {
            display: inline-flex;
            justify-content: center;
            align-items: center;
            max-width: 100%;
            padding: 1.4rem 2.2rem;
            border-radius: .6rem;
            background-color: var(--color-green-light);
            color: var(--color-black);
            font-family: 'Rubik';
            font-weight: 700;
            font-size: 1.6rem;
            line-height: 1.3;
            text-align: center;
            text-decoration: none;
            transition: opacity .2s ease;

            &:hover {
                opacity: .85;
            }

            &:focus-visible {
                outline: .2rem solid var(--color-white);
                outline-offset: .3rem;
            }
        }

        &__back-link {
            font-family: 'Rubik';
            font-size: 1.5rem;
            line-height: 1.4;
            color: var(--color-green-light);
            text-decoration: none;

            &:hover {
                text-decoration: underline;
            }

            &:focus-visible {
                outline: .2rem solid var(--color-green-light);
                outline-offset: .3rem;
            }
        }

        @media only screen and (max-width: 850px) {
            gap: 2rem;
            padding: 2.5rem 0;

            &__title {
                font-size: clamp(3.8rem, 9vw, 5.5rem);
            }

            &__description {
                font-size: clamp(1.6rem, 3.8vw, 1.9rem);
            }

            &__button {
                font-size: clamp(1.6rem, 3.8vw, 1.9rem);
                padding: 1.5rem 2.2rem;
            }

            &__back-link {
                font-size: clamp(1.5rem, 3.5vw, 1.8rem);
            }
        }

        @media only screen and (max-width: 450px) {
            &__actions {
                align-items: flex-start;
                flex-direction: column;
                gap: 2rem;
            }
        }
    }

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
                    height: 16px;
                    font-size: 15px;
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