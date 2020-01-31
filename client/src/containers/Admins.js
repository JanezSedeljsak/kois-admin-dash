import React, { useState } from "react";
import { List, Avatar, Button } from "antd";
import KoisLink from './../common/buttonlink';
import { Link, Switch, Route } from "react-router-dom";

export default function () {
    const data = [
        { title: "Ant Design Title 1" },
        { title: "Ant Design Title 2" },
        { title: "Ant Design Title 3" },
        { title: "Ant Design Title 4" }
    ];

    return (
        <>
            <KoisLink {...{ title: "Dodaj administratorja", link: '/new/admin', icon: 'plus' }} />
            <hr />
            <List
                itemLayout="horizontal"
                dataSource={data}
                renderItem={item => (
                    <List.Item>
                        <List.Item.Meta
                            avatar={
                                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
                            }
                            title={<a href="https://ant.design">{item.title}</a>}
                            description="Ant Design, a design language for background applications, is refined by Ant UED Team"
                        />
                    </List.Item>
                )}
            />
        </>
    );
}
