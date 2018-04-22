import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';
import { GameApiService } from '../../api/game-api.service';
import { MissionApiService } from '../../api/mission-api.service';
import { MissionsService } from '../../shared/missions.service';
import { SocketsService } from '../../shared/sockets.service';
import { GameService } from '../../shared/game.service';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';

import { Game, Agent, Mission } from '../../model/model';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.sass']
})
export class GameComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private router: Router,
    private agentApiService: AgentApiService,
    private gameApiService: GameApiService,
    private missionApiService: MissionApiService,
    private socketsService: SocketsService,
    public missionsService: MissionsService,
    public gameService: GameService) {
    this.game = new Game();
  }

  private gameId: number;
  public game: Game;
  private sub: any;
  public newMission: string;

  getGame() {
    this.gameApiService.getById(this.gameId).subscribe(
      res => {
        this.game = res;
      },
      err => {
        console.log("err", err);
      });
  }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.gameId = params['id']; // (+) converts string 'id' to a number
      this.socketsService.connect(this.gameId);
      this.socketsService.requests.subscribe(request => { this.getGame() })
      this.getGame();
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  isStartable() {
    let startable = false;
    if (this.game.agents && this.game.agents.length > 0
      && this.game.missions && this.game.missions.length >= this.game.agents.length) {
      startable = true;
    }
    return startable;
  }
  deleteAgent(agent: Agent) {
    if (this.gameService.isCreated(this.game)) {
      this.agentApiService.delete(agent.id).subscribe(a => {
        this.game.agents.splice(this.game.agents.indexOf(agent), 1);
      });
    }
  }
  onSubmitNewMission() {
    if (this.newMission && this.newMission.length > 5) {
      let newMission = new Mission();
      newMission.title = this.newMission;
      newMission.gameId = this.game.id;
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
  importMissions(level: string) {
    this.gameApiService.addMissions(this.game.id, level).subscribe(updatedGame => {
      this.getGame();
    })
  }

  deleteMission(mission: Mission) {
    if (this.gameService.isCreated(this.game)) {
      this.missionApiService.delete(mission.id).subscribe(m => {
        this.game.missions.splice(this.game.missions.indexOf(mission), 1);
      });
    }
  }
  start() {
    this.gameApiService.start(this.game.id).subscribe(
      res => {
        this.game.status = GameService.GAME_STATUS_STARTED;
      },
      err => {
        console.log("err", err);
      });
  }
  reinit() {
    this.gameApiService.reinit(this.game.id).subscribe(
      res => {
        this.game.status = GameService.GAME_STATUS_CREATED;
      },
      err => {
        console.log("err", err);
      });
  }
}
