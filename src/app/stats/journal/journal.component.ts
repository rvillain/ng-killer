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
  private id: number;
  public game: Game;
  constructor(private gameApiService: GameApiService,
    private route: ActivatedRoute,
    private router: Router,
    private socketsService: SocketsService,
    public actionsService: ActionsService,
    public gameService: GameService) {
  }

  getGame() {
    this.gameApiService.getById(this.id).subscribe(
      res => {
        this.game = res;
        this.createQr();
        this.game.actions = this.game.actions.sort((a: Action, b: Action) => {
          return (new Date(b.dateCreation)).getTime() - (new Date(a.dateCreation)).getTime();
        });
      },
      err => {
        console.log("err", err);
      });
  }
  ngOnInit() {

    var currentAbsoluteUrl = window.location.href;
    var currentRelativeUrl = this.router.url;
    var index = currentAbsoluteUrl.indexOf(currentRelativeUrl);
    var baseUrl = currentAbsoluteUrl.substring(0, index);

    this.sub = this.route.params.subscribe(params => {
      this.id = params['id']; // (+) converts string 'id' to a number
      this.qrUrl = baseUrl + "/join/" + this.id;
      this.socketsService.connect(this.id);
      this.socketsService.requests.subscribe(request=>{ this.getGame()});
      this.getGame();
      // In a real app: dispatch action to load the details here.
    });

    this.socketsService.requests.subscribe(request=>{
      this.getGame();
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

}
