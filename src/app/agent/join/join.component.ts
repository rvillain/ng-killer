import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { AgentApiService } from '../../api/agent-api.service';
import { GameApiService } from '../../api/game-api.service';
import { GameService } from '../../shared/game.service';

import { Game, Agent } from '../../model/model';


@Component({
  selector: 'app-join',
  templateUrl: './join.component.html',
  styleUrls: ['./join.component.sass']
})
export class JoinComponent implements OnInit, OnDestroy {

  constructor(private route: ActivatedRoute, private router: Router, private agentApiService: AgentApiService, private gameApiService: GameApiService,
    public gameService: GameService,
    public snackBar: MatSnackBar) {
    this.agent = new Agent();
    this.game = new Game();
  }
  private sub: any;
  private gameId: number;
  public game: Game;
  public agent: Agent;
  public agentName: string;

  public photoUrl: string;

  public submitting: boolean = false;
  ngOnInit() {
    this.agent = new Agent();
    this.sub = this.route.params.subscribe(params => {
      this.gameId = params['id']; // (+) converts string 'id' to a number
      this.gameApiService.getById(this.gameId).subscribe(
        res => {
          this.game = res;

          //agents already created 
          let agentId = localStorage.getItem('game-' + this.game.id);
          if (agentId && !this.gameService.isCreated(this.game)) {
            //this.router.navigate(['/agent', agentId]);
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

  resizePhoto() {
    let img: HTMLImageElement = document.getElementById("photo") as HTMLImageElement;
    let canvas = document.createElement("canvas");
    let cctx = canvas.getContext("2d");
    cctx.drawImage(img, 0, 0);

    let MAX_WIDTH = 150;
    let MAX_HEIGHT = 300;
    let width = img.width;
    let height = img.height;

    if (width > height) {
      if (width > MAX_WIDTH) {
        height *= MAX_WIDTH / width;
        width = MAX_WIDTH;
      }
    } else {
      if (height > MAX_HEIGHT) {
        width *= MAX_HEIGHT / height;
        height = MAX_HEIGHT;
      }
    }
    canvas.width = width;
    canvas.height = height;
    let ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0, width, height);

    return canvas.toDataURL("image/jpeg");
  }

  onSubmit(f: NgForm) {
    if (f.valid && !this.submitting) {
      this.submitting = true;
      this.agent.name = this.agentName;
      this.agent.gameId = this.gameId;
      if (this.photoUrl) {
        this.agent.photo = this.resizePhoto();
      }
      this.agentApiService.create(this.agent).subscribe(
        res => {
          localStorage.setItem('game-' + this.game.id, res.id);
          this.router.navigate(['/agent', res.id]);
        },
        err => {
          this.snackBar.open(err, null, {
            duration: 3000,
          });
          this.submitting = false;
          console.log("err", err);
        });
    }

  }
  onSelectFile(event) { // called each time file input changes
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();

      reader.readAsDataURL(event.target.files[0]); // read file as data url

      reader.onload = (event: any) => { // called once readAsDataURL is completed
        this.photoUrl = event.target.result;
      }
    }
  }

}
