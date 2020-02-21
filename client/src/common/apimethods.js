import axios from 'axios';

// if development mode use another separate server for api
const _API_ = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'localhost:5000' : '';

export default class {
    static async register({ name, email, password, _AUTH }) {
        return new Promise(async (resolve, reject) => {
            await axios.post(`${_API_}/api/auth/user`, {
                params: {
                    name: name,
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

    static async login({ email, password }) {
        return new Promise(async (resolve, reject) => {
            await axios.post(`${_API_}/api/auth/login`, {
                email: email,
                password: password
            })
                .then(resolve)
                .catch(reject);
        });
    }

    static async delUser(_id, _AUTH) {
        return new Promise(async (resolve, reject) => {
            await axios.delete(`${_API_}/api/auth/user/${_id}`, {
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
            await axios.get(`${_API_}/api/auth/user/${_id}`, {
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
            await axios.get(`${_API_}/api/auth/user`, {
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
            await axios.put(`${_API_}/api/auth/user/${_id}`, _params)
                .then(resolve)
                .catch(reject);
        });
    }
}