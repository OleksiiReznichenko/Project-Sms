<script setup lang="ts">
import { onMounted, onUnmounted, ref, watch } from 'vue';
import { RouterView, useRoute, useRouter } from 'vue-router';
import AppNav from '@/components/Singular/App/Nav.vue';
import NavMenu from '@/components/Singular/App/NavMenu.vue';
import Preloader from '@/components/Singular/App/Preloader.vue';

const html = ref<null | HTMLElement>(null)

const route = useRoute();
const router = useRouter();

const appMountedIndicator = ref<boolean>(false);

// IF TOUCHPAD DEVICE'S HEIGHT CHANGES - CHANGE BASE 100VH HEIGHT
const appHeight = (): void => {
    const doc = document.documentElement;
    // if (window.outerWidth < 1000) {
    //     doc.style.setProperty('--app-height', `${window.innerHeight * 1.05}px`);
    // } else {
    doc.style.setProperty('--app-height', `${window.innerHeight}px`);
    // }
};

// ON WINDOW RESIZE
const onResize = (): void => {
  appHeight();
};

watch(route, (newValue) => {
  if (appMountedIndicator.value && 
  (route.name === 'home')
  ) {
    // location.reload();
    router.go(0)
  }
})


onMounted(() => {
  html.value = document.querySelector('html');
  appHeight();

  setTimeout(() => {
    appMountedIndicator.value = true;
  }, 2000);
  
  // ADD WINDOW EVENT LISTENER
  window.addEventListener('resize', onResize);
})

onUnmounted(() => {
  // REMOVE WINDOW EVENT LISTENER
  window.removeEventListener('resize', onResize);
})


</script>

<template>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <component :is="Component" />
    </Transition>
  </router-view>
  <Preloader />
  <!-- <AppNav v-if="route.name === 'home'" />
  <NavMenu v-if="route.name === 'home'" /> -->
</template>

<style lang="scss">
.desktop {
  @media only screen and (max-width: 850px) {
    display: none !important;
  }
}

.mobile {
  @media only screen and (min-width: 850px) {
    display: none !important;
  }
}

.closed {
  opacity: 0;
  visibility: hidden;
  pointer-events: none !important;
}

.section {
  position: relative;
  width: 100%;
  height: 100vh;
}

.dropdown {
  transition: all .3s;
  box-shadow: 0 0 20px rgba(0, 0, 0, .2);
  z-index: 150000;
}

.layout-admin-panel {
  
      
    .input-container {
        position: relative;

        input {
            padding: 2.15rem 2.2rem .4rem;
            border: 1px solid var(--color-grey-2);
            border-radius: .6rem;
            width: 100%;
            font-size: 1.8rem;

            @media only screen and (max-width: 850px) {
                font-size: 20px;
                padding: 25px 25px 5px;
            }
        }

        .subtitle {
            position: absolute;
            left: 2.2rem;
            top: .6rem;
            font-size: 1.4rem;
            color: var(--color-grey-2);

            @media only screen and (max-width: 850px) {
                font-size: 14px;
                left: 25px !important;
            }
        }
    }

    .admin-loader {
      @include abs-center;
      transform: translate(-50%, -50%) scale(2.4);
    }
}

