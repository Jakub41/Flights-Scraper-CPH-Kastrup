import { Injectable } from '@angular/core';
import { Http, Headers, Response, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

let isDev: boolean = true;
let apiUrl: string;

if (!isDev) {
  apiUrl = '';
} else {
  apiUrl = 'https://scraperapi.jakublemiszewski.com/api/';
}
// https://scraperapi.jakublemiszewski.com/api/ -> For API Production
// http://localhost:5000/api/ -> For Dev

@Injectable()
export class HttpService {

  private headers = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  };

  constructor(private http: Http) { }

  public resetHeaders(): void {
    this.headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    };
  }

  public updateHeader(key: string, value: string) {
    this.headers[key] = value;
  }

  public clearToken(key: string): void {
    delete this.headers[key];
  }

  public get(url: string, params: any = {}) {
    url = `${apiUrl}${url}`;
    return this.request('get', url, {}, params);
  }

  public post(url: string, body: any = {}, params: any = {}) {
    url = `${apiUrl}${url}`;
    return this.request('post', url, body, params);
  }

  public put(url: string, body: any = {}, params: any = {}) {
    return this.request('put', url, body, params);
  }

  public patch(url: string, data: any = {}) {
    url = `${apiUrl}${url}`;
    let headers = new Headers(this.headers);
    let options = new RequestOptions({ headers });
    console.log(headers);
    return this.request('patch', url, data);
  }

  public delete(url: string) {
    url = `${apiUrl}${url}`;
    let headers = new Headers(this.headers);
    let options = new RequestOptions({ headers });
    return this.http.delete(url, options)
  }

  private request(method: string, url: string, body: any = {}, params: any = {}) {
    let headers = new Headers(this.headers);

    let endsInSlashOrParams = /.*\/$|.*\?.*/g;
    if (!endsInSlashOrParams.test(url)) {
      url += '/';
    }

    // build param string
    let paramStr = Object.keys(params).reduce((acc, cur, i) => `${acc}${i > 0 ? '&' : ''}${cur}=${params[cur]}`, '');

    let options = new RequestOptions({ headers, search: paramStr });
    let obs: any;

    if (method.toLowerCase() === 'get') {
      obs = this.http[method](url, options);
    } else {
      obs = this.http[method](url, body, options);
    }

    return obs.map((res: Response) => {
      try {
        return res.json();
      } catch (e) {
        console.log(e);
      }

      return {};
    });
  }

  getSearchQuery(params, url) {
    url = `${apiUrl}${url}`;
    return this.http.get(url +"/?keyword="+params.searchInput+"&direction="+params.direction+"&date="+params.date+"&time="+params.time).map((res: Response) => res.json());
  }

  getInputSearch(params) {
    let url = `${apiUrl}`;
    return this.http.get(url +"SearchBox/Search?language="+params.language+"&direction="+params.direction+"&phrase="+params.phrase).map((res: Response) => res.json());
  }

}
