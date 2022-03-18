import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { UserOutlined, MailOutlined, LockOutlined } from "@ant-design/icons";

import { signUpAdminApi } from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import "./AddUserForm.scss";

export default function AddUserForm(props) {
  const { setIsVisible, setReloadUsers } = props;
  const [formData, setFormData] = useState({});

  const addUser = (e) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.lastname ||
      !formData.role ||
      !formData.email ||
      !formData.password ||
      !formData.repeatPassword
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios.",
      });
    } else if (formData.password !== formData.repeatPassword) {
      notification["error"]({
        message: "Las contraseñas tienen que ser iguales",
      });
    } else {
      const accessToken = getAccessTokenApi();

      signUpAdminApi(accessToken, formData)
        .then((response) => {
          notification["success"]({
            message: response.message,
          });
        })
        .catch((err) => {
          notification["success"]({
            message: err.message,
          });
        })
        .finally(() => {
          setIsVisible(false);
          setReloadUsers(true);
          setFormData({});
        });
    }
  };

  return (
    <div className="add-user-form">
      <AddForm
        formData={formData}
        setFormData={setFormData}
        addUser={addUser}
      />
    </div>
  );
}

function AddForm(props) {
  const { formData, setFormData, addUser } = props;
  const { Option } = Select;

  return (
    <Form className="form-add" onSubmitCapture={addUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="text"
              prefix={<UserOutlined />}
              placeholder="Nombre"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Apellidos"
              value={formData.lastname}
              onChange={(e) =>
                setFormData({ ...formData, lastname: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              type="email"
              prefix={<MailOutlined />}
              placeholder="Correo Electrónico"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Selecciona un Rol"
              onChange={(e) => setFormData({ ...formData, role: e })}
              value={formData.role}
            >
              <Option value="admin">Administrador</Option>
              <Option value="editor">Editor</Option>
              <Option value="reviewer">Revisor</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input.Password
              type="password"
              prefix={<LockOutlined />}
              placeholder="Contraseña"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input.Password
              type="password"
              prefix={<LockOutlined />}
              placeholder="Repetir Contraseña"
              value={formData.repeatPassword}
              onChange={(e) =>
                setFormData({ ...formData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Crear Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}
