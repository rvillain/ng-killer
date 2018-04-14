import { Component, OnInit, Inject } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';
import { SocketsService } from '../../shared/sockets.service';
import { Agent } from '../../model/model';

import { MatSnackBar } from '@angular/material';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ActionsService } from '../../shared/actions.service';

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
    
    this.socketsService.requests.subscribe(request=>{
      switch(request.type){
        case ActionsService.REQUEST_TYPE_CONFIRM_KILL:
          this.snackBar.open("Habile ! Mission accomplie", null,{duration: 3000});
          this.dialogRef.close(true);
        break;
        case ActionsService.REQUEST_TYPE_UNCONFIRM_KILL:
        this.snackBar.open("Visiblement, votre cible n'est pas d'accord", null,{duration: 3000});
          this.dialogRef.close(true);
        break;
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}