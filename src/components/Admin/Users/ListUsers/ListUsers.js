import React, { useState, useEffect } from "react";
import {
  Switch,
  List,
  Avatar,
  Button,
  notification,
  Modal as ModalAntd,
} from "antd";
import {
  EditFilled,
  StopFilled,
  DeleteFilled,
  CheckCircleFilled,
} from "@ant-design/icons";

import Modal from "../../../Modal";
import EditUserForm from "../EditUserForm";
import AddUserForm from "../AddUserForm";

import NoAvatar from "../../../../assets/img/png/no-avatar.png";

import {
  getAvatarApi,
  activeUserApi,
  deleteUserApi,
} from "../../../../api/user";

import { getAccessTokenApi } from "../../../../api/auth";

import "./ListUsers.scss";

const { confirm } = ModalAntd;

export default function ListUsers(props) {
  const { usersActive, usersInactive, setReloadUsers } = props;
  const [showUsersActive, setShowUsersActive] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [titleModal, setTitleModal] = useState("");
  const [contentModal, setContentModal] = useState("");

  const addUserModal = () => {
    setIsVisible(true);
    setTitleModal("Creando un nuevo Usuario");
    setContentModal(
      <AddUserForm
        setIsVisible={setIsVisible}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  const showDeleteUserConfirm = (user) => {
    const accessToken = getAccessTokenApi();

    confirm({
      title: "Eliminando un Usuario",
      content: `¿Estas seguro de que quieres eliminar a ${user.email}?`,
      okText: "Eliminar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteUserApi(accessToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response,
            });
          })
          .catch((err) => {
            console.log(err);
            notification["error"]({
              message: err,
            });
          })
          .finally(() => {
            setReloadUsers(true);
          });
      },
    });
  };

  // console.log("USERS_ACTIVE", usersActive);
  // console.log("USERS_INACTIVE", usersInactive);

  return (
    <div className="list-users">
      <div className="list-users__header">
        <div className="list-users__header__switch">
          <Switch
            defaultChecked
            onChange={() => setShowUsersActive(!showUsersActive)}
          />

          <span>
            {showUsersActive ? "USUARIOS ACTIVOS" : "USUARIOS INACTIVOS"}
          </span>
        </div>
        <Button type="primary" onClick={addUserModal}>
          Nuevo Usuario
        </Button>
      </div>

      {showUsersActive ? (
        <UsersActive
          usersActive={usersActive}
          setIsVisible={setIsVisible}
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
          setReloadUsers={setReloadUsers}
          showDeleteUserConfirm={showDeleteUserConfirm}
        />
      ) : (
        <UsersInactive
          usersInactive={usersInactive}
          setIsVisible={setIsVisible}
          setTitleModal={setTitleModal}
          setContentModal={setContentModal}
          setReloadUsers={setReloadUsers}
          showDeleteUserConfirm={showDeleteUserConfirm}
        />
      )}
      <Modal
        title={titleModal}
        isVisible={isVisible}
        setIsVisible={setIsVisible}
      >
        {contentModal}
      </Modal>
    </div>
  );
}

function UsersActive(props) {
  const {
    usersActive,
    setIsVisible,
    setContentModal,
    setTitleModal,
    setReloadUsers,
    showDeleteUserConfirm,
  } = props;

  const editUser = (user) => {
    setIsVisible(true);
    setTitleModal(
      `Editar ${user.name ? user.name : "..."} ${
        user.lastname ? user.lastname : "..."
      }`
    );
    setContentModal(
      <EditUserForm
        user={user}
        setIsVisible={setIsVisible}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UserActive
          user={user}
          editUser={editUser}
          setReloadUsers={setReloadUsers}
          showDeleteUserConfirm={showDeleteUserConfirm}
        />
      )}
    />
  );
}

function UserActive(props) {
  const { user, editUser, setReloadUsers, showDeleteUserConfirm } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactiveUser = () => {
    const accessToken = getAccessTokenApi();

    activeUserApi(accessToken, user._id, false)
      .then((response) => {
        notification["success"]({
          message: response.message,
        });
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      })
      .finally(() => {
        setReloadUsers(true);
      });
  };

  return (
    <List.Item
      actions={[
        <Button
          type="primary"
          onClick={() => editUser(user)}
          icon={<EditFilled />}
        />,
        <Button type="danger" onClick={desactiveUser} icon={<StopFilled />} />,
        <Button
          type="danger"
          onClick={() => showDeleteUserConfirm(user)}
          icon={<DeleteFilled />}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                    ${user.name ? user.name : "..."} 
                    ${user.lastname ? user.lastname : "..."}
                `}
        description={user.email}
      />
    </List.Item>
  );
}

function UsersInactive(props) {
  const { usersInactive, setReloadUsers, showDeleteUserConfirm } = props;
  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UserInactive
          user={user}
          setReloadUsers={setReloadUsers}
          showDeleteUserConfirm={showDeleteUserConfirm}
        />
      )}
    />
  );
}

function UserInactive(props) {
  const { user, setReloadUsers, showDeleteUserConfirm } = props;
  const [avatar, setAvatar] = useState(null);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const activeUser = () => {
    const accessToken = getAccessTokenApi();

    activeUserApi(accessToken, user._id, true)
      .then((response) => {
        notification["success"]({
          message: response.message,
        });
      })
      .catch((err) => {
        notification["error"]({
          message: err,
        });
      })
      .finally(() => {
        setReloadUsers(true);
      });
  };

  return (
    <List.Item
      actions={[
        <Button
          type="primary"
          onClick={activeUser}
          icon={<CheckCircleFilled />}
        />,
        <Button
          type="danger"
          onClick={() => showDeleteUserConfirm(user)}
          icon={<DeleteFilled />}
        />,
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`
                      ${user.name ? user.name : "..."} 
                      ${user.lastname ? user.lastname : "..."}
                  `}
        description={user.email}
      />
    </List.Item>
  );
}
