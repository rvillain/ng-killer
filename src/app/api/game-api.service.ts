// Imports
import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GenericApiService } from './generic-api.service';

import {Game, Mission} from '../model/model';

@Injectable()
export class GameApiService  extends GenericApiService<Game>{

  constructor(http: Http) {
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
  addMissions(id: any, missions: Mission[]): Observable<Game>{
    this.isLoading = true;
    const endPoint = '/' + id + '/missions';
    return this.http
        .post(this.apiUrl + this.controllerName + endPoint, {missions: missions})
        .map((res: Response) => this.manageSuccess(res, null, false))
        .catch((error: any) => this.manageError(error));
  }
}
