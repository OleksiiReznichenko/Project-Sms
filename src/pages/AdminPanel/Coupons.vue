<script setup lang="ts">
import { inject, onMounted, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { useBaseStore } from '@/stores';
import { useAdminCoupons } from '@/stores/AdminPanel/adminCoupons';
import Coupon from '@/components/Reusable/AdminPanel/Coupons/Coupon.vue';
import Loader from '@/components/Reusable/Main/Loader.vue';

const notifyError = inject<any>('notifyError');
const notifySuccess = inject<any>('notifySuccess');
const notifyWarning = inject<any>('notifyWarning');

const baseStore = useBaseStore();

const adminCouponsStore = useAdminCoupons();
const { coupons } = storeToRefs(adminCouponsStore);

const nameInputValue = ref<string>('');
const discountInputValue = ref<number | null>(null);
const limitInputValue = ref<number | null>(null);
const discountType = ref<'%' | '$'>('%');

const isButtonDisabled = ref<boolean>(true);

const isLoaded = ref<boolean>(false);

const selectDiscountType = (type: '%' | '$'): void => {
    discountType.value = type;
};

const addCoupon = (): void => {
    if (!nameInputValue.value || !discountInputValue.value || !limitInputValue.value) return;
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/addCoupon`,
        data: JSON.stringify({
            "name": nameInputValue.value,
            "discount": {
                "value": discountInputValue.value,
                "type": discountType.value
            },
            "limit": limitInputValue.value
        }),
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
        if (res.data.error) {
            notifyError(res.data.message);
            return;
        }
        closePopupAdd();
        getCoupons();

        setTimeout(() => {
            nameInputValue.value = '';
            discountInputValue.value = null;
            limitInputValue.value = null;
            notifySuccess('Coupon successfully added');
        }, 300);
    }).catch(function (err) {
        console.log(err);
        notifyError('Error occured');
    });
};

watchEffect(() => {
    if (!nameInputValue.value || !discountInputValue.value || !limitInputValue.value) {
        isButtonDisabled.value = true;
    } else {
        isButtonDisabled.value = false;
    }
})

const scrollContainer = ref<HTMLElement | null>(null);

const horizontalScroll = (event: WheelEvent): void => {
    if (!scrollContainer.value || baseStore.isTouchDevice()) return;

    event.preventDefault();

    scrollContainer.value.scrollBy({
        left: event.deltaY < 0 ? -30 : 30,
    });
};

const popupAddOpenedIndicator = ref<boolean>(false);

const openPopupAdd = (): void => {
    popupAddOpenedIndicator.value = true;
};

const closePopupAdd = (): void => {
    popupAddOpenedIndicator.value = false;
};

const closeOnWrapperPopupAdd = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (!target || !target.classList.contains('popup-admin')) return;
    closePopupAdd();
};

const getCoupons = (): void => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getCoupons`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // },
        withCredentials: true
    }).then(function (res) {
        if (res.data.coupons) {
            adminCouponsStore.setCoupons(res.data.coupons)  
            isLoaded.value = true;
        }
    }).catch(function (err) {
        console.log(err);
    });
};

onMounted(() => {
    getCoupons();
})
</script>

<template>
    <div @wheel="horizontalScroll" ref="scrollContainer" class="page page-admin-coupons">
        <div @click="closeOnWrapperPopupAdd" class="popup-admin popup-add" :class="{'closed': !popupAddOpenedIndicator}">
            <div class="popup-content">
                <button @click="closePopupAdd" class="button-close">
                    <img src="@/assets/svg/AdminPanel/cross.svg" alt="" class="cross">
                </button>
                <div class="info">
                    <h3 class="title">Add coupon</h3>
                    <form @submit.prevent class="form">
                        <div class="input-container">
                            <span class="subtitle">Promocode</span>
                            <input v-model="nameInputValue" type="text" class="input" required>
                        </div>
                        <div class="input-container">
                            <span class="subtitle">Discount</span>
                            <input v-model="discountInputValue" type="number" class="input" required>
                            <div class="discount-types">
                                <button @click.prevent="selectDiscountType('$')"
                                :class="{'active': discountType === '$'}" 
                                class="discount-type">
                                    <span>$</span>
                                </button>
                                <button @click.prevent="selectDiscountType('%')"
                                :class="{'active': discountType === '%'}" 
                                class="discount-type">
                                    <span>%</span>
                                </button>
                            </div>
                        </div>
                        <div class="input-container">
                            <span class="subtitle">Limit</span>
                            <input v-model="limitInputValue" type="number" class="input" required>
                        </div>
                        <div class="buttons">
                            <button 
                            @click="addCoupon" :class="{'disabled': isButtonDisabled}"
                            class="btn-green-rounded button-add">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div v-if="isLoaded" class="inner-container">
            <h1 class="title">Coupons</h1>
            <div class="coupons">
                <div class="add-coupon-block">
                    <button @click="openPopupAdd" class="btn-green-rounded button-add">+</button>
                    <span class="subtitle">Add <br class="desktop"> a new <br> coupon</span>
                </div>
                <Coupon 
                    v-for="coupon in coupons"
                    :key="coupon.id"
                    :id="coupon.id"
                    :name="coupon.name"
                    :discount="coupon.discount"
                    :limit="coupon.limit"
                />
            </div>
        </div>
        <Loader v-if="!isLoaded" class="admin-loader" />
    </div>
