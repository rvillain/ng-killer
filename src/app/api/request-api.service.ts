import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { GenericApiService } from './generic-api.service';


import {Request} from '../model/model';

@Injectable()
export class RequestApiService  extends GenericApiService<Request>{

  constructor(http: HttpClient) {
    super(http);
    this.controllerName = 'requests';
  }
  push(obj: Request): Observable<Request> {
    const endPoint = '/push';
      return this.http
          .post(this.apiUrl + this.controllerName + endPoint, obj)
          .map((res: Response) => this.manageSuccess(res, null, false))
          .catch((error: any) => this.manageError(error));

  }
}
