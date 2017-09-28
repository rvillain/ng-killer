import { Injectable, isDevMode } from '@angular/core';
import { Observable } from 'rxjs'
import * as io from 'socket.io-client';

import { Agent } from "../model/model";

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
  
  sendKillRequest(agent){
    this.socket.emit('ask-kill', agent);    
  }

  confirmKill(agent){
    this.socket.emit('confirm-kill', agent);    
  }
  unconfirmKill(agent){
    this.socket.emit('unconfirm-kill', agent);    
  }
  
  getKillRequest(): Observable<Agent> {
    return this.genericGet<Agent>('ask-kill');
  }
  getConfirmKill(): Observable<Agent> {
    return this.genericGet<Agent>('confirm-kill');
  }
  getUnconfirmKill(): Observable<Agent> {
    return this.genericGet<Agent>('unconfirm-kill');
  }

  sendUnmaskRequest(agent){
    this.socket.emit('ask-unmask', agent);    
  }

  confirmUnmask(agent){
    this.socket.emit('confirm-unmask', agent);    
  }
  getUnmaskRequest(): Observable<Agent>{
    return this.genericGet<Agent>('ask-unmask');
  }

  askAgentUpdate(agent){
    this.socket.emit('agent-update', agent);    
  }
  getAgentUpdate(): Observable<Agent>{
    return this.genericGet<Agent>('agent-update');
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
