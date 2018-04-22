import { Component, OnInit, Inject } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';
import { SocketsService } from '../../shared/sockets.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA, MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-change-mission',
  templateUrl: './change-mission.component.html',
  styleUrls: ['./change-mission.component.sass']
})
export class ChangeMissionComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<ChangeMissionComponent>,
    public socketsService: SocketsService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  public code: string;

  onYesClick(): void {
    let agent = this.data.agent;
    this.socketsService.sendChangeMissionRequest(agent).subscribe(req=>{
      this.dialogRef.close(true);
    },error=>{
      this.snackBar.open(error, null,{duration: 3000});
      this.dialogRef.close(false);
    });
    
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.code = this.data.agent.code;
  }

}
