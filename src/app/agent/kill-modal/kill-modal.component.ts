import { Component, OnInit, Inject } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';

import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-kill-modal',
  templateUrl: './kill-modal.component.html',
  styleUrls: ['./kill-modal.component.sass']
})
export class KillModalComponent {
  public code: string;
  constructor(
    public dialogRef: MdDialogRef<KillModalComponent>,
    private agentApiService: AgentApiService,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onYesClick(): void {
    let killer = this.data.killer;
    this.agentApiService.kill(killer._id, this.code).subscribe(res=>{
      this.dialogRef.close(res);
    });

  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}