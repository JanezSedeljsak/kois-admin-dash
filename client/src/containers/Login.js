import React from "react";
import { Button } from 'antd';
import _api from './../common/apimethods';
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";

const { useEffect, useState } = React;

export default (props) => {
    const history = useHistory();
    const [ dispalyForm, setDisplayForm ] = useState(false);

    const [form, setForm] = useState({
        email: "",
        password: ""
    });

    useEffect(() => {
        const loginURL = window.location.href;
        let status = null;
        ['401', '406', '420'].forEach(_status => {
            if (loginURL.includes(_status)) {
                status = _status;
                return;
            }
        });
        if (status) {
            const msg = {
                '401': 'Preusmeritev zaradi avtorizacije uporabnika!',
                '406': 'Prijava ni bila uspešna!',
                '420': 'Odjava je bila uspešna!'
            };
            Swal.fire({
                icon: (status == 420) ? 'success' : 'error',
                title: msg[status]
            }).then(() => {
                window.location.href = loginURL.substring(0, loginURL.indexOf('?'));
            });
        } else {
            setDisplayForm(true);
        }
        localStorage.removeItem('_kToken');
    }, []);

    const validateForm = () => {
        const { email , password } = form;
        return (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) && password.length > 4;
    };

    const handleLogin = async () => {
        if (!validateForm()) return;
        const login = await _api.login(form);
        if (login.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Prijava je bila uspešna!'
            }).then(() => {
                history.push("/");
                window.location.reload();
            });
            localStorage.setItem('_kToken', login.data.token);
        }
    };

    if (dispalyForm) {
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
    } else {
        return <></>
    }
};
