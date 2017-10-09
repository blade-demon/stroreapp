import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Api } from '../api/api';

@Injectable()
export class StoresProvider {

  constructor(public http: Http, public api: Api) {}

  query(params?: any) {
    return this.api.get('stores', params)
      .map(resp => resp.json());
  }
}
