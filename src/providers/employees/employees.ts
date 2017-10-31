import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Api } from '../api/api';

@Injectable()
export class EmployeesProvider {
  constructor(public http: Http, public api: Api) { }

  login(params: any) {
    return this.api.post('employees', params).map(resp => resp.json());
  }
}
