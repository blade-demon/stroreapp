import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Activity } from '../../models/activity';
import { Api } from '../api/api';

@Injectable()
export class Activities {

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any) {
    return this.api.get('/activities.json', params)
      .map(resp => resp.json());
  }

  add(activity: Activity) {
  }

  delete(activity: Activity) {
  }

}
