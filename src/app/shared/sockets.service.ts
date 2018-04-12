import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs';
import { RequestApiService } from '../api/request-api.service';
import { Request } from '../model/model';
import * as Rx from 'rxjs/Rx';
import * as io from 'socket.io-client';

import { Agent, Action, Game, Tribunal, Vote } from "../model/model";
import { ActionsService } from './actions.service';

@Injectable()
export class SocketsService {

 // const config: SocketIoConfig = { url: (isDevMode() ? "http://localhost:3000/" : "http://ng-killer-api.azurewebsites.net/"), options: {} };
  
  constructor(public actionsService:ActionsService, public requestApiService: RequestApiService) { 
    //socket.ioSocket.
  }
  
  private url = (isDevMode() ? "ws://localhost:5000/ws" : "ws://ng-killer-api.azurewebsites.net/");
  private ws:WebSocket;

  private subject: Rx.Subject<any>;

  public connect(){
    if (!this.subject) {
      this.subject = this.create(this.url);
      console.log("Successfully connected: " + this.url);
    }
  }

  private create(url): Rx.Subject<any> {
    let ws = new WebSocket(url);

    let observable = Rx.Observable.create(
      (obs: Rx.Observer<any>) => {
        ws.onmessage = obs.next.bind(obs);
        ws.onerror = obs.error.bind(obs);
        ws.onclose = obs.complete.bind(obs);
        return ws.close.bind(ws);
      })
    let observer = {
      next: (data: Object) => {
        if (ws.readyState === WebSocket.OPEN) {
          ws.send(JSON.stringify(data));
        }
      }
	}
	return Rx.Subject.create(observer, observable);
  }

  // public connect() {
  //   if(!this.ws)
  //     this.ws = new WebSocket(this.url);

  //   this.ws.onopen
  //   this.ws.onopen = function(event) {
  //     console.log("opened connection to " + this.url);
  //   };
  //   this.ws.onclose = function(event) {
  //     console.log("closed connection from " + this.url);
  //   };
  //   this.ws.onmessage = function(event) {
  //     var messageText = "Someone said: " + event;
  //     console.log(messageText);
  //     let data = JSON.parse(event.data); 
  //   };
  //   this.ws.onerror = function(event) {
  //     console.log("wsError", event);
  //   };
  //   // this.connection=new Connection(this.url, false);
  //   // this.connection.start();
  //   // if (!this.subject) {
  //   //   this.subject = this.create();
  //   //   console.log("Successfully connected: " + this.url);
  //   // } 
  // }
   //join room
   joinRoom(game){
    //this.wsEmit('join-room', game);    
  }
  
  //Kill
  sendKillRequest(agent){
    this.wsEmit('ask-kill', agent);    
  }
  getKillRequest(): Observable<Agent> {
    return this.genericGet<Agent>('ask-kill');
  }

  confirmKill(agent){
    this.wsEmit('confirm-kill', agent);    
  }
  getConfirmKill(): Observable<Agent> {
    return this.genericGet<Agent>('confirm-kill');
  }

  unconfirmKill(agent){
    this.wsEmit('unconfirm-kill', agent);    
  }
  getUnconfirmKill(): Observable<Agent> {
    return this.genericGet<Agent>('unconfirm-kill');
  }

  sendUnmaskRequest(agent, target){
    this.wsEmit('ask-unmask', {}, agent.id, target.id);    
  }
  getUnmaskRequest(): Observable<Agent>{
    return this.genericGet<Agent>('ask-unmask');
  }

  //Unmask
  confirmUnmask(agent){
    this.wsEmit('confirm-unmask', agent);    
  }
  getConfirmUnmask(): Observable<Agent> {
    return this.genericGet<Agent>('confirm-unmask');
  }
  getWrongKiller(): Observable<Agent> {
    return this.genericGet<Agent>('wrong-killer');
  }

  unconfirmUnmask(agent){
    this.wsEmit('unconfirm-unmask', agent);    
  }
  getUnconfirmUnmask(): Observable<Agent> {
    return this.genericGet<Agent>('unconfirm-unmask');
  }

  //agent
  askAgentUpdate(agent){
    this.wsEmit('agent-update', agent);    
  }
  getAgentUpdate(): Observable<Agent>{
    return this.genericGet<Agent>('agent-update');
  }

  //Change mission
  sendChangeMissionRequest(agent){
    this.wsEmit('change-mission', agent);    
  }
  //Suicide
  sendSuicideRequest(agent){
    this.wsEmit('suicide', agent);    
  }
  getSuicide(): Observable<Agent> {
    return this.genericGet<Agent>('suicide');
  }

  //Actions
  getNewAction(): Observable<Action>{
    return this.genericGet<Action>('new-action');
  }
  //Agent
  newAgent(agent: Agent){
    this.wsEmit('new-agent', agent, agent.id);  
  }
  getNewAgent(): Observable<Agent>{
    return this.genericGet<Agent>('new-agent');
  }
  //game
  updateGameStatus(game: Game){
    this.wsEmit('game-status', game);
  }
  getGameStatus(): Observable<Game>{
    return this.genericGet<Game>('game-status');
  }

  //global
  getActionError(): Observable<string>{
    return this.genericGet<string>('action-error');
  }

  //Tribunal
  getTribunalStatus(): Observable<Tribunal>{
    return this.genericGet<Tribunal>('tribunal-status');
  }

  

  wsEmit(type,data, em=null, re=null){
    let req = new Request();
    req.type = type;
    req.data = JSON.stringify(data);
    req.emitterId=em;
    req.receiverId=re;
    this.requestApiService.push(req).subscribe(r=>{
      console.log("emit", req);
    },err=>{
      console.log("err",err);
    });
    //this.subject.next(req);
  }
  genericGet<T>(method): Observable<T>{
    
    // let observable = this.subject.subscribe(request => {
    //   if(request.type == method){
        
    //   }
    //   // let data = JSON.parse(response.data);
    //   return request
    // });;
    let observable = new Observable<T>(observer => {
      this.subject.subscribe(messageEvent=>{
        console.log(messageEvent);
        try{

          let m = JSON.parse(messageEvent.data);
          let r=m;
          if(m.data){
            r = JSON.parse(m.data);
          }
          console.log(r);
          if(r.type==method){
            var data = JSON.parse(r.data);
            console.log("receive request:", r);
            observer.next(data);
          }
        }
        catch(e){

        }
        
      })
    });
      // this.subject.subscribe(request => {
      //   console.log(request);
      //   if(request.type == method){
      //     let data = JSON.parse(request.data); 
      //     observer.next(data);    
      //   }
      // });  
    return observable;
  }

}


