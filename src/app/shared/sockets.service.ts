import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs'
import * as io from 'socket.io-client';

import { Agent, Action, Game, Tribunal, Vote } from "../model/model";

@Injectable()
export class SocketsService {

 // const config: SocketIoConfig = { url: (isDevMode() ? "http://localhost:3000/" : "http://ng-killer-api.azurewebsites.net/"), options: {} };
  
  constructor() { 
    //socket.ioSocket.
  }
  
  private url = (isDevMode() ? "http://localhost:3000/" : "http://ng-killer-api.azurewebsites.net/");
  private socket;

  //Connect
  connect(){
    this.socket = io(this.url,{
      'reconnection delay': 1000,
      'reconnection limit': 1000,
      'max reconnection attempts': 'Infinity'
    });
  }
   //join room
   joinRoom(game){
    this.socket.emit('join-room', game);    
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

  //agent
  askAgentUpdate(agent){
    this.socket.emit('agent-update', agent);    
  }
  getAgentUpdate(): Observable<Agent>{
    return this.genericGet<Agent>('agent-update');
  }

  //Change mission
  sendChangeMissionRequest(agent){
    this.socket.emit('change-mission', agent);    
  }
  //Suicide
  sendSuicideRequest(agent){
    this.socket.emit('suicide', agent);    
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

  //global
  getActionError(): Observable<string>{
    return this.genericGet<string>('action-error');
  }

  //Tribunal
  getTribunalStatus(): Observable<Tribunal>{
    return this.genericGet<Tribunal>('tribunal-status');
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
