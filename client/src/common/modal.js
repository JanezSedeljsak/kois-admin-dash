import React from "react";
import { Modal } from "antd";

export default function ({ content, toggle, visibility, title, confirm }) {
    return (
        <Modal
            title={title}
            visible={visibility}
            onOk={confirm ? confirm : toggle}
            onCancel={toggle}
            cancelButtonProps={{ style: { display: 'none' } }}
            width={"50vw"}
        >{content}</Modal>
    );
}
