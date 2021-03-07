import axios from './http'

export default {
    getUserInfo(loginname) {
        return axios.get(`user/${loginname}`);
    }
}