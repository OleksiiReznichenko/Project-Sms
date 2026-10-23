import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import { gsap } from 'gsap';
import ScrollTrigger from "gsap/ScrollTrigger";
// import notify, {showNotification} from "src/plugins/notify.js";
import notify from "./plugins/notify.js";

gsap.registerPlugin(ScrollTrigger);

import './assets/css/base.css'
import { DEMO_MODE } from './demo/config';
import { installDemoApi } from './demo/mockApi';

if (DEMO_MODE) installDemoApi();

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(notify);

app.config.compilerOptions.isCustomElement = tag => tag.startsWith('vue-cal');
app.mount('#app')
