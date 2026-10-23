<script setup lang="ts">
import { onMounted, ref, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import axios from 'axios';
import Service from '@/components/Reusable/Main/Services/Service.vue';
import Loader from '@/components/Reusable/Main/Loader.vue';
import AppNav from '@/components/Singular/App/Nav.vue';
import NavMenu from '@/components/Singular/App/NavMenu.vue';
import NoServicesFound from '@/components/Singular/Main/Services/NoServicesFound.vue';
import NothingFound from '@/components/Singular/Main/Services/NothingFound.vue';
import { DEMO_MODE } from '@/demo/config';

const router = useRouter();
const route = useRoute();

// SERVICES VARIABLE DECLARATION 
interface servicesInfo {
    ID: number,
    name: string,
}

const services = ref<servicesInfo[]>([]);
const renderServices = ref<servicesInfo[]>([]);

// COUNTRIES VARIABLE DECLARATION 

interface countriesInfo {
    ID: number,
    name: string,
    region: string,
    short_name: string,
}

const countries = ref<countriesInfo[]>([]);
const renderCountries = ref<countriesInfo[]>([]);

// SELECTED COUNTRY ID DECLARATION (USA BY DEFAULT)
const countryFilter = ref(1);

const placeholderText = ref('');
const placeholders = ['CHINAMI CHAN', 'DISCORD CHINA', 'CHINA TENCENT / QQ', 'CHINA WECHAT', 'CHINA MICROSOFT', 'INSTAGRAM United States', 'INSTAGRAM Canada', 'INSTAGRAM United Kingdom', 'INSTAGRAM India', 'COINBASE United States', 'COINBASE Canada', 'COINBASE United Kingdom', 'COINBASE India', 'APPLE United States', 'APPLE Canada', 'APPLE United Kingdom', 'APPLE India', 'GOOGLE United States', 'GOOGLE Canada', 'GOOGLE United Kingdom', 'GOOGLE India', 'United States TWITTER', 'Canada TWITTER', 'TWITTER United Kingdom', 'TWITTER India', 'TWITCH United States', 'TWITCH Canada', 'TWITCH United Kingdom', 'TWITCH India', 'DISCORD United States', 'DISCORD Canada', 'DISCORD United Kingdom', 'DISCORD India', 'INSTAGRAM United States', 'INSTAGRAM Canada', 'United Kingdom INSTAGRAM', 'India INSTAGRAM', 'United States EBAY', 'EBAY Canada', 'EBAY United Kingdom', 'EBAY India', 'STEAM United States', 'STEAM Canada', 'STEAM United Kingdom', 'STEAM India', 'LINKEDIN United States', 'LINKEDIN Canada', 'LINKEDIN United Kingdom', 'LINKEDIN India', 'TIKTOK United States', 'Canada TIKTOK', 'United Kingdom TIKTOK', 'TIKTOK India'];

const isAnim = ref(false);

const isCountriesLoaded = ref(false);
const isServicesLoaded = ref(false);

onMounted(() => {

    // HANDLE CLOSE ERROR POPUP
    if (route.params.status === 'cancel') {
        handleOpenErrorPopup();
        router.replace({ params: { ...route.params, status: null } });
    }

    // PLACEHODLER ANIMATION
    placeholderText.value = placeholders[Math.floor(Math.random() * 53)];
    setInterval(() => {
        isAnim.value = true;
        setTimeout(() => {
            placeholderText.value = placeholders[Math.floor(Math.random() * 53)];
            isAnim.value = false;
        }, 500);
    }, 3220);

    // HANDLE GET COUNTRIES LIST
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getCountries`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {
        isCountriesLoaded.value = true;
        countries.value = res.data.countries;

        // SET COUNTIES LIST TO RENDER
        renderCountries.value = countrySearch();
    }).catch(function (err) {
        console.log(err);
    });

    // HANDLE GET SERVICES LIST
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getServices?country=${countryFilter.value}`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {
        isServicesLoaded.value = true;
        services.value = res.data.services;

        // SET SERVICES LIST TO RENDER
        renderServices.value = servicesSearch();
    }).catch(function (err) {
        console.log(err);
    });
});

