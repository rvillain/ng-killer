import { Component, OnInit, Inject } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';
import { SocketsService } from '../../shared/sockets.service';
import { Agent } from '../../model/model';

import { MatSnackBar } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    public snackBar:MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any) {
    agentApiService.getForUnmask(data.killer.id).subscribe(res => {
      this.agents = res;
    });
  }

  onYesClick(): void {
    let killer = this.data.killer;
    this.socketsService.sendUnmaskRequest(killer, this.selectedAgent.name);
    this.isWaiting = true;
    this.socketsService.getConfirmUnmask().subscribe(killer => {
      if (killer.target.id == this.data.killer.id) {
        this.snackBar.open("Bravo agent, vous avez visé juste", null, { duration: 3000 });
        this.dialogRef.close(true);
      }
    });
    this.socketsService.getUnconfirmUnmask().subscribe(killer => {
      if (killer.target.id == this.data.killer.id) {
        this.snackBar.open("Aïe, bien visé mais la cible n'est pas d'accord", null, { duration: 3000 });
        this.dialogRef.close(true);
      }
    });
    this.socketsService.getWrongKiller().subscribe(agent => {
      if(agent.id == this.data.killer.id){
        this.snackBar.open("Oups, ce n'est pas votre killer", null,{duration: 300000});
        this.dialogRef.close(true);
      }
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}