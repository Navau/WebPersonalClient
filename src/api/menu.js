import { BASE_PATH, API_VERSION } from "./config";

export function getMenusApi() {
  const url = `${BASE_PATH}/${API_VERSION}/menus`;

  const params = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err.message;
    });
}

export function updateMenuApi(token, idMenu, data) {
  const url = `${BASE_PATH}/${API_VERSION}/update-menu/${idMenu}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(data),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function activateMenuApi(token, idMenu, status) {
  const url = `${BASE_PATH}/${API_VERSION}/activate-menu/${idMenu}`;

  const params = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify({ active: status }),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function addMenuApi(token, menu) {
  const url = `${BASE_PATH}/${API_VERSION}/add-menu`;

  const params = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
    body: JSON.stringify(menu),
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}

export function deleteMenuApi(token, idMenu) {
  const url = `${BASE_PATH}/${API_VERSION}/delete-menu/${idMenu}`;

  const params = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: token,
    },
  };

  return fetch(url, params)
    .then((response) => {
      return response.json();
    })
    .then((result) => {
      return result;
    })
    .catch((err) => {
      return err;
    });
}
