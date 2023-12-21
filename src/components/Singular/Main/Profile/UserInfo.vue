<script setup lang="ts">
import { useUserStore } from '@/stores/user';

// DEFINE PROPS
const props = defineProps(["daysAgo"]);

// USER`S STORE
const user = useUserStore();

</script>

<template>
    <div class="info">
        <div class="info__wrapper">
            <div v-if="user.auth && 'telegram' in user.auth" class="info__social desktop">
                <button :class="user.auth?.telegram ? 'active' : ''" class="info__social__el">
                    <svg class="info__social__el__img" viewBox="0 0 24 24" fill="none"
                        xmlns="http://www.w3.org/2000/svg">
                        <g clip-path="url(#clip0_335_3435)">
                            <path
                                d="M12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM8.89 13.17L6.392 12.391C5.852 12.226 5.849 11.854 6.513 11.587L16.246 7.827C16.811 7.597 17.131 7.888 16.948 8.617L15.291 16.437C15.175 16.994 14.84 17.127 14.375 16.87L11.824 14.982L10.635 16.13C10.513 16.248 10.414 16.349 10.226 16.374C10.039 16.4 9.885 16.344 9.772 16.034L8.902 13.163L8.89 13.171V13.17Z"
                                fill="#7D808C" />
                        </g>
                        <defs>
                            <clipPath id="clip0_335_3435">
                                <rect width="24" height="24" fill="white" />
                            </clipPath>
                        </defs>
                    </svg>
                    <span class="info__social__el__text">{{ user.auth?.telegram ?
                        (`@${user.auth?.telegram.username}`) : 'CONNECT' }}</span>
                </button>
            </div>
            <div v-if="user.auth && 'telegram' in user.auth" class="info__social mobile">
                <div class="info__social__scroll">
                    <button :class="user.auth?.telegram ? 'active' : ''" class="info__social__el">
                        <svg class="info__social__el__img" viewBox="0 0 24 24" fill="none"
                            xmlns="http://www.w3.org/2000/svg">
                            <g clip-path="url(#clip0_335_3435)">
                                <path
                                    d="M12 20C14.1217 20 16.1566 19.1571 17.6569 17.6569C19.1571 16.1566 20 14.1217 20 12C20 9.87827 19.1571 7.84344 17.6569 6.34315C16.1566 4.84285 14.1217 4 12 4C9.87827 4 7.84344 4.84285 6.34315 6.34315C4.84285 7.84344 4 9.87827 4 12C4 14.1217 4.84285 16.1566 6.34315 17.6569C7.84344 19.1571 9.87827 20 12 20ZM12 22C6.477 22 2 17.523 2 12C2 6.477 6.477 2 12 2C17.523 2 22 6.477 22 12C22 17.523 17.523 22 12 22ZM8.89 13.17L6.392 12.391C5.852 12.226 5.849 11.854 6.513 11.587L16.246 7.827C16.811 7.597 17.131 7.888 16.948 8.617L15.291 16.437C15.175 16.994 14.84 17.127 14.375 16.87L11.824 14.982L10.635 16.13C10.513 16.248 10.414 16.349 10.226 16.374C10.039 16.4 9.885 16.344 9.772 16.034L8.902 13.163L8.89 13.171V13.17Z"
                                    fill="#7D808C" />
                            </g>
                            <defs>
                                <clipPath id="clip0_335_3435">
                                    <rect width="24" height="24" fill="white" />
                                </clipPath>
                            </defs>
                        </svg>
                        <span class="info__social__el__text">{{ user.auth?.telegram ?
                            (`@${user.auth?.telegram.username}`) : 'CONNECT' }}</span>
                    </button>
                </div>
            </div>
            <span v-if="user.auth && 'email' in user.auth" class="info__username">{{ user.auth?.email.email
            }}</span>
            <span v-else-if="user.auth && 'telegram' in user.auth" class="info__username">{{
                `@${user.auth?.telegram.username}` }}</span>
            <span class="info__account"><span class="info__account grey">id: </span>{{ user.id }}
                &nbsp;&nbsp; <span class="info__account grey">registered: </span>{{ props.daysAgo }} days
                ago</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.info {
    min-width: 0;
    border-bottom: 1px solid #333333;
    border-right: 1px solid #333333;

    @media screen and (max-width: 850px) {
        border-right: none;
        padding-top: 25px;
        margin-right: 20px;
        margin-left: 20px;
    }

    &__account {
        font-family: 'Bison';
        font-weight: 300;
        font-size: 1.71rem;
        line-height: 98%;

        @media screen and (max-width: 850px) {
            font-size: 19px;
            padding-bottom: 25px;
        }

        &.grey {
            color: #7D808C;
        }
    }

    &__wrapper {
        padding: 0 5.15rem;
        display: flex;
        flex-direction: column;
        justify-content: center;
        height: 100%;
        gap: 0.85rem;

        @media screen and (max-width: 850px) {
            padding: 0;
            gap: 10px;
            position: relative;
        }
    }

    &__social {
        margin-top: 1.54rem;
        gap: 1.3rem;
        display: flex;
        align-self: flex-start;
        flex-wrap: wrap;

        @media screen and (max-width: 850px) {
            flex-wrap: nowrap;
        }

        &__scroll {
            overflow-x: auto;
            white-space: nowrap;
            display: flex;
            gap: 20px;
        }

        &__el {
            border: 2px dashed #7D808C;
            border-radius: 30px;
            display: flex;
            gap: 0.85rem;
            padding: 0.5rem 1.71rem;
            align-items: center;

            &:hover {
                background: #333333;
            }

            &.active {
                background: #86FA50;
                border: none;
                cursor: default;

                & svg g path {
                    fill: black;
                }

                & span {
                    color: #000000;
                }
            }

            @media screen and (max-width: 850px) {
                width: 100%;
                justify-content: center;
            }

            &__img {
                height: 2.05rem;
                width: 2.05rem;

                @media screen and (max-width: 850px) {
                    height: 18px;
                    width: 18px;
                }
            }

            &__text {
                font-family: 'Bison';
                font-style: normal;
                font-weight: 300;
                font-size: 1.71rem;
                line-height: 98%;
                color: #FFFFFF;

                @media screen and (max-width: 850px) {
                    font-size: 15px;
                }
            }
        }
    }

    &__username {
        font-family: 'Bison';
        font-weight: 300;
        font-size: 11rem;
        line-height: 98%;
        color: #FFFFFF;
        display: block;
        white-space: nowrap;
        word-wrap: break-word;
        overflow: hidden;
        text-overflow: ellipsis;

        @media screen and (max-width: 1000px) {
            font-size: 9rem;
        }

        @media screen and (max-width: 850px) {
            font-size: 47px;
        }
    }
}
</style>

