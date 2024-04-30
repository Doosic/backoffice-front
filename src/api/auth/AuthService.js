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
}