import { createApp } from 'vue'
import App from './App.vue'

// plugins
import { addLibrary } from "@/plugins/library.js";
import { addComponents } from "@/plugins/component.js";


import '@/assets/styles.scss';

const app = createApp(App);
addLibrary(app);
addComponents(app);

// store
import { userInfoStore } from "@/store/userInfoStore.js";
const userInfo = userInfoStore();

// utils
import { Utils } from "@/libs/utils.js";

// globalProperties
app.config.globalProperties.$userInfo = userInfo;
app.config.globalProperties.$utils = new Utils();

app.mount('#app');