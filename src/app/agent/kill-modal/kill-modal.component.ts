import { Component, OnInit, Inject } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';
import { SocketsService } from '../../shared/sockets.service';

import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-kill-modal',
  templateUrl: './kill-modal.component.html',
  styleUrls: ['./kill-modal.component.sass']
})
export class KillModalComponent {
  public code: string;
  constructor(
    public dialogRef: MatDialogRef<KillModalComponent>,
    private agentApiService: AgentApiService,
    private socketsService: SocketsService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onYesClick(): void {
    let killer = this.data.killer;
    this.socketsService.sendKillRequest(killer);
    this.dialogRef.close(true);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}