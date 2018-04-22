// Imports
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { GenericApiService } from './generic-api.service';

import {Game, Mission} from '../model/model';

@Injectable()
export class GameApiService  extends GenericApiService<Game>{

  constructor(http: HttpClient) {
    super(http);
    this.controllerName = 'games';
  }
  start(id: any): Observable<Game> {
    this.isLoading = true;
    const endPoint = '/' + id + '/start';
    return this.http
        .post(this.apiUrl + this.controllerName + endPoint, {})
        .map((res: Response) => this.manageSuccess(res, null, false))
        .catch((error: any) => this.manageError(error));
  }
  reinit(id: any): Observable<Game> {
    this.isLoading = true;
    const endPoint = '/' + id + '/reinit';
    return this.http
        .post(this.apiUrl + this.controllerName + endPoint, {})
        .map((res: Response) => this.manageSuccess(res, null, false))
        .catch((error: any) => this.manageError(error));
  }
  addMissions(id: any, level: string): Observable<any>{
    this.isLoading = true;
    const endPoint = '/' + id + '/importmissions';
    const headers = new HttpHeaders().set('Content-Type', 'application/json; charset=utf-8');
    return this.http
        .post(this.apiUrl + this.controllerName + endPoint, '"'+level+'"', { headers: headers })
        .map((res: Response) => this.manageSuccess(res, null, false))
        .catch((error: any) => this.manageError(error));
  }
}
