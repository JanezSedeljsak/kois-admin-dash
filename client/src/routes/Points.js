import React, { useState } from "react";
import { Card, Button } from "antd";

const { Meta } = Card;

export default function() {
  return (
    <>
      <Button type="primary" shape="round" icon="plus" size={"large"} >Dodaj novo točko</Button>
      <hr />
      <div
        style={{
          display: "flex",
          flexFlow: "row wrap",
          position: "relative"
        }}
      >
        {[1, 2, 3, 4, 5, 6, 7, 8].map(item => (
          <Card
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
