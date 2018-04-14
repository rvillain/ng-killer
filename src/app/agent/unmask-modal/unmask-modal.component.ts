import { Component, OnInit, Inject } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';
import { SocketsService } from '../../shared/sockets.service';
import { Agent } from '../../model/model';

import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ActionsService } from '../../shared/actions.service';

@Component({
  selector: 'app-unmask-modal',
  templateUrl: './unmask-modal.component.html',
  styleUrls: ['./unmask-modal.component.sass']
})
export class UnmaskModalComponent {
  public selectedAgent: Agent;
  public agents: Agent[] = [];
  public isWaiting: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<UnmaskModalComponent>,
    private agentApiService: AgentApiService,
    private socketsService: SocketsService,
    public snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    agentApiService.getForUnmask(data.killer.id).subscribe(res => {
      this.agents = res;
    });
  }

  onYesClick(): void {
    let killer = this.data.killer;
    this.socketsService.sendUnmaskRequest(killer, this.selectedAgent);
    this.isWaiting = true;
    this.socketsService.requests.subscribe(request => {
      switch (request.type) {
        case ActionsService.REQUEST_TYPE_CONFIRM_UNMASK:
          this.snackBar.open("Bravo agent, vous avez visé juste", null, { duration: 3000 });
          this.dialogRef.close(true);
          break;
        case ActionsService.REQUEST_TYPE_UNCONFIRM_UNMASK:
          this.snackBar.open("Aïe, bien visé mais la cible n'est pas d'accord", null, { duration: 3000 });
          this.dialogRef.close(true);
          break;
        case ActionsService.REQUEST_TYPE_WRONG_KILLER:
          this.snackBar.open("Oups, ce n'est pas votre killer", null, { duration: 300000 });
          this.dialogRef.close(true);
          break;
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}