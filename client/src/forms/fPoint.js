import React, { useState, useEffect } from "react";
import { Form, Icon, Button, List, Avatar, Tooltip, Spin } from "antd";
import LocationPicker from "react-location-picker";
import KoisModal from './../common/modal';
import Swal from 'sweetalert2';
import _api from './../common/apimethods';
import TinyMCE from 'react-tinymce';

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

    const handleLocationChange = ({ position }) => setPosition(position);

    const getPoint = async () => {
        const _AUTH = localStorage.getItem('_kToken');
        const url = window.location.href;
        const id = url.substr(url.lastIndexOf('/') + 1);
        const response = await _api.getPoint({ id, _AUTH });
        if (response.status == 200) {
            const { location, tabs } = response.data;
            setTabs(tabs);
            setPosition({ lat: location.lat, lng: location.lon })
        }
    }

    useEffect(() => {
        if (type == 'edit') getPoint();
    }, []);

    const toggleModal = () => { 
        if (['pointForm', 'updatePointForm'].includes(modalIndex) && modal == true) {
            setPointForm({
                title: '',
                images: '',
                description: ''
            });
        }
        setModalVisibility(!modal);
    }

    const hanldeOK = () => {
        if (['pointForm', 'updatePointForm'].includes(modalIndex)) {
            let { title, images, description } = pointForm;
            images = images.split('\n');
            if(validatePointForm()) {
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

            } else {

                Swal.fire({
                    icon: 'error',
                    title: 'Obrazca niste pravilno izpolnili!'
                });
            }

        } else setModalVisibility(false);
    };

    const validatePointForm = () => {
        const validFileds = Object.values(pointForm).filter(item => item.length).length;
        return Object.values(pointForm).length == validFileds;
    }

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
                    <TinyMCE
                        apiKey="cfdw8uwtdyjxz965k0wctju2xsnoyj3nnncgef9gghebc16m"
                        content={pointForm.description}
                        config={{
                          menubar: 'view',
                          plugins: 'advlist autolink lists link',
                          toolbar:
                            'undo redo | bold italic | \
                            alignleft aligncenter alignright alignjustify | \
                            bullist numlist outdent indent | help'
                        }}
                        onChange={event => setPointForm({ ...pointForm, description: event.level.content })}
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
                return;
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

    const deleteTab = index => {
        Swal.fire({
            title: 'Ali ste prepričani?',
            text: "Zavihek boste popolnoma odstranili iz točke!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Da!'
          }).then(async (result) => {
            if (result.value) {
                setTabs([...tabs.filter((item, itemIndex) => itemIndex != index)]);
            }
        });
    }

    const renderDescription = desc => (desc.length > 100) ? (
        <div dangerouslySetInnerHTML={{ __html: `${desc.substr(0, 100)}...`}} />   
    ) : (
        <div dangerouslySetInnerHTML={{ __html: desc }} />
    );


    if (type == "edit" && !tabs.length) {
        return <div><Spin size="large" /></div>
    } else {
        return !modal ? (
            <Form style={{ minWidth: "50%" }}>
                <Form.Item>
                    <Button
                        icon="folder-add" 
                        shape="round" 
                        onClick={() => { toggleModal(true); setModalIndex('pointForm'); }}
                    >
                        Dodaj zavihek
                    </Button>
                    <Button
                        onClick={() => { toggleModal(true); setModalIndex('locationPicker'); }}
                        style={{ marginLeft: 10 }}
                        icon="select"
                        shape="round"
                        htmlType="button"
                        className="login-form-button"
                    >
                        Izberi lokacijo
                    </Button>
                    <span style={{ fontSize: 18, marginLeft: 10 }}>
                        <Icon type="environment" style={{ color: "#66c" }} />{" "}zemljepisna dolžina:{" "}
                        <b>{position.lng}</b>{" "}zemljepisna širina:{" "}
                        <b>{position.lat}</b>
                    </span>
                    <hr />
                </Form.Item>
                <Form.Item>
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
                                            onClick={() => openEditTabModal(index)}
                                        />
                                    </Tooltip>,
                                    <Tooltip title="Odstrani zavihek">
                                        <Button
                                            type="danger"
                                            shape="circle"
                                            icon="delete"
                                            size={"large"}
                                            onClick={() => deleteTab(index)}
                                        />
                                    </Tooltip>
                                ]}
                            >
                                <List.Item.Meta
                                    avatar={
                                        <Avatar src={item.images[0]} />
                                    }
                                    title={item.title}
                                    description={renderDescription(item.description)}
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
                        disabled={!tabs.length}
                    >
                        {type == "edit" ? "Posodobi točko" : "Dodaj točko"}
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
}
