import React from "react";
import { Modal } from "antd";

export default ({ content, toggle, visibility, title, confirm }) => (
    <Modal
        title={title}
        visible={visibility}
        onOk={confirm ? confirm : toggle}
        onCancel={toggle}
        cancelButtonProps={{ style: { display: 'none' } }}
        width={window.innerWidth / 1.7}
    >{content}</Modal>
)
