import {createApp} from 'vue'
import './style.css'
import App from './App.vue'
import {createPinia} from 'pinia'
import {router} from "@/router"

import {configure} from 'vee-validate';

configure({
    validateOnChange: false,
    validateOnInput: false,
    validateOnModelUpdate: false,
    validateOnBlur: true,
});

const pinia = createPinia()
const app = createApp(App)

app.use(pinia)
    .use(router)
    .mount('#app')
