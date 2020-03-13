import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Menu } from 'antd';
import KoisLink from './../common/menulink';

export default function () {

    const history = useHistory();

    useEffect(() => 
        document.querySelectorAll('.ant-menu-item').forEach(item => 
            item.addEventListener('click', async event => {
                if (item.firstChild.id == '/login') await localStorage.removeItem('_kToken');
                history.push(item.firstChild.id);
            })
        ), []);

    const navigationItems = [
        { link: "/", title: "Domov", icon: "home" },
        { link: "/points", title: "Točke", icon: "environment" },
        { link: "/admins", title: "Administratorji", icon: "user" },
        { link: "/login?status=420", title: "Odjava", icon: "logout" }
    ];

    return (
        <Menu theme="dark" style={{ background: "#47515a" }} mode="inline">
            {navigationItems.map((navItem, index) => (
                <Menu.Item key={index}>
                    <KoisLink {...navItem} />
                </Menu.Item>
            ))}            
        </Menu>
    );
}