</template>

<style lang="scss" scoped>
.page-admin-coupons {
    height: 100%;
    min-height: 60rem;
    overflow-x: scroll;

    @media only screen and (max-width: 850px) {
        overflow-x: hidden;
    }

    .popup-add {

        .popup-content {
            @include flex-center;
            justify-content: flex-start;
            height: 53rem;

            .info {
                width: 100%;
                
                .title {
                    font-family: Bison;
                    font-size: 5.6rem;
                    line-height: 1;
                    margin-bottom: 3.2rem;
                }

                .form {

                    .input-container {
                        position: relative;

                        &:not(:last-of-type) {
                            margin-bottom: 1.9rem;
                        }

                        input {
                            border: 1px solid lighten(#333, 8%);
                            padding: 2.15rem 2.2rem .7rem;

                            @media only screen and (max-width: 850px) {
                                padding: 25px 25px 5px;
                            }
                        }

                        .subtitle {
                            color: lighten(#333, 8%);
                        }
                    }

                    .discount-types {
                        position: absolute;
                        top: 50%;
                        right: 1.3rem;
                        transform: translateY(-50%);
                        display: flex;
                        
                        
                        .discount-type {
                            border: 1px solid var(--color-grey);
                            border-radius: .6rem;
                            width: 4.8rem;
                            height: 2.7rem;
                            text-align: center;
                            @include flex-center;
                            font-size: 1.4rem;

                            &:hover {
                                background-color: lighten(#151515, 5%);
                            }

                            &:not(:last-of-type) {
                                margin-right: .85rem;
                            }

                            &.active {
                                border: 1px solid var(--color-green-light);
                                background-color: rgba(#C0FB50, .05) !important;
                            }
                        }
                    }

                    .buttons {
                        display: flex;
                        margin-top: 3.5rem;

                        button {
                            font-size: 2.5rem;
                            width: 15rem;
                            padding: .5rem;

                            &:not(:last-of-type) {
                                margin-right: 1.3rem;
                            }

                            &.disabled {
                                pointer-events: none;
                                opacity: .5;
                            }
                        }
                    }
                }
            }
        }
    }

    .inner-container {
        @include flex-center;
        align-items: flex-start;
        flex-direction: column;
        height: 100%;
        padding: 5.6rem;

        @media only screen and (max-width: 850px) {
            align-items: center;
        }

        .title {
            font-family: Bison;
            font-size: 8.3rem;
            line-height: 1;
            margin-bottom: 5rem;

            @media only screen and (max-width: 850px) {
                margin-bottom: 4rem;
            }
        }

        .coupons {
            display: flex;

            @media only screen and (max-width: 850px) {
                flex-direction: column;
            }

            .add-coupon-block {
                background-color: #0F0F0F;
                border: 1px dashed var(--color-grey);
                padding: 6.1rem 2.2rem 3.5rem;
                width: 34rem;
                display: flex;
                flex-direction: column;
                align-items: center;
                justify-content: space-between;
                text-align: center;
                margin-right: 2.6rem;

                @media only screen and (max-width: 850px) {
                    width: 42rem;
                    flex-direction: column-reverse;
                    padding: 29px 10px 15px;
                    margin-bottom: 14px;
                    margin-right: 0;
                }

                .button-add {
                    @include flex-center;
                    width: 10rem;
                    height: 10rem;
                    font-family: Bison;
                    font-size: 7rem;
                    margin-bottom: 8rem;

                    @media only screen and (max-width: 850px) {
                        font-size: 52px;
                        height: 45px;
                        width: 100%;
                        margin-bottom: 0;
                    }
                }

                .subtitle {
                    font-weight: 700;
                    font-size: 3.5rem;
                    line-height: 1;

                    @media only screen and (max-width: 850px) {
                        font-size: 32px;
                        margin-bottom: 20px;
                    }
                }
            }
        }
    }
}
</style>