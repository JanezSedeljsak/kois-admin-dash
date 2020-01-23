import { Link } from "react-router-dom";
import { Icon } from "antd";
import React from 'react';

export default function({ title, link, icon }) {
    return (
        <>
            <Link to={link} />
            <Icon type={icon} />
            <span>{title}</span>
        </>
    )
}