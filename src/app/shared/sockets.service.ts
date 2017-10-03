import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs'
import * as io from 'socket.io-client';

import { Agent, Action, Game } from "../model/model";

@Injectable()
export class SocketsService {

 // const config: SocketIoConfig = { url: (isDevMode() ? "http://localhost:3000/" : "http://ng-killer-api.azurewebsites.net/"), options: {} };
  
  constructor() { 
    //socket.ioSocket.
  }
  
  private url = (isDevMode() ? "http://localhost:3000/" : "http://ng-killer-api.azurewebsites.net/");
  private socket;

  connect(){
    this.socket = io(this.url);
  }
  
  //Kill
  sendKillRequest(agent){
    this.socket.emit('ask-kill', agent);    
  }
  getKillRequest(): Observable<Agent> {
    return this.genericGet<Agent>('ask-kill');
  }

  confirmKill(agent){
    this.socket.emit('confirm-kill', agent);    
  }
  getConfirmKill(): Observable<Agent> {
    return this.genericGet<Agent>('confirm-kill');
  }

  unconfirmKill(agent){
    this.socket.emit('unconfirm-kill', agent);    
  }
  getUnconfirmKill(): Observable<Agent> {
    return this.genericGet<Agent>('unconfirm-kill');
  }

  sendUnmaskRequest(agent, name){
    this.socket.emit('ask-unmask', {agent: agent, name: name});    
  }
  getUnmaskRequest(): Observable<Agent>{
    return this.genericGet<Agent>('ask-unmask');
  }

  //Unmask
  confirmUnmask(agent){
    this.socket.emit('confirm-unmask', agent);    
  }
  getConfirmUnmask(): Observable<Agent> {
    return this.genericGet<Agent>('confirm-unmask');
  }
  getWrongKiller(): Observable<Agent> {
    return this.genericGet<Agent>('wrong-killer');
  }

  unconfirmUnmask(agent){
    this.socket.emit('unconfirm-unmask', agent);    
  }
  getUnconfirmUnmask(): Observable<Agent> {
    return this.genericGet<Agent>('unconfirm-unmask');
  }

  askAgentUpdate(agent){
    this.socket.emit('agent-update', agent);    
  }
  getAgentUpdate(): Observable<Agent>{
    return this.genericGet<Agent>('agent-update');
  }


  //Actions
  getNewAction(): Observable<Action>{
    return this.genericGet<Action>('new-action');
  }
  //Agent
  newAgent(agent: Agent){
    this.socket.emit('new-agent', agent);  
  }
  getNewAgent(): Observable<Agent>{
    return this.genericGet<Agent>('new-agent');
  }
  //game
  updateGameStatus(game: Game){
    this.socket.emit('game-status', game);
  }
  getGameStatus(): Observable<Game>{
    return this.genericGet<Game>('game-status');
  }

  genericGet<T>(method): Observable<T>{
    let observable = new Observable<T>(observer => {
      this.socket.on(method, (data: T) => {
        observer.next(data);    
      });
      return () => {
        this.socket.disconnect();
      };  
    })     
    return observable;
  }

}
