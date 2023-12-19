import { createApp } from 'vue';
import axios from 'axios';
import VueAxios from 'vue-axios';
// import Loading from 'vue-loading-overlay';
// import 'vue-loading-overlay/dist/vue3-loading.css';
// import 'bootstrap-icons/font/bootstrap-icons.css';
// import { defineRule } from 'vee-validate';
// import { required, email, min } from '@vee-validate/rules';
// import { localize, setLocale } from '@vee-validate/i18n';

import App from './App.vue';
import router from './router';
import { currency, TimestampToDate } from './methods/filters';

const app = createApp(App);
app.use(VueAxios, axios);
app.config.globalProperties.$filters = {
  currency,
  TimestampToDate,
};
app.use(router);

// defineRule('required', required);
// defineRule('email', email);
// defineRule('min', min);

// app.use(Loading);
app.mount('#app');
