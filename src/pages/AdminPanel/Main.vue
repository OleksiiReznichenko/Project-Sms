<script setup lang="ts">
import { onMounted, ref } from 'vue';
import axios from 'axios';
import { useAdminPopularProducts } from '@/stores/AdminPanel/adminMostPopularProducts';
import { useAdminStatistics } from '@/stores/AdminPanel/adminStatistics';
import { useUserStore } from '@/stores/user';
import Graphs from '@/components/Reusable/AdminPanel/Main/Graphs.vue';
import Product from '@/components/Reusable/AdminPanel/Main/Product.vue';
import { storeToRefs } from 'pinia';

// const products = [
//     {
//         name: 'Discord, Russia',
//         price: 12.655,
//         priceDifference: '-269 (-12.2%)'
//     },
//     {
//         name: 'Discord, Russia',
//         price: 12.655,
//         priceDifference: '-269 (-12.2%)'
//     },
//     {
//         name: 'Discord, Russia',
//         price: 12.655,
//         priceDifference: '-269 (-12.2%)'
//     },
// ];
const userStore = useUserStore();
const { auth } = storeToRefs(userStore);

const popularProductsStore = useAdminPopularProducts();

const adminStatistics = useAdminStatistics();
const { profit, sales, accounts } = storeToRefs(adminStatistics);

const isDesktopBig = ref<boolean>(false);

