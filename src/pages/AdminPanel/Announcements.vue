<script setup lang="ts">
import { inject, onMounted, ref, watch, watchEffect } from 'vue';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { useBaseStore } from '@/stores';
import { useAdminAnnouncements } from '@/stores/AdminPanel/adminAnnouncements';
import Announcement from '@/components/Reusable/AdminPanel/Announcements/Announcement.vue';
import Loader from '@/components/Reusable/Main/Loader.vue';

const notifyError = inject<any>('notifyError');
const notifySuccess = inject<any>('notifySuccess');
const notifyWarning = inject<any>('notifyWarning');

const baseStore = useBaseStore();

const adminAnnouncementsStore = useAdminAnnouncements();
const { announcements, isEditedIndicator } = storeToRefs(adminAnnouncementsStore);

const currentTitle = ref<string>('');
const currentDescription = ref<string>('');
const currentStartDate = ref<string>('');
const currentEndDate = ref<string>('');
const currentImage = ref<string | null>(null);

const isButtonDisabled = ref<boolean>(true);

const isLoaded = ref<boolean>(false);

const inputTitle = ref<HTMLInputElement | null>(null);
const inputDescription = ref<HTMLInputElement | null>(null);
const inputStartDate = ref<HTMLInputElement | null>(null);
const inputEndDate = ref<HTMLInputElement | null>(null);

const addAnnouncement = (): void => {
    // console.log(nameInputValue.value, discountInputValue.value, limitInputValue.value, discountType.value);
    if (!currentTitle.value || !currentDescription.value || 
    !currentStartDate.value || !currentEndDate.value) return;

    let form = new FormData();

    form.append("data", JSON.stringify({
        "title": currentTitle.value,
        "description": currentDescription.value,
        "start": currentStartDate.value,
        "end": currentEndDate.value,
    }));

    if (selectedFile.value) {
        form.append("preview", selectedFile.value);
    }

    console.log(form.get('id'), form.get('data'), form.get('preview'))
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/addAnnouncement`,
        data: form,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // },
        withCredentials: true
    }).then(function (res) {
        // console.log(res);
        if (res.data.error) {
            notifyError(res.data.message);
            return;
        }
        closePopupAdd();
        getAnnouncements();
        
        setTimeout(() => {
            currentTitle.value = '';
            currentDescription.value = '';
            currentStartDate.value = '';
            currentEndDate.value = '';
            currentImage.value = null;
            notifySuccess('Announcement successfully added');
        }, 300);
    }).catch(function (err) {
        console.log(err);
        notifyError('Error occured');
    });
};

watchEffect(() => {
    if (!currentTitle.value || !currentDescription.value || !currentStartDate.value || !currentEndDate.value) {
        isButtonDisabled.value = true;
    } else {
        isButtonDisabled.value = false;
    }
})

const getAnnouncements = (): void => {
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getAnnouncements`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // },
        withCredentials: true
    }).then(function (res) {
        // console.log('ANNOUNCEMENTS', res);
        if (res.data.announcements) {
            adminAnnouncementsStore.setAnnouncements(res.data.announcements)  
            isLoaded.value = true;
        }
    }).catch(function (err) {
        console.log(err);
    });
};

watch(isEditedIndicator, (newValue) => {
    if (newValue) {
        isEditedIndicator.value = false;
        getAnnouncements();
    }
})

const scrollContainer = ref<HTMLElement | null>(null);
const addImageInput = ref<HTMLInputElement | null>(null);

const horizontalScroll = (event: WheelEvent): void => {
    if (!scrollContainer.value || baseStore.isTouchDevice() ||
    popupAddOpenedIndicator.value || popupChangeOpenedIndicator.value) return;

    event.preventDefault();

    scrollContainer.value.scrollBy({
        left: event.deltaY < 0 ? -30 : 30,
    });
};


const popupAddOpenedIndicator = ref<boolean>(false);
const popupChangeOpenedIndicator = ref<boolean>(false);

const openPopupAdd = (): void => {
    popupAddOpenedIndicator.value = true;
};

const closePopupAdd = (): void => {
    popupAddOpenedIndicator.value = false;
    fileCleared();
};

