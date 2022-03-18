import React, { useState } from "react";
import { Form, Input, Button, notification } from "antd";
import { UserOutlined } from "@ant-design/icons";

import { suscribeNewsletterApi } from "../../../api/newsletter";

import "./Newsletter.scss";

export default function Newsletter() {
  const [email, setEmail] = useState("");

  const onSubmit = () => {
    // eslint-disable-next-line no-unused-vars
    const emailValid =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    const resultValidation = emailValid.test(email);
    if (!resultValidation || !email) {
      notification["error"]({
        message: "El correo electrónico no es válido.",
      });
    } else {
      suscribeNewsletterApi(email)
        .then((response) => {
          if (response.code !== 200) {
            notification["warn"]({
              message: response.message,
            });
          } else {
            notification["success"]({
              message: response.message,
            });
          }
        })
        .catch((err) => {
          notification["error"]({
            message: err.message,
          });
        })
        .finally(() => {
          setEmail("");
        });
    }
  };

  return (
    <div className="newsletter">
      <h3>Newsletter</h3>
      <Form onSubmitCapture={onSubmit}>
        <Form.Item>
          <Input
            prefix={<UserOutlined style={{ color: "rgba(0, 0, 0, 0.25)" }} />}
            placeholder="Correo Electrónico"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="newsletter__button"
          >
            ¡Me suscribo!
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
