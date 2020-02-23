import axios from 'axios';

// if development mode use another separate server for api
const _API_ = (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') ? 'localhost:5000' : '';


axios.interceptors.response.use(response => {
    return response;
 }, error => {
   if (error.response.status === 401) {
       window.location = '/login?error=401';
   } else if (error.response.status === 406) {
        window.location = '/login?error=406';
   }
   return error;
 });

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

    static async getUsers(_AUTH) {
        return new Promise(async (resolve, reject) => {
            await axios.get(`${_API_}/api/auth/user`, {
                headers: {
                    'Authorization': `Token ${_AUTH}`,
                    'Content-Type': 'application/json'
                }
            })
                .then(resolve)
                .catch(reject);
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
                .catch(reject);
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
                .catch(reject);
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
                .catch(reject);
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
                .catch(reject);
        });
    }
}