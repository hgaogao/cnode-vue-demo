import axios from './http'

export default {
    getUserInfo(loginname) {
        return axios.get(`user/${loginname}`);
    },
    fabulous(reply_id, token) {
        // post提交josn格式要用这种形式
        return axios({
            method: 'post',
            url: `reply/${reply_id}/ups`,
            data: {
                accesstoken: token
            }
        });
    },
    login(token) {
        // post提交josn格式要用这种形式
        return axios({
            method: 'post',
            url: 'accesstoken',
            data: {
                accesstoken: token
            }
        });
    }
} 