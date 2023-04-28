import axios, { CreateAxiosDefaults } from 'axios';

const config = {
    baseURL: process.env.API_URL || 'http://localhost:3002',
} as CreateAxiosDefaults;

const requestInterceptor = (request) => {
    request.headers.authorization = localStorage.getItem('accessToken');
    return request;
};

class Requester {
    instance = null;
    constructor() {
        this.instance = axios.create(config);
        this.instance.interceptors.request.use(requestInterceptor);
    }
}

export default Requester;
