import { createApp } from 'vue';
import './style.css';
import App from './App.vue';
import { RegleVuePlugin } from '@regle/core';

createApp(App).use(RegleVuePlugin).mount('#app');
createApp(App).mount('#app');
