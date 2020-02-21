import React from "react";
import { Button } from 'antd';
import _api from './../common/apimethods';

const { useState } = React;

export default () => {
    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    });

    const validateForm = () => {
        const { name, email, password } = form;
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) 
            && password.length > 4
            && name.length > 4;
    };

    const handleRegister = async () => {
        if (!validateForm()) return;
        const _AUTH = localStorage.getItem("_kToken");
        const register = await _api.register({...form, _AUTH });
        if (register.status == 200) {
            console.log(register);
        }
    };

    return (
        <form>
            <div className="form-group">
                <label for="name" className="bmd-label-floating">Ime & Priimek</label>
                <input 
                    id="name"
                    type="email" 
                    className="form-control" 
                    value={form.name} 
                    minLength="5"
                    onChange={event => {
                        setForm({ ...form, name: event.target.value  })
                    }}
                />
            </div>
            <div className="form-group">
                <label for="email" className="bmd-label-floating">E-pošta</label>
                <input 
                    id="email"
                    type="email" 
                    className="form-control" 
                    value={form.email} 
                    minLength="5"
                    onChange={event => {
                        setForm({ ...form, email: event.target.value })
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
                        setForm({ ...form, password: event.target.value })
                    }}
                />
            </div>
            <Button
                type="primary"
                icon="login"
                shape="round"
                className="login-form-button"
                onClick={handleRegister}
                disabled={!validateForm()}
            >Registracija
            </Button>
        </form>
    );
};
