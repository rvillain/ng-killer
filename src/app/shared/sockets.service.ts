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

  private url = (isDevMode() ? "http://localhost:5000/requesthub" : "https://ng-killer-api.azurewebsites.net/");

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
        setTimeout(this.start, 10000);
      });
  }

  public connect(gameId: number, agentId: string = null) {
    this.start(() => {
      this._hubConnection.send("JoinRoom", gameId.toString())
      this._hubConnection.on('Request', (request: Request) => {
        if (!agentId || agentId == request.receiverId) {
          this.observer.next(request);
        }
      });
    });
  }

  //Kill
  sendKillRequest(agent) {
    this.wsEmit('ask-kill', agent);
  }

  confirmKill(agent) {
    this.wsEmit('confirm-kill', agent);
  }

  unconfirmKill(agent) {
    this.wsEmit('unconfirm-kill', agent);
  }

  sendUnmaskRequest(agent, target) {
    this.wsEmit('ask-unmask', {}, agent.id, target.id);
  }

  confirmUnmask(agent) {
    this.wsEmit('confirm-unmask', agent);
  }

  unconfirmUnmask(agent) {
    this.wsEmit('unconfirm-unmask', agent);
  }

  //agent
  askAgentUpdate(agent) {
    this.wsEmit('agent-update', agent);
  }

  //Change mission
  sendChangeMissionRequest(agent) {
    this.wsEmit('change-mission', agent);
  }
  //Suicide
  sendSuicideRequest(agent) {
    this.wsEmit('suicide', agent);
  }
  //Agent
  newAgent(agent: Agent) {
    this.wsEmit('new-agent', agent, agent.id);
  }
  //game
  updateGameStatus(game: Game) {
    this.wsEmit('game-status', game);
  }

  wsEmit(type, data, em = null, re = null) {
    let req = new Request();
    req.type = type;
    req.data = JSON.stringify(data);
    req.emitterId = em;
    req.receiverId = re;
    this.requestApiService.push(req).subscribe(r => {
      console.log("emit", req);
    }, err => {
      console.log("err", err);
    });
    //this.subject.next(req);
  }

}


