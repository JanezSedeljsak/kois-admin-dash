import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox, Modal, List, Avatar } from "antd";
import LocationPicker from "react-location-picker";
import KoisModal from './../common/modal';

export default function ({ type }) {
  const [modal, setModalVisibility] = useState(false);
  const [modalIndex, setModalIndex] = useState(null);
  const [position, setPosition] = useState({ lat: 46.4441, lng: 15.197 });
  const [tabs, setTabs] = useState([]);
  const [pointForm, setPointForm] = useState({
    title: '',
    images: '',
    description: ''
  });

  const handleLocationChange = ({ position, address, places }) => {
    setPosition(position);
  };

  const toggleModal = () => setModalVisibility(!modal);

  const hanldeOK = () => {
    if (modalIndex === 'pointForm') {
      let { title, images, description } = pointForm;
      debugger;
      setTabs([...tabs, { title, description, images: images.split('\n')}]);
      setPointForm({
        title: '',
        images: '',
        description: ''
      });
    }
    setModalVisibility(false);
  };

  const getPointFormModal = () => {
    return (
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Naslov</label>
          <input 
            type="text" 
            className="form-control" 
            value={pointForm.title} 
            onChange={event => {
              setPointForm({ title: event.target.value, images: pointForm.images, description: pointForm.description })
            }} 
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Povezave slik</label>
          <textarea 
            className="form-control" 
            value={pointForm.images} 
            onChange={event => {
              setPointForm({ title: pointForm.title, images: event.target.value, description: pointForm.description })
            }}
          />
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1" className="bmd-label-floating">Opis</label>
          <textarea 
            className="form-control" 
            value={pointForm.description} 
            onChange={event => {
              setPointForm({ title: pointForm.title, images: pointForm.images, description: event.target.value })
            }}
          />
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

  const primarySubmit = () => {
    console.log(tabs,position);
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
                title={item.title}
                description={item.description}
              />
            </List.Item>
          )}
        />
        <hr />
      </Form.Item>
      <Form.Item>
        <Button
          onClick={primarySubmit}
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
      toggle: toggleModal,
      confirm: hanldeOK
    }} />
  );
}
