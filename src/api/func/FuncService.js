import baseUrl from "@/api/defaultPath.js";

export class FuncService {
  getAuthKeys(params) {
    const urlParams = new URLSearchParams(params);
    const url = `${baseUrl}/backoffice/bs/auth-keys?${urlParams}`

    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    };

    return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((d) => d);
  }

  getAllFunc() {
    const url = `${baseUrl}/backoffice/bs/all-auth`

    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    };

    return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((d) => d);
  }
}