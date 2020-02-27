import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Menu } from 'antd';
import KoisLink from './../common/menulink';

export default function () {
    const history = useHistory();

    useEffect(() => 
        document.querySelectorAll('.ant-menu-item').forEach(item => 
            item.addEventListener('click', async () => history.push(item.firstChild.id))
    ), []);

    const navigationItems = [
        { link: "/", title: "Domov", icon: "home" },
        { link: "/login", title: "Prijava", icon: "login" }
    ];
    
    return (
        <Menu theme="dark" style={{ background: "#47515a" }} mode="inline">
            {navigationItems.map((navItem, index) => (
                <Menu.Item key={index}>
                    <KoisLink {...navItem}/>
                </Menu.Item>
            ))}
        </Menu>
    );
}
