<script setup lang="ts">

</script>

<template>
    <div class="confirm">
        <h2 class="confirm__title">Confirm the action by email</h2>
    </div>
</template>


<style lang="scss" scoped>
.confirm {
    display: flex;
    flex-direction: column;
    width: 100%;

    &__title {
        margin: 4.88rem 0 2.15rem;
        font-family: 'Rubik';
        font-weight: 900;
        font-size: 5.5rem;
        line-height: 99.5%;
        text-transform: uppercase;
        color: #FFFFFF;

        @media screen and (max-width: 1150px) {
            font-size: 5rem;
        }

        @media screen and (max-width: 1000px) {
            font-size: 4rem;
        }

        @media screen and (max-width: 850px) {
            font-size: 31px;
            margin: 4rem 0 1rem;
        }
    }
}
</style>