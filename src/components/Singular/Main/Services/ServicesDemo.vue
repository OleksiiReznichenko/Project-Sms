<script setup lang="ts">
import { computed, onMounted, ref, watch } from 'vue';
import { RouterLink } from 'vue-router';
import axios from 'axios';

import googleLogo from '@/assets/svg/Landing/Google.svg';
import discordLogo from '@/assets/svg/Landing/Discord.svg';
import steamLogo from '@/assets/svg/Landing/Steam.svg';
import telegramLogo from '@/assets/svg/AdminPanel/telegram.svg';

interface Country {
    ID: number;
    name: string;
    region: string;
    short_name: string;
}

interface Service {
    ID: number;
    name: string;
}

interface BrandInfo {
    category: string;
    icon?: string;
    initial: string;
}

const brandInfo: Record<string, BrandInfo> = {
    Google: { category: 'Online accounts', icon: googleLogo, initial: 'G' },
    Discord: { category: 'Communities', icon: discordLogo, initial: 'D' },
    Telegram: { category: 'Messaging', icon: telegramLogo, initial: 'T' },
    Instagram: { category: 'Social media', initial: 'IG' },
    Steam: { category: 'Gaming', icon: steamLogo, initial: 'S' },
    WhatsApp: { category: 'Messaging', initial: 'WA' },
    Microsoft: { category: 'Online accounts', initial: 'MS' },
    TikTok: { category: 'Social media', initial: 'TT' }
};

const countries = ref<Country[]>([]);
const services = ref<Service[]>([]);
const selectedCountryId = ref<number>(1);
const selectedServiceId = ref<number | null>(null);
const searchQuery = ref<string>('');
const loadingCountries = ref<boolean>(true);
const loadingServices = ref<boolean>(true);
const loadError = ref<boolean>(false);
let requestId = 0;

const selectedCountry = computed(() =>
    countries.value.find(country => country.ID === selectedCountryId.value)
);

const visibleServices = computed(() => {
    const search = searchQuery.value.trim().toLowerCase();
    return services.value.filter(service =>
        service.name.toLowerCase().includes(search)
    );
});

const selectedService = computed(() =>
    services.value.find(service => service.ID === selectedServiceId.value)
);

const getBrandInfo = (name: string): BrandInfo =>
    brandInfo[name] || { category: 'Sample service', initial: name.slice(0, 2).toUpperCase() };

