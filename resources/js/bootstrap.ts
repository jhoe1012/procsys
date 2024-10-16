import axios from 'axios';
window.axios = axios;

window.axios.defaults.headers.common['X-Requested-With'] = 'XMLHttpRequest';
axios.defaults.baseURL = import.meta.env.VITE_APP_URL; //'http://procurement_management.test';
//axios.defaults.baseURL = 'http://10.129.130.124';
axios.defaults.withCredentials = true;