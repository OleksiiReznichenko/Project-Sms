<script setup lang="ts">


interface Props {
    // name: string;
    // price: number;
    // priceDifference: string;
    id: number | string;
    country: {
        ID: number | string;
        name: string;
        short_name: string;
        region: string;
    };
    service: {
        ID: number | string;
        name: string;
    };
    sales: number;
    date: null | string | number;
}

const props = defineProps<Props>();
</script>

<template>
    <li class="product">
        <div class="left">
            <div class="icon-container">
                <span class="icon">{{ service.name[0] }}</span>
            </div>
            <div class="name-country">{{ service.name }}, {{ country.name }}</div>
        </div>
        <div class="price-info">
            <div class="prices">
                <span class="price">Sales: {{ sales }}</span>
                <!-- <span class="price-difference">{{ priceDifference }}</span> -->
            </div>
            <!-- <img src="@/assets/svg/AdminPanel/arrowLongRed.svg" alt="" class="icon"> -->
        </div>
    </li>
</template>

<style lang="scss" scoped>
.product {
    border-top: 1px solid var(--color-grey);
    padding: 1.4rem 2.2rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 8%;

    @media only screen and (max-width: 850px) {
        padding: 1.4rem 2.2rem;
    }

    @media only screen and (max-width: 450px) {
        padding: 1.4rem 1.1rem;
    }

    .left {
        display: flex;
        align-items: center;

        .icon-container {
            display: flex;
            align-items: center;
            padding-right: 1.3rem;
            margin-right: 1.3rem;
            border-right: 1px solid var(--color-grey);

            @media only screen and (max-width: 850px) {
                border-right: none;
                padding-right: 0;
                margin-right: 10px;
            }
            
            .icon {
                height: 3rem;
                width: 3rem;
                border-radius: 6px;
                background: #C0FB50;
                font-family: 'Rubik';
                font-weight: 500;
                font-size: 1.71rem;
                line-height: 0.85rem;
                text-transform: uppercase;
                color: #000000;
                display: flex;
                align-items: center;
                justify-content: center;

                @media screen and (max-width: 850px) {
                    height: 24px;
                    width: 24px;
                }
            }
        }
        .name {
            font-size: 1.8rem;
            font-weight: 500;
            text-transform: uppercase;
            padding-left: 1.3rem;

            @media only screen and (max-width: 850px) {
                font-size: 14px;
            }
        }
    }

    .price-info {
        display: flex;
        align-items: center;

        .prices {
            display: flex;
            align-items: center;
            font-size: 1.8rem;
            font-weight: 500;
            margin-right: 1.6rem;

            @media only screen and (max-width: 1000px) {
                flex-direction: column;
                align-items: flex-end;
            }

            @media only screen and (max-width: 850px) {
                font-size: 14px;
            }

            
            .price {
                
            }

            .price-difference {
                color: var(--color-red);
            }
        }

        .icon {
            width: 1.3rem;

            @media only screen and (max-width: 1000px) {
                width: 12px;
            }
        }
    }
}
</style>