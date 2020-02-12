import React from "react";
import { Modal } from "antd";

export default function ({ content, toggle, visibility, title }) {
    return (
        <Modal
            title={title}
            visible={visibility}
            onOk={toggle}
            cancelButtonProps={{ style: { display: 'none' } }}
            width={"50vw"}
        >{content}</Modal>
    );
}
