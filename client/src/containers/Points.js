import React, { useState, useEffect } from "react";
import { Card, Button, Tooltip, Spin } from "antd";
import KoisLink from "./../common/buttonlink";
import _api from "./../common/apimethods";
import Swal from 'sweetalert2';
import { useHistory } from "react-router-dom";

const { Meta } = Card;

export default function () {
    const history = useHistory();
    const [points, setPoints] = useState([]);

    useEffect(() => {
        getPoints();
    }, []);

    async function getPoints() {
        const token = localStorage.getItem("_kToken");
        const response = await _api.getPoints(token);
        if (response.status == 200) {
            setPoints(response.data);
        }
    }

    async function deletePoint(id) {
        const _AUTH = localStorage.getItem("_kToken");
        Swal.fire({
            title: 'Ali ste prepričani?',
            text: "Točko boste popolnoma odstranili iz kois sistema!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Da odstrani jo!'
        }).then(async (result) => {
            if (result.value) {
                const response = await _api.deletePoint({ id, _AUTH });
                if (response.status == 200) {
                    Swal.fire(
                        'Uspešno odstranjeno!',
                        'Točka je bila odstranjena.',
                        'success'
                    );
                    getPoints();   
                }
            }
        });
    }

    if (points.length) {
        return (
            <div style={{ maxWidth: "100%" }}>
                <KoisLink
                    {...{ title: "Dodaj točko", link: "/new/point", icon: "plus" }}
                />
                <hr />
                <div
                    style={{
                        display: "flex",
                        flexFlow: "row wrap",
                        position: "relative"
                    }}
                >
                    {points.map(({ tabs, _id }, index) => (
                        <Card
                            key={index}
                            hoverable
                            style={{
                                flex: "0 1 calc(25% - 16px)",
                                minWidth: "250px",
                                maxWidth: "60vh",
                                margin: "8px"
                            }}
                            cover={
                                <img src={tabs[0].images[0]} />
                            }
                        >
                            <Meta title={tabs[0].title} />
                            <hr />
                            <Tooltip title="Podroben ogled">
                                <Button
                                    style={{ float: "right", marginLeft: "10px" }}
                                    type="secondary"
                                    shape="circle"
                                    icon="fullscreen"
                                    size={"large"}
                                    onClick={() => history.push(`/detailed/point/${_id}`)}
                                />
                            </Tooltip>
                            <Tooltip title="Uredi">
                                <Button
                                    style={{ float: "right", marginLeft: "10px" }}
                                    type="primary"
                                    shape="circle"
                                    icon="edit"
                                    size={"large"}
                                    onClick={() => history.push(`/edit/point/${_id}`)}
                                />
                            </Tooltip>
                            <Tooltip title="Odstrani točko">
                                <Button
                                    style={{ float: "right" }}
                                    type="danger"
                                    shape="circle"
                                    icon="delete"
                                    size={"large"}
                                    onClick={() => deletePoint(_id)}
                                />
                            </Tooltip>
                        </Card>
                    ))}
                </div>
            </div>
        );
    } else {
        return <div><Spin size="large" /></div>
    }
}
