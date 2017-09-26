import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JoinComponent } from './join/join.component';

import { SharedModule } from '../shared/shared.module';

//import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { AgentComponent } from './agent/agent.component';
import { KillModalComponent } from './kill-modal/kill-modal.component';
import { UnmaskModalComponent } from './unmask-modal/unmask-modal.component';
import { CodeModalComponent } from './code-modal/code-modal.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
    //NgxQRCodeModule
  ],
  declarations: [JoinComponent, AgentComponent, KillModalComponent, UnmaskModalComponent, CodeModalComponent],
  entryComponents: [KillModalComponent, UnmaskModalComponent, CodeModalComponent]
})
export class AgentModule { }
