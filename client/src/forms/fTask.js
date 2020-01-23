import React, { useState, useEffect } from "react";
import { Form, Icon, Input, Button, Checkbox } from "antd";

const { TextArea } = Input;

function TaskForm({ form, type }) {
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  return (
    <Form style={{ width: "50%", minWidth: "300px" }} onSubmit={handleSubmit}>
      <Form.Item label="naslov" hasFeedback>
        {getFieldDecorator("title", {
          rules: [
            {
              required: true,
              message: "Prosimo vnesite naslov!"
            }
          ]
        })(
          <Input
            prefix={<Icon type="file-text" style={{ color: "rgba(0,0,0,.25)" }} />}
          />
        )}
      </Form.Item>
      <Form.Item label="opis" hasFeedback>
      {getFieldDecorator("description", {
          rules: [
            {
              required: true,
              message: "Prosimo vnesite opis!"
            }
          ]
        })(
            <TextArea rows={4} />
        )}
        
      </Form.Item>
      <Form.Item>
        <Button
          type="primary"
          icon="file"
          shape="round"
          htmlType="submit"
          className="login-form-button"
        >
          {type == "edit" ? "Posodobi" : "Dodaj"}
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: "task" })(TaskForm);
