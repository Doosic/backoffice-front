export class AuthService {
  getAuths(params) {
    const urlParams = new URLSearchParams(params);
    const url = `http://localhost:30871/backoffice/bs/auths?${urlParams}`

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
    const url = `http://localhost:30871/backoffice/bs/auth-menu`

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
    const url = `http://localhost:30871/backoffice/bs/auth-func`

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
    const url = `http://localhost:30871/backoffice/bs/auth-menu`

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