.popup-admin {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 10000;
  background-color: rgba(#000, .8);
  backdrop-filter: blur(5px);
  @include flex-center;
  transition: all .3s;

  .popup-content {
    background-color: #151515;
    border: 1px solid var(--color-grey);
    border-radius: .8rem;
    width: 51rem;
    height: 56rem;
    max-height: 90%;
    max-width: 93%;
    position: relative;
    padding: 3.5rem;

    .button-close {
      position: absolute;
      top: 3.4rem;
      right: 3.4rem;
      width: 4rem;
      height: 4rem;
      @include flex-center;

      .cross {
        width: 2rem;
        height: 2rem;
      }
    }
  }

  &.popup-sure {


    .popup-content {
        @include flex-center;
        justify-content: flex-start;

        .info {
            width: 90%;

            .title {
                font-family: Bison;
                font-size: 5.6rem;
                line-height: 1;
                margin-bottom: 3.2rem;
            }

            .buttons {
                display: flex;

                button {
                    font-size: 2rem;
                    width: 15rem;
                    padding: .9rem;

                    &:not(:last-of-type) {
                        margin-right: 1.3rem;
                    }
                }
            }
        }
    }
  }
}

.iziToast-wrapper {
  border-radius: 4rem !important;
  overflow: hidden !important;
  align-items: center !important;
  justify-content: flex-end !important;
  text-align: right !important;

  @media only screen and (max-width: 850px) {
    justify-content: center !important;
    text-align: center !important;
  }
}

.iziToast-capsule {
  border-radius: 4rem !important;
  overflow: hidden !important;
}

.iziToast-icon {
  display: inline-block !important;
  margin: 0 !important;
  margin-right: 13rem !important;
  top: 50% !important;
  left: -3rem !important;
  transform: translateY(-50%) !important;

  @media only screen and (max-width: 1000px) {
    top: 52% !important;
  }
}

.iziToast-close {
  padding: 3rem 3rem 2rem !important;
  top: 0;
  right: 0;
  background-image: url(@/assets/svg/crossWithCircle.svg) !important;
  background-size: 20px !important;
  opacity: 1 !important;
}

.iziToast-texts {
  margin: 0 !important;
  margin-right: 6rem !important;
  padding: 2rem 1.5rem 2rem 2.5rem !important;
  border-top-left-radius: 100rem !important;
  border-bottom-left-radius: 100rem !important;

  @media only screen and (max-width: 1200px) {
    padding: 2.25rem 1.5rem 2.25rem 2.5rem !important;
  }

  @media only screen and (max-width: 1100px) {
    padding: 2.35rem 1.75rem 2.35rem 2.5rem !important;
  }

  @media only screen and (max-width: 900px) {
    padding: 2.5rem 1.5rem 2rem 2.5rem !important;
  }

  @media only screen and (max-width: 850px) {
    padding: 2.35rem 1.25rem 2rem 2.5rem !important;
  }

  .iziToast-message {
    margin: 0 !important;
  }
}

.iziToast {
    box-sizing: border-box !important;
    backdrop-filter: blur(8px) !important;
    overflow: hidden !important;
    border-radius: 4rem !important;
    box-shadow: none !important;
    margin: .5rem 0 !important;
    max-width: 95% !important;
    width: auto !important;
    padding: 0 !important;
    padding-left: 3rem !important;

    &.success {
        background: rgba(#2EB358, 0.5) !important;

        .iziToast-texts {
          background: rgba(#2EB358, 0.5) !important;
        }

        .iziToast-close {
          background-color: rgba(#2EB358, 0.5) !important;
        }
    }

    &.warning {
        background: rgba(#eb854b, 0.5) !important;

        .iziToast-texts {
          background: #be622e !important;
        }

        .iziToast-close {
          background-color: #be622e !important;
        }
    }

    &.error {
        background: rgba(#c64e54, 0.5) !important;

        .iziToast-texts {
          background: #b33539 !important;
        }

        .iziToast-close {
          background-color: #b33539 !important;
        }
    }

    & > .iziToast-body .iziToast-message {
        font-family: Rubik !important;
        font-weight: 500 !important;
        text-transform: uppercase !important;
        font-size: 1.6rem !important;
        color: #FFFFFF !important;
    
        @media only screen and (max-width: 850px) {
          font-size: 2rem !important;
        }
    }
}

.btn-green,
.btn-green-rounded {
  background-color: var(--color-green-light);
  color: var(--color-black);
  border-radius: 2.5rem;
  padding: 1.25rem 4rem;
  text-align: center;
  font-family: Bison;

  &:hover {
    background-color: darken(#C0FB50, 20%);
  }
}

.btn-red,
.btn-red-rounded {
  background-color: var(--color-red);
  color: var(--color-black);
  border-radius: 2.5rem;
  padding: 1.25rem 4rem;
  text-align: center;
  font-family: Bison;

  &:hover {
    background-color: darken(#C04A4A, 10%);
  }
}

.btn-black {
  background-color: var(--color-black);
  color: var(--color-green-light);
  border-radius: 2.5rem;
  padding: 1.25rem 4rem;
  text-align: center;
  font-family: Bison;

  &:hover {
    background-color: lighten(#000, 18%);
  }
}

.btn-grey,
.btn-grey-rounded {
  background-color: var(--color-black);
  color: var(--color-grey);
  border-radius: 2.5rem;
  padding: 1.25rem 4rem;
  text-align: center;
  font-family: Bison;
}

.btn-transparent-green,
.btn-transparent-green-rounded {
  color: var(--color-green-light);
  border: 1px solid var(--color-green-light);
  border-radius: 2.5rem;
  padding: 1.25rem 4rem;
  text-align: center;
  font-family: Bison;

  &:hover {
    background-color: var(--color-green-light);
    color: var(--color-black);
  }
}

.btn-transparent-red {
  color: var(--color-red);
  border: 1px solid var(--color-red);
  text-align: center;
}

.btn-transparent-white {
  color: var(--color-white);
  border: 1px solid var(--color-white);
  text-align: center;
}

.btn-green-rounded,
.btn-red-rounded,
.btn-transparent-green-rounded,
.btn-grey-rounded,
.btn-rouded {
  // border-radius: .7rem .7rem 1.7rem .7rem;
  border-radius: 7px 7px 20px 7px;
}

</style>
