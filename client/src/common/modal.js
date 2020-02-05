import React from "react";
import { Modal } from "antd";

export default function ({ content }) {
    return (
        <Modal
            title="Izbirnik lokacije"
            visible={modal}
            onOk={toggleModal}
            cancelButtonProps={{ style: { display: 'none' } }}
            width={"50vw"}
        >{content}</Modal>
    );
}
