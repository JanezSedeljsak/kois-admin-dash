import React, { useState } from "react";
import { Card, Button, Tooltip } from "antd";
import KoisLink from "./../common/buttonlink";

const { Meta } = Card;

export default function() {
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
        {[1, 2, 3, 4, 5, 6, 7, 8].map((item, index) => (
          <Card
            key={index}
            hoverable
            style={{
              flex: "0 1 calc(25% - 16px)",
              margin: "8px",
            }}
            cover={
              <img src="https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2018/11/location-tech.jpg" />
            }
          >
            <Meta title="Random location" />
            <hr />
            <Tooltip title="Podroben ogled">
              <Button
                style={{ float: "right", marginLeft: "10px" }}
                type="secondary"
                shape="circle"
                icon="fullscreen"
                size={"large"}
                href={`/details/point/${index}`}
              />
            </Tooltip>
            <Tooltip title="Uredi">
              <Button
                style={{ float: "right" }}
                type="primary"
                shape="circle"
                icon="edit"
                size={"large"}
                href={`/edit/point/${index}`}
              />
            </Tooltip>
          </Card>
        ))}
      </div>
    </>
  );
}
