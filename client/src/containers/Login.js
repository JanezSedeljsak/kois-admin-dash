import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

function LoginForm({ form }) {
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  }

  return (
    <Form style={{ width: "50%", minWidth: "300px" }} onSubmit={handleSubmit}>
      <Form.Item label="e-pošta" hasFeedback>
        {getFieldDecorator("email", {
          rules: [
            {
              type: "email",
              message: "Neveljavna e-pošta!"
            },
            {
              required: true,
              message: "Prosimo vnesite vašo e-pošto!"
            }
          ]
        })(
          <Input
            prefix={<Icon type="mail" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        )}
      </Form.Item>
      <Form.Item label="geslo" hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Prosimo vnesite vaše geslo!"
            }
          ]
        })(
          <Input.Password
            prefix={<Icon type="lock" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        )}
      </Form.Item>
      <Form.Item>
        <Button type="primary" shape="round" icon="user" htmlType="submit">
          Prijava
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: "login" })(LoginForm);
