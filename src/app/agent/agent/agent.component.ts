import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { MatSnackBar } from '@angular/material';

import { AgentApiService } from '../../api/agent-api.service';

import { Game, Agent, Action, Tribunal, Vote } from '../../model/model';
import { KillModalComponent } from '../kill-modal/kill-modal.component';
import { UnmaskModalComponent } from '../unmask-modal/unmask-modal.component';
import { CodeModalComponent } from '../code-modal/code-modal.component';
import { SuicideComponent } from '../suicide/suicide.component';
import { ChangeMissionComponent } from '../change-mission/change-mission.component';
import { SocketsService } from '../../shared/sockets.service';
import { GameService } from '../../shared/game.service';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.sass']
})
export class AgentComponent implements OnInit, OnDestroy {
  public agent: Agent;
  public tribunal: Tribunal;
  private sub: any;
  private id: string;

  public status: string = "created";
  public waitResponse: boolean = false;
  public showConfirmKill: boolean = false;
  public showConfirmUnmask: boolean = false;
  public firstLoad: boolean = true;

  public GameService = GameService;

  constructor(private agentApiService: AgentApiService, 
    private route: ActivatedRoute, 
    private dialog: MatDialog,
    private socketsService:SocketsService,
    public snackBar:MatSnackBar) { }

  getAgent(){
    this.agentApiService.getById(this.id).subscribe(
      res => {
        this.agent = res;
        this.status = this.agent.game.status;
        if(this.firstLoad)
          this.socketsService.joinRoom(this.agent.game.id);
        this.firstLoad = false;
      },
      err => {
        console.log("err", err);
      });
  }
  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.getAgent();
    });
    this.socketsService.connect();

    this.socketsService.getKillRequest().subscribe(killer => {
      //Reception d'un kill request
      if(killer.target.id == this.agent.id){
        this.showConfirmKill = true;
      }
    });

    this.socketsService.getUnmaskRequest().subscribe(killer => {
      //Reception d'un unmask request
      if(killer.id == this.agent.id){
        this.showConfirmUnmask = true;
      }
    });

    this.socketsService.getAgentUpdate().subscribe(agent => {
      if(agent.id == this.agent.id){
        this.agent = agent;
      }
    });

    
    this.socketsService.getGameStatus().subscribe(game => {
        this.getAgent();
    });

    this.socketsService.getTribunalStatus().subscribe(tribunal => {
      //todo: tribunal
      // if(tribunal.status == "created"){
      //   this.tribunal = tribunal;
      // }
      // else if (tribunal.status == "started" && this.tribunal._id == tribunal._id){
      //   this.tribunal = tribunal;
      // }
      // else if(tribunal.status == "finished" && this.tribunal && this.tribunal._id == tribunal._id){
      //   this.tribunal = null;
      // }
    });
    this.socketsService.getActionError().subscribe(error => {
      setTimeout(()=>{
        this.waitResponse = false;
        this.snackBar.open(error, null,{duration: 3000});
      },1000);
    });
  }

  getMyActions(): Action[]{
    if(this.agent.game.actions){
      return this.agent.game.actions.filter(a=>a.killer && a.killer.id == this.agent.id || a.target && a.target.id == this.agent.id);
    }
    return [];
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  showRole(){
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
        this.getAgent();
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
      this.socketsService.confirmUnmask(this.agent);
      this.agent.status = "dead";
    }
    else{
      this.socketsService.unconfirmUnmask(this.agent);
    }
    this.showConfirmUnmask = false;
  }

  unmask() {
    let dialogRef = this.dialog.open(UnmaskModalComponent, {
      data: { killer: this.agent }
    });

    dialogRef.afterClosed().subscribe(result => {
      this.getAgent();
    });
  }

  changeMission(){
    let dialogRef = this.dialog.open(ChangeMissionComponent, {
      data: { agent: this.agent }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAgent();
      }
    });
  }

  suicide(){
    let dialogRef = this.dialog.open(SuicideComponent, {
      data: { agent: this.agent }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.getAgent();
      }
    });
  }

  voteFor(agent: Agent){
    //todo
    this.tribunal = null;
  }
}
