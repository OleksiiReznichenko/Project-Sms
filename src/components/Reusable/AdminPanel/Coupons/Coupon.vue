<script setup lang="ts">
import { inject, onMounted, ref, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { useAdminCoupons } from '@/stores/AdminPanel/adminCoupons';


interface Props {
    id: number | string;
    name: string;
    discount: {
        type: '%' | '$';
        value: number;
    };
    limit: number;
}

const props = defineProps<Props>();

const notifyError = inject<any>('notifyError');
const notifySuccess = inject<any>('notifySuccess');
const notifyWarning = inject<any>('notifyWarning');

const adminCouponsStore = useAdminCoupons();
const { coupons } = storeToRefs(adminCouponsStore);

const nameCopy = ref<string>('');
const discountCopy = ref<number>(0);
const limitCopy = ref<number>(0);

const nameInputValue = ref<string>('');
const discountInputValue = ref<number>(0);
const limitInputValue = ref<number>(0);

const hideSaveButton = ref<boolean>(true);

const deleteCoupon = (): void => {
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/deleteCoupon`,
        data: JSON.stringify({
            "id": props.id
        }),
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
        // console.log(res);
        if (res.data.error) {
            notifyError(res.data.message);
            return;
        }
        adminCouponsStore.deleteCoupon(props.id);
        notifySuccess('Coupon successfully deleted');
    }).catch(function (err) {
        console.log(err);
        notifyError('Error occured');
    });
};

const editCoupon = (): void => {
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/editCoupon`,
        data: JSON.stringify({
            "id": props.id,
            "data": {
                "name": nameInputValue.value,
                "discount": {
                    "value": discountInputValue.value,
                    "type": props.discount.type
                },
                "limit": limitInputValue.value
            }
        }),
        headers: {
            "Content-Type": "application/json",
            // "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        },
        withCredentials: true
    }).then(function (res) {
        // console.log('EDIT COUPON', res);
        
        if (res.data.error) {
            notifyError(res.data.message);
            return;
        }
        nameCopy.value = nameInputValue.value;
        discountCopy.value = discountInputValue.value;
        limitCopy.value = limitInputValue.value;

        adminCouponsStore.editCoupon(props.id, nameCopy.value, discountCopy.value, limitCopy.value);
        notifySuccess('Coupon successfully edited');
    }).catch(function (err) {
        console.log(err);
        notifyError('Error occured');
    });
};

watchEffect(() => {
    if (nameInputValue.value !== nameCopy.value ||
    discountInputValue.value !== discountCopy.value ||
    limitInputValue.value !== limitCopy.value) {
        hideSaveButton.value = false;
    } else {
        hideSaveButton.value = true;
    }
});

const popupSureDeleteOpenedIndicator = ref<boolean>(false);

const openPopupSureDelete = (): void => {
    popupSureDeleteOpenedIndicator.value = true;
};

const closePopupSureDelete = (): void => {
    popupSureDeleteOpenedIndicator.value = false;
};

const closeOnWrapperPopupSure = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (!target || !target.classList.contains('popup-admin')) return;
    closePopupSureDelete();
};

onMounted(() => {
    nameCopy.value = props.name;
    discountCopy.value = props.discount.value;
    limitCopy.value = props.limit;

    nameInputValue.value = props.name;
    discountInputValue.value = props.discount.value;
    limitInputValue.value = props.limit;
})
</script>

<template>
    <div class="coupon">
        <div class="coupon-text-container">
            <strong class="coupon-text">{{nameCopy}}</strong>
        </div>
        <form @submit.prevent action="#" class="form">
            <div class="input-container">
                <span class="subtitle">Name</span>
                <input v-model="nameInputValue" type="text" class="input" required>
            </div>
            <div class="input-container">
                <span class="subtitle">Discount ({{ discount.type }})</span>
                <input v-model="discountInputValue" type="number" class="input" required>
            </div>
            <div class="input-container">
                <span class="subtitle">Limit</span>
                <input v-model="limitInputValue" type="number" class="input" required>
            </div>
            <div class="buttons">
                <button @click="openPopupSureDelete" class="btn-transparent-green-rounded button-delete">Delete</button>
                <button v-if="!hideSaveButton" @click="editCoupon" class="btn-green-rounded button-save">Save</button>
            </div>
        </form>
        <div @click="closeOnWrapperPopupSure" class="popup-admin popup-sure popup-sure-delete" :class="{'closed': !popupSureDeleteOpenedIndicator}">
            <div class="popup-content">
                <button @click="closePopupSureDelete" class="button-close">
                    <img src="@/assets/svg/AdminPanel/cross.svg" alt="" class="cross">
                </button>
                <div class="info">
                    <h3 class="title">Are you sure you want to delete this coupon?</h3>
                    <div class="buttons">
                        <button @click="closePopupSureDelete" class="btn-green button-back">Back</button>
                        <button @click="deleteCoupon" class="btn-red button-continue">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.coupon {
    background-color: #0F0F0F;
    border: 1px solid var(--color-grey);
    padding: 2.2rem;
    width: 34rem;
    margin-right: 2.6rem;

    @media only screen and (max-width: 850px) {
        margin-right: 0;
        margin-bottom: 14px;
        width: 42rem;
    }

    .coupon-text-container {
        border: 1px dashed var(--color-green-light);
        width: 20rem;
        margin: 0 auto;
        padding: 1.3rem 0;
        text-align: center;
        margin-bottom: 3.3rem;
        transform: rotate(-2deg);

        .coupon-text {
            font-family: Bison;
            font-size: 2.8rem;

            @media only screen and (max-width: 850px) {
                font-size: 28px;
            }
        }
    }

    .form {


        .input-container {


            &:not(:last-of-type) {
                margin-bottom: 1.3rem;
            }

            input {
                border: 1px solid var(--color-grey);
            }
        }

        .buttons {
            margin-top: 6.4rem;
            display: flex;

            button {
                width: 100%;
                font-size: 1.8rem;
                padding: .85rem 4rem;

                @media only screen and (max-width: 850px) {
                    font-size: 20px;
                }
            }

            .button-save {
                margin-left: 1.5rem;
            }
        }
    }
}
</style>