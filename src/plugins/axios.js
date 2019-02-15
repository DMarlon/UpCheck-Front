import Vue from 'vue'
import axios from 'axios'

axios.defaults.baseURL = "https://ativa.nexsin.com.br/"

Vue.use({
    install(Vue){
        Vue.prototype.$http = axios
    }
})