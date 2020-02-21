import React from "react";
import { Button } from 'antd';
import _api from './../common/apimethods';

const { useEffect, useState } = React;

export default () => {
    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    const useMountEffect = (fun) => useEffect(fun, []);
    useMountEffect(() => localStorage.removeItem('_kToken'));

    const validateForm = () => {
        const { email , password } = form;
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) && password.length > 4;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;
        const login = await _api.login(form);
        if (login.status == 200) {
            localStorage.setItem('_kToken', login.data.token);
        }
    };

    return (
        <form>
            <div className="form-group">
                <label for="email" className="bmd-label-floating">E-pošta</label>
                <input 
                    id="email"
                    type="email" 
                    className="form-control" 
                    value={form.email} 
                    minLength="5"
                    onChange={event => {
                        setForm({ email: event.target.value, password: form.password })
                    }}
                />
            </div>
            <div className="form-group">
                <label for="password" className="bmd-label-floating">Geslo</label>
                <input 
                    id="password"
                    type="password" 
                    minLength="5"
                    className="form-control" 
                    value={form.password} 
                    onChange={event => {
                        setForm({ email: form.email, password: event.target.value })
                    }}
                />
            </div>
            <Button
                type="primary"
                icon="login"
                shape="round"
                className="login-form-button"
                onClick={handleLogin}
                disabled={!validateForm()}
            >Prijava
            </Button>
        </form>
    );
};
