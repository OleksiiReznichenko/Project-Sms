<script setup lang="ts">
import { inject, onMounted, ref, watch } from 'vue';
import { storeToRefs } from 'pinia';
import axios from 'axios';
import { useAdminAnnouncements } from '@/stores/AdminPanel/adminAnnouncements';

interface Props {
    id: number | string;
    title: string;
    description: string;
    preview: string | null;
    start: string;
    end: string;
}

const props = defineProps<Props>();
const emits = defineEmits([
    'togglePopupIndicator'
]);

const notifyError = inject<any>('notifyError');
const notifySuccess = inject<any>('notifySuccess');
const notifyWarning = inject<any>('notifyWarning');

const adminAnnouncements = useAdminAnnouncements();
const { isEditedIndicator } = storeToRefs(adminAnnouncements);

const titleCopy = ref<string>('');
const descriptionCopy = ref<string>('');
const startDateCopy = ref<string>('');
const endDateCopy = ref<string>('');

const titleInputValue = ref<string>('');
const descriptionInputValue = ref<string>('');
const startDateInputValue = ref<string>('');
const endDateInputValue = ref<string>('');

const inputTitle = ref<HTMLInputElement | null>(null);
const inputDescription = ref<HTMLInputElement | null>(null);
const inputStartDate = ref<HTMLInputElement | null>(null);
const inputEndDate = ref<HTMLInputElement | null>(null);

