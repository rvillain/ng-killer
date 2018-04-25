import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ServiceWorkerModule } from '@angular/service-worker';

import { SharedModule } from '../shared/shared.module';

//import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

import { AgentComponent } from './agent/agent.component';
import { KillModalComponent } from './kill-modal/kill-modal.component';
import { UnmaskModalComponent } from './unmask-modal/unmask-modal.component';
import { CodeModalComponent } from './code-modal/code-modal.component';
import { JoinComponent } from './join/join.component';
import { ChangeMissionComponent } from './change-mission/change-mission.component';
import { SuicideComponent } from './suicide/suicide.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    ServiceWorkerModule.register('/sw.js', { enabled: true })
  ],
  declarations: [JoinComponent, AgentComponent, KillModalComponent, UnmaskModalComponent, CodeModalComponent, ChangeMissionComponent, SuicideComponent],
  entryComponents: [KillModalComponent, UnmaskModalComponent, CodeModalComponent, ChangeMissionComponent, SuicideComponent]
})
export class AgentModule {  }
