import axios, { CreateAxiosDefaults } from 'axios';
import store from '../store';
import usersSlice from '../store/usersSlice';

const config = {
    baseURL: process.env.API_URL || 'http://localhost:3002',
    withCredentials: true
} as CreateAxiosDefaults;

class Requester {
    instance = null;
    constructor() {
        this.instance = axios.create(config);

        this.instance.interceptors.request.use((request) => {
            request.headers.authorization = typeof window !== 'undefined' && localStorage.getItem('accessToken');
            return request;
        });

        this.instance.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error?.response?.status === 401) {
                store.dispatch(usersSlice.actions.setAuthorized(false));
            }
            return Promise.reject(error);
        })
    }
}

export default Requester;
