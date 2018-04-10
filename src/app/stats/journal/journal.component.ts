import { Component, OnInit, OnDestroy } from '@angular/core';
import { GameApiService } from '../../api/game-api.service';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { Game, Action, Rank } from '../../model/model';
import { SocketsService } from '../../shared/sockets.service';
import { ActionsService } from '../../shared/actions.service';
import { GameService } from '../../shared/game.service';

declare var qrcode: any;

@Component({
  selector: 'app-journal',
  templateUrl: './journal.component.html',
  styleUrls: ['./journal.component.sass']
})
export class JournalComponent implements OnInit, OnDestroy {
  public qrUrl: string;
  public qrTag: any;
  private sub: any;
  private id: string;
  public game: Game;
  constructor(private gameApiService: GameApiService,
    private route: ActivatedRoute,
    private router: Router,
    private socketsService: SocketsService,
    public actionsService: ActionsService,
    public gameService: GameService) {
  }

  getGame(callback = null) {
    this.gameApiService.getById(this.id).subscribe(
      res => {
        this.game = res;

        this.game.actions = this.game.actions.sort((a: Action, b: Action) => {
          return (new Date(b.Created_date)).getTime() - (new Date(a.Created_date)).getTime();
        });

        this.createQr();

        if (callback) {
          callback();
        }
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
      this.qrUrl = baseUrl + "/join/" + this.id;
      this.getGame(() => {
        this.socketsService.joinRoom(this.game.id);
      });
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
      let agentToUpdate = this.game.agents.find(a => a.id == agent.id);
      if (agentToUpdate) {
        agentToUpdate.status = 'dead';
      }
    })
    this.socketsService.getSuicide().subscribe(agent => {
      let agentToUpdate = this.game.agents.find(a => a.id == agent.id);
      if (agentToUpdate) {
        agentToUpdate.status = 'dead';
      }
    })
    this.socketsService.getConfirmUnmask().subscribe(agent => {
      let agentToUpdate = this.game.agents.find(a => a.id == agent.id);
      if (agentToUpdate) {
        agentToUpdate.status = 'dead';
      }
    })
    this.socketsService.getWrongKiller().subscribe(agent => {
      let agentToUpdate = this.game.agents.find(a => a.id == agent.id);
      if (agentToUpdate) {
        agentToUpdate.status = 'dead';
      }
    })

  }

  createQr() {
    var typeNumber = 0;
    var errorCorrectionLevel = 'L';
    var qr = qrcode(typeNumber, errorCorrectionLevel);
    qr.addData(this.qrUrl);
    qr.make();
    var size = this.game.status == GameService.GAME_STATUS_CREATED ? 5 : 2;
    this.qrTag = qr.createImgTag(size, 1);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  getAliveAgents() {
    return this.game.agents.filter(a => a.status == 'alive');
  }
  getDeadAgents() {
    return this.game.agents.filter(a => a.status == 'dead');
  }


  getRanking(type) {
    let ranking: Rank[] = [];
    for(let i=0; i<this.game.agents.length; i++){
      let agent = this.game.agents[i];
      let r = new Rank();
      r.agent = agent;
      r.score = 1;
      switch (type) {
        case 'general':
          r.score = this.actionsService.countPointsByAgent(this.game.actions, agent);
          break;
        case 'kills':
          r.score = this.actionsService.countKillsByAgent(this.game.actions, agent);
          break;
        case 'unmasks':
          r.score = this.actionsService.countUnmasksByAgent(this.game.actions, agent);
          break;
        case 'bluffs':
          r.score = this.actionsService.countBluffsByAgent(this.game.actions, agent);
          break;
      }
      ranking.push(r);
    }
    //order
    ranking = ranking.sort((a: Rank, b: Rank) => { return b.score - a.score }).filter(r=>r.score>0);
    //set places
    let rankingWithPlaces = ranking.map(r=> { 
      r.place = ranking.filter(ra=>ra.score>r.score).length + 1;
      return r
    });
    return rankingWithPlaces;
  }

}
