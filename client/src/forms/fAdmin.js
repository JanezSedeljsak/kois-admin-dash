import {
  Form,
  Input,
  Tooltip,
  Icon,
  Cascader,
  Select,
  Row,
  Col,
  Checkbox,
  Button,
  AutoComplete
} from "antd";
import React, { useState } from "react";

const { Option } = Select;
const AutoCompleteOption = AutoComplete.Option;

function RegistrationForm({ form }) {
  const [confirmDirty, setConfirmDirty] = useState(false);
  const { getFieldDecorator } = form;

  const handleSubmit = e => {
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log("Received values of form: ", values);
      }
    });
  };

  const handleConfirmBlur = e => {
    const { value } = e.target;
    setConfirmDirty(confirmDirty || !!value);
  };

  const compareToFirstPassword = (rule, value, callback) => {
    if (value && value !== form.getFieldValue("password")) {
      callback("Two passwords that you enter is inconsistent!");
    } else {
      callback();
    }
  };

  const validateToNextPassword = (rule, value, callback) => {
    if (value && confirmDirty) {
      form.validateFields(["confirm"], { force: true });
    }
    callback();
  };

  return (
    <Form style={{ width: "50%" }} onSubmit={handleSubmit}>
      <Form.Item label="ime & priimek">
        {getFieldDecorator("fullname", {
          rules: [
            {
              required: true,
              message: "Prosimo vnesite vaše ime & priimek!"
            }
          ]
        })(<Input />)}
      </Form.Item>
      <Form.Item label="e-pošta">
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
        })(<Input />)}
      </Form.Item>
      <Form.Item label="geslo" hasFeedback>
        {getFieldDecorator("password", {
          rules: [
            {
              required: true,
              message: "Prosimo vnesite vaše geslo!"
            },
            {
              validator: validateToNextPassword
            }
          ]
        })(<Input.Password />)}
      </Form.Item>
      <Form.Item label="potrdi geslo" hasFeedback>
        {getFieldDecorator("confirm", {
          rules: [
            {
              required: true,
              message: "Prosimo ponovite geslo!"
            },
            {
              validator: compareToFirstPassword
            }
          ]
        })(<Input.Password onBlur={handleConfirmBlur} />)}
      </Form.Item>
      <Form.Item>
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
  );
}

export default Form.create({ name: "admin" })(RegistrationForm);
