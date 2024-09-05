import baseUrl from "@/api/defaultPath.js";

export class AdminService {

  getUserInfo() {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    };
    return fetch(`${baseUrl}/backoffice/bs/admin/session-info`, requestOptions)
        .then((res) => res.json())
        .then((d) => d);
  }

  getAdmin(params) {
    const urlParams = new URLSearchParams(params);
    const url = `http://localhost:30871/backoffice/bs/admin?${urlParams}`

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


  getAdmins(params) {
    const urlParams = new URLSearchParams(params);
    const url = `${baseUrl}/backoffice/bs/admins?${urlParams}`

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

  createAdmin(dataToSend) {
    const url = `${baseUrl}/backoffice/bs/admin`

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

  updateAdmin(dataToSend) {
    const url = `${baseUrl}/backoffice/bs/admin`

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

  deleteAdmin(dataToSend) {
    const url = `${baseUrl}/backoffice/bs/admin`

    const requestOptions = {
      credentials: 'include',
      method: 'DELETE',
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

  unlockAdmin(dataToSend) {
    const url = `${baseUrl}/backoffice/bs/admin/unlock`

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

}