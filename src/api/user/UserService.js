export class UserService {

  getUserInfo() {
    return fetch('/fake/api/data/userInfo.json', { headers: {'Cache-Control': 'no-cache'} })
        .then((res) => res.json())
        .then((d) => d);
  }

}