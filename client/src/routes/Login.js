import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

export default function Login() {

  return (
    <Form style={{ width: "50%", minWidth: "300px" }}>
      <Form.Item>
        <Input
          prefix={<Icon type="user" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="e-pošta"
        />
      </Form.Item>
      <Form.Item>
        <Input
          prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          placeholder="geslo"
        />
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="login-form-button">
          Prijava
        </Button>
      </Form.Item>
    </Form>
  );
}
