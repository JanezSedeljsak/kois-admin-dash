import React, { useState } from "react";
import { Card, Button } from "antd";
import KoisLink from './../common/buttonlink';

const { Meta } = Card;

export default function() {
  return (
    <>
      <KoisLink {...{ title: "Dodaj točko", link: '/new/point', icon: 'plus' }} />
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
              flex: "0 1 calc(25% - 30px)",
              margin: "15px"
            }}
            cover={
              <img
                alt="example"
                src="https://geospatialmedia.s3.amazonaws.com/wp-content/uploads/2018/11/location-tech.jpg"
              />
            }
          >
            <Meta title="Random location" description="............." />
          </Card>
        ))}
      </div>
    </>
  );
}
