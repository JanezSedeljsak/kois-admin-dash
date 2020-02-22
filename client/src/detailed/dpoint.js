import { Link } from "react-router-dom";
import { Icon, Button, Select, Spin  } from "antd";
import React, { useState, useEffect } from "react";
import _api from './../common/apimethods';

const { Option } = Select;

export default function () {

    const [point, setPoint] = useState(null);
    const [dropDownIndex, setDropDownIndex] = useState(0);

    async function getPoint() {
        const _AUTH = localStorage.getItem('_kToken');
        const url = window.location.href;
        const id = url.substr(url.lastIndexOf('/') + 1);
        const response = await _api.getPoint({ id, _AUTH });
        if (response.status == 200) {
            setPoint(response.data);
        }
    }

    useEffect(() => {
        getPoint();
    }, [])

    if (point) {
        const { tabs } = point;
        const openedTab = tabs[dropDownIndex];
        return (
            <>
                {
                    (tabs.length > 1) && (
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
                    )

                }
    
                <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner" style={{ height: "60vh" }}>

                        {openedTab.images.map((image, i) => (
                            <div className={`carousel-item ${i == 0 ? "active" : ""}`}>
                                <img className="d-block w-100" src={image} alt="Kois Image" />
                            </div>
                        ))}

                    </div>
                    <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                        <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                        <span className="sr-only">Next</span>
                    </a>
                </div>
    
                <h1 style={{ marginTop: 20 }}>{openedTab.title}</h1>
                <hr />
                <span dangerouslySetInnerHTML={{ __html: openedTab.description.replace(/\n/g, "<br />")}} />
            </>
        );
    } else {
        return <><Spin size="large" /></>
    }
}
