import axios from 'axios'
import RoutesAPI from "@/routesAPI.ts"
import { APILocation } from '@/settings.ts';

axios.defaults.baseURL = APILocation;

axios.interceptors.response.use(undefined, error => {
    if (error && error.response && error.response.status === 401) {
        window.location = "/auth"
    } else {
        return Promise.reject(error)
    }
});

export default {ajax: axios, routes: RoutesAPI};