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
    getTopicsContent(id) {
       return axios.get(`topic/${id}`);
    }
}