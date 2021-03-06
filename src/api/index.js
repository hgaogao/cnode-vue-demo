import axios from 'axios'

const axiosnit = axios.create({
    baseURL: 'https://cnodejs.org/api/v1',
    timeout: 1000,
});
axios.defaults.headers['Content-Type'] = 'application/x-www-from-urlencode';

axiosnit.interceptors.response.use(function (res) {
    var data = res.data;
    return data;
}, function (err) {
    console.log(err);
});

export default axiosnit