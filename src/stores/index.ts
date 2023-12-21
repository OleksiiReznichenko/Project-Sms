import { defineStore } from 'pinia'

interface State {
  mobileNavMenuOpenedIndicator: boolean;
  startLandingCountriesAnimation: boolean;
}

export const useBaseStore = defineStore({
  id: 'baseStore',

  state: (): State => ({
    mobileNavMenuOpenedIndicator: false,
    startLandingCountriesAnimation: false
  }),

  actions: {
    // CHECK IF DEVICE IS TOUCH TYPE OR MOUSE TYPE
    isTouchDevice(): boolean {
      return (('ontouchstart' in window) ||  
        (navigator.maxTouchPoints > 0));
    },
    toggleMobileNavMenu(): void {
      this.$state.mobileNavMenuOpenedIndicator = !this.$state.mobileNavMenuOpenedIndicator;
    },
    closeMobileNavMenu(): void {
      this.$state.mobileNavMenuOpenedIndicator = false;
    },
  }
});