const countCountries = ref(0);

// HANDLE FILTER COUNTIES BY SEARCH INPUT
const countrySearch = () => {
    countCountries.value = 0;
    if (search.value.length === 0) return countries.value;

    // RETURNS FOUNDED COUNTRIES AND CHOSEN ONE
    return countries.value.filter(item => {
        const itemNameLower = item.name.toLocaleLowerCase();
        const itemID = item.ID;

        const isMatchSearch = search.value.some((word: string) =>
            (word.toLocaleLowerCase() && itemNameLower.includes(word.toLocaleLowerCase())) ||
            ((word.toLocaleLowerCase() === 'us' || word.toLocaleLowerCase() === 'usa') && itemNameLower.includes('united states')) ||
            ((word.toLocaleLowerCase() === 'uk') && itemNameLower.includes('united kingdom'))
        );

        const isMatchCountryFilter = itemID === countryFilter.value;

        if (search.value.length === 0) return isMatchSearch || isMatchCountryFilter;
        if (isMatchSearch) countCountries.value += 1;
        return isMatchSearch || isMatchCountryFilter;
    });
};

// HANDLE FILTER SERVICES BY SEARCH INPUT
const servicesSearch = () => {
    if (search.value.length === 0) return services.value;

    // RETURNS FOUNDED COUNTRIES
    return services.value.filter(item => {
        const itemNameLower = item.name.toLocaleLowerCase();

        const isMatchSearch = search.value.some((word: string) =>
            word.toLocaleLowerCase() && itemNameLower.includes(word.toLocaleLowerCase())
        );

        if (search.value.length === 0) return isMatchSearch;

        return isMatchSearch;
    });
};

const searchText = ref<string[]>([]);
const searchTextValue = ref<string>('');

// HANDLE SPLIT SEARCH
const splitSearch = (text: string) => {
    searchText.value = text.split(/\s+/).filter(word => word.trim().length > 0);
}

// HANDLE CHANGE INPUT VALUE
const handleChangeSearchText = (e: Event) => {
    const value = (e.target as HTMLInputElement).value;
    searchTextValue.value = value;
    splitSearch(value);
}

