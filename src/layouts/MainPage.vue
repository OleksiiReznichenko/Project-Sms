<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import DepositPopup from '@/components/Singular/Main/DepositPopup.vue';
import NavMenu from '@/components/Singular/App/NavMenu.vue';
import AppNav from '@/components/Singular/App/Nav.vue';
import BurgerMenu from '@/components/Reusable/BurgerMenu.vue'
import Notification from '@/components/Reusable/Notification.vue';
import { useNotificationsList } from '@/stores/User/notifications';
import { useUserStore } from '@/stores/user';

const route = useRoute();
const router = useRouter();

// CURRENT PAGE TITLE DECLARATION
const activeTitle = ref();

// NAVIGATION MENU BUTTONS DATA 
const buttonsData = ref([
    {
        title: "home",
        link: "profile",
        isActive: false
    },
    {
        title: "get number",
        link: "services",
        isActive: false
    },
    {
        title: "orders",
        link: "orders",
        isActive: false
    },
    {
        title: "transactions",
        link: "transactions",
        isActive: false
    },
    {
        title: "guideline",
        link: "FAQ",
        isActive: false
    },
    {
        title: "support",
        link: "#",
        isActive: false
    },
    {
        title: "Not Found",
        link: "404",
        isActive: false
    },
    {
        title: "TERMS OF SERVICE",
        link: "TOS",
        isActive: false
    }
]);

// STORES DECLARATION
const user = useUserStore();
const notifications = useNotificationsList();

