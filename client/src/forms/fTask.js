import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

const { TextArea } = Input;

export default function({ type }) {

  return (
    <Form style={{ width: "50%", minWidth: "300px" }}>
      <Form.Item>
        <Input
          prefix={<Icon type="file-text" style={{ color: "rgba(0,0,0,.25)" }} />}
          placeholder="naslov"
        />
      </Form.Item>
      <Form.Item>   
        <TextArea placeholder="dodaten opis" rows={4} />
      </Form.Item>
      <Form.Item>
        <Button type="primary" icon="file" shape="round" htmlType="submit" className="login-form-button">
          { type == 'edit' ? 'Posodobi' : 'Dodaj' }
        </Button>
      </Form.Item>
    </Form>
  );
}
