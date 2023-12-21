<script setup lang="ts">

interface Props {
    id: number | string;
    status: 'user' | 'admin' | 'banned';
    email: string | null;
    balance: number | string;
    referral: {
        link: string;
        uses: number;
        discount: number;
    } | null;
    date: number | string;
    stats?: {
        active: number;
        total: number;
    };
}

const formattedDate = (): string => {
    const dateObj = new Date(+props.date);
    const year = dateObj.getUTCFullYear();
    const monthNumber = dateObj.getMonth();
    const day = dateObj.getDate();
    // const hours = dateObj.getHours();
    // const minutes = dateObj.getMinutes();
    // let minutesFormatted: number | string = minutes;

    // if (minutes < 10) {
    //     minutesFormatted = '0' + minutes;
    // }

    const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'June',
        'July',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec'
    ]

    const month = months[monthNumber];
    
    return `${day} ${month} ${year}`;
};

const formattedDateGrey = (): string => {
    const dateObj = new Date(+props.date);
    const hours = dateObj.getHours();
    const minutes = dateObj.getMinutes();
    let minutesFormatted: number | string = minutes;

    if (minutes < 10) {
        minutesFormatted = '0' + minutes;
    }
    
    return `${hours}:${minutesFormatted}`;
};

const props = defineProps<Props>();
</script>

<template>
    <div class="user-line">
        <div class="inner-line-container desktop">
            <div class="column first">{{ id }}</div>
            <div class="column second">{{ email }}</div>
            <div class="column third">
                <span class="grey">$</span>{{ balance }}
            </div>
            <div class="column fourth">
                {{ formattedDate() }} 
                <span class="grey">{{ formattedDateGrey() }}</span>
            </div>
            <div class="column fifth">{{ stats?.active ?? 0 }}</div>
            <div class="column sixth">{{ stats?.total ?? 0 }}</div>
            <div class="column seventh">
                <router-link :to="'/adminPanel/users/' + id" class="user-link">
                    <img src="@/assets/svg/AdminPanel/userIcon.svg" alt="" class="icon">
                </router-link>
            </div>
        </div>
        <div class="mobile-lines-container mobile">
            <div class="line first">
                <div class="column">
                    <span class="subtitle">Id</span>
                    <strong class="value">{{ id }}</strong>
                </div>
                <div class="column">
                    <span class="subtitle">Email</span>
                    <strong class="value">{{ email }}</strong>
                </div>
            </div>
            <div class="line second">
                <div class="column">
                    <span class="subtitle">Amount</span>
                    <strong class="value">${{ balance }}</strong>
                </div>
                <div class="column">
                    <span class="subtitle">Registration</span>
                    <strong class="value">
                        {{ formattedDate() }} 
                        <span class="">{{ formattedDateGrey() }}</span>
                    </strong>
                </div>
            </div>
            <div class="line third">
                <div class="column">
                    <span class="subtitle">Active</span>
                    <strong class="value">{{ stats?.active ?? 0 }}</strong>
                </div>
                <div class="column">
                    <span class="subtitle">Purchased</span>
                    <strong class="value">{{ stats?.total ?? 0 }}</strong>
                </div>
            </div>
            <div class="buttons">
                <router-link :to="'/adminPanel/users/' + id" class="user-link">
                    <img src="@/assets/svg/AdminPanel/userIcon.svg" alt="" class="icon">
                </router-link>
            </div>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.inner-line-container {
    display: flex;
    align-items: center;
    justify-content: space-between;
    // font-size: 1.8rem;
    font-weight: 500;
    border-bottom: 1px solid var(--color-grey);
    padding: 1rem 0;

    .column {
        text-align: center;

        @media only screen and (max-width: 1200px) {
            font-size: 1.5rem;
        }
        
        &:not(:last-of-type) {
            margin-right: 1rem;
        }

        .grey {
            color: var(--color-grey-2);
        }

        

        &.first {
            width: 13%;
            overflow: hidden;
            text-overflow: ellipsis;
            padding-left: .5rem;

            @media only screen and (max-width: 1000px) {
                padding-left: 15px;
            }
        }

        &.second {
            width: 25%;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        &.third {
            width: 13%;
        }

        &.fourth {
            width: 19%;
        }

        &.fifth {
            width: 10%;
        }

        &.sixth {
            width: 10%;
        }

        &.seventh {
            width: 10%;

            .user-link {
                width: 2.3rem;

                &:hover {
                    // filter: brightness(140%);
                }

                .icon {
                    width: 100%;
                }
            }
        }
    }
}

.mobile-lines-container {
    width: 50rem;
    margin: 0 auto;
    border: 1px solid var(--color-grey);
    margin-bottom: 15px;
    padding: 20px 0;

    @media only screen and (max-width: 600px) {
        width: 43rem;
    }

    .line {
        display: flex;
        padding: 0 20px;

        .grey {
            color: var(--color-grey-2);
        }

        &.first {
            margin-bottom: 20px;

            .column {
                max-width: 42%;

                .value {
                    max-width: 100%;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
            }
        }

        &.second {
            margin-bottom: 20px;
        }

        &.third {
            padding-bottom: 20px;
            margin-bottom: 15px;
            border-bottom: 1px solid var(--color-grey);
        }

        .column {
            display: flex;
            flex-direction: column;

            &:not(:last-of-type) {
                margin-right: 25px;
            }

            .subtitle {
                font-family: Bison;
                font-size: 16px;
                color: var(--color-grey-2);
                display: inline-block;
                margin-bottom: 3px;
            }

            .value {
                font-weight: 500;
                font-size: 16px;
            }
        }
    }

    .buttons {
        display: flex;
        align-items: center;
        justify-content: center;

        .user-link {


            .icon {
                filter: brightness(1400%);
            }
        }
    }
}
</style>