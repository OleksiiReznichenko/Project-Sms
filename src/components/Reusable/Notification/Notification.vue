<script setup lang="ts">

// DEFINE PROPS
const props = defineProps(['item', 'handler']);

</script>

<template>
    <div class="notification">
        <button @click="() => props.handler(props.item.id)" class="notification__close">
            <img src="@/assets/svg/Notifications/closeNotification.svg" alt="" class="notification__close__img">
        </button>
        <div class="notification__wrapper">
            <span class="notification__time">{{ new Date(props.item.date).toLocaleString() }}</span>
            <span class="notification__info">{{ props.item.message }}</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
.notification {
    position: relative;
    background: #1C1C1C;
    border: 1px solid #333333;
    border-radius: 6px;
    width: 100%;

    &__wrapper {
        display: flex;
        flex-direction: column;
        widows: 100%;
        gap: 0.5rem;
        padding: 1.71rem 2.05rem;
    }

    &__close {
        position: absolute;
        top: 1.71rem;
        right: 1.71rem;
        width: 2.05rem;
        height: 2.05rem;

        &:hover {
            opacity: 0.8;
        }

        &__img {
            width: 2.05rem;
            height: 2.05rem;
        }
    }

    &.new {
        border-color: #C0FB50;
    }

    &__time {
        font-family: 'Rubik';
        font-style: normal;
        font-weight: 300;
        font-size: 1.28rem;
        line-height: 1.28rem;
        color: #FFFFFF;
    }

    &__info {
        font-family: 'Bison';
        font-style: normal;
        font-weight: 300;
        font-size: 2.05rem;
        line-height: 2.5rem;
        color: #FFFFFF;

        &.green {
            color: #C0FB50;
        }

        &.grey {
            color: rgba(195, 195, 195, 1);
        }
    }
}
</style>

