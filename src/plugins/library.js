import router from "@/router/index.js";
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ToastService from 'primevue/toastservice'

export function addLibrary(app) {
  app
      .use(router)
      .use(createPinia())
      .use(PrimeVue)
      .use(ToastService)
}
