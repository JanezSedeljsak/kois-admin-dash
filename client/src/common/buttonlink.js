import { Link } from "react-router-dom";
import { Button } from "antd";
import React from "react";

export default function({ title, link, icon, css, shape }) {
  return (
    <>
      <Link to={link}>
        <Button type={css || 'primary'} icon={icon} shape={shape || 'round'} size={"large"} >
            {title}
        </Button>
      </Link>
    </>
  );
}
