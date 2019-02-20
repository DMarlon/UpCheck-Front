import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = "http://localhost:8080/api/v1/"

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