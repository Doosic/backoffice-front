import baseUrl from "@/api/defaultPath.js";


export class MenuService {

  getMenus(params) {
    const urlParams = new URLSearchParams(params);
    const url = `${baseUrl}/backoffice/bs/menus`

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

  getMenuKeys(params) {
    const urlParams = new URLSearchParams(params);
    const url = `${baseUrl}/backoffice/bs/menu-keys?${urlParams}`

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

  getAllMenu() {
    const url = `${baseUrl}/backoffice/bs/all-menu`

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

  getAllFuncAndMenu() {
    const url = `${baseUrl}/backoffice/bs/all-auth-menu`

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