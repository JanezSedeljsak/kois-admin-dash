import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox, Modal, List, Avatar } from "antd";
import LocationPicker from "react-location-picker";
import KoisModal from './../common/modal';

export default function ({ type }) {
  const [modal, setModalVisibility] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [position, setPosition] = useState({ lat: 46.4441, lng: 15.197 });
  const tabs = [];

  const handleLocationChange = ({ position, address, places }) => {
    setPosition(position);
  };

  const toggleModal = () => {
    setModalVisibility(!modal);
  };


  const getPointFormModal = () => {
    return (
      <form>
        <div class="form-group">
          <label for="exampleInputEmail1" class="bmd-label-floating">Naslov</label>
          <input type="text" class="form-control" id="exampleInputEmail1" />
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1" class="bmd-label-floating">Povezave slik</label>
          <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
        </div>
        <div class="form-group">
          <label for="exampleInputEmail1" class="bmd-label-floating">Opis</label>
          <textarea class="form-control" id="exampleTextarea" rows="3"></textarea>
        </div>
      </form>
    );
  };

  const getLocationFormModal = () => {
    return (<LocationPicker
      containerElement={<div style={{ height: "100%" }} />}
      mapElement={<div style={{ height: "400px" }} />}
      defaultPosition={position}
      onChange={handleLocationChange}
    />);
  }

  const getModalContent = () => {
    switch (modalIndex) {

      case 'locationPicker':
        return getLocationFormModal();

      case 'pointForm':
        return getPointFormModal();

      default: 
        return '<p>Prišlo je do napake!</p>'
    }
  }

  const getModalTitle = {
    'pointForm': 'Obrazec točke',
    'locationPicker': 'Izbirnik lokacije'
  }

  return !modal ? (
    <Form style={{ minWidth: "50%" }}>
      <Form.Item>
        <Button
          onClick={() =>  { toggleModal(true); setModalIndex('locationPicker'); }}
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
        <Button icon="plus" shape="round" onClick={() =>  { toggleModal(true); setModalIndex('pointForm'); }}>
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
      <KoisModal {...{
        title: getModalTitle[modalIndex],
        content: getModalContent(modalIndex),
        visibility: modal, 
        toggle: toggleModal
      }} />
    );
}
