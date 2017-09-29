import { Component, OnInit, Inject } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';
import { SocketsService } from '../../shared/sockets.service';

import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-unmask-modal',
  templateUrl: './unmask-modal.component.html',
  styleUrls: ['./unmask-modal.component.sass']
})
export class UnmaskModalComponent {
  public name: string;
  constructor(
    public dialogRef: MdDialogRef<UnmaskModalComponent>,
    private agentApiService: AgentApiService,
    private socketsService: SocketsService,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onYesClick(): void {
    let killer = this.data.killer;
    this.socketsService.sendUnmaskRequest(killer, this.name);
    this.dialogRef.close(true);
  // this.agentApiService.unmask(killer._id, this.name).subscribe(res=>{
  //   this.dialogRef.close(res);
  // });

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}