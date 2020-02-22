import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox, Modal, List, Avatar, Tooltip } from "antd";
import LocationPicker from "react-location-picker";
import KoisModal from './../common/modal';
import Swal from 'sweetalert2';
import _api from './../common/apimethods';

export default function ({ type }) {
    const [modal, setModalVisibility] = useState(false);
    const [modalIndex, setModalIndex] = useState(null);
    const [updateIndex, setUpdateIndex] = useState(null);
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

    const getPoint = async () => {
        const _AUTH = localStorage.getItem('_kToken');
        const url = window.location.href;
        const id = url.substr(url.lastIndexOf('/') + 1);
        const response = await _api.getPoint({ id, _AUTH });
        if (response.status == 200) {
            const responseLocation = response.data.location;
            setTabs(response.data.tabs);
            setPosition({ lat: responseLocation.lat, lng: responseLocation.lon })
        }
    }

    useEffect(() => (type == 'edit') ? getPoint() : null, []);

    const toggleModal = () => setModalVisibility(!modal);

    const hanldeOK = () => {
        if (['pointForm', 'updatePointForm'].includes(modalIndex)) {
            let { title, images, description } = pointForm;
            images = images.split('\n');
            if (modalIndex == 'pointForm') {
                setTabs([...tabs, { title, description, images }]);
                setPointForm({
                    title: '',
                    images: '',
                    description: ''
                });
            } else {
                const tabsUpdate = tabs;
                tabsUpdate[updateIndex] = { title, description, images };
                setTabs([...tabsUpdate]);
                setPointForm({
                    title: '',
                    images: '',
                    description: ''
                });
            }

            setModalVisibility(false);

        } else setModalVisibility(false);
    };

    const getPointFormModal = () => {
        return (
            <form>
                <div className="form-group">
                    <label for="exampleInputEmail1" className="bmd-label-floating">Naslov</label>
                    <input
                        type="text"
                        className="form-control"
                        value={pointForm.title}
                        onChange={event => {
                            setPointForm({ ...pointForm, title: event.target.value })
                        }}
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1" className="bmd-label-floating">Povezave slik</label>
                    <textarea
                        className="form-control"
                        value={pointForm.images}
                        onChange={event => {
                            setPointForm({ ...pointForm, images: event.target.value })
                        }}
                    />
                </div>
                <div className="form-group">
                    <label for="exampleInputEmail1" className="bmd-label-floating">Opis</label>
                    <textarea
                        className="form-control"
                        value={pointForm.description}
                        onChange={event => {
                            setPointForm({ ...pointForm, description: event.target.value })
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

    const editPrimarySubmit = async () => {
        const _AUTH = localStorage.getItem('_kToken');
        const url = window.location.href;
        const id = url.substr(url.lastIndexOf('/') + 1);
        const data = {
            location: { ...position, lon: position.lng },
            tabs: tabs
        };
        const response = await _api.updatePoint({ id, data, _AUTH })
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Točka je bila uspešno posodobljena!'
            });
        }
    }

    const addPrimarySubmit = async () => {
        const _AUTH = localStorage.getItem('_kToken');
        const data = {
            location: { ...position, lon: position.lng },
            tabs: tabs
        };
        const response = await _api.createPoint({ data, _AUTH})
        if (response.status == 200) {
            Swal.fire({
                icon: 'success',
                title: 'Točka je bila uspešno dodana!'
            });
            setTabs([]);
        }
    }

    const getModalContent = () => {
        switch (modalIndex) {

            case 'locationPicker':
                return getLocationFormModal();

            case 'pointForm':
            case 'updatePointForm':
                return getPointFormModal();

            default:
                return '<p>Prišlo je do napake!</p>'
        }
    }

    const getModalTitle = {
        'pointForm': 'Dodaj zavihek',
        'updatePointForm': 'Posodobi zavihek',
        'locationPicker': 'Izbirnik lokacije'
    }


    const openEditTabModal = index => {
        setUpdateIndex(index);
        toggleModal(true); 
        setModalIndex('updatePointForm');
        const tabForEdit = tabs[index];
        setPointForm({ ...tabForEdit, images: tabForEdit.images.join('\n') })

    }

    return !modal ? (
        <Form style={{ minWidth: "50%" }}>
            <Form.Item>
                <Button
                    onClick={() => { toggleModal(true); setModalIndex('locationPicker'); }}
                    icon="select"
                    shape="round"
                    htmlType="button"
                    className="login-form-button"
                >
                    Izberi lokacijo
                </Button>
                <span>
                    {" "}
                    <Icon type="environment" style={{ color: "#66c" }} /> zemljepisna dolžina:
                    <b>{position.lng}</b> zemljepisna širina:{" "}
                    <b>{position.lat}</b>
                </span>
                <hr />
            </Form.Item>
            <Form.Item>
                <Button icon="plus" shape="round" onClick={() => { toggleModal(true); setModalIndex('pointForm'); }}>
                    Dodaj zavihek
                </Button>
                <List
                    itemLayout="horizontal"
                    dataSource={tabs}
                    renderItem={(item, index) => (
                        <List.Item 
                            actions={[
                                <Tooltip title="Uredi zavihek">
                                    <Button
                                    type="primary"
                                    shape="circle"
                                    icon="edit"
                                    size={"large"}
                                    onClick={() => { openEditTabModal(index) }}
                                    />
                                </Tooltip>
                            ]}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.images[0]} />
                                }
                                title={item.title}
                                description={(item.description.length > 100 ? item.description.substr(0,100) : item.description) + "..."}
                            />
                        </List.Item>
                    )}
                />
                <hr />
            </Form.Item>
            <Form.Item>
                <Button
                    onClick={type == "edit" ? editPrimarySubmit : addPrimarySubmit}
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
