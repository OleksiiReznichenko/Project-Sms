<script setup lang="ts">
import { onBeforeMount, onMounted, ref } from 'vue';
import { useBaseStore } from '@/stores/index';
import { useUserStore } from '@/stores/user';
import { DEMO_MODE } from '@/demo/config';
import DepositPopup from '../Main/DepositPopup.vue';
import BurgerMenu from '@/components/Reusable/BurgerMenu.vue';

const baseStore = useBaseStore();
const user = useUserStore();

// onMounted(() => {
//       // CLOSE DROPDOWNs AND CHANGE STYLES BACK ON UNFOCUS
//       window.addEventListener('click', (event: Event) => {

//         // CLOSE PLAY LEARN DROPDOWN
//         if (playLearnDropdownOpenedIndicator.value) {
//             const target = event?.target as HTMLElement;
//             const isClickInsideElement = target.closest('.play-learn-dropdown');
//             const isClickInsideElement2 = target.closest('.play-learn-dropdown-opener');

//             if (!isClickInsideElement && !isClickInsideElement2) {
//                 baseStore.closePlayLearnDropdown();
//             }
//         }
//       });
// });

const isMenuOpen = ref(false);


const handleOpenMenu = () => {
    isMenuOpen.value = !isMenuOpen.value;
}

const isDepositPopupOpen = ref(false);

const handleOpenDepositPopup = () => {
    isDepositPopupOpen.value = !isDepositPopupOpen.value;
}

const additionalLink = ref('');

onBeforeMount(() => {
    if (user.status === 'user') additionalLink.value = '/main';
});

</script>

<template>
    <nav class="navigation">
        <DepositPopup :isOpen="isDepositPopupOpen" :handler="handleOpenDepositPopup" />
        <div v-if="user.$state.status === 'user'" class="menu" :class="{ closed: !isMenuOpen }">
            <BurgerMenu :isOpen="isMenuOpen" :handlers="{ handleOpenMenu, handleOpenDepositPopup }" />
        </div>
        <div class="inner-container">
            <button v-if="user.$state.status === 'user'" @click="baseStore.toggleMobileNavMenu"
                class="toggle-menu-button mobile">
                <div class="line line-1"></div>
                <div class="line line-2"></div>
                <div class="line line-3"></div>
            </button>
            <router-link v-else to="/" class="logo-link-right mobile">
                <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21.3241 0H2.67589C1.1982 0 0 1.09385 0 2.44286V12.5581C0 12.5621 0 12.5661 0 12.5696C0.00272938 13.1213 0.641405 13.4786 1.18837 13.2449L12.1097 8.58189C12.8396 8.27043 13.5263 9.07774 13.0148 9.64585L9.4453 13.6111C8.94637 14.1653 9.37816 15 10.1642 15H21.3241C22.8018 15 24 13.9061 24 12.5571V2.44286C24 1.09385 22.8018 0 21.3241 0Z"
                        fill="#C0FB50" />
                </svg>
            </router-link>
            <div class="nav__left desktop">
                <button v-if="user.$state.status === 'user'" @click="handleOpenMenu" class="menu-button">
                    <svg class="menu-button__img" width="24" height="24" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_335_2860)">
                            <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z" fill="white" />
                        </g>
                        <defs>
                            <clipPath id="clip0_335_2860">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                </button>
                <router-link to="/" class="logo-link">
                    <img src="@/assets/svg/logoText.svg" alt="" class="logo">
                </router-link>
            </div>
            <ul class="links-list desktop">
                <li class="item">
                    <router-link :to="`${additionalLink || ''}/FAQ`" class="link">How does it work?</router-link>
                </li>
                <li class="item">
                    <router-link :to="`${additionalLink || ''}/services`" class="link">{{ DEMO_MODE ? 'Browse services' : 'Get number' }}</router-link>
                </li>
            </ul>
            <router-link :to="`${additionalLink || ''}/FAQ`" class="link mobile">how does it work?</router-link>
            <router-link :to="`${additionalLink || ''}/services`" class="link mobile">{{ DEMO_MODE ? 'SERVICES' : 'GET NUMBER' }}</router-link>
            <router-link v-if="user.$state.status === 'admin'" to="/adminPanel/main"
                class="btn-green button-registration">Admin panel</router-link>
            <router-link v-else-if="user.$state.status !== 'user'" :to="DEMO_MODE ? '/login' : '/registration'"
                class="btn-green button-registration">{{ DEMO_MODE ? 'Explore demo' : 'sign in' }}</router-link>
            <router-link v-else to="/" class="logo-link-right mobile">
                <svg width="24" height="15" viewBox="0 0 24 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                        d="M21.3241 0H2.67589C1.1982 0 0 1.09385 0 2.44286V12.5581C0 12.5621 0 12.5661 0 12.5696C0.00272938 13.1213 0.641405 13.4786 1.18837 13.2449L12.1097 8.58189C12.8396 8.27043 13.5263 9.07774 13.0148 9.64585L9.4453 13.6111C8.94637 14.1653 9.37816 15 10.1642 15H21.3241C22.8018 15 24 13.9061 24 12.5571V2.44286C24 1.09385 22.8018 0 21.3241 0Z"
                        fill="#C0FB50" />
                </svg>
            </router-link>
        </div>
    </nav>
    <!-- <PlayLearnDropdown :class="{'closed': !playLearnDropdownOpenedIndicator}" class="desktop" /> -->
</template>

<style lang="scss" scoped>
.navigation {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 99999;
    width: 100%;

    @media only screen and (max-width: 850px) {
        background-color: var(--color-black);
        border: 1px solid var(--color-grey);
        padding: 8px 0;
    }

    .menu {
        transition: all .3s;
    }

    .logo-link-right {
        margin-top: 4px;
    }

    .link {
        font-family: 'Bison';
        font-weight: 300;
        font-size: 15px;
        line-height: 19px;
        color: #FFFFFF;
    }

    .nav__left {
        display: flex;
        align-items: center;
        gap: 1.71rem;
    }

    .menu-button {
        height: 2.05rem;
        width: 2.05rem;
        margin-bottom: 0.3rem;

        &__img {
            height: 2.05rem;
            width: 2.05rem;
        }
    }

    .button-registration {
        @media screen and (max-width: 850px) {
            // margin-left: auto;
        }
    }

    .inner-container {
        @include width-restriction;
        border-radius: .8rem;
        display: flex;
        align-items: center;
        justify-content: space-between;

        @media only screen and (min-width: 850px) {
            background-color: var(--color-black);
            border: 1px solid var(--color-grey);
            padding: .8rem 2.1rem .8rem 3.5rem;
        }

        .btn-green {
            font-size: 1.8rem;
            padding: .6rem 3.7rem;

            @media only screen and (max-width: 850px) {
                font-size: 16px;
            }
        }

        .logo-link {
            width: 10rem;

            .logo {
                width: 100%;
            }
        }

        .links-list {
            display: flex;
            align-items: center;

            .item {
                margin-right: 2.7rem;

                .link {
                    font-family: Bison;
                    font-size: 1.8rem;

                    &:hover {
                        opacity: .7;
                    }
                }
            }
        }

        .toggle-menu-button {
            position: relative;
            height: 18px;
            width: 22px;

            .line {
                position: absolute;
                left: 0;
                height: 2px;
                width: 100%;
                background-color: var(--color-white);

                &-1 {
                    top: 0;
                }

                &-2 {
                    top: 50%;
                    transform: translateY(-50%);
                }

                &-3 {
                    bottom: 0;
                }
            }
        }
    }
}
</style>