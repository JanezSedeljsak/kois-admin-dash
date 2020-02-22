import React, { useState, useEffect } from "react";
import { List, Avatar, Button, Spin } from "antd";
import KoisLink from './../common/buttonlink';
import { Link, Switch, Route } from "react-router-dom";
import _api from './../common/apimethods';
import UserIcon from './../images/user.png';

export default function () {
    const [admins, setAdmins] = useState([]);

    useEffect(() => {
        getAdmins();
    }, []);

    async function getAdmins() {
        const token = localStorage.getItem('_kToken');
        const response = await _api.getUsers(token);
        if (response.status == 200) {
            setAdmins(response.data);
        }
    }


    if (admins) {
        return (
            <>
                <KoisLink {...{ title: "Dodaj administratorja", link: '/new/admin', icon: 'plus' }} />
                <hr />
                <List
                    itemLayout="horizontal"
                    dataSource={admins}
                    renderItem={item => (
                        <List.Item>
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={UserIcon} />
                                }
                                title={item.name}
                                description={item.email}
                            />
                        </List.Item>
                    )}
                />
            </>
        );
    } else {
        return <><Spin size="large" /></>
    }
}
