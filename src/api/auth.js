import { BASE_PATH, API_VERSION } from "./config";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../utils/constants";
import jwtDecode from "jwt-decode";

export function getAccessTokenApi() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);

  if (!accessToken || accessToken === "null") {
    //VALIDACION SI SE TIENE UN TOKEN EN EL LOCALSTORAGE
    return null;
  }

  return willExpireToken(accessToken) ? null : accessToken;
}

export function getRefreshTokenApi() {
  const refreshToken = localStorage.getItem(REFRESH_TOKEN);

  if (!refreshToken || refreshToken === "null") {
    return null;
  }

  return willExpireToken(refreshToken) ? null : refreshToken;
}

export function refreshAccessTokenApi(refreshToken) {
  const url = `${BASE_PATH}/${API_VERSION}/refresh-access-token`;

  const bodyObject = {
    refreshToken: refreshToken,
  };

  const params = {
    method: "POST",
    body: JSON.stringify(bodyObject),
    headers: {
      "Content-Type": "application/json",
    },
  };

  fetch(url, params)
    .then((response) => {
      // console.log("RESPONSE: ", response);
      if (response.status !== 200) {
        return null;
      }

      return response.json();
    })
    .then((result) => {
      // console.log("RESULT", result);
      if (!result) {
        logOut();
      } else {
        const { accessToken, refreshToken } = result;
        localStorage.setItem(ACCESS_TOKEN, accessToken);
        localStorage.setItem(REFRESH_TOKEN, refreshToken);
      }
    })
    .catch((err) => {});
}

export function logOut() {
  localStorage.removeItem(ACCESS_TOKEN);
  localStorage.removeItem(REFRESH_TOKEN);
}

function willExpireToken(token) {
  const seconds = 60;
  const metaToken = jwtDecode(token);
  const { exp } = metaToken;
  const now = (Date.now() + seconds) / 1000; //OTRA FORMA DE CONVERTIR A FORMATO UNIX

  return now > exp; //FECHA DE AHORA VS FECHA DE EXPIRACION DEL TOKEN, TRUE = CADUCADO, FALSE = NO CADUCADO
}
