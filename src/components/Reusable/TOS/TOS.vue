<script setup lang="ts">

</script>

<template>
    <h2 class="title">Terms of service</h2>
    <div class="tos__el">
        <p class="text">
            These Terms of Service (“Terms”) govern your access and use of the services offered by DigiProxy.CC
            (“Services”). These Terms are a legal agreement between you and DigiProxy.CC, and you must agree to them
            before using the Services.
            <br /><br />
            Please read these Terms carefully before accessing or using the Services. By accessing or using any of the
            Services, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or
            use the Services.
        </p>
    </div>
    <div class="tos__el">
        <span class="subtitle">Description of Services</span>
        <p class="text">The Services offered by DigiProxy.CC include the sale of Residential, Datacenter, and Sneaker
            proxies for use in various applications.</p>
    </div>
    <div class="tos__el">
        <span class="subtitle">Payment</span>
        <p class="text">You shall pay all applicable fees for the Services in accordance with the payment terms provided
            at the time of purchase. If you fail to pay any applicable fees, DigiProxy.CC reserves the right to suspend
            or terminate your access to the Services.</p>
    </div>
    <div class="tos__el">
        <span class="subtitle">Liability</span>
        <p class="text">DigiProxy.CC will not be held liable for any action taken by users of the Services. You agree to
            indemnify, hold harmless, and defend DigiProxy.CC from any and all claims, damages, losses, and expenses,
            including reasonable attorneys’ fees, arising out of or related to your use of the Services.</p>
    </div>
    <div class="tos__el">
        <span class="subtitle">Termination</span>
        <p class="text">DigiProxy.CC may terminate or suspend your access to the Services at any time, for any reason,
            and without notice.</p>
    </div>
    <div class="tos__el">
        <span class="subtitle">Contact Information</span>
        <p class="text">Any questions or concerns about these Terms or the Services should be addressed to
            Digienterprise@protonmail.com.</p>
    </div>
    <div class="tos__el">
        <span class="subtitle">Entire Agreement</span>
        <p class="text">These Terms constitute the entire agreement between you and DigiProxy.CC regarding the Services.
            If any portion of these Terms is found to be unenforceable, the remaining portions will remain in full force
            and effect.Changes to These Terms</p>
        <p class="text">DigiProxy.CC reserves the right to modify these Terms at any time. Any changes to these Terms
            will be posted on the DigiProxy.CC website and will become effective immediately upon posting. Your
            continued use of the Services constitutes acceptance of any such changes.</p>
    </div>
    <div class="tos__el">
        <span class="subtitle">Governing Law</span>
        <p class="text">These Terms shall be governed in accordance with the laws of the United States.</p>
    </div>
    <div class="tos__el">
        <span class="subtitle">Severability</span>
        <p class="text">If any provision of these Terms is held to be invalid or unenforceable, the remaining provisions
            shall remain in full force and effect.</p>
    </div>
</template>


<style lang="scss" scoped>
.tos {
    &__el {
        gap: 1.8rem;
        display: flex;
        flex-direction: column;

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