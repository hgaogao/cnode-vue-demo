import axios from 'axios'
import qs from "qs"

// axios.defaults.baseURL = '/apis'
// var instance = axios.create({
//     baseURL: 'https://cnodejs.org/api/v1',
//     // baseURL : '/apis',
//     timeout: 1000,
//     headers: { 'X-Custom-Header': 'foobar' }
// });
axios.defaults.baseURL = 'https://cnodejs.org/api/v1';
// axios.defaults.baseURL = '/apis'
axios.defaults.timeout = 10000; //超时  时间
axios.defaults.headers['Content-Type'] = 'application/json';//设置post请求头 告知服务器请求的主体
// axios.defaults.withCredentials = true; //设置CORS跨域允许携带资源凭证
// axios.defaults.transformRequest = data => qs.stringify(data);
axios.defaults.paramsSerializer = data => qs.stringify(data);


/**
 * 设置请求拦截器
 */
axios.interceptors.request.use(config => {
    const token = localStorage.getItem('tokne');
    token && (config.headers.Authorization = token);
    return config;
}, error => {
    {
        return Promise.reject(error);
    }
});


/**
 * 设置响应拦截器
 */

axios.interceptors.response.use(response => {
    return response.data;
}, error => {
    if (error.response) {
        switch (error.response.status) {
            case 401:
                return { success: false };
                break;

            default:
                break;
        }
    } else {
        if (!window.navigator.onLine) {
            //断网了
            return;
        }
        return Promise.reject(error);
        ;
    }
})

export default axios;