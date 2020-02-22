import axios from 'axios';

// if development mode use another separate server for api
const _API_ = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'localhost:5000' : '';

export default class {
    static async register({ name, email, password, _AUTH }) {
        return new Promise(async (resolve, reject) => {
            await axios.post(`${_API_}/api/auth/user`, { name, email, password  }, {
                headers: {
                    'Authorization': `Token ${_AUTH}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(resolve)
                .catch(resolve);
        });
    }

    static async login({ email, password }) {
        return new Promise(async (resolve, reject) => {
            await axios.post(`${_API_}/api/auth/login`, {
                email: email,
                password: password
            })
                .then(resolve)
                .catch(resolve);
        });
    }

    static async getUsers(_AUTH) {
        return new Promise(async (resolve, reject) => {
            await axios.get(`${_API_}/api/auth/user`, {
                headers: {
                    'Authorization': `Token ${_AUTH}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(resolve)
                .catch(resolve);
        });
    }


    static async getUser({ id, _AUTH }) {
        return new Promise(async (resolve, reject) => {
            await axios.get(`${_API_}/api/auth/user/${id}`, {
                headers: {
                    'Authorization': `Token ${_AUTH}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(resolve)
                .catch(resolve);
        });
    }


    static async createPoint({ data, _AUTH }) {
        return new Promise(async (resolve, reject) => {
            await axios.post(`${_API_}/api/common/point`, JSON.stringify({data: data}), {
                headers: {
                    'Authorization': `Token ${_AUTH}`,
                    'Content-Type': 'application/json'
                },
            })
                .then(resolve)
                .catch(() => resolve({ error: true }));
        });
    }


    static async getPoints(_AUTH) {
        return new Promise(async (resolve, reject) => {
            await axios.get(`${_API_}/api/common/point`, {
                headers: {
                    'Authorization': `Token ${_AUTH}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(resolve)
                .catch(resolve);
        });

    }


    static async getPoint({ id, _AUTH }) {
        return new Promise(async (resolve, reject) => {
            await axios.get(`${_API_}/api/common/point/${id}`, {
                headers: {
                    'Authorization': `Token ${_AUTH}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(resolve)
                .catch(resolve);
        });
    }


    static async updatePoint({ id, data, _AUTH }) {
        return new Promise(async (resolve, reject) => {
            await axios.post(`${_API_}/api/common/point/${id}`, JSON.stringify({data: data}), {
                headers: {
                    'Authorization': `Token ${_AUTH}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(resolve)
                .catch(() => resolve({ error: true }));
        });
    }

    
    static async deletePoint({ id, _AUTH }) {
        return new Promise(async (resolve, reject) => {
            await axios.delete(`${_API_}/api/common/point/${id}`, {
                headers: {
                    'Authorization': `Token ${_AUTH}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(resolve)
                .catch(resolve);
        });
    }
}