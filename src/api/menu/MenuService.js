export class MenuService {

  getMenus(params) {
    const urlParams = new URLSearchParams(params);
    const url = `http://localhost:30871/backoffice/bs/menus`

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