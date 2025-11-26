import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { createPinia } from 'pinia';
import { RegleVuePlugin } from '@regle/core';

const pinia = createPinia();

const app = createApp(App);
app.use(pinia);
app.use(RegleVuePlugin);

app.mount('#app');
