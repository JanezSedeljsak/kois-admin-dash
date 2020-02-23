import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import { Menu } from 'antd';
import KoisLink from './../common/link';

export default function () {

    const history = useHistory();

    useEffect(() => 
        document.querySelectorAll('.ant-menu-item').forEach(item => 
            item.addEventListener('click', async event => {
                if (item.firstChild.id == '/login') await localStorage.removeItem('_kToken');
                history.push(item.firstChild.id);
            })
        ), []);

    return (
        <Menu theme="dark" style={{ background: "#345" }} mode="inline">
            <Menu.Item key="/">
                <KoisLink
                    {...{ link: "/", title: "Domov", icon: "home" }}
                />
            </Menu.Item>
            <Menu.Item key="/points">
                <KoisLink
                    {...{ link: "/points", title: "Točke", icon: "environment" }}
                />
            </Menu.Item>
            <Menu.Item key="/admins">
                <KoisLink
                    {...{ link: "/admins", title: "Administratorji", icon: "user" }}
                />
            </Menu.Item>
            <Menu.Item key="/login">
                <KoisLink {...{ link: "/login?status=420", title: "Odjava", icon: "logout" }} />
            </Menu.Item>
        </Menu>
    );
}
