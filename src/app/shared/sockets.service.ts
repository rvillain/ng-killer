import { Injectable, isDevMode, OnInit } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { RequestApiService } from '../api/request-api.service';
import { Request } from '../model/model';
import { HubConnection } from '@aspnet/signalr';

import { Agent, Action, Game, Tribunal, Vote } from "../model/model";
import { ActionsService } from './actions.service';

@Injectable()
export class SocketsService {

  private _hubConnection: HubConnection;

  private observer: Subscriber<Request>;
  public requests: Observable<Request>;

  private url = (isDevMode() ? "http://localhost:5000/requesthub" : "https://ng-killer-api.azurewebsites.net/requesthub");
  private gameId: number;

  constructor(public actionsService: ActionsService, public requestApiService: RequestApiService) {
    this._hubConnection = new HubConnection(this.url);
    this.requests= new Observable<Request>(observer=> this.observer = observer);
  }
  
  private start(callback: any) {
    this._hubConnection.start()
      .then(() => {
        console.log('Hub connection started')
        if (callback) {
          callback();
        }
      })
      .catch(() => {
        console.log('Error while establishing connection')
        setTimeout(()=>{this.start(callback)}, 1000);
      });
      this._hubConnection.onclose(()=>{
        console.log('reconnecting')
        this.start(callback);
      });
  }

  public connect(gameId: number, agentId: string = null) {
    this.gameId = gameId;
    this.start(() => {
      this._hubConnection.send("JoinRoom", this.gameId.toString());
      this._hubConnection.on('Request', (request: any) => {
        if (!agentId || agentId == request.receiverId) {
          this.observer.next(request);
        }
      });
    });
  }

  //Kill
  sendKillRequest(agent): Observable<Request> {
    return this.pushRequest('ask-kill', {}, agent.id, agent.targetId, null, true);
  }

  confirmKill(agent, parentRequest: Request): Observable<Request> {
    return this.pushRequest('confirm-kill', {}, agent.id, parentRequest.emitterId, parentRequest.id, true);
  }

  unconfirmKill(agent, parentRequest: Request): Observable<Request> {
    return this.pushRequest('unconfirm-kill', {}, agent.id, parentRequest.emitterId, parentRequest.id, true);
  }

  sendUnmaskRequest(agent, target): Observable<Request> {
    return this.pushRequest('ask-unmask', {}, agent.id, target.id, null, true);
  }

  confirmUnmask(agent, parentRequest: Request): Observable<Request> {
    return this.pushRequest('confirm-unmask', {}, agent.id, agent.targetId, parentRequest.id, true);
  }

  unconfirmUnmask(agent, parentRequest: Request): Observable<Request> {
    return this.pushRequest('unconfirm-unmask', {}, agent.id, agent.targetId, parentRequest.id, true);
  }

  //Change mission
  sendChangeMissionRequest(agent): Observable<Request> {
    return this.pushRequest('change-mission', {}, agent.id, null, null, true);
  }
  //Suicide
  sendSuicideRequest(agent): Observable<Request> {
    return this.pushRequest('suicide', {}, agent.id, null, null, true);
  }

  pushRequest(type, data, em = null, re = null, parentId: number = null, subscribe = false) {
    let req = new Request();
    req.type = type;
    req.data = JSON.stringify(data);
    req.emitterId = em;
    req.receiverId = re;
    req.parentRequestId = parentId;
    req.gameId = this.gameId;
    if(subscribe){
      return this.requestApiService.push(req);
    }
    else{
      this.requestApiService.push(req).subscribe(r => {
          console.log("emit", req);
        }, err => {
          console.log("err", err);
        });
    }
    //this.subject.next(req);
  }

}


