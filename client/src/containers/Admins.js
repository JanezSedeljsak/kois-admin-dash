import React, { useState, useEffect } from "react";
import { List, Avatar, Spin } from "antd";
import KoisLink from './../common/buttonlink';
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


    if (admins.length) {
        return (
            <div>
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
            </div>
        );
    } else {
        return <div><Spin size="large" /></div>
    }
}
