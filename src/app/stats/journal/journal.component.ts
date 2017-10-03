import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameApiService } from '../../api/game-api.service';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { Game, Action } from '../../model/model';
import { SocketsService } from '../../shared/sockets.service';

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.sass']
})
export class JournalComponent implements OnInit, OnDestroy {
  public qrUrl: string;
  private sub: any;
  private id: string;
  public game: Game;
  constructor(private gameApiService: GameApiService, private route: ActivatedRoute, private router: Router, private socketsService:SocketsService) { 
  }

  getGame(){
    this.gameApiService.getById(this.id).subscribe(
      res => {
        this.game = res;
        
        this.game.actions = this.game.actions.sort((a: Action, b: Action) => {
          return (new Date(b.Created_date)).getTime() - (new Date(a.Created_date)).getTime();
        });
      },
      err => {
        console.log("err", err);
    });
  }
  ngOnInit() {
    this.socketsService.connect();

    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl = currentAbsoluteUrl.substring(0, index);
  
    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.qrUrl = baseUrl + "/join/"+this.id;
      this.getGame();
      // In a real app: dispatch action to load the details here.
    });

    this.socketsService.getNewAgent().subscribe(agent => {
      this.game.agents.push(agent);
    })
    this.socketsService.getGameStatus().subscribe(game => {
      //this.game.status = game.status;
      this.getGame();
    })
    this.socketsService.getNewAction().subscribe(action => {
      this.game.actions.unshift(action);
    })
    this.socketsService.getConfirmKill().subscribe(agent => {
      let agentToUpdate = this.game.agents.find(a=>a._id == agent._id);
      if(agentToUpdate){
        agentToUpdate.status = 'dead';
      }
    })
    this.socketsService.getSuicide().subscribe(agent => {
      let agentToUpdate = this.game.agents.find(a=>a._id == agent._id);
      if(agentToUpdate){
        agentToUpdate.status = 'dead';
      }
    })
    this.socketsService.getConfirmUnmask().subscribe(agent => {
      let agentToUpdate = this.game.agents.find(a=>a._id == agent._id);
      if(agentToUpdate){
        agentToUpdate.status = 'dead';
      }
    })
    
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getAliveAgents(){
    return this.game.agents.filter(a=>a.status=='alive');
  }
  getDeadAgents(){
    return this.game.agents.filter(a=>a.status=='dead');
  }

}
