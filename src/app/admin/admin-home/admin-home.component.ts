import { Component, OnInit, Inject } from '@angular/core';
import { GameApiService } from '../../api/game-api.service';
import { MissionApiService } from '../../api/mission-api.service';

import { Game, Mission } from '../../model/model'

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import {DataSource} from '@angular/cdk/collections';

import { MatDialog } from '@angular/material';
import { ConfirmDialogComponent } from '../../shared/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.sass']
})
export class AdminHomeComponent implements OnInit {

  public games: Game[];
  public missions: Mission[];
  public searchTxt: string;
  public newName: string;
  public newMission: string;

  constructor(private gameApiService: GameApiService, private missionApiService: MissionApiService, public dialog: MatDialog) { 
  }

  ngOnInit() {
    this.gameApiService.get().subscribe(
      res => {
        this.games = res;
      },
      err => {
        console.log("err", err);
      });
    this.missionApiService.getGenerics().subscribe(
      res => {
        this.missions = res;
      }
    );
  }

  public filteredGames(): Game[]{
    if(this.searchTxt){
      if(this.games){
        return this.games.filter(g=>g.name.toLowerCase().includes(this.searchTxt.toLowerCase()));
      }
    }
    else{
      return this.games;
    }
    
    return [];
  }
  public filteredMissions(): Mission[]{
    if(this.searchTxt){
      if(this.missions){
        return this.missions.filter(m=>m.title.toLowerCase().includes(this.searchTxt.toLowerCase()));
      }
    }
    else{
      return this.missions;
    }
    
    return [];
  }

  public onSubmitNewGame(): void{
    let newGame = new Game();
    newGame.name = this.newName;
    this.gameApiService.create(newGame).subscribe(
      res => {
        this.games.push(res);
        this.newName = "";
      },
      err => {
        console.log("err", err);
      });
  }

  public onSubmitNewMission(): void{
    let newMission = new Mission();
    newMission.title = this.newMission;
    this.missionApiService.create(newMission).subscribe(
      res => {
        this.missions.push(res);
        this.newMission = "";
      },
      err => {
        console.log("err", err);
      });
  }

  public saveMission(mission: Mission): void {
    this.missionApiService.update(mission._id, mission).subscribe(res=>{});
  }

  deleteGame(game: Game): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {  }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.gameApiService.delete(game._id).subscribe(
          res => {
            var index = this.games.indexOf(game, 0);
            if (index > -1) {
               this.games.splice(index, 1);
            }
          },
          err => {
            console.log("err", err);
          });
      }
      
    });
  }

}