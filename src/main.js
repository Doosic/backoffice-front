import { createApp } from 'vue'
import App from './App.vue'

// plugins
import { addLibrary } from "@/plugins/library.js";
import { addComponents } from "@/plugins/component.js";


import '@/assets/styles.scss';

const app = createApp(App);
addLibrary(app);
addComponents(app);




app.mount('#app');