// HANDLE CHANGE CHOSEN COUNTRY
watch(countryFilter, (newValue) => {
    isServicesLoaded.value = false;
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getServices?country=${countryFilter.value}`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {
        services.value = res.data.services;
        isServicesLoaded.value = true;
        
        // SET SERVICES LIST TO RENDER
        renderServices.value = servicesSearch();
    }).catch(function (err) {
        console.log(err);
    });
});


// HANDLE CHANGE CHOSEN COUNTRY
const handleCountryFilter = (id: number) => {
    countryFilter.value = id;
    if (window.innerWidth < 850) handleOpenServices();
}

let changeSearch: ReturnType<typeof setTimeout> | undefined;

const search = ref<string[]>([]);

const isLoading = ref(false);

// INPUT VALUE HANDLER
watch(searchText, (newValue) => {
    if (changeSearch) clearTimeout(changeSearch);
    isLoading.value = true;
    changeSearch = setTimeout(() => {
        if (newValue == searchText.value) {
            search.value = newValue;
            isLoading.value = false;
            renderServices.value = servicesSearch();
            renderCountries.value = countrySearch();
        }
    }, 1000);
});

// CART INFO VARIABLE DECLARATION
const isAmountLoading = ref(false);

// HANDLE OPEN SERVICES ON MOBILE
const isServicesOpen = ref(false);

const handleOpenServices = () => {
    isServicesOpen.value = !isServicesOpen.value;
}

// HANDLE OPEN ERROR POPUP
const isErrorPopupOpen = ref(false);

const handleOpenErrorPopup = () => {
    isErrorPopupOpen.value = !isErrorPopupOpen.value;
}

// HANDLE GO REGISTRATION
const registrationRedirect = () => {
    if (DEMO_MODE) {
        router.push('/adminPanel/main');
        return;
    }
    router.push({ name: 'registration' });
}

</script>

<template>
    <div class="page services">
        <AppNav />
        <NavMenu />
        <div class="inner-container">
            <div :class="!isServicesOpen ? 'open' : ''" class="services__left">
                <span class="services__left__title-mobile mobile">Choose the<br />country </span>
                <div class="services__right__search mobile">
                    <div class="services__right__search__top">
                        <input @input="handleChangeSearchText" :value="searchTextValue" :placeholder="placeholderText"
                            type="text" class="services__right__search__top__input" :class="isAnim ? 'anim' : ''">
                    </div>
                </div>
                <div class="services__left__title desktop">
                    <span class="services__left__title__text">Ser<span
                            class="services__left__title__text rotate">vices</span></span>
                </div>
                <div class="services__left__box">
                    <div class="loader-mobile" v-if="!isCountriesLoaded || isLoading">
                        <Loader />
                    </div>
                    <div v-else class="services__left__box__scroll">
                        <div v-for="item in renderCountries" @click="handleCountryFilter(item.ID)"
                            class="services__left__box__el" :class="item.ID === countryFilter ? 'choosen' : ''">
                            <img :src="item.short_name !== 'GP' ? `/img/Flags/${item.short_name}.png` : `/img/Flags/unknown.png`"
                                alt="" class="services__left__box__el__img">
                            <span class="services__left__box__el__title">{{ item.name }}</span>
                            <span class="services__left__box__el__count"></span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="services__right">
                <button @click="handleOpenServices" class="services__left__back-button mobile">
                    <img class="services__left__back-button__img" src="@/assets/svg/Main/Services/backButton.svg" alt="">
                    <span class="services__left__back-button__text">Back</span>
                </button>
                <div class="services__right__search">
                    <div class="services__right__search__top">
                        <input @input="handleChangeSearchText" :value="searchTextValue" :placeholder="placeholderText"
                            type="text" class="services__right__search__top__input" :class="isAnim ? 'anim' : ''">
                        <div class="services__right__search__top__button__box desktop">
                        </div>
                    </div>
                </div>
                <p v-if="DEMO_MODE" class="services__right__demo-notice">
                    Sample service catalog — browsing only. No numbers or SMS are available.
                </p>
                <div class="loader mobile-ver" v-if="!isServicesLoaded || isLoading">
                    <Loader />
                </div>
                <div v-else-if="renderServices.length !== 0" class="services__right__box">
                    <button @click="registrationRedirect" class="services__right__box__buy-button">
                        <span v-if="!DEMO_MODE && isAmountLoading" class="services__right__box__buy-button__price">
                            <LoaderSmall />
                        </span>
                        <span v-else-if="!DEMO_MODE" class="services__right__box__buy-button__price">{{ 0.00
                        }}$</span>
                        <span class="services__right__box__buy-button__text">{{ DEMO_MODE ? 'Admin demo' : 'Buy' }}</span>
                    </button>
                    <div class="services__right__box__scroll">
                        <Service v-for="item in renderServices" :key="item.ID" :name="item.name" :ID="item.ID"
                            :country="countryFilter" :handler="registrationRedirect" />
                    </div>
                </div>
                <NoServicesFound v-else-if="countCountries > 0" />
                <NothingFound v-else />
            </div>
        </div>
    </div>
</template>


<style lang="scss" scoped>
.services {
    &__right__demo-notice {
        padding: 1.2rem 2rem;
        color: var(--color-grey-2);
        font-size: 1.4rem;
        line-height: 1.5;
    }

    height: 100%;
    width: 100%;


    input:focus::placeholder {
        color: transparent;
    }

    @media screen and (max-width: 850px) {
        height: auto;
        grid-template-columns: auto;
        @include width-restriction-old;
    }

    .inner-container {
        @include width-restriction-old;
        display: grid;
        grid-template-columns: 32.5rem auto;
        height: calc(100vh);
        padding: 5rem 8.56rem 0;

        @media only screen and (max-width: 850px) {
            padding: 0 0 100px;
            overflow: visible;
            height: auto;
            grid-template-columns: auto;
        }
    }

    .loader {
        margin-top: auto;
        margin-bottom: auto;

        &.mobile-ver {
            height: 100%;
        }
    }

    .loader-mobile {
        height: 100%;
    }

    &__right {
        padding: 0 3.42rem 8rem 3.42rem;
        grid-template-rows: 12.15rem auto;
        display: grid;
        position: relative;
        overflow: auto;
        margin-right: 1rem;

        @media screen and (max-width: 850px) {
            display: flex;
            flex-direction: column;
        }

        ::v-deep(.nothing) {
            display: flex;
            flex-direction: column;
            align-self: center;
            position: relative;
            gap: 1rem;
            margin-left: auto;
            margin-right: auto;

            @media screen and (max-width: 850px) {
                margin-top: auto;
                margin-bottom: auto;
                overflow: auto;
                padding: 40px 0;
            }

            .nothing__bg {
                position: absolute;

                &.first {
                    height: 5.8rem;
                    width: 5.8rem;
                    top: 80%;
                    right: 15%;

                    @media screen and (max-width: 850px) {
                        top: 110%;
                        right: 0;
                    }
                }

                &.second {
                    height: 2.05rem;
                    width: 2.05rem;
                    top: 130%;
                    right: 40%;
                }
            }

            .nothing__text {
                font-family: 'Rubik';
                font-weight: 700;
                font-size: 5.3rem;
                line-height: 99.5%;
                align-self: center;
                text-transform: uppercase;

                @media screen and (max-width: 850px) {
                    font-size: 55px;
                }

                @media screen and (max-width: 380px) {
                    font-size: 40px;
                }

                &.black {
                    display: inline-block;
                    transform: rotate(5deg);
                    font-weight: 900;
                    background: #C0FB50;
                    padding: 1rem 1.2rem 0.2rem 1rem;

                    @media screen and (max-width: 850px) {
                        padding: 4px 7px 2px 4px;
                    }

                    &>.transform {
                        display: inline-block;
                        transform: rotate(-5deg);
                        color: #000000;
                    }
                }

                &.white {
                    font-weight: 900;
                }
            }

            .nothing__descr {
                font-family: 'Rubik';
                font-weight: 400;
                font-size: 1.56rem;
                line-height: 120%;

                @media screen and (max-width: 850px) {
                    font-size: 16px;
                }

                @media screen and (max-width: 380px) {
                    font-size: 14px;
                }
            }
        }

        &__search {
            padding: 1.71rem 0;
            display: flex;
            flex-direction: column;

            @media screen and (max-width: 850px) {
                margin-top: 50px;
            }

            &__mobile-buttons {
                margin-top: 25px;
                display: flex;
                justify-content: center;
                gap: 15px;
            }

            &__bottom {
                margin-top: 1.54rem;
                display: flex;
                gap: 1rem;

                @media screen and (max-width: 850px) {
                    overflow-x: auto;
                    padding: 2px 0;

                    -ms-overflow-style: none;
                    scrollbar-width: none;

                    &::-webkit-scrollbar {
                        display: none;
                    }
                }

                &__popular-title,
                &__popular-el {
                    font-family: 'Rubik';
                    font-weight: 400;
                    font-size: 1.36rem;
                    display: flex;
                    text-transform: uppercase;
                    color: #7D808C;
                    cursor: default;

                    @media screen and (max-width: 850px) {
                        font-size: 11px;
                        white-space: nowrap;
                    }
                }

                &__popular-el {
                    color: #FFFFFF;
                    cursor: pointer;
                    transition: all .3s;

                    &:hover {
                        opacity: 0.8;
                    }
                }
            }

            &__top {
                display: flex;

                &__input {
                    width: 100%;
                    font-family: 'Rubik';
                    font-weight: 700;
                    font-size: 3.42rem;
                    line-height: 120%;
                    text-transform: uppercase;
                    padding: 1.62rem 0 0.6rem 3.7rem;
                    border-bottom: 1px solid #333333;
                    background-image: url('@/assets/svg/Main/search.svg');
                    background-position: 0 center;
                    background-repeat: no-repeat;
                    background-size: 2.4rem;

                    @media screen and (max-width: 850px) {
                        font-size: 19px;
                    }

                    &.anim {
                        &::placeholder {
                            opacity: 0;
                        }
                    }

                    &::placeholder {
                        color: #333333;
                        opacity: 1;
                        transition: all 1s;
                    }
                }

                &__button {
                    border: 1px solid #7D808C;
                    border-radius: 3px;
                    display: flex;
                    align-items: center;
                    gap: 1.11rem;
                    padding: 1.45rem 4.7rem 1.2rem;

                    @media screen and (max-width: 850px) {
                        border: 1px solid #B8B8B8;
                        border-radius: 8px 8px 29px 8px;
                        padding: 8px 20px;
                    }

                    &.show {
                        z-index: 1000000;
                        position: relative;
                    }

                    &__box {
                        align-self: flex-end;
                        position: relative;

                        &__dropdown {
                            transition: all .3s;
                        }
                    }

                    &:hover {
                        opacity: 0.8;
                    }

                    &__img {
                        height: 1.71rem;
                        width: 1.71rem;

                        @media screen and (max-width: 850px) {
                            width: 20px;
                            height: 20px;
                        }
                    }

                    &__text {
                        white-space: nowrap;
                        font-family: 'Rubik';
                        font-weight: 400;
                        font-size: 1.71rem;
                        line-height: 99.5%;
                        text-transform: uppercase;
                        color: #7D808C;

                        @media screen and (max-width: 850px) {
                            font-size: 15px;
                            color: #FFFFFF;
                            padding-top: 3px;
                        }
                    }
                }
            }
        }

        &__box {
            width: 100%;
            display: flex;

            @media screen and (max-width: 850px) {
                overflow: auto;
            }

            &__scroll {
                width: 100%;
                display: grid;
                grid-auto-rows: 5.56rem;
                position: relative;

                & .service:first-child {
                    border-top: none;
                }

                @media screen and (max-width: 850px) {
                    overflow: auto;
                    padding-bottom: 80px;
                    grid-auto-rows: 55px;
                }
            }

            &__loading {
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background: rgba(15, 15, 15, 0.4);
                z-index: 1000;
            }

            &__buy-button {
                position: fixed;
                bottom: 5.56rem;
                right: 9.5rem;
                width: 16.2rem;
                display: flex;
                align-items: center;
                justify-content: center;
                gap: 1rem;
                padding: 1.36rem 0;
                background: #C0FB50;
                border-radius: 8px 8px 24px 8px;
                z-index: 10;

                &.loading {
                    opacity: 0.8;
                }

                @media screen and (max-width: 850px) {
                    bottom: 75px;
                    right: 22px;
                    padding: 15px 25px;
                    width: auto;
                }

                &__price {
                    font-family: 'Rubik';
                    font-weight: 500;
                    font-size: 1.71rem;
                    line-height: 99.5%;
                    text-align: right;
                    text-transform: uppercase;
                    color: #0F0F0F;
                    opacity: 0.6;

                    @media screen and (max-width: 850px) {
                        font-size: 17px;
                    }
                }

                &__text {
                    font-family: 'Rubik';
                    font-weight: 500;
                    font-size: 1.71rem;
                    line-height: 99.5%;
                    text-transform: uppercase;
                    color: #0F0F0F;

                    @media screen and (max-width: 850px) {
                        font-size: 17px;
                    }
                }
            }

            &__el {
                border-top: 1px solid #333333;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding: 0 2.15rem 0 2.56rem;
                cursor: pointer;
                transition: all .3s;

                @media screen and (max-width: 850px) {
                    padding: 5px;
                }

                &:hover {
                    background-color: #333333;
                }

                &.choosen {
                    background-color: #C0FB50;

                    & span {
                        color: #000000;
                    }
                }

                &__left {
                    display: flex;
                    align-items: center;
                    gap: 1.2rem;

                    &__imgs {
                        padding-right: 1.2rem;
                        border-right: 1px solid #333333;
                        display: flex;
                        align-items: center;

                        @media screen and (max-width: 360px) {
                            display: none;
                        }

                        &__service {
                            height: 3rem;
                            width: 3rem;
                            border-radius: 6px;

                            @media screen and (max-width: 850px) {
                                height: 24px;
                                width: 24px;
                            }
                        }

                        &__country {
                            width: 2rem;
                            height: 1.56rem;
                            margin-left: -0.3rem;
                            border-radius: 3px;

                            @media screen and (max-width: 850px) {
                                height: 15px;
                                width: 21px;
                                margin-left: -3px;
                            }
                        }
                    }

                    &__title {
                        font-family: 'Rubik';
                        font-weight: 500;
                        font-size: 1.71rem;
                        line-height: 0.85rem;
                        text-transform: uppercase;
                        color: #FFFFFF;

                        @media screen and (max-width: 850px) {
                            font-size: 13px;
                        }
                    }
                }

                &__right {
                    display: flex;
                    align-items: center;
                    gap: 1.28rem;

                    &__amount-mobile {
                        background-color: #000000;
                        padding: 7px;
                        border-radius: 8px 8px 20px 8px;

                        &__input {
                            width: 20px;
                            height: 20px;
                            text-align: center;
                            font-family: 'Rubik';
                            font-weight: 500;
                            font-size: 15px;
                            line-height: 99.5%;
                            text-transform: uppercase;
                            color: #FFFFFF;
                        }
                    }

                    &__amount {
                        margin-left: 0.85rem;
                        display: flex;
                        gap: 1.28rem;

                        &__plus,
                        &__minus {
                            height: 2.06rem;
                            width: 2.06rem;

                            svg {
                                height: 2.06rem;
                                width: 2.06rem;
                            }
                        }

                        &__number {
                            width: 3.1rem;
                            text-align: center;
                            font-family: 'Rubik';
                            font-weight: 500;
                            font-size: 1.71rem;
                            line-height: 99.5%;
                            text-transform: uppercase;
                            color: #0F0F0F;
                            padding-bottom: 0.5rem;
                            border-bottom: 2px solid #0F0F0F;
                        }
                    }

                    &__count {
                        font-family: 'Rubik';
                        font-weight: 500;
                        font-size: 1.36;
                        line-height: 99.5%;
                        text-transform: uppercase;
                        color: #7D808C;

                        @media screen and (max-width: 850px) {
                            font-size: 13px;
                        }
                    }

                    &__price {
                        font-family: 'Rubik';
                        font-weight: 500;
                        font-size: 1.71rem;
                        line-height: 99.5%;
                        text-align: right;
                        text-transform: uppercase;
                        color: #FFFFFF;

                        @media screen and (max-width: 850px) {
                            font-size: 13px;
                        }
                    }

                    &__buy-button {
                        background: #C0FB50;
                        border-radius: 8px 8px 20px 8px;
                        display: flex;
                        align-items: center;
                        padding: 1rem;

                        @media screen and (max-width: 850px) {
                            padding: 7px;
                        }

                        &:hover {
                            opacity: 0.8;
                        }

                        &__img {
                            height: 2.05rem;
                            width: 2.05rem;

                            @media screen and (max-width: 850px) {
                                width: 20px;
                                height: 20px;
                            }
                        }
                    }
                }
            }
        }
    }

    &__left {
        overflow: auto;
        height: 100%;
        background: #131313;
        display: grid;
        grid-template-rows: 8.9rem auto;

        @media screen and (max-width: 850px) {
            background: #000000;
            width: 100%;
            z-index: -1;
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            height: 100%;
            border-radius: 0px;
            border: none;
            min-height: 300px;
            opacity: 0;
            transition: opacity .3s;
            padding: 0 calc((100vw - 450px) / 2);

            &.open {
                display: flex;
                flex-direction: column;
                z-index: 9999;
                opacity: 1;
                padding: 5rem 3.42rem 8rem 3.42rem;
            }
        }

        &__search-mobile {
            border: 1px solid #B8B8B8;
            border-radius: 8px 8px 29px 8px;
            width: 100%;
            font-family: 'Rubik';
            font-weight: 500;
            line-height: 99.5%;
            text-transform: uppercase;
            color: #FFFFFF;
            margin-bottom: 30px;

            padding: 1.5rem 4.53rem;

            background-image: url('@/assets/svg/Main/search.svg');
            background-repeat: no-repeat;
            font-size: 17px;
            background-size: 17px;
            background-position: 9px center;

            &::placeholder {
                font-family: 'Rubik';
                font-weight: 500;
                font-size: 17px;
                line-height: 99.5%;
                text-transform: uppercase;
                color: #333333;
            }
        }

        &__back-button {
            align-self: flex-start;
            margin-top: 50px;
            display: flex;
            align-items: center;
            gap: 10px;

            &__text {
                font-family: 'Bison';
                font-weight: 300;
                font-size: 23px;
                line-height: 98%;
                color: #FFFFFF;
            }
        }

        &__title-mobile {
            font-family: 'Rubik';
            font-weight: 900;
            font-size: 31px;
            line-height: 99.5%;
            text-transform: uppercase;
            color: #FFFFFF;
            margin: 25px 0 17px;
        }

        &__title {
            display: flex;
            align-items: center;
            justify-content: center;

            &__text {
                font-family: 'Rubik';
                font-weight: 900;
                font-size: 5.5rem;
                line-height: 99.5%;
                text-transform: uppercase;
                color: #FFFFFF;
                display: flex;
                align-items: center;

                &.rotate {
                    display: inline-block;
                    font-family: 'Rubik';
                    font-weight: 900;
                    font-size: 3.16rem;
                    line-height: 99.5%;
                    text-transform: uppercase;
                    transform: rotate(-3.48deg);
                    margin-left: -1rem;

                    background: #C0FB50;
                    color: #C0FB50;
                    padding: 0.1rem 0.85rem;

                    align-self: flex-start;
                    margin-top: 0.5rem;
                    -webkit-text-stroke: 1.25228px #000000;
                }
            }
        }

        &__box {
            overflow-y: auto;

            @media screen and (max-width: 850px) {
                height: 100%;
            }

            &__scroll {
                display: grid;
                grid-auto-rows: 5.05rem;
                border-top: 1px solid #333333;

                @media screen and (max-width: 850px) {
                    border: none;
                    grid-auto-rows: 60px;
                    padding-bottom: 80px;
                }
            }

            &__el {
                display: flex;
                align-items: center;
                gap: 1rem;
                padding: 0 3rem 0 4.45rem;
                transition: .3s;
                cursor: pointer;

                &:hover {
                    background: #333333;

                    @media screen and (max-width: 850px) {
                        background: #131313;
                    }
                }

                &.choosen {
                    background: #C0FB50;

                    & span {
                        color: #000000;
                    }
                }

                &__img {
                    height: 2.65rem;
                    width: 2.65rem;

                    @media screen and (max-width: 850px) {
                        width: 31px;
                        height: 31px;
                    }
                }

                &__title {
                    font-family: 'Rubik';
                    font-weight: 500;
                    font-size: 1.71rem;
                    line-height: 99.5%;
                    text-transform: capitalize;
                    color: #FFFFFF;

                    @media screen and (max-width: 850px) {
                        font-size: 19px;
                    }
                }

                &__count {
                    margin-left: auto;
                    font-family: 'Rubik';
                    font-weight: 500;
                    font-size: 1.71rem;
                    line-height: 99.5%;
                    text-transform: uppercase;
                    color: #7D808C;

                    @media screen and (max-width: 850px) {
                        font-size: 19px;
                    }
                }
            }
        }
    }
}
</style>