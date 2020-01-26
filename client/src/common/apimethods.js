export default class {
    static register(_name, _email, _password, _AUTH) {
        let _response = { ok: false, msg: 'error occured' };
        axios.post('/api/auth/register', {
            params: {
                name: _name,
                email: _email,
                password: _password
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

    static login(_email, _password) {
        let _response = { ok: false, msg: 'error occured' };
        axios.post('/api/auth/login', {
            params: {
                email: _email,
                password: _password
            }
        })
            .then((response) => _response = response)
            .catch(console.log);
        
        return _response;
    }

    static delUser() {

    }

    static getUser() {

    }

    static getUsers() {

    }

    static updateUser() {

    }
}