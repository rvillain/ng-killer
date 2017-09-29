import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { Game, Agent, Action } from '../../model/model';
import { KillModalComponent } from '../kill-modal/kill-modal.component';
import { UnmaskModalComponent } from '../unmask-modal/unmask-modal.component';
import { CodeModalComponent } from '../code-modal/code-modal.component';
import { SocketsService } from '../../shared/sockets.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.sass']
})
export class AgentComponent implements OnInit, OnDestroy {
  public agent:Agent;
  private sub: any;

  public status: string = "created";
  public waitResponse: boolean = false;
  public showConfirmKill: boolean = false;
  public showConfirmUnmask: boolean = false;

  constructor(private agentApiService: AgentApiService, 
    private route: ActivatedRoute, 
    private dialog: MdDialog,
    private socketsService:SocketsService) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = params['id']; // (+) converts string 'id' to a number
      this.agentApiService.getById(id).subscribe(
        res => {
          this.agent = res;
          this.status = this.agent.game.status;
        },
        err => {
          console.log("err", err);
        });
      // In a real app: dispatch action to load the details here.
    });
    this.socketsService.connect();

    this.socketsService.getKillRequest().subscribe(killer => {
      //Reception d'un kill request
      if(killer.target._id == this.agent._id){
        this.showConfirmKill = true;
      }
    });
    this.socketsService.getConfirmKill().subscribe(target => {
      if(target._id == this.agent.target._id){
        this.waitResponse = false;
      }
    });
    this.socketsService.getUnconfirmKill().subscribe(target => {
      if(target._id == this.agent.target._id){
        this.waitResponse = false;
      }
    });

    this.socketsService.getUnmaskRequest().subscribe(killer => {
      //Reception d'un kill request
      if(killer._id == this.agent._id){
        this.showConfirmUnmask = true;
      }
    });
    this.socketsService.getConfirmUnmask().subscribe(killer => {
      if(killer._id == this.agent._id){
        this.waitResponse = false;
      }
    });
    this.socketsService.getUnconfirmUnmask().subscribe(killer => {
      if(killer._id == this.agent._id){
        this.waitResponse = false;
      }
    });

    this.socketsService.getAgentUpdate().subscribe(agent => {
      if(agent._id == this.agent._id){
        this.agent = agent;
      }
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  showCode(){
    let dialogRef = this.dialog.open(CodeModalComponent, {
      data: { agent: this.agent }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  kill() {
    let dialogRef = this.dialog.open(KillModalComponent, {
      data: { killer: this.agent }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.waitResponse = true;
      }
    });
  }
  confirmKill(confirm: boolean){
    if(confirm){
      this.socketsService.confirmKill(this.agent);
      this.agent.status = "dead";
    }
    else{
      this.socketsService.unconfirmKill(this.agent);
    }
    this.showConfirmKill = false;
  }

  confirmUnmask(confirm: boolean){
    if(confirm){
      this.socketsService.confirmKill(this.agent);
      this.agent.status = "dead";
    }
    else{
      this.socketsService.unconfirmKill(this.agent);
    }
    this.showConfirmKill = false;
  }

  unmask() {
    let dialogRef = this.dialog.open(UnmaskModalComponent, {
      data: { killer: this.agent }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.waitResponse = true;
      }
    });
  }
}
