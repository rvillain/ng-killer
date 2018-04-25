import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { GenericApiService } from './generic-api.service';

import {Agent, Action, Device} from '../model/model';

@Injectable()
export class AgentApiService extends GenericApiService<Agent> {

  addDevice(id: string, device: Device): any {
    const endPoint = '/' + id + '/addDevice';
    return this.http
        .post(this.apiUrl + this.controllerName + endPoint, device)
        .map((res: Response) => this.manageSuccess(res, null, false))
        .catch((error: any) => this.manageError(error));
  }
  constructor(http: HttpClient) {
    super(http);
    this.controllerName = 'agents';
  }
  // kill(id: string, code: string): Observable<Action> {
  //   const endPoint = '/' + id + '/kill';
  //   return this.http
  //       .post(this.apiUrl + this.controllerName + endPoint, {code: code})
  //       .map((res: Response) => this.manageSuccess(res, null, false))
  //       .catch((error: any) => this.manageError(error));
  // }
  getForUnmask(id: String): Observable<Agent[]> {
    const endPoint = '/' + id + '/getForUnmask';
    return this.http
        .get(this.apiUrl + this.controllerName + endPoint)
        .map((res: Response) => this.manageSuccess(res, null, false))
        .catch((error: any) => this.manageError(error));
  }

}
