import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import {
  emailValidation,
  minLenghtValidation,
} from "../../../utils/formValidation";

import { map } from "lodash";

import { signUpApi } from "../../../api/user";

import "./RegisterForm.scss";

export default function RegisterForm() {
  const [formData, setFormData] = useState(defaultFormData());

  const [formValid, setFormValid] = useState(defaultFormValid());

  const onChange = (e) => {
    if (e.target.name === "privacyPolicy") {
      setFormData({ ...formData, [e.target.name]: e.target.checked });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const onSubmit = async (e) => {
    // e.preventDefault();
    const emailValue = formData.email;
    const passwordValue = formData.password;
    const repeatPasswordValue = formData.repeatPassword;
    const privacyPolicyValue = formData.privacyPolicy;

    if (
      !emailValue ||
      !passwordValue ||
      !repeatPasswordValue ||
      !privacyPolicyValue
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios",
      });
    } else {
      if (passwordValue !== repeatPasswordValue) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales",
        });
      } else {
        const result = await signUpApi(formData);

        if (!result.ok) {
          notification["error"]({
            message: result.message,
          });
        } else {
          notification["success"]({
            message: result.message,
          });
          resetForm();
        }
      }
    }
  };

  const inputValidation = (e) => {
    const { type, name } = e.target;

    if (name === "email") {
      setFormValid({ ...formValid, [name]: emailValidation(e.target) });
    }
    if (name === "password") {
      setFormValid({ ...formValid, [name]: minLenghtValidation(e.target, 6) });
    }
    if (name === "repeatPassword") {
      setFormValid({ ...formValid, [name]: minLenghtValidation(e.target, 6) });
    }
    if (type === "checkbox") {
      setFormValid({ ...formValid, [name]: e.target.checked });
    }
  };

  const resetForm = () => {
    const inputs = document.getElementsByTagName("input");
    map(inputs, (item, index) => {
      item.classList.remove("success");
      item.classList.remove("error");
    });

    setFormData(defaultFormData());
    setFormValid(defaultFormValid());
  };

  return (
    <Form
      className="register-form"
      onChange={onChange}
      onSubmitCapture={onSubmit}
    >
      <Form.Item>
        <Input
          prefix={<UserOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="email"
          name="email"
          placeholder="Correo Electrónico"
          className="register-form__input"
          onChange={inputValidation}
          value={formData.email}
        />
      </Form.Item>
      <Form.Item>
        <Input.Password
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="password"
          placeholder="Contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={formData.password}
        />
      </Form.Item>
      <Form.Item>
        <Input.Password
          prefix={<LockOutlined style={{ color: "rgba(0,0,0,.25)" }} />}
          type="password"
          name="repeatPassword"
          placeholder="Repetir Contraseña"
          className="register-form__input"
          onChange={inputValidation}
          value={formData.repeatPassword}
        />
      </Form.Item>
      <Form.Item>
        <Checkbox
          name="privacyPolicy"
          checked={formData.privacyPolicy}
          onChange={inputValidation}
        >
          He leído y acepto la política de privacidad.
        </Checkbox>
      </Form.Item>
      <Form.Item>
        <Button htmlType="submit" className="register-form__button">
          Crear Cuenta
        </Button>
      </Form.Item>
    </Form>
  );
}

function defaultFormData() {
  return {
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false,
  };
}

function defaultFormValid() {
  return {
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false,
  };
}
