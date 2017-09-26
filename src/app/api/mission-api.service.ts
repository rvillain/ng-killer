import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import { GenericApiService } from './generic-api.service';


import {Mission} from '../model/model';

@Injectable()
export class MissionApiService  extends GenericApiService<Mission>{

  constructor(http: Http) {
    super(http);
    this.controllerName = 'missions';
  }

}
