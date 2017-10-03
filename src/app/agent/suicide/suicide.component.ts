import { Component, OnInit, Inject } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';
import { SocketsService } from '../../shared/sockets.service';

import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-suicide',
  templateUrl: './suicide.component.html',
  styleUrls: ['./suicide.component.sass']
})
export class SuicideComponent implements OnInit {

  constructor(
    public dialogRef: MdDialogRef<SuicideComponent>,
    public socketsService: SocketsService,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  public code: string;

  onYesClick(): void {
    let agent = this.data.agent;
    this.socketsService.sendSuicideRequest(agent);
    this.dialogRef.close(true);
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.code = this.data.agent.code;
  }

}