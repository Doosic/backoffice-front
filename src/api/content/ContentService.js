export class ContentService {

  getContents(params) {
    const urlParams = new URLSearchParams(params);
    const url = `/fake/api/data/contentList.json`

    return fetch(url, { headers: {'Cache-Control': 'no-cache'} })
        .then((res) => res.json())
        .then((d) => d);
  }

}