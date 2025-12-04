import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

//Add token to every request if exists
API.interceptors.request.use((req) => {
    if(localStorage.getitems('token')) {
        req.headers.Authorization = `Bearer ${localStorage.getItem('token')}`;
    }
    return req;
});

export default API;