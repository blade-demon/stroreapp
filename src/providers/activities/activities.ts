import 'rxjs/add/operator/map';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

import { Activity } from '../../models/activity';
import { Api } from '../api/api';

@Injectable()
export class ActivitiesProvider {

  constructor(public http: Http, public api: Api) {
  }

  query(params?: any) {
    return this.api.get('events', params)
      .map(resp => resp.json());
  }

  add(activity: Activity) {
  }

  delete(activity: Activity) {
  }

}
