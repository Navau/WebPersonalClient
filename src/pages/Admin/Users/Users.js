import React, { useState, useEffect } from "react";

import ListUsers from "../../../components/Admin/Users/ListUsers";

import useAuth from "../../../hooks/useAuth";

import { getAccessTokenApi } from "../../../api/auth";
import { getUsersActiveApi } from "../../../api/user";

import "./Users.scss";

export default function Users() {
  const { user, isLoading } = useAuth();
  // console.log("USUARIO: ", user);
  // console.log("isLoading: ", isLoading);
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);

  const token = getAccessTokenApi();

  useEffect(() => {
    if (user) {
      getUsersActiveApi(token, true)
        .then((response) => {
          setUsersActive(response.users);
        })
        .catch((err) => {
          console.log(err);
        });
      getUsersActiveApi(token, false)
        .then((response) => {
          setUsersInactive(response.users);
        })
        .catch((err) => {
          console.log(err);
        });
      setReloadUsers(false);
    }
  }, [token, reloadUsers]);

  if (user.role !== "admin") {
    return (
      <h1 style={{ textAlign: "center" }}>
        Ustéd no es un usuario administrador
      </h1>
    );
  }

  return (
    <div className="users">
      <ListUsers
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
}
