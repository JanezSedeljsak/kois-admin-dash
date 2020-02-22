import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox, Modal, List, Avatar } from "antd";
import LocationPicker from "react-location-picker";
import KoisModal from './../common/modal';
import Swal from 'sweetalert2';
import _api from './../common/apimethods';

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
        if (modalIndex === 'pointForm') {
            let { title, images, description } = pointForm;
            images = images.split('\n');
            let filteredImages = images.filter(imageValidation);
            if(filteredImages.length !== images.length)  {
                Swal.fire({
                    title: 'Napaka!',
                    text: 'Najdena je bila neveljavna povezava do slike!',
                    icon: 'error',
                    confirmButtonText: 'Nadaljuj'
                });
            } else {
                setTabs([...tabs, { title, description, images: filteredImages }]);
                setPointForm({
                    title: '',
                    images: '',
                    description: ''
                });
                setModalVisibility(false)
            }

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
                return getPointFormModal();

            default:
                return '<p>Prišlo je do napake!</p>'
        }
    }

    const getModalTitle = {
        'pointForm': 'Obrazec točke',
        'locationPicker': 'Izbirnik lokacije'
    }

    const imageValidation = link => {
        var http = new XMLHttpRequest();
        http.open('HEAD', link, false);
        http.send();
        return http.status != 404;
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
                    renderItem={item => (
                        <List.Item>
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
