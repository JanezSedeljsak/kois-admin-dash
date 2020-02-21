import React, { useState, useEffect } from "react";
import { List, Avatar, Button } from "antd";
import KoisLink from './../common/buttonlink';
import { Link, Switch, Route } from "react-router-dom";
import _api from './../common/apimethods';

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
                                <Avatar src="https://lh3.googleusercontent.com/proxy/Y1shLbYDADF-w5XLx4JUqfs-kOPuRgtP3nLwpYM0wP8NUQttSWMabqiRniN_0FTFeMu69iJbmlI4w54pRBmg6Z8mg4xEw0MB-bbJOBn-aiEUl4XAtKEh5DRPx20f" />
                            }
                            title={item.name}
                            description={item.email}
                        />
                    </List.Item>
                )}
            />
        </>
    );
}
