<script setup lang="ts">
import { ref } from 'vue';
import FAQFooter from '@/components/Singular/Main/FAQFooter.vue';
import Question from '@/components/Reusable/Main/FAQ/Question.vue';
import { useSlideFunctionsStore } from '@/stores/slideFunctions';

// FAQ DATA
const data = ref([
    {
        id: 1,
        question: 'Do you have toll-free numbers?',
        answer: 'We do not provide such a service.  All our numbers are paid so they are completely private.',
        isActive: false
    },
    {
        id: 2,
        question: 'Where do you get the numbers?',
        answer: 'Most phone numbers are taken from real SIM cards, not virtual or VoIP numbers. As a result, you will be able to verify almost any service, even those that do not accept virtual numbers, such as Google or Whatsapp. We work with partners who provide numbers and support real people who receive commissions from keeping these numbers active.',
        isActive: false
    },
    {
        id: 3,
        question: 'How long are the numbers active?',
        answer: 'You usually have 20 minutes to confirm your service after requesting a number. In some cases, it may take 5-10 minutes. The verification will be interrupted if you do not receive the code during this time. The payment is canceled if the SMS message is not received. You only pay for successful activations.',
        isActive: false
    },
    {
        id: 4,
        question: 'Can I use the same number again?',
        answer: 'No, we only offer one-time numbers. You will no longer be able to access the number after receiving an SMS message.',
        isActive: false
    },
]);

const slide = useSlideFunctionsStore();

// HANDLE OPEN QUESTION ANIMATION
const slideToggle = (e: Event, duration = 500): void => {
    const parent = (e.target as HTMLElement).closest('.question') as HTMLElement;
    if (!parent.classList.contains('animating')) {
        const target = parent.querySelector('.question__answer') as HTMLElement;
        const question = parent.querySelector('.question__box') as HTMLElement;
        const arrowDesktop = parent.querySelector('.question__box__img.desktop') as HTMLElement;
        const arrowMobile = parent.querySelector('.question__box__img.mobile') as HTMLElement;

        arrowDesktop.classList.toggle('active');
        arrowMobile.classList.toggle('active');
        question.classList.toggle('active');

        if (window.getComputedStyle(target).display === 'none') {
            slide.slideDown(target, duration);
        } else {
            slide.slideUp(target, duration);
        }

        parent.classList.add('animating');

        setTimeout(() => {
            parent.classList.remove('animating');
        }, duration);
    }
}

</script>

<template>
    <div class="FAQ">
        <div class="inner-container">
            <div @click="e => slideToggle(e)" class="FAQ__box">
                <h2 class="FAQ__box__title mobile">Guideline</h2>
                <Question v-for="item in data" :item="item" />
            </div>
        </div>
        <FAQFooter />
    </div>
</template>


<style lang="scss" scoped>
.FAQ {
    height: 100%;
    width: 100%;
    overflow-x: hidden;

    @media only screen and (max-width: 850px) {
        margin: 0;
    }

    &__box {
        display: flex;
        flex-direction: column;
        width: 100%;

        &__title {
            margin-top: 80px;
            font-family: 'Rubik';
            font-weight: 900;
            font-size: 47px;
            line-height: 99.5%;
            align-items: center;
            text-align: center;
            color: #FFFFFF;
            text-transform: uppercase;
            padding-bottom: 20px;
            border-bottom: 1px solid #333333;
        }
    }

    .inner-container {
        @include width-restriction-old;
        padding: 3.42rem 6rem;
        min-height: calc(100vh - 6rem - 3.5rem * 2);
        width: 100%;

        @media only screen and (max-width: 850px) {
            padding: 0 0 100px;
            overflow: visible;
            height: auto;
        }
    }
}
</style>