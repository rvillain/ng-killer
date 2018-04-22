import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { AgentCardComponent } from './agent-card/agent-card.component';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import {  
  FormsModule,  
  ReactiveFormsModule  
} from '@angular/forms';

import {
  MatButtonModule, 
  MatTableModule,
  MatToolbarModule,
  MatCardModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatInputModule,
  MatIconModule,
  MatTabsModule,
  MatDialogModule,
  MatChipsModule,
  MatListModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  MatSelectModule,
  MatMenuModule
} from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { TimelineComponent } from './timeline/timeline.component';
import { SocketsService } from './sockets.service'
import { MissionsService } from './missions.service';
import { ActionsService } from './actions.service';
import { GameService } from './game.service';
import { RulesComponent } from './rules/rules.component'

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    MatButtonModule, 
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatListModule,
    MatProgressSpinnerModule,
    RouterModule,
    FormsModule,  
    ReactiveFormsModule,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule
  ],
  exports: [
    RouterModule,
    HttpClientModule,
    MatButtonModule, 
    MatTableModule,
    MatToolbarModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatTabsModule,
    MatDialogModule,
    MatChipsModule,
    MatListModule,
    MatProgressSpinnerModule,
    FormsModule,  
    ReactiveFormsModule,
    HeaderComponent,
    RulesComponent,
    TimelineComponent,
    AgentCardComponent,
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule
  ],
  providers: [SocketsService, MissionsService, ActionsService, GameService],
  declarations: [ConfirmDialogComponent, HeaderComponent, TimelineComponent, RulesComponent, AgentCardComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