const closeOnWrapperPopupAdd = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (!target || !target.classList.contains('popup-admin')) return;
    closePopupAdd();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FILE HANDLING
let selectedFile = ref<any>(null);
let bannerSrc = null;

// FILE READER
const fileReader = new FileReader();

fileReader.onload = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (!target) return;
    // GET NEW AVATAR SOURCE
    bannerSrc = target?.result;
    currentImage.value = bannerSrc;
};

// TRIGGER FILE SELECTION
const triggerAddFileSelection = (event: Event) => {
    event.preventDefault();
    addImageInput.value?.click();
    // console.log('CLICK', addImageInput.value)
};

// // EVENT IF FILE IS SELECTED
const fileChanged = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (!target) return;
    const files = target.files || event?.dataTransfer.files;
    if (files.length) {
        selectedFile.value = files[0];
    } else {
        selectedFile.value = files;
    }

    if (selectedFile.value?.name) {
        fileReader.readAsDataURL(selectedFile.value);
    }
};

// EVENT IF FILE IS CLEARED
const fileCleared = () => {
    selectedFile.value = null;
    bannerSrc = null;
    currentImage.value = null;
    if (!addImageInput.value) return;
    addImageInput.value.value = '';
    addImageInput.value.values = [];
};

onMounted(() => {
    getAnnouncements();
})
</script>

<template>
    <div @wheel="horizontalScroll" ref="scrollContainer" class="page page-admin-announcements">
        <div @click="closeOnWrapperPopupAdd" class="popup-admin popup-add" :class="{'closed': !popupAddOpenedIndicator}">
            <div class="popup-content">
                <button @click="closePopupAdd" class="button-close">
                    <img src="@/assets/svg/AdminPanel/cross.svg" alt="" class="cross">
                </button>
                <div class="popup-info">
                    <h3 class="title">Add announcement</h3>
                    <form @submit.prevent class="form">
                        <div class="input-container">
                            <span class="subtitle">Title</span>
                            <input v-model="currentTitle" ref="inputTitle" 
                            @keypress.enter.prevent="inputDescription?.focus()"
                            type="text" class="input" required>
                        </div>
                        <div class="input-container">
                            <span class="subtitle">Description</span>
                            <input v-model="currentDescription" ref="inputDescription" 
                            @keypress.enter.prevent="inputStartDate?.focus()"
                            type="text" class="input" required>
                        </div>
                        <div class="input-container">
                            <span class="subtitle">Start Date</span>
                            <input v-model="currentStartDate" ref="inputStartDate" 
                            @keypress.enter.prevent="inputEndDate?.focus()"
                            type="text" class="input" placeholder="2023-03-21 07:00" required>
                            <img src="@/assets/svg/AdminPanel/calendar.svg" alt="" class="icon">
                        </div>
                        <div class="input-container">
                            <span class="subtitle">End Date</span>
                            <input v-model="currentEndDate" ref="inputEndDate" 
                            @keypress.enter.prevent="addAnnouncement"
                            type="text" class="input" placeholder="2024-03-21 07:00" required>
                            <img src="@/assets/svg/AdminPanel/calendar.svg" alt="" class="icon">
                        </div>
                        <div @click="triggerAddFileSelection" class="change-image-container">
                            <img :src="currentImage ? currentImage : '/img/AdminPanel/announcementImage.png'" 
                            alt="" class="image">
                            <div class="info">
                                <h4 class="title-announcement">{{ currentTitle }}</h4>
                                <p class="description-announcement">{{ currentDescription }}</p>
                            </div>
                            <div class="edit-layer">
                                <span class="edit">Edit image</span>
                            </div>
                        </div>
                        <input @input="fileChanged" ref="addImageInput" type="file" accept=".jpg, .jpeg, .png"  class="input input-add-file">
                        <button v-if="currentImage" @click.prevent="fileCleared" class="set-default">Set image to default</button>
                        <div :class="{'small-margin': currentImage}" class="buttons">
                            <button 
                            @click="addAnnouncement" :class="{'disabled': isButtonDisabled}"
                            class="btn-green-rounded button-add">Add</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div v-if="isLoaded" class="inner-container">
            <h1 class="title">Announcements</h1>
            <div class="announcements">
                <div class="add-announcement-block">
                    <button @click="openPopupAdd" class="btn-green-rounded button-add">+</button>
                    <span class="subtitle">Add a new <br> announcement</span>
                </div>
                <Announcement 
                    v-for="announcement in announcements"
                    :key="announcement.id"
                    :id="announcement.id"
                    :title="announcement.title"
                    :description="announcement.description"
                    :preview="announcement.preview"
                    :start="announcement.start"
                    :end="announcement.end"
                    @togglePopupIndicator="(value) => popupChangeOpenedIndicator = value"
                />
            </div>
        </div>
        <Loader v-if="!isLoaded" class="admin-loader" />
    </div>