onMounted(() => {
    // SET ACTIVE BUTTON
    buttonsData.value.forEach(item => {
        if (route.fullPath.includes(item.link)) {
            item.isActive = true;
            activeTitle.value = item.title;
        }
        else item.isActive = false;
    });

    // GET USER`S ACCOUNT 
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getAccount`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {

        // HANDLE REDIRECT IF ADMIN
        if (res.data.account.status === 'admin') {
            router.push({ name: 'adminPanel' });
            return;
        }

        // HANDLE REDIRECT IF NOT LOGGED
        if (res.data.account.status !== 'user') {
            console.log('lox')
            router.push({ name: 'home' });
        }

        // SET DATA IN STORES
        user.setUser(res.data.account);
        notifications.setNotifications(res.data.account.notifications);

        console.log(res);
    }).catch(function (err) {
        console.log(err);
    });

    // ADD WINDOW EVENT LISTENER
    screenWidth.value = window.innerWidth;
    initialWindowWidth.value = window.innerWidth;
    window.addEventListener('resize', onResize);
});

// SET ACTIVE BUTTON ON ROUTE CHANGE 
watch(route, (newValue) => {
    buttonsData.value.forEach(item => {
        if (newValue.fullPath.includes(item.link)) {
            item.isActive = true;
            activeTitle.value = item.title;
        }
        else item.isActive = false;
    });
});

// NOTIFICATIONS MENU HANDLER
const isNotificationOpen = ref(false);

const handleOpenNotification = () => {
    isNotificationOpen.value = !isNotificationOpen.value;
}

// USER`S MENU HANDLER
const isMenuOpen = ref(false);

const handleOpenMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
}

// DEPOSIT POPUP HANDLER
const isDepositPopupOpen = ref(false);

const handleOpenDepositPopup = () => {
    isDepositPopupOpen.value = !isDepositPopupOpen.value;
}

// RESIZE HANDLER
const screenWidth = ref();
const initialWindowWidth = ref<number>(0);

const onResize = (): void => {
    if (initialWindowWidth.value <= 850 && window.innerWidth > 850 || initialWindowWidth.value > 850 && window.innerWidth <= 850) location.reload();
};

// REMOVE WINDOW EVENT LISTENER
onUnmounted(() => {
    window.removeEventListener('resize', onResize);
})

</script>

<template>
    <div class="page page-main">
        <DepositPopup :isOpen="isDepositPopupOpen" :handler="handleOpenDepositPopup" />
        <AppNav v-if="screenWidth < 850" />
        <NavMenu v-if="screenWidth < 850" />
        <div class="inner-container">
            <div class="page-main__box">
                <div class="page-main__box__el first desktop">
                    <button @click="handleOpenMenu" class="page-main__box__el__nav-button">
                        <img src="@/assets/svg/Main/navButton.svg" alt="" class="page-main__box__el__nav-button__img">
                    </button>
                </div>
                <div class="page-main__box__el second desktop">
                    <span class="page-main__box__el__location">#{{ activeTitle }}</span>
                    <div class="page-main__box__el__balance">
                        <button @click="handleOpenDepositPopup" class="page-main__box__el__balance__button">
                            <span class="page-main__box__el__balance__button__text grey">balance
                                <span class="page-main__box__el__balance__button__text"> ${{ user.balance }}</span>
                            </span>
                            <img src="@/assets/svg/Main/plus.svg" alt="" class="page-main__box__el__balance__button__svg">
                        </button>
                        <router-link to="/main/services" class="page-main__box__el__balance__buy-button">Buy a
                            number</router-link>
                    </div>
                    <button :data-count="notifications.notificationsCount()" @click="handleOpenNotification"
                        class="page-main__box__el__notification">
                        <img src="@/assets/svg/Main/notificationButton.svg" alt="" class="page-main__box__el__notification__svg">
                    </button>
                </div>
                <nav class="page-main__box__el third desktop">
                    <router-link to="/main/profile" :class="buttonsData[0].isActive ? ' active' : ''"
                        class="page-main__box__el__nav-el">
                        <svg class="page-main__box__el__nav-el__img" width="32" height="32" viewBox="0 0 32 32" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2381_6624)">
                                <path
                                    d="M28 26.7554C28 27.109 27.8595 27.4482 27.6095 27.6982C27.3594 27.9483 27.0203 28.0887 26.6667 28.0887H5.33333C4.97971 28.0887 4.64057 27.9483 4.39052 27.6982C4.14048 27.4482 4 27.109 4 26.7554V12.7421C3.99986 12.5389 4.04616 12.3384 4.13535 12.1558C4.22455 11.9733 4.35429 11.8135 4.51467 11.6887L15.1813 3.39274C15.4154 3.21067 15.7035 3.11182 16 3.11182C16.2965 3.11182 16.5846 3.21067 16.8187 3.39274L27.4853 11.6887C27.6457 11.8135 27.7754 11.9733 27.8646 12.1558C27.9538 12.3384 28.0001 12.5389 28 12.7421V26.7554ZM13.3333 18.6665V28.0887H18.6667V18.6665H13.3333Z"
                                    fill="#7D808C" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2381_6624">
                                    <rect width="32" height="32" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </router-link>
                    <router-link to="/main/services" :class="buttonsData[1].isActive ? ' active' : ''"
                        class="page-main__box__el__nav-el">
                        <svg class="page-main__box__el__nav-el__img" width="32" height="32" viewBox="0 0 32 32" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2381_6632)">
                                <path
                                    d="M27.9998 15.5278V27.9998C27.9998 28.3535 27.8594 28.6926 27.6093 28.9426C27.3593 29.1927 27.0201 29.3332 26.6665 29.3332H5.33318C4.97955 29.3332 4.64042 29.1927 4.39037 28.9426C4.14032 28.6926 3.99984 28.3535 3.99984 27.9998V15.5278C3.13893 14.5545 2.66458 13.2993 2.66651 11.9998V3.99984C2.66651 3.64622 2.80699 3.30708 3.05703 3.05703C3.30708 2.80698 3.64622 2.6665 3.99984 2.6665H27.9998C28.3535 2.6665 28.6926 2.80698 28.9427 3.05703C29.1927 3.30708 29.3332 3.64622 29.3332 3.99984V11.9998C29.3332 13.3518 28.8292 14.5865 27.9998 15.5278ZM18.6665 11.9998C18.6665 11.6462 18.807 11.3071 19.057 11.057C19.3071 10.807 19.6462 10.6665 19.9998 10.6665C20.3535 10.6665 20.6926 10.807 20.9427 11.057C21.1927 11.3071 21.3332 11.6462 21.3332 11.9998C21.3332 12.7071 21.6141 13.3854 22.1142 13.8855C22.6143 14.3856 23.2926 14.6665 23.9998 14.6665C24.7071 14.6665 25.3854 14.3856 25.8855 13.8855C26.3856 13.3854 26.6665 12.7071 26.6665 11.9998V5.33317H5.33318V11.9998C5.33318 12.7071 5.61413 13.3854 6.11422 13.8855C6.61432 14.3856 7.2926 14.6665 7.99984 14.6665C8.70709 14.6665 9.38536 14.3856 9.88546 13.8855C10.3856 13.3854 10.6665 12.7071 10.6665 11.9998C10.6665 11.6462 10.807 11.3071 11.057 11.057C11.3071 10.807 11.6462 10.6665 11.9998 10.6665C12.3535 10.6665 12.6926 10.807 12.9427 11.057C13.1927 11.3071 13.3332 11.6462 13.3332 11.9998C13.3332 12.7071 13.6141 13.3854 14.1142 13.8855C14.6143 14.3856 15.2926 14.6665 15.9998 14.6665C16.7071 14.6665 17.3854 14.3856 17.8855 13.8855C18.3856 13.3854 18.6665 12.7071 18.6665 11.9998Z"
                                    fill="#7D808C" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2381_6632">
                                    <rect width="32" height="32" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </router-link>
                    <router-link to="/main/orders/1" :class="buttonsData[2].isActive ? ' active' : ''"
                    class="page-main__box__el__nav-el">
                    <svg class="page-main__box__el__nav-el__img" width="32" height="32" viewBox="0 0 32 32" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_2381_6628)">
                            <path
                                d="M9.33317 2.66667H23.9998C24.3535 2.66667 24.6926 2.80714 24.9426 3.05719C25.1927 3.30724 25.3332 3.64638 25.3332 4V28C25.3332 28.3536 25.1927 28.6928 24.9426 28.9428C24.6926 29.1929 24.3535 29.3333 23.9998 29.3333H7.99984C7.64622 29.3333 7.30708 29.1929 7.05703 28.9428C6.80698 28.6928 6.6665 28.3536 6.6665 28V0H9.33317V2.66667ZM9.33317 5.33333V12H22.6665V5.33333H9.33317Z"
                                fill="#7D808C" />
                        </g>
                            <defs>
                                <clipPath id="clip0_2381_6628">
                                    <rect width="32" height="32" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </router-link>
                    <router-link to="/main/transactions" :class="buttonsData[3].isActive ? ' active' : ''"
                        class="page-main__box__el__nav-el">
                        <svg class="page-main__box__el__nav-el__img" width="32" height="32" viewBox="0 0 32 32" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2381_6620)">
                                <path
                                    d="M22.6667 21.3332H25.3333V5.33317H12V7.99984H22.6667V21.3332ZM22.6667 23.9998V27.9998C22.6667 28.7358 22.0667 29.3332 21.324 29.3332H5.34267C5.16684 29.3342 4.99253 29.3005 4.82976 29.234C4.667 29.1675 4.51898 29.0695 4.39421 28.9456C4.26945 28.8217 4.17039 28.6743 4.10274 28.512C4.03509 28.3497 4.00017 28.1757 4 27.9998L4.004 9.33317C4.004 8.59717 4.604 7.99984 5.34667 7.99984H9.33333V3.99984C9.33333 3.64622 9.47381 3.30708 9.72386 3.05703C9.97391 2.80698 10.313 2.6665 10.6667 2.6665H26.6667C27.0203 2.6665 27.3594 2.80698 27.6095 3.05703C27.8595 3.30708 28 3.64622 28 3.99984V22.6665C28 23.0201 27.8595 23.3593 27.6095 23.6093C27.3594 23.8594 27.0203 23.9998 26.6667 23.9998H22.6667ZM9.33333 21.3332V23.9998H12V25.3332H14.6667V23.9998H15.3333C16.2174 23.9998 17.0652 23.6486 17.6904 23.0235C18.3155 22.3984 18.6667 21.5506 18.6667 20.6665C18.6667 19.7824 18.3155 18.9346 17.6904 18.3095C17.0652 17.6844 16.2174 17.3332 15.3333 17.3332H11.3333C11.1565 17.3332 10.987 17.2629 10.8619 17.1379C10.7369 17.0129 10.6667 16.8433 10.6667 16.6665C10.6667 16.4897 10.7369 16.3201 10.8619 16.1951C10.987 16.0701 11.1565 15.9998 11.3333 15.9998H17.3333V13.3332H14.6667V11.9998H12V13.3332H11.3333C10.4493 13.3332 9.60143 13.6844 8.97631 14.3095C8.35119 14.9346 8 15.7824 8 16.6665C8 17.5506 8.35119 18.3984 8.97631 19.0235C9.60143 19.6486 10.4493 19.9998 11.3333 19.9998H15.3333C15.5101 19.9998 15.6797 20.0701 15.8047 20.1951C15.9298 20.3201 16 20.4897 16 20.6665C16 20.8433 15.9298 21.0129 15.8047 21.1379C15.6797 21.2629 15.5101 21.3332 15.3333 21.3332H9.33333Z"
                                    fill="#7D808C" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2381_6620">
                                    <rect width="32" height="32" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </router-link>
                    <router-link to="/main/FAQ" :class="buttonsData[4].isActive ? ' active' : ''"
                        class="page-main__box__el__nav-el">
                        <svg class="page-main__box__el__nav-el__img" width="32" height="32" viewBox="0 0 32 32" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_2381_6615)">
                                <path
                                    d="M8.6065 25.3333L2.6665 30V5.33333C2.6665 4.97971 2.80698 4.64057 3.05703 4.39052C3.30708 4.14048 3.64622 4 3.99984 4H27.9998C28.3535 4 28.6926 4.14048 28.9426 4.39052C29.1927 4.64057 29.3332 4.97971 29.3332 5.33333V24C29.3332 24.3536 29.1927 24.6928 28.9426 24.9428C28.6926 25.1929 28.3535 25.3333 27.9998 25.3333H8.6065ZM13.9998 22.6667L14.6665 21.3333H17.3332L16.6665 22.6667H15.3332H13.9998ZM11.4225 11.7507L10.6665 9.7078C10.7407 9.33638 6.84017 4.18582 12.786 8.13891C13.0474 7.86479 13.1513 1.94039 16.6665 6.66667C17.034 6.57488 20.2705 5.88099 20.6301 6C20.9897 6.11901 21.7597 9.41491 21.9998 9.7078C22.24 10.0007 24.0672 13.1462 24.1135 13.5221C24.1597 13.898 20.1618 17.6576 19.9998 18C19.8378 18.3424 16.3199 17.7974 15.9998 18C15.6798 18.2026 12.3786 18 11.9998 18L14.6665 14.6667V17.3333H15.9998C16.8835 17.3331 17.749 17.0819 18.4955 16.609C19.242 16.1362 19.839 15.461 20.2169 14.6622C20.5947 13.8634 20.7381 12.9737 20.6301 12.0966C20.5222 11.2196 20.1674 10.3912 19.6071 9.7078C19.0468 9.02445 18.304 8.51422 17.4651 8.23648C16.6262 7.95874 15.7257 7.9249 14.8683 8.13891C14.0109 8.35291 13.2319 8.80595 12.6219 9.44534C12.0119 10.0847 11.596 10.8842 11.4225 11.7507Z"
                                    fill="#7D808C" />
                                <path
                                    d="M10.1252 19.3335V9.53349H17.6572V11.2975H12.2532V13.8455H16.5792V15.6095H12.2532V19.3335H10.1252Z"
                                    fill="#0F0F0F" />
                            </g>
                            <defs>
                                <clipPath id="clip0_2381_6615">
                                    <rect width="32" height="32" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                    </router-link>
                </nav>
                <div class="page-main__box__el fourth">
                    <router-view v-slot="{ Component }">
                        <Transition name="fade" mode="out-in">
                            <component :is="Component" />
                        </Transition>
                    </router-view>
                </div>
            </div>
        </div>
        <div class="page-main__menu" :class="{ closed: !isMenuOpen }">
            <BurgerMenu :isOpen="isMenuOpen" :handlers="{ handleOpenMenu, handleOpenDepositPopup }" />
        </div>
        <div class="page-main__menu" :class="{ closed: !isNotificationOpen }">
            <Notification :isOpen="isNotificationOpen" :handler="{ handleOpenNotification }" />
        </div>
        <div class="page-main__box__el__mobile-nav mobile">
            <router-link to="/main/profile" :class="buttonsData[0].isActive ? ' active' : ''"
                class="page-main__box__el__mobile-nav__el">
                <svg class="page-main__box__el__mobile-nav__el__img" width="32" height="32" viewBox="0 0 32 32" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2381_6624)">
                        <path
                            d="M28 26.7554C28 27.109 27.8595 27.4482 27.6095 27.6982C27.3594 27.9483 27.0203 28.0887 26.6667 28.0887H5.33333C4.97971 28.0887 4.64057 27.9483 4.39052 27.6982C4.14048 27.4482 4 27.109 4 26.7554V12.7421C3.99986 12.5389 4.04616 12.3384 4.13535 12.1558C4.22455 11.9733 4.35429 11.8135 4.51467 11.6887L15.1813 3.39274C15.4154 3.21067 15.7035 3.11182 16 3.11182C16.2965 3.11182 16.5846 3.21067 16.8187 3.39274L27.4853 11.6887C27.6457 11.8135 27.7754 11.9733 27.8646 12.1558C27.9538 12.3384 28.0001 12.5389 28 12.7421V26.7554ZM13.3333 18.6665V28.0887H18.6667V18.6665H13.3333Z"
                            fill="#7D808C" />
                    </g>
                    <defs>
                        <clipPath id="clip0_2381_6624">
                            <rect width="32" height="32" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </router-link>
            <router-link to="/main/services" :class="buttonsData[1].isActive ? ' active' : ''"
                class="page-main__box__el__mobile-nav__el">
                <svg class="page-main__box__el__mobile-nav__el__img" width="32" height="32" viewBox="0 0 32 32" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2381_6632)">
                        <path
                            d="M27.9998 15.5278V27.9998C27.9998 28.3535 27.8594 28.6926 27.6093 28.9426C27.3593 29.1927 27.0201 29.3332 26.6665 29.3332H5.33318C4.97955 29.3332 4.64042 29.1927 4.39037 28.9426C4.14032 28.6926 3.99984 28.3535 3.99984 27.9998V15.5278C3.13893 14.5545 2.66458 13.2993 2.66651 11.9998V3.99984C2.66651 3.64622 2.80699 3.30708 3.05703 3.05703C3.30708 2.80698 3.64622 2.6665 3.99984 2.6665H27.9998C28.3535 2.6665 28.6926 2.80698 28.9427 3.05703C29.1927 3.30708 29.3332 3.64622 29.3332 3.99984V11.9998C29.3332 13.3518 28.8292 14.5865 27.9998 15.5278ZM18.6665 11.9998C18.6665 11.6462 18.807 11.3071 19.057 11.057C19.3071 10.807 19.6462 10.6665 19.9998 10.6665C20.3535 10.6665 20.6926 10.807 20.9427 11.057C21.1927 11.3071 21.3332 11.6462 21.3332 11.9998C21.3332 12.7071 21.6141 13.3854 22.1142 13.8855C22.6143 14.3856 23.2926 14.6665 23.9998 14.6665C24.7071 14.6665 25.3854 14.3856 25.8855 13.8855C26.3856 13.3854 26.6665 12.7071 26.6665 11.9998V5.33317H5.33318V11.9998C5.33318 12.7071 5.61413 13.3854 6.11422 13.8855C6.61432 14.3856 7.2926 14.6665 7.99984 14.6665C8.70709 14.6665 9.38536 14.3856 9.88546 13.8855C10.3856 13.3854 10.6665 12.7071 10.6665 11.9998C10.6665 11.6462 10.807 11.3071 11.057 11.057C11.3071 10.807 11.6462 10.6665 11.9998 10.6665C12.3535 10.6665 12.6926 10.807 12.9427 11.057C13.1927 11.3071 13.3332 11.6462 13.3332 11.9998C13.3332 12.7071 13.6141 13.3854 14.1142 13.8855C14.6143 14.3856 15.2926 14.6665 15.9998 14.6665C16.7071 14.6665 17.3854 14.3856 17.8855 13.8855C18.3856 13.3854 18.6665 12.7071 18.6665 11.9998Z"
                            fill="#7D808C" />
                    </g>
                    <defs>
                        <clipPath id="clip0_2381_6632">
                            <rect width="32" height="32" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </router-link>
            <router-link to="/main/orders" :class="buttonsData[2].isActive ? ' active' : ''"
                class="page-main__box__el__mobile-nav__el">
                <svg class="page-main__box__el__mobile-nav__el__img" width="32" height="32" viewBox="0 0 32 32" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2381_6628)">
                        <path
                            d="M9.33317 2.66667H23.9998C24.3535 2.66667 24.6926 2.80714 24.9426 3.05719C25.1927 3.30724 25.3332 3.64638 25.3332 4V28C25.3332 28.3536 25.1927 28.6928 24.9426 28.9428C24.6926 29.1929 24.3535 29.3333 23.9998 29.3333H7.99984C7.64622 29.3333 7.30708 29.1929 7.05703 28.9428C6.80698 28.6928 6.6665 28.3536 6.6665 28V0H9.33317V2.66667ZM9.33317 5.33333V12H22.6665V5.33333H9.33317Z"
                            fill="#7D808C" />
                    </g>
                    <defs>
                        <clipPath id="clip0_2381_6628">
                            <rect width="32" height="32" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </router-link>
            <router-link to="/main/transactions" :class="buttonsData[3].isActive ? ' active' : ''"
                class="page-main__box__el__mobile-nav__el">
                <svg class="page-main__box__el__mobile-nav__el__img" width="32" height="32" viewBox="0 0 32 32" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2381_6620)">
                        <path
                            d="M22.6667 21.3332H25.3333V5.33317H12V7.99984H22.6667V21.3332ZM22.6667 23.9998V27.9998C22.6667 28.7358 22.0667 29.3332 21.324 29.3332H5.34267C5.16684 29.3342 4.99253 29.3005 4.82976 29.234C4.667 29.1675 4.51898 29.0695 4.39421 28.9456C4.26945 28.8217 4.17039 28.6743 4.10274 28.512C4.03509 28.3497 4.00017 28.1757 4 27.9998L4.004 9.33317C4.004 8.59717 4.604 7.99984 5.34667 7.99984H9.33333V3.99984C9.33333 3.64622 9.47381 3.30708 9.72386 3.05703C9.97391 2.80698 10.313 2.6665 10.6667 2.6665H26.6667C27.0203 2.6665 27.3594 2.80698 27.6095 3.05703C27.8595 3.30708 28 3.64622 28 3.99984V22.6665C28 23.0201 27.8595 23.3593 27.6095 23.6093C27.3594 23.8594 27.0203 23.9998 26.6667 23.9998H22.6667ZM9.33333 21.3332V23.9998H12V25.3332H14.6667V23.9998H15.3333C16.2174 23.9998 17.0652 23.6486 17.6904 23.0235C18.3155 22.3984 18.6667 21.5506 18.6667 20.6665C18.6667 19.7824 18.3155 18.9346 17.6904 18.3095C17.0652 17.6844 16.2174 17.3332 15.3333 17.3332H11.3333C11.1565 17.3332 10.987 17.2629 10.8619 17.1379C10.7369 17.0129 10.6667 16.8433 10.6667 16.6665C10.6667 16.4897 10.7369 16.3201 10.8619 16.1951C10.987 16.0701 11.1565 15.9998 11.3333 15.9998H17.3333V13.3332H14.6667V11.9998H12V13.3332H11.3333C10.4493 13.3332 9.60143 13.6844 8.97631 14.3095C8.35119 14.9346 8 15.7824 8 16.6665C8 17.5506 8.35119 18.3984 8.97631 19.0235C9.60143 19.6486 10.4493 19.9998 11.3333 19.9998H15.3333C15.5101 19.9998 15.6797 20.0701 15.8047 20.1951C15.9298 20.3201 16 20.4897 16 20.6665C16 20.8433 15.9298 21.0129 15.8047 21.1379C15.6797 21.2629 15.5101 21.3332 15.3333 21.3332H9.33333Z"
                            fill="#7D808C" />
                    </g>
                    <defs>
                        <clipPath id="clip0_2381_6620">
                            <rect width="32" height="32" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </router-link>
            <router-link to="/main/FAQ" :class="buttonsData[4].isActive ? ' active' : ''"
                class="page-main__box__el__mobile-nav__el">
                <svg class="page-main__box__el__mobile-nav__el__img" width="32" height="32" viewBox="0 0 32 32" fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <g clip-path="url(#clip0_2381_6615)">
                        <path
                            d="M8.6065 25.3333L2.6665 30V5.33333C2.6665 4.97971 2.80698 4.64057 3.05703 4.39052C3.30708 4.14048 3.64622 4 3.99984 4H27.9998C28.3535 4 28.6926 4.14048 28.9426 4.39052C29.1927 4.64057 29.3332 4.97971 29.3332 5.33333V24C29.3332 24.3536 29.1927 24.6928 28.9426 24.9428C28.6926 25.1929 28.3535 25.3333 27.9998 25.3333H8.6065ZM13.9998 22.6667L14.6665 21.3333H17.3332L16.6665 22.6667H15.3332H13.9998ZM11.4225 11.7507L10.6665 9.7078C10.7407 9.33638 6.84017 4.18582 12.786 8.13891C13.0474 7.86479 13.1513 1.94039 16.6665 6.66667C17.034 6.57488 20.2705 5.88099 20.6301 6C20.9897 6.11901 21.7597 9.41491 21.9998 9.7078C22.24 10.0007 24.0672 13.1462 24.1135 13.5221C24.1597 13.898 20.1618 17.6576 19.9998 18C19.8378 18.3424 16.3199 17.7974 15.9998 18C15.6798 18.2026 12.3786 18 11.9998 18L14.6665 14.6667V17.3333H15.9998C16.8835 17.3331 17.749 17.0819 18.4955 16.609C19.242 16.1362 19.839 15.461 20.2169 14.6622C20.5947 13.8634 20.7381 12.9737 20.6301 12.0966C20.5222 11.2196 20.1674 10.3912 19.6071 9.7078C19.0468 9.02445 18.304 8.51422 17.4651 8.23648C16.6262 7.95874 15.7257 7.9249 14.8683 8.13891C14.0109 8.35291 13.2319 8.80595 12.6219 9.44534C12.0119 10.0847 11.596 10.8842 11.4225 11.7507Z"
                            fill="#7D808C" />
                        <path
                            d="M10.1252 19.3335V9.53349H17.6572V11.2975H12.2532V13.8455H16.5792V15.6095H12.2532V19.3335H10.1252Z"
                            fill="#0F0F0F" />
                    </g>
                    <defs>
                        <clipPath id="clip0_2381_6615">
                            <rect width="32" height="32" fill="white" />
                        </clipPath>
                    </defs>
                </svg>
            </router-link>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.page-main {
    min-height: 100vh;
    background: #000000;

    @media screen and (max-width: 850px) {
        min-height: calc(100vh - 48px);
    }

    &__menu {
        transition: all .3s;
    }

    &__box {
        display: grid;
        grid-template-columns: 6rem auto;
        grid-template-rows: 6rem auto;
        overflow: hidden;
        height: 100%;

        @media screen and (max-width: 850px) {
            grid-template-columns: auto;
            grid-template-rows: auto;
        }

        &__el {
            border: 1px solid #363636;

            @media screen and (max-width: 850px) {
                border: none;
            }

            &__mobile-nav {
                display: flex;
                position: fixed;
                bottom: 0;
                width: 100%;
                align-items: center;
                justify-content: center;
                border-top: 1px solid #333333;
                background-color: #000000;
                z-index: 9999;

                &__el {
                    padding: 10px 15px;
                    border-left: 1px solid #333333;

                    &.active {
                        background: #C0FB50;

                        &>svg>g>path:first-child {
                            fill: #000000;
                        }

                        &>svg>g>path+path {
                            fill: #C0FB50;
                        }
                    }


                    &:first-child {
                        border: none;
                    }

                    &__img {
                        width: 24px;
                        height: 24px;
                    }
                }
            }

            &__location {
                font-family: 'Rubik';
                font-style: normal;
                font-weight: 900;
                font-size: 1.54rem;
                line-height: 99.5%;
                text-transform: uppercase;
                color: #7D808C;
            }


            &__notification {
                height: 2.05rem;
                width: 2.05rem;
                position: relative;

                &::before {
                    content: attr(data-count);
                    position: absolute;
                    top: -0.5rem;
                    right: -0.5rem;
                    background-color: #C04A4A;
                    border-radius: 100%;
                    width: 1.5rem;
                    height: 1.5rem;
                    color: #0F0F0F;
                    font-size: 1.2rem;
                    line-height: 2.05rem;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }

                &__svg {
                    height: 2.05rem;
                    width: 2.05rem;
                }
            }

            &__notification[data-count="0"]::before {
                display: none;
            }

            &__balance {
                display: flex;
                align-items: center;
                gap: 2.06rem;

                &__button {
                    display: flex;
                    align-self: center;
                    gap: 0.6rem;

                    &__text {
                        font-family: 'Bison';
                        font-style: normal;
                        font-weight: 300;
                        font-size: 1.71rem;
                        line-height: 2.05rem;
                        color: white;

                        &.grey {
                            color: #7D808C;
                        }
                    }

                    &__svg {
                        height: 2.05rem;
                        width: 2.05rem;
                    }

                    &:hover {
                        opacity: 0.8;
                    }
                }

                &__buy-button {
                    background: #C0FB50;
                    border-radius: 6px;
                    padding: 1.3rem 3rem;

                    font-family: 'Rubik';
                    font-weight: 700;
                    font-size: 1.36rem;
                    line-height: 0.7rem;
                    letter-spacing: -0.05em;
                    text-transform: uppercase;
                    color: #0F0F0F;

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

            &__nav-el {
                border-bottom: 1px solid #333333;
                display: flex;
                align-items: center;
                justify-content: center;

                &:hover {
                    background-color: #333333;
                }

                &.active {
                    background: #C0FB50;

                    &>svg>g>path:first-child {
                        fill: #000000;
                    }

                    &>svg>g>path+path {
                        fill: #C0FB50;
                    }
                }

                &__img {
                    height: 2.75rem;
                    width: 2.75rem;
                }
            }

            &.first {
                border-radius: 10px 0 0 0;
                display: flex;
                align-items: center;
                justify-content: center;
                background: #0F0F0F;
            }

            &.second {
                border-radius: 0 10px 0 0;
                border-left: 0px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 2rem 0 3rem;
                background: #0F0F0F;
            }

            &.third {
                border-radius: 0 0 0 10px;
                border-top: 0px;
                display: grid;
                grid-template-rows: repeat(6, 6.85rem);
            }

            &.fourth {
                border-radius: 0 0 10px 0;
                display: flex;
                border-top: 0px;
                border-left: 0px;
                overflow: auto;

                @media screen and (max-width: 850px) {
                    display: grid;
                    grid-template-columns: auto;
                }
            }
        }
    }

    .inner-container {
        @include width-restriction-old;
        max-width: none !important;
        padding: 3.42rem 6.42rem;
        height: 100vh;
        position: fixed;
        width: 100%;

        @media only screen and (max-width: 1050px) {
            padding: 3.42rem 3rem;
        }

        @media only screen and (max-width: 850px) {
            position: static;
            min-height: auto;
            padding: 0 !important;
            width: auto !important;
        }
    }
}
</style>