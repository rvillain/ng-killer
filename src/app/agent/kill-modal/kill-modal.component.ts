import { Component, OnInit, Inject } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';
import { SocketsService } from '../../shared/sockets.service';
import { Agent } from '../../model/model';

import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-kill-modal',
  templateUrl: './kill-modal.component.html',
  styleUrls: ['./kill-modal.component.sass']
})
export class KillModalComponent {
  public code: string;
  public isWaiting: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<KillModalComponent>,
    private agentApiService: AgentApiService,
    private socketsService: SocketsService,
    public snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onYesClick(): void {
    let killer = this.data.killer;
    this.socketsService.sendKillRequest(killer);
    this.isWaiting=true;
    
    this.socketsService.getConfirmKill().subscribe(target => {
      if(target._id == killer.target._id){
        this.snackBar.open("Habile ! Mission accomplie", null,{duration: 3000});
        this.dialogRef.close(true);
      }
    });
    this.socketsService.getUnconfirmKill().subscribe(target => {
      if(target._id == killer.target._id){
        this.snackBar.open("Visiblement, votre cible n'est pas d'accord", null,{duration: 3000});
        this.dialogRef.close(true);
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}