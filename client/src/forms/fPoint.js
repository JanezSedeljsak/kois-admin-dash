import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox, Modal, List, Avatar } from "antd";
import LocationPicker from "react-location-picker";

export default function({ type }) {
  const [modal, setModalVisibility] = useState(false);
  const [position, setPosition] = useState({ lat: 46.4441, lng: 15.197 });
  const tabs = [];

  const handleLocationChange = ({ position, address, places }) => {
    setPosition(position);
  };

  const toggleModal = () => {
    setModalVisibility(!modal);
  };

  return !modal ? (
    <Form style={{ width: "50%", minWidth: "300px" }}>
      <Form.Item>
        <Button
          onClick={toggleModal}
          icon="select"
          shape="round"
          htmlType="button"
          className="login-form-button"
        >
          Izberi lokacijo
        </Button>
        <span>
          {" "}
          <Icon type="environment" style={{ color: "#66c" }} /> zemljepisna
          dolžina: <b>{position.lng}</b> zemljepisna širina:{" "}
          <b>{position.lat}</b>
        </span>
        <hr />
      </Form.Item>
      <Form.Item>
        <Button icon="plus" shape="round">
          Dodaj zavihek
        </Button>
        <List
          itemLayout="horizontal"
          dataSource={tabs}
          renderItem={item => (
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar src="https://cdn0.iconfinder.com/data/icons/education-gamification/1000/Task_Complete-512.png" />
                }
                title={<a href="https://ant.design">{item.title}</a>}
                description="Ant Design, a design language for background applications, is refined by Ant UED Team"
              />
            </List.Item>
          )}
        />
        <hr />
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          icon="environment"
          shape="round"
          htmlType="submit"
          className="login-form-button"
        >
          {type == "edit" ? "Posodobi" : "Dodaj"}
        </Button>
      </Form.Item>
    </Form>
  ) : (
    <Modal
      title="Izbirnik lokacije"
      visible={modal}
      onOk={toggleModal}
      onCancel={toggleModal}
      cancelButtonProps={{ style: { display: 'none' } }}
      width={"50vw"}
    >
      <LocationPicker
        containerElement={<div style={{ height: "100%" }} />}
        mapElement={<div style={{ height: "400px" }} />}
        defaultPosition={position}
        onChange={handleLocationChange}
      />
    </Modal>
  );
}
