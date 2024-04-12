export class LoginService {

  isLogin(dataToSend) {
    const requestOptions = {
      credentials: 'include',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache'
      },
      body: JSON.stringify(dataToSend)
    };

    return fetch('http://localhost:30871/backoffice/login', requestOptions)
        .then((res) => res.json())
        .then((d) => d);
  }

}