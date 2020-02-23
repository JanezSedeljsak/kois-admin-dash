import { Link } from "react-router-dom";
import { Icon, Button, Select, Spin  } from "antd";
import React, { useState, useEffect } from "react";
import _api from './../common/apimethods';
import map from 'svg-world-map';
import stringify from 'virtual-dom-stringify';
import moment from 'moment';

const { Option } = Select;

export default function () {
    const [point, setPoint] = useState(null);
    const [dropDownIndex, setDropDownIndex] = useState(0);
    const [userCreated, setUserCreated] = useState(null);
    const [userUpdated, setUserUpdated] = useState(null);

    async function getPoint() {
        const _AUTH = localStorage.getItem('_kToken');
        const url = window.location.href;
        const id = url.substr(url.lastIndexOf('/') + 1);
        const response = await _api.getPoint({ id, _AUTH });
        if (response.status == 200) {
            getUser(response.data.userUpdated, 'updated');
            getUser(response.data.userCreated, 'created');
            setPoint(response.data);
        }
    }

    async function getUser(idUser, whichUser) {
        const _AUTH = localStorage.getItem('_kToken');
        const response = await _api.getUser({ id: idUser, _AUTH });
        if (response.status == 200) {
            if (whichUser == 'created') setUserCreated(response.data._doc.name);
            else setUserUpdated(response.data._doc.name);
        }
    }

    useEffect(() => {
        getPoint();
    }, []);

    if (point) {
        const { tabs } = point;
        const openedTab = tabs[dropDownIndex];
        const { lat, lon } = point.location;
        const drawMarker = map(lon, lat);
        const createdData = [{
                key: "Točka je bila ustvarjena:",
                value: moment(point.createdAt).format('DD. MM. YYYY')
            }, {
                key: "Točko je ustvarjil/a:",
                value: userCreated
            }, {
                key: "Točka je bila posodobljena:",
                value: moment(point.updatedAt).format('DD. MM. YYYY')
            },{
                key: "Točko je posodobil/a:",
                value: userUpdated
        }];
        return (
            <>
                {(tabs.length > 1) && (
                    <>
                        <div>
                            <Select defaultValue={tabs[0].title} style={{ width: "100%" }} onChange={setDropDownIndex}>
                                {tabs.map((tab, index) => (
                                    <Option value={index}>{tab.title}</Option>
                                ))}
                            </Select>
                        </div>

                        <hr/>
                    </>
                )}
    
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" style={{ height: "70vh" }}>

                        {openedTab.images.map((image, i) => (
                            <div className={`carousel-item ${i == 0 ? "active" : ""}`}>
                                <img className="d-block w-100" src={image} alt="Kois Image" />
                            </div>
                        ))}

                    </div>

                    {(openedTab.images.length > 1) && (
                        <>
                            <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </>
                    )}
 
                </div>
    
                <h1 style={{ marginTop: 20 }}>{openedTab.title}</h1>
                <hr />
                <span 
                    stlye={{ padding: 30 }} 
                    dangerouslySetInnerHTML={{ __html: openedTab.description.replace(/\n/g, "<br />")}} 
                />
                <hr />
                <div style={{
                    display: "flex",
                    flexDirection: "row"
                }}>
                    <div style={{ margin: 20, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ul class="list-group">
                            {createdData.map(item => (
                                <a class="list-group-item">
                                    <div class="bmd-list-group-col">
                                        <p class="list-group-item-heading">{item.key}</p>
                                        <p class="list-group-item-text"><b>{item.value}</b></p>
                                    </div>
                                </a>   
                            ))}
                        </ul>
                    </div>
                    <div 
                        style={{ margin: 20, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}
                        dangerouslySetInnerHTML={{ __html: stringify(drawMarker)}} 
                    />
                </div>
            </>
        );
    } else {
        return <><Spin size="large" /></>
    }
}
