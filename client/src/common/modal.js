import React from "react";
import { Modal } from "antd";

export default function ({ content, toggle, visibility }) {
    return (
        <Modal
            title="Izbirnik lokacije"
            visible={visibility}
            onOk={toggle}
            cancelButtonProps={{ style: { display: 'none' } }}
            width={"50vw"}
        >{content}</Modal>
    );
}