const deleteAnnouncement = (): void => {
    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/deleteAnnouncement`,
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
        adminAnnouncements.deleteAnnouncement(props.id);
        notifySuccess('Announcement successfully deleted');
    }).catch(function (err) {
        console.log(err);
        notifyError('Error occured');
    });
};

const editAnnouncement = (): void => {
    if (!titleInputValue.value && !descriptionInputValue.value && 
    !startDateInputValue.value && !endDateInputValue.value) return;

    let form = new FormData();

    form.append("id", `${props.id}`);

    if (selectedFile.value) {
        form.append("data", JSON.stringify({
            "title": titleInputValue.value,
            "description": descriptionInputValue.value,
            "start": startDateInputValue.value,
            "end": endDateInputValue.value,
        }));

        form.append("preview", selectedFile.value);
    } else {
        if (!popupImage.value) {
            form.append("data", JSON.stringify({
                "title": titleInputValue.value,
                "description": descriptionInputValue.value,
                "start": startDateInputValue.value,
                "end": endDateInputValue.value,
                "preview": "empty"
            }));
        }
    }

    axios({
        method: "post",
        url: `${import.meta.env.VITE_API_BASE_URL}/editAnnouncement`,
        data: form,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // },
        withCredentials: true
    }).then(function (res) {
        console.log(res);
        // console.log('popupImage', popupImage.value);

        if (res.data.error) {
            notifyError(res.data.message);
            return;
        }
        closePopupChange();

        isEditedIndicator.value = true;
        requestAnimationFrame(timer);

        titleCopy.value = titleInputValue.value;
        descriptionCopy.value = descriptionInputValue.value;
        startDateCopy.value = startDateInputValue.value;
        endDateCopy.value = endDateInputValue.value;
        currentImage.value = popupImage.value;

        adminAnnouncements.editAnnouncement(
            props.id, titleCopy.value, 
            descriptionCopy.value, currentImage.value, 
            startDateCopy.value, endDateCopy.value
        );
        notifySuccess('Announcement successfully edited');
    }).catch(function (err) {
        console.log(err);
        notifyError('Error occured');
    });
};

const formattedDate = (date: string | number): string => {
    const dateObj = new Date(+date);
    const year = dateObj.getUTCFullYear();
    const month = dateObj.getMonth() + 1;
    const day = dateObj.getDate();
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();

    let monthFormatted: number | string = month;
    let dayFormatted: number | string = day;
    let hoursFormatted: number | string = hours;
    let minutesFormatted: number | string = minutes;

    if (month < 10) {
        monthFormatted = '0' + month;
    }

    if (day < 10) {
        dayFormatted = '0' + day;
    }

    if (hours < 10) {
        hoursFormatted = '0' + hours;
    }

    if (minutes < 10) {
        minutesFormatted = '0' + minutes;
    }
    
    return `${year}-${monthFormatted}-${dayFormatted} ${hoursFormatted}:${minutesFormatted}`;
};

const monthsTimer = ref<string | number>('00');
const daysTimer = ref<string | number>('00');
const hoursTimer = ref<string | number>('00');
const minutesTimer = ref<string | number>('00');
const secondsTimer = ref<string | number>('00');

const timerSubtitle = ref<string>('Before the end of advertising');

const timer = (): void => {
    const currentDate = new Date().getTime();
    
    let timerTime = 0;
    if (+props.start - +currentDate > 0) {
        timerTime = +props.start - +currentDate;

        timerSubtitle.value = 'Before the start of advertising';
    }

    if (+props.start - +currentDate <= 0 && +props.end - +currentDate > 0) {
        timerTime = +props.end - +currentDate;

        timerSubtitle.value = 'Before the end of advertising';
    }

    if (+props.end - +currentDate <= 0) {
        timerTime = 0;

        timerSubtitle.value = 'Finished';
    }

    // console.log(props.id, 'timerTime', timerTime, props.start, props.end);

    if (timerTime > 0) {
        // if (+secondsTimer.value >= 60)  {
        //     secondsTimer.value = 0;
        // } else {
        //     secondsTimer.value = +secondsTimer.value;
        //     secondsTimer.value += 1;
        // }

        // if (+minutesTimer.value + 3 >= 60) {
        //     minutesTimer.value = +minutesTimer.value + 3 - 60;

        //     if (+hoursTimer.value + 1 >= 24) {
        //         hoursTimer.value = 0;

        //         if (+daysTimer.value + 1 > 31) {
        //             daysTimer.value = 1;

        //             if (+monthsTimer.value + 1 > 12) {
        //                 monthsTimer.value = 1;
        //             } else {
        //                 monthsTimer.value = +monthsTimer.value;
        //                 monthsTimer.value += 1;
        //             }
        //         } else {
        //             daysTimer.value = +daysTimer.value;
        //             daysTimer.value += 1;
        //         }
        //     } else {
        //         hoursTimer.value = +hoursTimer.value;
        //         hoursTimer.value += 1;
        //     }

        // } else {
        //     minutesTimer.value = +minutesTimer.value;
        //     minutesTimer.value += 3;
        //     // +minutesTimer.value += 1;
        // }

        requestAnimationFrame(timer);
    }

    monthsTimer.value = Math.floor(timerTime / (1000 * 60 * 60 * 24 * 30));
    daysTimer.value = Math.floor(timerTime % (1000 * 60 * 60 * 24 * 30) / (1000 * 60 * 60 * 24));
    hoursTimer.value = Math.floor((timerTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutesTimer.value = Math.floor((timerTime % (1000 * 60 * 60)) / (1000 * 60));
    secondsTimer.value = Math.floor((timerTime % (1000 * 60)) / 1000);

    if (+monthsTimer.value < 10) {
        monthsTimer.value = '0' + monthsTimer.value;
    }   

    if (+daysTimer.value < 10) {
        daysTimer.value = '0' + daysTimer.value;
    }

    if (+hoursTimer.value < 10) {
        hoursTimer.value = '0' + hoursTimer.value;
    }

    if (+minutesTimer.value < 10) {
        minutesTimer.value = '0' + minutesTimer.value;
    }

    if (+secondsTimer.value < 10) {
        secondsTimer.value = '0' + secondsTimer.value;
    }
};

watch(() => props.start, (newValue) => {
    if (newValue) {
        requestAnimationFrame(timer);
    }
})


const popupChangeOpenedIndicator = ref<boolean>(false);
const popupSureDeleteOpenedIndicator = ref<boolean>(false);
const editImageInput = ref<HTMLInputElement | null>(null);

const currentImage = ref<string | null>(null);
const popupImage = ref<string | null>(null);

const openPopupChange = (): void => {
    popupChangeOpenedIndicator.value = true;
    emits('togglePopupIndicator', true);
};

const openPopupSureDelete = (): void => {
    popupSureDeleteOpenedIndicator.value = true;
};

const closePopupChange = (): void => {
    popupChangeOpenedIndicator.value = false;
    emits('togglePopupIndicator', false);
};

const closePopupSureDelete = (): void => {
    popupSureDeleteOpenedIndicator.value = false;
};

const closeOnWrapperPopupChange = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (!target || !target.classList.contains('popup-admin')) return;
    closePopupChange();
};

const closeOnWrapperPopupSure = (event: Event): void => {
    const target = event.target as HTMLElement;
    if (!target || !target.classList.contains('popup-admin')) return;
    closePopupSureDelete();
};

////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FILE HANDLING
const selectedFile = ref<any>(null);
let bannerSrc = null;

// FILE READER
const fileReader = new FileReader();

fileReader.onload = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (!target) return;
    // GET NEW AVATAR SOURCE
    bannerSrc = target?.result;
    popupImage.value = bannerSrc;
};

// TRIGGER FILE SELECTION
const triggerAddFileSelection = (event: Event) => {
    event.preventDefault();
    editImageInput.value?.click();
};

// // EVENT IF FILE IS SELECTED
const fileChanged = (event: Event) => {
    const target = event.target as HTMLInputElement;

    if (!target) return;
    const files = target.files || event?.dataTransfer.files;
    // if (files.length) {
    //     selectedFile.value = files[0];
    // } else {
    //     selectedFile.value = files;
    // }
    if (files.length > 0) {
        selectedFile.value = files[0];
    }

    if (selectedFile.value?.name) {
        fileReader.readAsDataURL(selectedFile.value);
    }
};

// EVENT IF FILE IS CLEARED
const fileCleared = () => {
    selectedFile.value = null;
    bannerSrc = null;
    popupImage.value = null;
    if (!editImageInput.value) return;
    editImageInput.value.value = '';
    editImageInput.value.values = [];
};

onMounted(() => {
    if (props.preview) {
        popupImage.value = 'https://quicksms.io/img/announcements/' + props.preview;
        currentImage.value = 'https://quicksms.io/img/announcements/' + props.preview;
    }

    timer();

    titleCopy.value = props.title;
    descriptionCopy.value = props.description;
    startDateCopy.value = formattedDate(props.start);
    endDateCopy.value = formattedDate(props.end);

    titleInputValue.value = props.title;
    descriptionInputValue.value = props.description;
    startDateInputValue.value = formattedDate(props.start);
    endDateInputValue.value = formattedDate(props.end);
})
</script>

<template>
    <div class="announcement">
        <div class="image-container">
            <img :src="currentImage ? currentImage : '/img/AdminPanel/announcementImage.png'" alt="" class="image">
            <div class="info">
                <h4 class="title">{{ title }}</h4>
                <p class="description">{{ description }}</p>
            </div>
        </div>
        <div class="details">
            <div class="left">
                <div class="time-container">
                    <span v-if="monthsTimer !== '00'" class="time-line">
                        <span class="time">{{ monthsTimer }}</span>Mon <span class="white"> : </span>
                    </span> 
                    <span v-if="monthsTimer !== '00' && daysTimer !== '00'" class="time-line">
                        <span class="time">{{ daysTimer }}</span>D <span class="white"> : </span>
                    </span> 
                    <span class="time-line">
                        <span class="time">{{ hoursTimer }}</span>H 
                    </span> 
                    <span v-if="monthsTimer === '00'" class="time-line">
                        <span class="white"> : </span> <span class="time">{{ minutesTimer }}</span>Min 
                    </span> 
                    <span v-if="monthsTimer === '00'" class="time-line">
                        <span class="white"> : </span> <span class="time">{{ secondsTimer }}</span>Sec 
                    </span> 
                </div>
                <span class="subtitle">{{ timerSubtitle }}</span>
            </div>
            <div class="buttons">
                <button @click="openPopupChange" class="btn-green-rounded button-edit">
                    <img src="@/assets/svg/AdminPanel/penBlack.svg" alt="" class="icon">
                </button>
                <button @click="openPopupSureDelete" class="button-delete">
                    <img src="@/assets/svg/AdminPanel/trash.svg" alt="" class="icon">
                </button>
            </div>
        </div>
        <div @click="closeOnWrapperPopupChange" class="popup-admin popup-change" :class="{'closed': !popupChangeOpenedIndicator}">
            <div class="popup-content">
                <button @click="closePopupChange" class="button-close">
                    <img src="@/assets/svg/AdminPanel/cross.svg" alt="" class="cross">
                </button>
                <div class="popup-info">
                    <h3 class="title">Edit announcement</h3>
                    <form @submit.prevent class="form">
                        <div class="input-container">
                            <span class="subtitle">Title</span>
                            <input v-model="titleInputValue" ref="inputTitle" 
                            @keypress.enter.prevent="inputDescription?.focus()"
                            type="text" class="input" required>
                        </div>
                        <div class="input-container">
                            <span class="subtitle">Description</span>
                            <input v-model="descriptionInputValue" ref="inputDescription" 
                            @keypress.enter.prevent="inputStartDate?.focus()"
                            type="text" class="input" required>
                        </div>
                        <div class="input-container">
                            <span class="subtitle">Start Date</span>
                            <input v-model="startDateInputValue" ref="inputStartDate" 
                            @keypress.enter.prevent="inputEndDate?.focus()"
                            type="date" class="input" placeholder="2023-03-21 07:00" required>
                            <img src="@/assets/svg/AdminPanel/calendar.svg" alt="" class="icon">
                        </div>
                        <div class="input-container">
                            <span class="subtitle">End Date</span>
                            <input v-model="endDateInputValue" ref="inputEndDate" 
                            @keypress.enter.prevent="editAnnouncement"
                            type="date" class="input" placeholder="2024-03-21 07:00" required>
                            <img src="@/assets/svg/AdminPanel/calendar.svg" alt="" class="icon">
                        </div>
                        <div @click="triggerAddFileSelection" class="change-image-container">
                            <img :src="popupImage ? popupImage : '/img/AdminPanel/announcementImage.png'" alt="" class="image">
                            <div class="info">
                                <h4 class="title-announcement">{{ titleInputValue }}</h4>
                                <p class="description-announcement">{{ descriptionInputValue }}</p>
                            </div>
                            <div class="edit-layer">
                                <span class="edit">Edit image</span>
                            </div>
                        </div>
                        <input @input="fileChanged" ref="editImageInput" type="file" accept=".jpg, .jpeg, .png"  class="input input-add-file">
                        <button v-if="currentImage" @click.prevent="fileCleared" class="set-default">Set image to default</button>
                        <div class="buttons">
                            <button @click="editAnnouncement" class="btn-green-rounded button-add">Change</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <div @click="closeOnWrapperPopupSure" class="popup-admin popup-sure popup-sure-delete" :class="{'closed': !popupSureDeleteOpenedIndicator}">
            <div class="popup-content">
                <button @click="closePopupSureDelete" class="button-close">
                    <img src="@/assets/svg/AdminPanel/cross.svg" alt="" class="cross">
                </button>
                <div class="info">
                    <h3 class="title">Are you sure you want to delete this announcement?</h3>
                    <div class="buttons">
                        <button @click="closePopupSureDelete" class="btn-green button-back">Back</button>
                        <button @click="deleteAnnouncement" class="btn-red button-continue">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.announcement {
    border: .3rem solid var(--color-grey);
    width: 41rem;
    height: 43rem;
    margin-right: 2.6rem;

    @media only screen and (max-width: 850px) {
        margin-right: 0;
        margin-bottom: 14px;
        width: 42rem;
    }

    .image-container {
        padding: 1.3rem;
        height: 50%;
        border-radius: .3rem;
        overflow: hidden;
        position: relative;

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

            .title {
                font-size: 2.3rem;
                text-transform: uppercase;
            }

            .description {
                font-size: 1.7rem;
            }
        }
    }

    .details {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 0 3.2rem 0 2.7rem;
        height: 50%;

        @media only screen and (max-width: 850px) {
            flex-direction: column;
            justify-content: center;
        }

        .left {

            @media only screen and (max-width: 850px) {
                margin-bottom: 25px;
            }

            .time-container {
                font-family: Bison;
                font-size: 4.2rem;
                color: var(--color-grey-2);
                margin-bottom: .5rem;

                .time {
                    color: var(--color-white);
                    text-align: right;
                    display: inline-block;
                    width: 3.5rem;
                }

                .white {
                    color: var(--color-white);
                }
            }

            .subtitle {
                font-size: 1.8rem;
                color: var(--color-grey-2);
            }
        }

        .buttons {
            display: flex;
            flex-direction: column;
            align-items: center;

            @media only screen and (max-width: 850px) {
                flex-direction: row;
                width: 100%;
            }

            .button-edit {
                @include flex-center;
                width: 4rem;
                height: 4rem;
                padding: 0;
                margin-bottom: 1.2rem;

                @media only screen and (max-width: 850px) {
                    height: 43px;
                    width: 100%;
                    margin-right: 15px;
                    margin-bottom: 0;
                }

                .icon {
                    width: 40%;

                    @media only screen and (max-width: 850px) {
                        width: 20px;
                    }
                }
            }

            .button-delete {
                @include flex-center;
                width: 2rem;
                height: 2rem;

                @media only screen and (max-width: 850px) {
                    width: 20px;
                    height: 20px;
                }

                .icon {
                    width: 100%;
                }
            }
        }
    }
}
</style>