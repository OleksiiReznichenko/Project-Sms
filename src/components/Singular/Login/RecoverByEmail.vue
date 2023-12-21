<script setup lang="ts">
import { inject, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import { useRecaptchaKey } from '@/stores/recaptcha';

const notifyError = inject<any>('notifyError');
const router = useRouter();

// DATA VARIABLES
const email = ref();

// IS DATA CORRECT VARIABLE
const isEmailCorrect = ref(true);

// DEFINE STORES
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

// HANDLE RESET PASSWORD
const handleReset = async () => {

    // EMAIL VALIDATION
    if (email.value.length === 0) {
        isEmailCorrect.value = false;
        notifyError("Data is incorrect");
        return;
    }
    
    // HANDLE GET RECAPTCHA TOKEN
    const key = keyStore.getKey();
    const recaptchaToken = await getRecaptchaToken(key);

    // HANDLE SEND RECOVER LINK TO EMAIL
    let resetResponse = await axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/recover/createLink`,
        data: JSON.stringify({
            "email": email.value,
            "recaptcha": recaptchaToken
        }),
        headers: {
            "Content-Type": "application/json"
        }
    });

    // IF REQUEST RETURNED ERROR
    if (resetResponse.data.error === true) {
        isEmailCorrect.value = false;
        notifyError("Data is incorrect");
    } else {

        // HANDLE REDIRECT
        router.push({ name: 'login-confirm' });
    }
}

// HANDLE FOCUS ON INPUT
const handleFocus = (e: Event) => {
    const target = e.target as HTMLElement;
    const input = target.getElementsByTagName('input');
    input[0].focus();
}

</script>

<template>
    <div class="confirm">
        <h2 class="confirm__title">Enter your email</h2>
        <div @click="e => handleFocus(e)" :class="!isEmailCorrect ? 'error' : ''" class="confirm__input-box">
            <img src="@/assets/svg/Login/email.svg" alt="" class="confirm__input-box__img">
            <div class="input-container">
                <span class="subtitle">Email</span>
                <input v-on:keyup.enter="handleReset" v-model="email" type="email" class="input">
            </div>
        </div>
        <div class="confirm__next-buttons">
            <button @click="handleReset" class="confirm__next-buttons__login">
                <span class="confirm__next-buttons__login__text">reset</span>
                <img src="@/assets/svg/Login/arrow.svg" alt="" class="confirm__next-buttons__login__img">
            </button>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.confirm {
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

    &__title {
        margin: 4.88rem 0 2.15rem;
        font-family: 'Rubik';
        font-weight: 900;
        font-size: 5.5rem;
        line-height: 99.5%;
        text-transform: uppercase;
        color: #FFFFFF;

        @media screen and (max-width: 1150px) {
            font-size: 5rem;
        }

        @media screen and (max-width: 1000px) {
            font-size: 4rem;
        }

        @media screen and (max-width: 850px) {
            font-size: 31px;
            margin: 4rem 0 1rem;
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
        align-items: center;

        &.error {
            border: 1px solid #C04A4A;
        }

        &__text {
            font-family: 'Rubik';
            font-style: normal;
            font-weight: 900;
            font-size: 2.05rem;
            line-height: 99.5%;
            text-transform: uppercase;
            color: #FFFFFF;
            white-space: nowrap;
            margin-right: 1.71rem;

            &.grey {
                color: rgba(125, 128, 140, 1);
            }
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
            text-transform: uppercase;

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
            margin-top: 2rem;
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