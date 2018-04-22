import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { GenericApiService } from './generic-api.service';


import {Mission} from '../model/model';

@Injectable()
export class MissionApiService  extends GenericApiService<Mission>{

  import(missions: Array<Mission>): Observable<any> {
    const endPoint = '/import';
    return this.http
        .post(this.apiUrl + this.controllerName + endPoint, missions)
        .map((res: Response) => this.manageSuccess(res, null, false))
        .catch((error: any) => this.manageError(error));
  }
  constructor(http: HttpClient) {
    super(http);
    this.controllerName = 'missions';
  }

  getGenerics(): Observable<Mission[]> {
    this.isLoading = true;
    const endPoint = '/generics';
    return this.http
        .get(this.apiUrl + this.controllerName + endPoint, {})
        .map((res: Response) => this.manageSuccess(res, null, false))
        .catch((error: any) => this.manageError(error));
  }

}
