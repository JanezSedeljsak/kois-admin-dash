import axios from 'axios';

export default class {
    static async register(fullname, email, password, _AUTH) {
        return new Promise(async (resolve, reject) => {
            await axios.post('/api/auth/register', {
                params: {
                    name: fullname,
                    email: email,
                    password: password
                },
                headers: {
                    'Authorization': `Token ${_AUTH}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
            })
                .then(resolve)
                .catch(reject);
        });
    }

    static async login(params) {
        return new Promise(async (resolve, reject) => {
            await axios.post('/api/auth/login', params)
                .then(resolve)
                .catch(reject);
        });
    }

    static async delUser(_id, _AUTH) {
        return new Promise(async (resolve, reject) => {
            await axios.post(`/api/auth/delete-user/${_id}`, {
                headers: {
                    'Authorization': `Token ${_AUTH}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(resolve)
                .catch(reject);
        });

    }

    static async getUser(_id, _AUTH) {
        return new Promise(async (resolve, reject) => {
            await axios.get(`/api/auth/user-profile/${_id}`, {
                headers: {
                    'Authorization': `Token ${_AUTH}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(resolve)
                .catch(reject);
        });
    }

    static async getUsers(_AUTH) {
        return new Promise(async (resolve, reject) => {
            await axios.get('/api/auth/users', {
                headers: {
                    'Authorization': `Token ${_AUTH}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            })
                .then(resolve)
                .catch(reject);
        });

    }

    static async updateUser(_id, _params) {
        return new Promise(async (resolve, reject) => {
            await axios.put(`/api/auth/update-user/${_id}`, _params)
                .then(resolve)
                .catch(reject);
        });
    }
}