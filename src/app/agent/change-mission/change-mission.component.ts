import { Component, OnInit, Inject } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';
import { SocketsService } from '../../shared/sockets.service';

import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-change-mission',
  templateUrl: './change-mission.component.html',
  styleUrls: ['./change-mission.component.sass']
})
export class ChangeMissionComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<ChangeMissionComponent>,
    public socketsService: SocketsService,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  public code: string;

  onYesClick(): void {
    let agent = this.data.agent;
    this.socketsService.sendChangeMissionRequest(agent);
    this.dialogRef.close(true);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.code = this.data.agent.code;
  }

}
