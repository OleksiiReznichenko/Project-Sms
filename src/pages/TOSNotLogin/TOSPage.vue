<script setup lang="ts">
import { onMounted } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';
import TOS from '@/components/Reusable/TOS/TOS.vue';
import AppNav from '@/components/Singular/App/Nav.vue';
import NavMenu from '@/components/Singular/App/NavMenu.vue';
import FAQFooter from '@/components/Singular/Main/FAQFooter.vue';

const router = useRouter();

onMounted(() => {
    // REDIRECT IF LOGGED IN
    axios({
        method: "get",
        url: `${import.meta.env.VITE_API_BASE_URL}/getAccount`,
        // headers: {
        //     "Authorization": `Bearer ${import.meta.env.VITE_TOKEN}`
        // }
        withCredentials: true
    }).then(function (res) {
        if (res.data.account.status === 'admin') {
            router.push({ name: 'adminPanel' });
            return;
        }
        if (res.data.account.status === 'user') {
            router.push({ name: 'TOS' });
            return;
        }
    }).catch(function (err) {
        console.log(err);
    });
});

</script>

<template>
    <div class="tos page">
        <AppNav />
        <NavMenu />
        <div class="inner-container">
            <TOS />
        </div>
        <FAQFooter />
    </div>
</template>

<style lang="scss" scoped>
.tos {
    display: flex;
    flex-direction: column;

    .inner-container {
        @include width-restriction-old;
        display: flex;
        flex-direction: column;
        padding: 8.56rem;
        gap: 3.85rem;
    }

    &__el {
        display: flex;
        flex-direction: column;
        gap: 1.8rem;

        &:last-child {
            padding-bottom: 8.56rem;
        }
    }

    .title {
        font-family: 'Bison';
        font-weight: 300;
        font-size: 8.2rem;
        line-height: 100%;
        text-align: center;
        letter-spacing: -0.05em;
        text-transform: uppercase;
        color: #FFFFFF;
        margin-bottom: 3.42rem;

        @media screen and (max-width: 850px) {
            font-size: 64px;
        }
    }

    .subtitle {
        font-family: 'Bison';
        font-weight: 300;
        font-size: 3rem;
        line-height: 150%;
        color: #FFFFFF;

        @media screen and (max-width: 850px) {
            font-size: 32px;
        }
    }

    .text {
        font-family: 'Rubik';
        font-weight: 350;
        font-size: 1.71rem;
        line-height: 150%;
        color: #FFFFFF;

        @media screen and (max-width: 850px) {
            font-size: 20px;
        }
    }
}
</style>

