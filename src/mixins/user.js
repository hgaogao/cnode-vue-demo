import router from '../router'

export default {
    methods: {
        getToken() {
            let token = this.$cookie.get('token') || '';
            if (!token) {
                router.push("/login");
            }
            return token
        },
        // 获取缓存的token (不自动跳转)
        getTokenNoRedirect() {
            let token = this.$cookie.get('token') || '';
            return token;
        },
        setToken(token) {
            this.$cookie.set('token', token, { expires: '99Y' });
            return
        },
        setUserInfo(user) {
            this.$cookie.set('user', JSON.stringify(user), { expires: '99Y' });
        },
        getUserInfo() {
            let user = {};
            let c = this.$cookie.get('user') || ''
            try {
                if (c) {
                    user = JSON.parse(c);
                }
            } catch (error) {
                console.log(error);
            }
            return user;
        },
        logout() {
            let toClear = 'user token'.split('');
            toClear.forEach(() => {
                this.$cookie.delete(key);
            })
            router.push('/')
        }
    }
}