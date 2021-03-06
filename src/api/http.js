import axios from 'axios'
import qs from "qs"

axios.defaults.baseURL = 'https://cnodejs.org/api/v1';
axios.defaults.timeout = 10000;
axios.defaults.withCredentials = treu;
axios.defaults.headers['Content-Type'] = 'application/x-www-from-urlencode';
axios.defaults.transformRequest = data => qs.stringify(data);
axios.defaults.paramsSerializer = data => qs.stringify(data);