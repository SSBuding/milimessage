import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
// import axios from 'axios'
// import VueAxios from 'vue-axios'
import { MlMessage } from '@/components/mili'
import './assets/main.css'

const app = createApp(App)
app.use(router)
app.use(createPinia())
app.provide('$message', MlMessage)

app.mount('#app')
