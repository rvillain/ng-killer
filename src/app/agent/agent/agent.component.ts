import { Component, OnInit, OnDestroy } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { MdDialog } from '@angular/material';

import { Game, Agent, Action } from '../../model/model';
import { KillModalComponent } from '../kill-modal/kill-modal.component';
import { UnmaskModalComponent } from '../unmask-modal/unmask-modal.component';
import { CodeModalComponent } from '../code-modal/code-modal.component';

@Component({
  selector: 'app-agent',
  templateUrl: './agent.component.html',
  styleUrls: ['./agent.component.sass']
})
export class AgentComponent implements OnInit, OnDestroy {
  public agent:Agent;
  private sub: any;

  private status: string = "created";

  constructor(private agentApiService: AgentApiService, private route: ActivatedRoute, private dialog: MdDialog) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      let id = params['id']; // (+) converts string 'id' to a number
      this.agentApiService.getById(id).subscribe(
        res => {
          this.agent = res;
          this.status = this.agent.game.status;
        },
        err => {
          console.log("err", err);
        });
      // In a real app: dispatch action to load the details here.
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  showCode(){
    let dialogRef = this.dialog.open(CodeModalComponent, {
      data: { agent: this.agent }
    });
    dialogRef.afterClosed().subscribe(result => {});
  }

  kill() {
    let dialogRef = this.dialog.open(KillModalComponent, {
      data: { killer: this.agent }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let action: Action = result;
        this.agent = action.killer;
        if(this.agent.life == 0){
          this.agent.status = 'dead';
        }
      }
    });
  }
  unmask() {
    let dialogRef = this.dialog.open(UnmaskModalComponent, {
      data: { killer: this.agent }
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        let action: Action = result;
        this.agent = action.killer;
        if(this.agent.life == 0){
          this.agent.status = 'dead';
        }
      }
    });
  }
}
