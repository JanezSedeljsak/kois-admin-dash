import { Link } from "react-router-dom";
import { Icon, Button, Select, Spin, Tooltip } from "antd";
import React, { useState, useEffect } from "react";
import _api from './../common/apimethods';
import map from 'svg-world-map';
import stringify from 'virtual-dom-stringify';
import moment from 'moment';
import $ from 'jquery';

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
            setUser(response.data.userUpdated, 'updated');
            setUser(response.data.userCreated, 'created');
            setPoint(response.data);
        }
    }

    async function setUser(idUser, whichUser) {
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

        const imgToFull = src => {
                $('<div>')
                    .css({
                        background: `#0f0f0f99 url('${src}') no-repeat center`,
                        backgroundSize: 'contain',
                        width:'100%', height:'100%',
                        position:'fixed', zIndex:'10000',
                        top:'0', left:'0',
                    })
                    .click(function(){ $(this).remove() })
                    .appendTo('body');
        };

        const convertToDMS = loc => {
            const deg = loc | 0,
                frac = Math.abs(loc - deg),
                min = (frac * 60) | 0,
                sec = frac * 3600 - min * 60;

            return `${deg ? deg : 0}°${min ? min : 0}'${sec ? sec : 0}"`;
        }

        const openMaps = () => {
            const north = convertToDMS(lat);
            const east = convertToDMS(lon);
            window.open(`https://www.google.com/maps/place/${north}N${east}E/"`);
        }
        
        return (
            <div>
                {(tabs.length > 1) && (
                    <>
                        <div>
                            <Select defaultValue={tabs[0].title} style={{ width: "100%" }} onChange={setDropDownIndex}>
                                {tabs.map(({ title }, index) => (
                                    <Option value={index}>{title}</Option>
                                ))}
                            </Select>
                        </div>

                        <hr/>
                    </>
                )}

                <div id="headerimg" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" style={{ height: "70vh", background: "#2f3e53" }}>
                        {openedTab.images.map((image, i) => (
                            <div style={{ height: "70vh" }} className={`carousel-item ${i == 0 ? "active" : ""}`}>
                                <img
                                    className="d-block"
                                    onClick={() => imgToFull(image)}
                                    src={image} 
                                    alt="Kois Image"
                                />
                            </div>
                        ))}
                    </div>

                    {(openedTab.images.length > 1) && (
                        <>
                            <ol className="carousel-indicators">
                                {openedTab.images.map((image, i) => (
                                    <li data-target="#headerimg" data-slide-to={i} className={i == 0 ? "active" : ""}></li>
                                ))}
                            </ol>

                            <a className="carousel-control-prev" href="#headerimg" role="button" data-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="sr-only">Previous</span>
                            </a>
                            <a className="carousel-control-next" href="#headerimg" role="button" data-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="sr-only">Next</span>
                            </a>
                        </>
                    )}
 
                </div>
    
                <div style={{ marginTop: 20 }}>
                    <h1 style={{ float: "left" }}>{openedTab.title}</h1>
                    <Tooltip style={{ float: "right" }} title="Odpri v google maps">
                        <Button
                            style={{ marginRight: 20, float: "right" }}
                            type="primary"
                            shape="circle"
                            icon="environment"
                            size={"large"}
                            onClick={openMaps}
                        />
                    </Tooltip>
                </div>
                
                <hr style={{ clear: "both" }} />
                <span 
                    stlye={{ padding: 30 }} 
                    dangerouslySetInnerHTML={{ __html: openedTab.description.replace(/\n/g, "<br />")}} 
                />
                <hr />
                <div style={{ display: "flex", flexDirection: "row" }} >
                    <div style={{ margin: 20, width: "100%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                        <ul class="list-group">
                            {createdData.map(({ key, value }) => (
                                <a class="list-group-item">
                                    <div class="bmd-list-group-col">
                                        <p class="list-group-item-heading">{key}</p>
                                        <p class="list-group-item-text"><b>{value}</b></p>
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
            </div>
        );
    } else {
        return <div><Spin size="large" /></div>
    }
}
