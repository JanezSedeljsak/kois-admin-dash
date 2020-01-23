import React, { useState } from "react";

import { Menu } from 'antd';
import KoisLink from './../common/link';

export default function() {
  return (
    <Menu theme="dark" style={{ background: "#345" }} mode="inline">
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
      <Menu.Item key="/documentation">
        <KoisLink
          {...{
            link: "/documentation",
            title: "Dokumentacija",
            icon: "file-search"
          }}
        />
      </Menu.Item>
      <Menu.Item key="/tasks">
        <KoisLink {...{ link: "/tasks", title: "Zahtevki", icon: "pushpin" }} />
      </Menu.Item>
      <Menu.Item key="/login">
        <KoisLink {...{ link: "/login", title: "Odjava", icon: "logout" }} />
      </Menu.Item>
    </Menu>
  );
}
