import KoisLogo from "./../images/scvlogo.png";
import ScvLogo from "./../images/koislogo.png";
import React from "react";

export default function() {
  return (
    <>
      <div style={{ padding: 10 }}>
        <img
          style={{
            width: "100%",
            marginBottom: 15
          }}
          src={KoisLogo}
        />
        <img
          style={{
            width: "100%",
            padding: 20,
            paddingBottom: 0
          }}
          src={ScvLogo}
        />
      </div>
      <hr />
    </>
  );
}
