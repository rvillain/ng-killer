import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalComponent } from './journal/journal.component';
import { SharedModule } from '../shared/shared.module';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { AgentCardComponent } from './agent-card/agent-card.component';
//import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    //NgxQRCodeModule,
    SharedModule
  ],
  declarations: [JournalComponent, LeaderboardComponent, AgentCardComponent]
})
export class StatsModule { }