onMounted(() => {

    if (window.outerWidth > 1850) {
        isDesktopBig.value = true;
    }

    // GET MOST POPULAR PRODUCTS
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getMostPopular`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {
        if (res.data.products) {
            popularProductsStore.setPopularProducts(res.data.products);
        }
    }).catch(function (err) {
        console.log(err);
    });

    setTimeout(() => {
        // GET CHARTS
        axios({
            method: "get",
            url: `${import.meta.env.VITE_API_BASE_URL}/getStats/year`,
            // headers: {
            //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
            // }
            withCredentials: true
        }).then(function (res) {
            adminStatistics.setStatistics(
                res.data.profit.value,
                res.data.transactions.value,
                res.data.users.value
            );
        }).catch(function (err) {
            console.log(err);
        });
    }, 100)
})
</script>

<template>
    <div class="page page-admin-main">
        <div class="inner-container">
            <div class="navigation-container">
                <span class="status">Administrator</span>
                <h2 class="title-welcome">
                    <span class="emoji">🔥</span> Welcome
                </h2>
                <!-- <strong class="email">forexample@gmail.com</strong> -->
                <strong class="email">{{ auth?.email?.email || auth?.telegram?.username }}</strong>
                <nav class="navigation-big desktop">
                <ul class="list">
                    <li class="item">
                        <router-link to="/" class="link active">
                            <img src="@/assets/svg/AdminPanel/pageMainIcon.svg" alt="" class="icon">
                            <div class="info">
                                <strong class="bold">Home</strong>
                                </div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link to="/adminPanel/users" class="link">
                                <img src="@/assets/svg/AdminPanel/pageUsersIcon.svg" alt="" class="icon">
                                <div class="info">
                                    <strong class="bold">Users</strong>
                                </div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link to="/adminPanel/announcements" class="link">
                                <img src="@/assets/svg/AdminPanel/pageAnnouncementsIcon.svg" alt="" class="icon">
                                <div class="info">
                                    <strong class="bold">Announcements</strong>
                                </div>
                            </router-link>
                        </li>
                        <li class="item">
                            <router-link to="/adminPanel/coupons" class="link">
                                <img src="@/assets/svg/AdminPanel/pageCouponsIcon.svg" alt="" class="icon">
                                <div class="info">
                                    <strong class="bold">Coupons</strong>
                                </div>
                            </router-link>
                        </li>
                        <!-- <li class="item">
                                <button @click="signout" class="btn-transparent-red button-exit">Exit</button>
                            </li> -->
                    </ul>
                </nav>
            </div>
            <div class="content">
                <div class="main-content">
                    <div class="banner-container">
                        <img src="@/assets/svg/AdminPanel/redDude.svg" alt="" class="dude-red">
                        <img src="@/assets/svg/AdminPanel/greenDude.svg" alt="" class="dude-green">
                        <div class="statistics">
                            <ul class="list">
                                <li class="item">
                                    <span class="subtitle">
                                        Today's <span class="green">Profit</span>
                                    </span>
                                    <strong class="number">
                                        <span class="grey">$</span>{{ profit }}
                                    </strong>
                                </li>
                                <li class="item">
                                    <span class="subtitle">
                                        Sales <span class="green">volume</span>
                                    </span>
                                    <strong class="number">{{ sales }}</strong>
                                </li>
                                <li class="item">
                                    <span class="subtitle">
                                        Created <span class="green">accounts</span>
                                    </span>
                                    <strong class="number">{{ accounts }}</strong>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <Graphs v-if="!isDesktopBig" class="desktop-small" />
                    <div class="products">
                        <div class="info">
                            <h2 class="title">Top {{ popularProductsStore.$state.length || 10 }}</h2>
                            <h4 class="title-small">
                                Best-selling <br>
                                <span class="grey">product{{ popularProductsStore.$state.length === 1 ? '' : 's' }}</span>
                            </h4>
                        </div>
                        <ul class="products-list">
                            <Product v-for="product in popularProductsStore.$state" :key="product.id" :id="product.id"
                                :country="product.country" :service="product.service" :sales="product.sales"
                                :date="product.date" />
                            <!-- <Product 
                                    v-for="(product, i) in products"
                                    :key="i" 
                                    :name="product.name"
                                    :price="product.price"
                                    :price-difference="product.priceDifference"
                                /> -->
                        </ul>
                    </div>
                </div>
                <Graphs v-if="isDesktopBig" class="desktop-big" />
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.page-admin-main {
    min-height: 100%;

    .inner-container {
        min-height: 100%;
        display: flex;

        @media only screen and (max-width: 850px) {
            flex-direction: column;
        }

        .navigation-container {
            padding: 3.1rem;
            border-right: 1px solid var(--color-grey);
            width: 32rem;
            min-height: 100%;

            @media only screen and (max-width: 850px) {
                border-right: none;
                width: auto;
                min-height: auto;
                padding: 0;
                padding-bottom: 1rem;
            }

            .status {
                font-family: Bison;
                color: #0F0F0F;
                background-color: var(--color-green-light);
                padding: .5rem 1.4rem;
                border-radius: 100rem;
                display: inline-block;
                margin-bottom: 1rem;

                @media only screen and (max-width: 850px) {
                    font-size: 16px;
                }
            }

            .title-welcome {
                font-family: Bison;
                font-size: 5.7rem;
                line-height: .95;
                color: var(--color-grey-2);
                margin-bottom: 1.3rem;

                @media only screen and (max-width: 850px) {
                    font-size: 62px;
                }

                .white {
                    color: var(--color-white);
                }

                .emoji {
                    font-size: 3.6rem;
                    display: inline-block;
                    width: 3.3rem;

                    @media only screen and (max-width: 850px) {
                        font-size: 36px;
                        width: 33px;
                    }
                }
            }

            .email {
                font-family: Bison;
                font-size: 1.8rem;
                color: var(--color-grey);
                display: inline-block;
                margin-bottom: 2.3rem;

                @media only screen and (max-width: 850px) {
                    font-size: 16px;
                }
            }

            .navigation-big {

                .list {


                    .item {

                        &:not(:last-of-type) {
                            margin-bottom: 1.4rem;
                        }

                        .link {
                            display: flex;
                            align-items: center;
                            // padding: 1.4rem 2.3rem;
                            padding: 1.8rem 2.3rem;
                            border: 1px solid var(--color-grey-2);
                            border-radius: .3rem;
                            // width: 25.5rem;
                            width: 100%;

                            &:hover {
                                background-color: lighten(#000, 7%);
                            }

                            .icon {
                                width: 4.2rem;
                                margin-right: 1.5rem;
                                filter: brightness(1000%);
                            }

                            .info {
                                display: flex;
                                flex-direction: column;

                                .bold {
                                    font-family: Bison;
                                    font-size: 3rem;
                                }

                                .small-info {
                                    color: var(--color-grey-2);
                                }
                            }
                        }

                        .link.active {
                            background-color: var(--color-green-light) !important;
                            cursor: default;

                            .icon {
                                filter: brightness(0%);
                            }

                            .info {

                                .bold {
                                    color: #0F0F0F;
                                }

                                .small-info {
                                    color: #0F0F0F;
                                }
                            }
                        }
                    }
                }
            }
        }

        .content {
            padding: 2.8rem;
            flex-grow: 1;
            display: flex;

            @media only screen and (max-width: 850px) {
                padding: 0;
            }

            .main-content {
                width: 60%;
                padding-right: 2.8rem;

                @media only screen and (max-width: 1850px) {
                    width: 100%;
                    padding-right: 0;
                }

                .banner-container {
                    width: 100%;
                    background-image: url(@/assets/img/AdminPanel/bannerBackgroundPageMain.png);
                    background-size: cover;
                    background-repeat: no-repeat;
                    padding: 2.7rem;
                    position: relative;
                    overflow: hidden;
                    margin-bottom: 3.1rem;

                    .dude-red {
                        position: absolute;
                        height: 110%;
                        bottom: 0;
                        left: -10rem;

                        @media only screen and (max-width: 1850px) {
                            left: -2rem;
                            height: 115%;
                        }

                        @media only screen and (max-width: 1100px) {
                            height: 85%;
                        }

                        @media only screen and (max-width: 400px) {
                            left: -4rem;
                        }
                    }

                    .dude-green {
                        position: absolute;
                        bottom: 0;
                        left: 5rem;
                        width: 26rem;

                        @media only screen and (max-width: 1850px) {
                            left: 15%;
                        }

                        @media only screen and (max-width: 1100px) {
                            width: 18rem;
                        }

                        @media only screen and (max-width: 400px) {
                            left: 8%;
                        }
                    }

                    .statistics {
                        position: relative;
                        z-index: 100;
                        display: flex;
                        align-items: center;
                        justify-content: flex-end;
                        width: 100%;

                        @media only screen and (max-width: 1850px) {
                            padding-right: 10%;
                        }

                        @media only screen and (max-width: 1000px) {
                            padding-right: 0;
                        }

                        .list {


                            .item {
                                width: 23rem;
                                padding: 2.1rem 2.4rem;
                                border: 1px solid var(--color-grey);
                                border-radius: .5rem;
                                display: flex;
                                flex-direction: column;

                                @media only screen and (max-width: 1000px) {
                                    width: 19rem;
                                    padding: 1.5rem 2rem;
                                }

                                @media only screen and (max-width: 850px) {
                                    width: 160px;
                                }


                                &:not(:last-of-type) {
                                    margin-bottom: 1.3rem;
                                }

                                .subtitle {
                                    font-size: 1.8rem;
                                    color: var(--color-grey-2);

                                    @media only screen and (max-width: 850px) {
                                        font-size: 15px;
                                    }

                                    .green {
                                        color: var(--color-green-light);
                                    }
                                }

                                .number {
                                    font-family: Bison;
                                    font-size: 3.6rem;

                                    @media only screen and (max-width: 850px) {
                                        font-size: 32px;
                                    }

                                    .grey {
                                        color: var(--color-grey-2);
                                    }
                                }
                            }
                        }
                    }
                }

                .products {


                    .info {
                        display: flex;
                        align-items: center;
                        font-family: Bison;
                        line-height: .95;
                        margin-bottom: 2.2rem;

                        .title {
                            font-size: 7rem;
                            margin-right: 1.9rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 47px;
                            }
                        }

                        .title-small {
                            font-size: 3.2rem;

                            @media only screen and (max-width: 850px) {
                                font-size: 22px;
                            }

                            .grey {
                                color: var(--color-grey-2);
                            }
                        }
                    }

                    .products-list {}
                }
            }

            .desktop-big {
                @media only screen and (max-width: 1850px) {
                    display: none;
                }
            }

            .desktop-small {
                @media only screen and (min-width: 1850px) {
                    display: none;
                }
            }
        }
    }
}
</style>