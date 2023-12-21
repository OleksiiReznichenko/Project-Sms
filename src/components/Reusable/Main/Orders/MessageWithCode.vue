<script setup lang="ts">

// DEFINE PROPS
const props = defineProps(["currentTime", "handleResendCode", "sms"]);

</script>

<template>
    <div class="message">
        <div class="message__wrapper">
            <span class="message__code">Your code: <span
                    class="message__code white">{{ props.sms }}</span></span>
            <span v-if="props.currentTime !== 0" class="message__code__text">If something went
                wrong, you
                can <button @click="props.handleResendCode"
                    class="message__code__text button">resend</button>
                code</span>
        </div>
    </div>
</template>

<style lang="scss" scoped>
</style>

