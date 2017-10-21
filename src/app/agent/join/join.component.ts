import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import { AgentApiService } from '../../api/agent-api.service';
import { GameApiService } from '../../api/game-api.service';
import { SocketsService } from '../../shared/sockets.service';

import { Game, Agent } from '../../model/model';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.sass']
})
export class JoinComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private router:Router, private agentApiService:AgentApiService, private gameApiService:GameApiService,
    private socketsService:SocketsService,
    public snackBar: MatSnackBar) { 
    this.agent = new Agent();
    this.game = new Game();
  }
  private sub: any;
  private gameId: string;
  public game: Game;
  public agent: Agent;
  public agentName: string;

  ngOnInit() {
    this.socketsService.connect();
    this.agent = new Agent();
    this.sub = this.route.params.subscribe(params => {
      this.gameId = params['id']; // (+) converts string 'id' to a number
      this.gameApiService.getById(this.gameId).subscribe(
        res => {
          this.game = res;

          //agents already created 
          let agentId = localStorage.getItem('game-'+this.game._id);
          if(agentId && this.game.status != 'created'){
            this.router.navigate(['/agent', agentId]);
          }
        },
        err => {
          console.log("err", err);
        });
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  onSubmit(){
    this.agent.game = new Game();
    this.agent.game._id = this.game._id;
    this.agent.name = this.agentName;
    this.agentApiService.create(this.agent).subscribe(
      res => {
        this.socketsService.newAgent(res);
        localStorage.setItem('game-'+this.game._id, res._id);
        this.router.navigate(['/agent', res._id]);
      },
      err => {
        this.snackBar.open(err, null,{
          duration: 3000,
        });
        console.log("err", err);
      });
  }

}