</template>

<style lang="scss" scoped>
.page-admin-announcements {
    height: 100%;
    min-height: 60rem;
    overflow-x: scroll;

    @media only screen and (max-width: 850px) {
        overflow-x: hidden;
    }

    .popup-add,
    ::v-deep(.popup-change) {

        .popup-content {
            @include flex-center;
            justify-content: flex-start;
            height: auto;
            max-height: 80%;
            overflow-y: scroll;
            padding-top: 16rem;

            .popup-info {
                width: 100%;
                height: 100%;
                
                .title {
                    font-family: Bison;
                    font-size: 5.6rem;
                    line-height: 1;
                    margin-bottom: 3.2rem;
                }

                .form {

                    .input-container {


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

                        .icon {
                            position: absolute;
                            top: 50%;
                            right: 2.3rem;
                            transform: translateY(-50%);
                            width: 1.8rem;
                        }
                    }

                    .input-add-file {
                        display: none;
                    }

                    .set-default {
                        display: flex;
                        justify-content: flex-end;
                        width: 100%;
                        margin-top: 1rem;
                        color: var(--color-green-light);

                        &:hover {
                            opacity: .8;
                        }
                    }

                    .change-image-container {
                        height: 16rem;
                        border-radius: .3rem;
                        overflow: hidden;
                        position: relative;
                        cursor: pointer;

                        &:hover .edit-layer {
                            opacity: 1;
                        }

                        .image {
                            width: 100%;
                            height: 100%;
                            object-fit: cover;
                        }

                        .info {
                            position: absolute;
                            top: 50%;
                            left: 2.9rem;
                            transform: translateY(-50%);
                            width: 20rem;

                            .title-announcement {
                                font-size: 2.3rem;
                                text-transform: uppercase;
                            }

                            .description-announcement {
                                font-size: 1.7rem;
                            }
                        }

                        .edit-layer {
                            @include flex-center;
                            position: absolute;
                            top: 0;
                            left: 0;
                            width: 100%;
                            height: 100%;
                            z-index: 1000;
                            background-color: rgba(#000, .75);
                            transition: all .3s;
                            opacity: 0;

                            .edit {
                                font-family: Bison;
                                font-weight: 700;
                                font-size: 4.2rem;
                                color: var(--color-green-light);
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
                        
                        &.small-margin {
                            margin-top: 2rem;
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

        .announcements {
            display: flex;

            @media only screen and (max-width: 850px) {
                flex-direction: column;
            }

            .add-announcement-block {
                border: 3px dashed var(--color-grey);
                padding: 9rem 2.2rem 3.5rem;
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
                    padding: 29px 10px 15px ;
                    margin-bottom: 14px;
                    margin-right: 0;
                }

                .button-add {
                    @include flex-center;
                    width: 10rem;
                    height: 10rem;
                    font-family: Bison;
                    font-size: 7rem;

                    @media only screen and (max-width: 850px) {
                        font-size: 52px;
                        height: 45px;
                        width: 100%;
                    }
                }

                .subtitle {
                    font-weight: 700;
                    font-size: 3.5rem;
                    line-height: 1;

                    @media only screen and (max-width: 850px) {
                        font-size: 32px;
                        margin-bottom: 14px;
                    }
                }
            }
        }
    }
}
</style>