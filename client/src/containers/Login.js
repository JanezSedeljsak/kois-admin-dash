import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";
import API from "./../common/apimethods";
import { Redirect } from "react-router-dom";

function LoginForm({ form }) {
  const { getFieldDecorator } = form;
  const [logInSuccess, redirect] = useState(false);

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll(async (err, values) => {
      if (!err) {
        let result = await API.login(values);
        if (result.statusText == "OK") {
          localStorage.setItem("_kToken", result.data.token);
          redirect(true);
        }
      }
    });
  };

  return (
    <>
      { logInSuccess && <Redirect to="/" /> }
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
    </>
  );
}

export default Form.create({ name: "login" })(LoginForm);
