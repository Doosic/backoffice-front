import baseUrl from "@/api/defaultPath.js";

export class AuthService {
  getAuths(params) {
    const urlParams = new URLSearchParams(params);
    const url = `${baseUrl}/backoffice/bs/auths?${urlParams}`

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

  createAuthAndMenu(dataToSend) {
    const url = `${baseUrl}/backoffice/bs/auth-menu`

    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(dataToSend)
    };

    return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((d) => d);
  }

  createAuthAndFunc(dataToSend) {
    const url = `${baseUrl}/backoffice/bs/auth-func`

    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(dataToSend)
    };

    return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((d) => d);
  }

  updateAuthAndMenu(dataToSend) {
    const url = `${baseUrl}/backoffice/bs/auth-menu`

    const requestOptions = {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(dataToSend)
    };

    return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((d) => d);
  }

  updateAuthAndFunc(dataToSend) {
    const url = `${baseUrl}/backoffice/bs/auth-func`

    const requestOptions = {
      credentials: 'include',
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
      body: JSON.stringify(dataToSend)
    };

    return fetch(url, requestOptions)
        .then((res) => res.json())
        .then((d) => d);
  }
}