import 'primeicons/primeicons.css';
import './main.css';

import Aura from '@primeuix/themes/aura';
import { createPinia } from 'pinia';
import PrimeVue from 'primevue/config';
import ConfirmationService from 'primevue/confirmationservice';
import FocusTrap from 'primevue/focustrap';
import ToastService from 'primevue/toastservice';
import Tooltip from 'primevue/tooltip';
import { createApp } from 'vue';

import App from './App.vue';
import router from './router';

const app = createApp(App);

app.use(PrimeVue, {
	theme: {
		preset: Aura,
		options: { darkModeSelector: '.app-dark' },
	},
});
app.use(createPinia());
app.use(router);
app.use(ToastService);
app.use(ConfirmationService);
app.directive('focustrap', FocusTrap);
app.directive('tooltip', Tooltip);

app.mount('#app');
