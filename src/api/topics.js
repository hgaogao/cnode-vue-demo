import axios from './http'

export default {
    getTopics(tab, page, limit) {
        return axios.get("/topics", {
            params: {
                tab: tab,
                page: page,
                limit: 10,
            },
        })
    },

    /**
     * 获取主题
     */
    getTopicsContent(token, id) {
        return axios({
            method: 'get',
            url: `topic/${id}`,
            params: {
                accesstoken: token
            }
        });
    },
    /**
     * 收藏主题
     */
    collect(topic_id, token) {
        // post提交josn格式要用这种形式
        return axios({
            method: 'post',
            url: 'topic_collect/collect',
            data: {
                accesstoken: token,
                topic_id: topic_id
            }
        })
    },
    de_collect(topic_id, token) {
        // post提交josn格式要用这种形式
        return axios({
            method: 'post',
            url: 'topic_collect/de_collect',
            data: {
                accesstoken: token,
                topic_id: topic_id
            }
        })
    }
}