import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';
import { GameApiService } from '../../api/game-api.service';
import { MissionApiService } from '../../api/mission-api.service';
import { SocketsService } from '../../shared/sockets.service';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

import { Game, Agent, Mission } from '../../model/model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private router:Router, 
    private agentApiService:AgentApiService, 
    private gameApiService:GameApiService, 
    private missionApiService:MissionApiService,
    private socketsService: SocketsService) { 
    this.game = new Game();
  }

  public game:Game;
  private sub: any;
  public newMission: string;

  ngOnInit() {
    this.socketsService.connect();
    this.sub = this.route.params.subscribe(params => {
      let id = params['id']; // (+) converts string 'id' to a number
      this.gameApiService.getById(id).subscribe(
        res => {
          this.game = res;
          this.socketsService.joinRoom(this.game._id);
        },
        err => {
          console.log("err", err);
        });
      // In a real app: dispatch action to load the details here.
    });
    this.socketsService.getNewAgent().subscribe(agent=> {
      let gameId: any = agent.game;
      if(this.game._id == gameId){
        this.game.agents.push(agent);
      }
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  isStartable(){
    let startable = false;
    if(this.game.agents && this.game.agents.length >=0 
      && this.game.missions && this.game.missions.length >= this.game.agents.length){
      startable = true;
    }
    return startable;
  }
  deleteAgent(agent: Agent){
    if(this.game.status == "created"){
      this.agentApiService.delete(agent._id).subscribe(a=>{
        this.game.agents.splice(this.game.agents.indexOf(agent), 1);
      });
    }
  }
  onSubmitNewMission(){
    if(this.newMission && this.newMission.length > 5){
      let newMission = new Mission();
      newMission.title = this.newMission;
      newMission.game = this.game;
      this.missionApiService.create(newMission).subscribe(
        res => {
          this.game.missions.push(res);
          this.newMission = "";
        },
        err => {
          console.log("err", err);
        });
    }

  }
  importMissions(){
    this.missionApiService.getGenerics().subscribe(res=>{
      this.gameApiService.addMissions(this.game._id, res).subscribe(updatedGame=>{
        this.game = updatedGame;
      })
    })
  }

  deleteMission(mission: Mission){
    if(this.game.status == "created"){
      this.missionApiService.delete(mission._id).subscribe(m=>{
        this.game.missions.splice(this.game.missions.indexOf(mission), 1);
      });
    }
  }
  start(){
    this.gameApiService.start(this.game._id).subscribe(
      res => {
        this.game.status = 'started';
        this.socketsService.updateGameStatus(this.game);
      },
      err => {
        console.log("err", err);
      });
  }
  reinit(){
    this.gameApiService.reinit(this.game._id).subscribe(
      res => {
        this.game.status = 'created';
        this.socketsService.updateGameStatus(this.game);
      },
      err => {
        console.log("err", err);
      });
  }
}
