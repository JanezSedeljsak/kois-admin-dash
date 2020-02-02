import axios from 'axios';

export default class {
    static async register(fullname, email, password, _AUTH) {
        let _response = { ok: false, msg: 'error occured' };
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
            .then((response) => _response = response)
            .catch(console.log);
        
        return _response;
    }

    static async login(params) {
        let _response = { ok: false, msg: 'error occured' };
        await axios.post('/api/auth/login', params)
            .then((response) => _response = response)
            .catch(console.log);
        
        return _response;
    }

    static async delUser(_id, _AUTH) {
        let _response = { ok: false, msg: 'error occured' };
        await axios.post('/api/auth/login', {
            params: {
                id: _id
            },
            headers: {
                'Authorization': `Token ${_AUTH}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => _response = response)
            .catch(console.log);
        
        return _response;
    }

    static async getUser(_id, _AUTH) {

    }

    static async getUsers(_AUTH) {
        let _response = { ok: false, msg: 'error occured' };
        await axios.get('/api/auth/users', {
            headers: {
                'Authorization': `Token ${_AUTH}`,
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
            .then((response) => _response = response)
            .catch(console.log);
        
        return _response;
    }

    static async updateUser() {

    }
}