const loadCountries = async (): Promise<void> => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/getCountries`);
        countries.value = response.data.countries || [];
        if (countries.value.length && !countries.value.some(country => country.ID === selectedCountryId.value)) {
            selectedCountryId.value = countries.value[0].ID;
        }
    } catch (error) {
        loadError.value = true;
        console.error('Could not load demo countries', error);
    } finally {
        loadingCountries.value = false;
    }
};

const loadServices = async (): Promise<void> => {
    const currentRequest = ++requestId;
    loadingServices.value = true;
    loadError.value = false;

    try {
        const response = await axios.get(
            `${import.meta.env.VITE_API_BASE_URL}/getServices?country=${selectedCountryId.value}`
        );
        if (currentRequest !== requestId) return;
        services.value = response.data.services || [];
    } catch (error) {
        if (currentRequest !== requestId) return;
        services.value = [];
        loadError.value = true;
        console.error('Could not load demo services', error);
    } finally {
        if (currentRequest === requestId) loadingServices.value = false;
    }
};

const selectCountry = (id: number): void => {
    if (selectedCountryId.value === id) return;
    selectedCountryId.value = id;
};

const selectService = (id: number): void => {
    selectedServiceId.value = selectedServiceId.value === id ? null : id;
};

watch(selectedCountryId, () => {
    selectedServiceId.value = null;
    loadServices();
});

onMounted(async () => {
    await loadCountries();
    // A country change during loading starts its own services request.
    if (requestId === 0) await loadServices();
});
</script>

<template>
    <section class="demo-services">
        <header class="demo-services__header">
            <div class="demo-services__header-copy">
                <span class="demo-services__eyebrow">QUICK SMS / INTERACTIVE FRONTEND PREVIEW</span>
                <h1 class="demo-services__title">BROWSE <span>SERVICES</span></h1>
                <p class="demo-services__intro">
                    Explore a sample service catalog by country. The listings are fictional,
                    and no phone numbers, SMS messages or purchases are available.
                </p>
            </div>
            <span class="demo-services__read-only">Demo data · Read only</span>
        </header>

        <div class="demo-services__layout">
            <aside class="demo-services__countries" aria-label="Country filter">
                <div class="demo-services__sidebar-heading">
                    <h2>Countries</h2>
                    <span>{{ countries.length }}</span>
                </div>
                <p class="demo-services__sidebar-hint">Choose a location to explore its sample services.</p>

                <div v-if="loadingCountries" class="demo-services__loading">Loading countries…</div>
                <div v-else class="demo-services__country-list">
                    <button
                        v-for="country in countries"
                        :key="country.ID"
                        type="button"
                        class="demo-services__country"
                        :class="{ 'is-active': selectedCountryId === country.ID }"
                        :aria-pressed="selectedCountryId === country.ID"
                        @click="selectCountry(country.ID)"
                    >
                        <img
                            class="demo-services__flag"
                            :src="`/img/Flags/${country.short_name}.png`"
                            alt=""
                        >
                        <span>{{ country.name }}</span>
                        <span class="demo-services__country-arrow" aria-hidden="true">↗</span>
                    </button>
                </div>
            </aside>

            <main class="demo-services__catalog">
                <div class="demo-services__search">
                    <label for="demo-services-search">Find a service</label>
                    <div class="demo-services__search-field">
                        <svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.8">
                            <circle cx="10.8" cy="10.8" r="6.8" />
                            <path d="m16 16 5 5" />
                        </svg>
                        <input
                            id="demo-services-search"
                            v-model="searchQuery"
                            type="search"
                            autocomplete="off"
                            placeholder="Search Google, Discord, Steam..."
                        >
                    </div>
                </div>

                <div class="demo-services__results-heading">
                    <div>
                        <span class="demo-services__results-label">SERVICE DIRECTORY</span>
                        <h2>{{ selectedCountry?.name || 'Sample services' }}</h2>
                    </div>
                    <span class="demo-services__result-count">{{ visibleServices.length }} services</span>
                </div>

                <div v-if="loadingServices" class="demo-services__empty">Loading sample services…</div>
                <div v-else-if="loadError" class="demo-services__empty">
                    Could not load the demo catalog. Refresh to try again.
                </div>
                <div v-else-if="!visibleServices.length" class="demo-services__empty">
                    No services match “{{ searchQuery }}”. Try another search.
                </div>
                <div v-else class="demo-services__cards">
                    <button
                        v-for="service in visibleServices"
                        :key="service.ID"
                        type="button"
                        class="demo-services__card"
                        :class="{ 'is-selected': selectedServiceId === service.ID }"
                        :aria-pressed="selectedServiceId === service.ID"
                        @click="selectService(service.ID)"
                    >
                        <span class="demo-services__brand">
                            <img
                                v-if="getBrandInfo(service.name).icon"
                                :src="getBrandInfo(service.name).icon"
                                alt=""
                            >
                            <svg v-else-if="service.name === 'Instagram'" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                                <rect x="4" y="4" width="24" height="24" rx="7" />
                                <circle cx="16" cy="16" r="5.5" />
                                <circle cx="23.5" cy="8.7" r="1.5" fill="currentColor" stroke="none" />
                            </svg>
                            <svg v-else-if="service.name === 'WhatsApp'" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M7 24 4 29l7-2.2A12 12 0 1 0 6.2 23Z" />
                                <path d="M12 11c1 5 4 8 9 10l2-2-4-2-2 2-4-4 2-2-2-4-1 2Z" />
                            </svg>
                            <svg v-else-if="service.name === 'Microsoft'" viewBox="0 0 32 32" fill="currentColor" aria-hidden="true">
                                <rect x="3" y="3" width="12" height="12" />
                                <rect x="17" y="3" width="12" height="12" />
                                <rect x="3" y="17" width="12" height="12" />
                                <rect x="17" y="17" width="12" height="12" />
                            </svg>
                            <svg v-else-if="service.name === 'TikTok'" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M18 5v17a6 6 0 1 1-6-6" />
                                <path d="M18 5c1 5 4 7 9 7" />
                            </svg>
                            <span v-else>{{ getBrandInfo(service.name).initial }}</span>
                        </span>
                        <span class="demo-services__card-copy">
                            <strong>{{ service.name }}</strong>
                            <small>{{ getBrandInfo(service.name).category }}</small>
                        </span>
                        <span class="demo-services__card-arrow" aria-hidden="true">↗</span>
                    </button>
                </div>

                <div v-if="selectedService" class="demo-services__selection" aria-live="polite">
                    <div>
                        <span class="demo-services__results-label">SELECTED DEMO SERVICE</span>
                        <h3>{{ selectedService.name }} · {{ selectedCountry?.name }}</h3>
                        <p>
                            This is a visual preview of the original catalog interface.
                            Numbers, stock levels, SMS delivery and checkout are not connected.
                        </p>
                    </div>
                    <button
                        type="button"
                        class="demo-services__dismiss"
                        aria-label="Close selected service details"
                        @click="selectedServiceId = null"
                    >
                        ×
                    </button>
                </div>
            </main>
        </div>

        <footer class="demo-services__footer">
            <p>Want to see more of the application? Explore the admin dashboard with fictional data.</p>
            <RouterLink to="/adminPanel/main">Explore admin demo <span aria-hidden="true">↗</span></RouterLink>
        </footer>
    </section>
</template>

<style lang="scss" scoped>
.demo-services {
    width: 100%;
    max-width: 144rem;
    margin: 0 auto;
    padding: 11rem 5rem 8rem;
    font-family: 'Rubik', sans-serif;
    color: var(--color-white);

    &__header {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 3rem;
        margin-bottom: 4rem;
    }

    &__eyebrow,
    &__results-label {
        display: block;
        color: #C0FB50;
        font-size: 1.2rem;
        font-weight: 500;
        letter-spacing: .1em;
    }

    &__title {
        margin: 1.2rem 0;
        font-family: 'Bison', sans-serif;
        font-size: clamp(5rem, 6vw, 8.5rem);
        font-weight: 700;
        line-height: 1;

        span { color: #C0FB50; }
    }

    &__intro {
        max-width: 68rem;
        color: #a6a8ad;
        font-size: 1.55rem;
        line-height: 1.65;
    }

    &__read-only {
        flex-shrink: 0;
        padding: 1rem 1.6rem;
        border: .1rem solid #373737;
        border-radius: .8rem;
        color: #c7c7ca;
        font-size: 1.25rem;
    }

    &__layout {
        display: grid;
        grid-template-columns: 29rem minmax(0, 1fr);
        gap: 2rem;
        align-items: start;
    }

    &__countries,
    &__catalog {
        min-width: 0;
        border: .1rem solid #313131;
        border-radius: 1.4rem;
        background: #141414;
    }

    &__countries { padding: 2.3rem 1.5rem; }

    &__sidebar-heading {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;

        h2 { font-size: 2rem; font-weight: 600; }
        span { color: #8c8e92; font-size: 1.4rem; }
    }

    &__sidebar-hint {
        margin: 1rem 1rem 2.2rem;
        font-size: 1.3rem;
        line-height: 1.5;
        color: #999b9f;
    }

    &__country-list { display: flex; flex-direction: column; gap: .6rem; }

    &__country {
        display: flex;
        align-items: center;
        gap: 1.2rem;
        width: 100%;
        padding: 1.25rem 1.2rem;
        border-radius: .8rem;
        color: #e4e4e6;
        font-size: 1.45rem;
        font-weight: 500;
        text-align: left;
        transition: background .2s, color .2s;
        cursor: pointer;

        &:hover { background: #292929; }

        &.is-active {
            background: #C0FB50;
            color: #101010;
        }

        &-arrow { margin-left: auto; opacity: .65; }
    }

    &__flag { width: 2.6rem; height: 2rem; object-fit: contain; flex-shrink: 0; }

    &__catalog { padding: 2.8rem; }

    &__search {
        label {
            display: block;
            margin-bottom: 1.1rem;
            font-size: 1.3rem;
            font-weight: 500;
            color: #bfc0c2;
        }
    }

    &__search-field {
        display: flex;
        align-items: center;
        gap: 1.3rem;
        padding: 1.35rem 1.6rem;
        background: #0d0d0d;
        border: .1rem solid #3b3b3b;
        border-radius: .9rem;
        transition: border-color .2s;

        &:focus-within { border-color: #C0FB50; }

        svg { width: 2rem; height: 2rem; color: #999b9f; flex-shrink: 0; }
        input {
            width: 100%;
            min-width: 0;
            font-family: inherit;
            font-size: 1.5rem;
            color: #fff;
            background: transparent;
            outline: none;

            &::placeholder { color: #828488; opacity: 1; }
        }
    }

    &__results-heading {
        display: flex;
        justify-content: space-between;
        align-items: flex-end;
        gap: 2rem;
        margin: 3.2rem 0 1.8rem;

        h2 { margin-top: .7rem; font-size: 2.4rem; font-weight: 600; }
    }

    &__result-count { font-size: 1.3rem; color: #a0a2a6; white-space: nowrap; }

    &__cards { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1.2rem; }

    &__card {
        display: flex;
        align-items: center;
        gap: 1.4rem;
        min-width: 0;
        padding: 1.7rem;
        background: #1d1d1d;
        border: .1rem solid #333;
        border-radius: 1rem;
        color: #fff;
        text-align: left;
        cursor: pointer;
        transition: background .2s, border-color .2s, transform .2s;

        &:hover { background: #262626; border-color: #656565; transform: translateY(-.15rem); }
        &.is-selected { border-color: #C0FB50; background: #242b1a; }
    }

    &__brand {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        width: 4.8rem;
        height: 4.8rem;
        border-radius: 1rem;
        background: #C0FB50;
        color: #111;
        font-size: 1.7rem;
        font-weight: 700;

        img, svg { display: block; width: 2.7rem; height: 2.7rem; object-fit: contain; }
    }

    &__card-copy {
        display: flex;
        flex-direction: column;
        min-width: 0;
        gap: .6rem;

        strong { font-size: 1.55rem; font-weight: 600; }
        small { color: #a6a8ad; font-size: 1.25rem; }
    }

    &__card-arrow { margin-left: auto; color: #b5b8b9; font-size: 1.8rem; }

    &__loading,
    &__empty {
        padding: 5rem 2rem;
        color: #b0b2b5;
        text-align: center;
        font-size: 1.5rem;
    }

    &__selection {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        gap: 2rem;
        margin-top: 1.8rem;
        padding: 2rem 2.2rem;
        border: .1rem solid #4a6030;
        border-radius: 1rem;
        background: #1b2414;

        h3 { margin: .8rem 0; font-size: 1.9rem; font-weight: 600; }
        p { color: #bfc4b8; font-size: 1.35rem; line-height: 1.55; }
    }

    &__dismiss {
        width: 3rem;
        height: 3rem;
        flex-shrink: 0;
        color: #ced4c8;
        font-size: 2.4rem;
        cursor: pointer;
    }

    &__footer {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        gap: 2rem;
        margin-top: 2.4rem;
        padding: 2.3rem 2.8rem;
        border: .1rem solid #303030;
        border-radius: 1.2rem;
        background: #111;

        p { color: #a9aaae; font-size: 1.4rem; line-height: 1.5; }
        a { color: #C0FB50; font-size: 1.5rem; font-weight: 600; text-decoration: none; }
        a:hover { text-decoration: underline; }
    }

    button:focus-visible,
    a:focus-visible {
        outline: .2rem solid #C0FB50;
        outline-offset: .3rem;
    }

    @media only screen and (max-width: 850px) {
        padding: 9rem 2.5rem 5rem;

        &__header { align-items: flex-start; margin-bottom: 2.8rem; }
        &__read-only { display: none; }
        &__layout { display: flex; flex-direction: column; }
        &__countries, &__catalog { width: 100%; }
        &__countries { padding: 2rem; }
        &__sidebar-hint { margin-bottom: 1.5rem; }
        &__country-list { flex-direction: row; overflow-x: auto; padding-bottom: .5rem; }
        &__country { width: auto; flex: 0 0 auto; white-space: nowrap; }
        &__country-arrow { display: none; }
        &__catalog { padding: 2.2rem; }
    }

    @media only screen and (max-width: 550px) {
        padding: 8rem 1.5rem 3rem;

        &__title { font-size: 5.2rem; }
        &__intro { font-size: 1.4rem; }
        &__cards { grid-template-columns: minmax(0, 1fr); }
        &__catalog { padding: 1.6rem; }
        &__results-heading { align-items: flex-start; }
        &__results-heading h2 { font-size: 2rem; }
        &__result-count { margin-top: .4rem; }
        &__footer { padding: 2rem; }
    }
}
</style>
