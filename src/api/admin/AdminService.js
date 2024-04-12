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
    return fetch('http://localhost:30871/backoffice/bs/admin/session-info', requestOptions)
        .then((res) => res.json())
        .then((d) => d);
  }

  getAdmins() {
    const requestOptions = {
      credentials: 'include',
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache',
      },
    };
    return fetch('http://localhost:30871/backoffice/bs/admins', requestOptions)
        .then((res) => res.json())
        .then((d) => d);
  }

}