import { Link } from "react-router-dom";
import { Icon, Button, Menu } from "antd";
import React from 'react';

// ONLY USED IN app.js !!!!!
// otherwise we use buttonlink.js

export default function({ title, link, icon }) {
    return (
        <span id={link} >
            <Icon type={icon} />
            <span>{title}</span>
        </span>
    )
}