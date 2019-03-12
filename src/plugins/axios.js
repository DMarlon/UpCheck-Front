import Vue from 'vue'
import axios from 'axios'
import { APILocation } from '@/settings.js';

axios.defaults.baseURL = APILocation;

axios.interceptors.response.use(undefined, error => {
    if (error && error.response && error.response.status === 401) {
        window.location = "/auth"
    } else {
        return Promise.reject(error)
    }
});

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios
    }
})