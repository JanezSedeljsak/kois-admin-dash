import React, { useState } from "react";
import { List, Avatar, Button } from "antd";

export default function() {
  const data = [
    { title: "Ant Design Title 1" },
    { title: "Ant Design Title 2" },
    { title: "Ant Design Title 3" },
    { title: "Ant Design Title 4" }
  ];

  return (
    <>
      <Button type="primary" shape="round" icon="plus" size={"large"}>
        Dodaj novega administratorja
      </Button>
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
