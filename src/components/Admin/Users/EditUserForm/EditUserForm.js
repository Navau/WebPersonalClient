import React, { useState, useEffect, useCallback } from "react";
import {
  Avatar,
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification,
} from "antd";
import {
  UserOutlined,
  MailOutlined,
  LockOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { useDropzone } from "react-dropzone";

import {
  getAvatarApi,
  uploadAvatarApi,
  updateUserApi,
} from "../../../../api/user";
import { getAccessTokenApi } from "../../../../api/auth";

import NoAvatar from "../../../../assets/img/png/no-avatar.png";

import "./EditUserForm.scss";

export default function EditUserForm(props) {
  const { user, setIsVisible, setReloadUsers } = props;
  const [avatar, setAvatar] = useState(null);
  const [formData, setFormData] = useState(defaultEditFormData(user));

  useEffect(() => {
    setFormData(defaultEditFormData(user));
  }, [user]);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setFormData({ ...formData, avatar: avatar.file });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [avatar]);

  const updateUser = (e) => {
    // e.preventDefault();
    const token = getAccessTokenApi();
    let userUpdate = formData;

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "Las contraseñas tienen que ser iguales.",
        });
        return;
      } else {
        delete userUpdate.repeatPassword;
      }
    }

    if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
      notification["error"]({
        message:
          "El nombre, apellidos y el correo electrónico son obligatorios.",
      });
      return;
    }

    if (isObject(userUpdate.avatar)) {
      console.log("IF AVATAR", userUpdate);
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id)
          .then((result) => {
            notification["success"]({
              message: result.message,
            });
            setIsVisible(false);
            setReloadUsers(true);
          })
          .catch((err) => {
            setIsVisible(true);
            notification["error"]({
              message: "Error al actualizar el usuario: " + err,
            });
          });
      });
    } else {
      updateUserApi(token, userUpdate, user._id)
        .then((result) => {
          notification["success"]({
            message: result.message,
          });
          setIsVisible(false);
          setReloadUsers(true);
        })
        .catch((err) => {
          setIsVisible(true);
          notification["error"]({
            message: "Error al actualizar el usuario: " + err,
          });
        })
        .finally(() => {
          setFormData(defaultEditFormData(user));
        });
    }
  };

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        formData={formData}
        setFormData={setFormData}
        updateUser={updateUser}
      />
    </div>
  );
}

function UploadAvatar(props) {
  const { avatar, setAvatar } = props;
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpeg, image/png",
    noKeyboard: true,
    onDrop,
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatar ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
}

function EditForm(props) {
  const { formData, setFormData, updateUser } = props;

  const { Option } = Select;

  return (
    <Form className="form-edit" onSubmitCapture={updateUser}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
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
              menuItemSelectedIcon={<SolutionOutlined />}
              placeholder="Seleccioná un Rol"
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
              prefix={<LockOutlined />}
              type="password"
              placeholder="Contraseña"
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input.Password
              prefix={<LockOutlined />}
              type="password"
              placeholder="Repetir Contraseña"
              onChange={(e) =>
                setFormData({ ...formData, repeatPassword: e.target.value })
              }
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item>
        <Button type="primary" htmlType="submit" className="btn-submit">
          Actualizar Usuario
        </Button>
      </Form.Item>
    </Form>
  );
}

function defaultEditFormData(user) {
  return {
    name: user.name !== "Sin Nombre" ? user.name : "",
    lastname: user.lastname !== "Sin Apellidos" ? user.lastname : "",
    email: user.email,
    role: user.role,
    avatar: user.avatar ? user.avatar : null,
  };
}

function isObject(val) {
  if (val === null) {
    return false;
  }
  return typeof val === "function" || typeof val === "object";
}
