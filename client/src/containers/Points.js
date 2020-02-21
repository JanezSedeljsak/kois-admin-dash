import React, { useState, useEffect  } from "react";
import { Card, Button, Tooltip } from "antd";
import KoisLink from "./../common/buttonlink";
import _api from "./../common/apimethods";

const { Meta } = Card;

export default function() {
  const [points, setPoints] = useState([]);

  useEffect(() => {
    getPoints();
  }, []);

  async function getPoints() {
    const token = localStorage.getItem("_kToken");
    const response = await _api.getPoints(token);
    if (response.status == 200) {
      setPoints(response.data);
      console.log(response.data);
    }
  }

  return (
    <>
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
                href={`/details/point/${_id}`}
              />
            </Tooltip>
            <Tooltip title="Uredi">
              <Button
                style={{ float: "right" }}
                type="primary"
                shape="circle"
                icon="edit"
                size={"large"}
                href={`/edit/point/${_id}`}
              />
            </Tooltip>
          </Card>
        ))}
      </div>
    </>
  );
}
