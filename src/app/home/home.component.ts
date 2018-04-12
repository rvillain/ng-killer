import { Component, OnInit, Inject } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Game } from '../model/model';
import { GameApiService } from '../api/game-api.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

import {Router} from "@angular/router";
import { SocketsService } from '../shared/sockets.service';
import { GameService } from '../shared/game.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.sass']
})
export class HomeComponent implements OnInit {

  constructor(public dialog: MatDialog, public socketsService:  SocketsService) { }

  ngOnInit() {
    this.socketsService.connect();
    this.socketsService.getAgentUpdate().subscribe(a=>{});
    this.socketsService.joinRoom({name: "toto"});
  }
  openGameDialog(){
    let dialogRef = this.dialog.open(NewGameDialog, {
      width: '250px',
      data: { }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
    this.socketsService.joinRoom({name: "toto"});
  }

}

@Component({
  selector: 'dialog-overview-example-dialog',
  template: '<h2 mat-dialog-title>Création de la partie</h2>\
  <mat-dialog-content *ngIf="!isSubmiting">\
    <form #f="ngForm" (ngSubmit)="onSubmit(f)" novalidate>\
      <input name="gameName" ngModel class="killer-input" placeholder="Nom de la partie" required>\
      <hr>\
      <button mat-raised-button type="submit">Créer</button>\
    </form>\
  </mat-dialog-content>',
})
export class NewGameDialog {

  public submiting: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<NewGameDialog>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public gameApiService: GameApiService,
    public router: Router) { }

  onSubmit(f: NgForm){
    this.submiting=true;
    if(f.valid){
      let newGame = new Game();
      newGame.name = f.value.gameName;
      newGame.status = GameService.GAME_STATUS_CREATED;
      console.log(f);
      this.gameApiService.create(newGame).subscribe(
        res => {
          //redirection vers l'administration de la partie
          this.router.navigate(['/admin', res.id]);
          this.dialogRef.close();
        },
        err => {
          console.log("err", err);
          this.submiting=false;
        });
    }
    this.submiting=false;
  }

}
