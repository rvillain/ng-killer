import { Component, OnInit, Inject } from '@angular/core';
import { GameApiService } from '../../api/game-api.service';
import { MissionApiService } from '../../api/mission-api.service';

import { Game, Mission } from '../../model/model'

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/of';
import { DataSource } from '@angular/cdk/collections';

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
  public newMissions: string;
  public newMissionsDifficulty: string;
  public newMissionsSubmitting: boolean = false;

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

  public filteredGames(): Game[] {
    if (this.searchTxt) {
      if (this.games) {
        return this.games.filter(g => g.name.toLowerCase().includes(this.searchTxt.toLowerCase()));
      }
    }
    else {
      return this.games;
    }

    return [];
  }
  public filteredMissions(): Mission[] {
    if (this.searchTxt) {
      if (this.missions) {
        return this.missions.filter(m => m.title.toLowerCase().includes(this.searchTxt.toLowerCase()));
      }
    }
    else {
      return this.missions;
    }

    return [];
  }

  public onSubmitNewGame(): void {
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

  public onSubmitNewMission(): void {
    if (this.newMissionsDifficulty && this.newMissions && !this.newMissionsSubmitting) {
      this.newMissionsSubmitting = true;
      let missionsArray = new Array<Mission>();
      let missionsStr = this.newMissions.split(/\r?\n/);
      missionsStr.forEach(m => {
        let newMission = new Mission();
        newMission.title = m;
        newMission.difficulty = this.newMissionsDifficulty;
        missionsArray.push(newMission);
      });
      this.missionApiService.import(missionsArray).subscribe(
        res => {
          this.missionApiService.getGenerics().subscribe(res => { this.missions = res; });
          this.newMissions = "";
          this.newMissionsDifficulty = null;
          this.newMissionsSubmitting = false;
        },
        err => {
          console.log("err", err);
          this.newMissionsSubmitting = false;
        });
    }
  }

  public saveMission(mission: Mission): void {
    this.missionApiService.update(mission.id, mission).subscribe(res => { });
  }

  deleteGame(game: Game): void {
    let dialogRef = this.dialog.open(ConfirmDialogComponent, {
      width: '250px',
      data: {}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.gameApiService.delete(game.id).subscribe(
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