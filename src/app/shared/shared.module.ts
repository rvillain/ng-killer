import { NgModule, isDevMode } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { RouterModule } from '@angular/router';
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
import { ActionTypePipe } from './action-type.pipe';
import { SocketsService } from './sockets.service'
import { MissionsService } from './missions.service';
import { ActionsService } from './actions.service';
import { GameService } from './game.service';
import { RulesComponent } from './rules/rules.component'

@NgModule({
  imports: [
    CommonModule,
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
    MatSnackBarModule,
    MatSelectModule,
    MatMenuModule
  ],
  providers: [SocketsService, MissionsService, ActionsService, GameService],
  declarations: [ConfirmDialogComponent, HeaderComponent, TimelineComponent, ActionTypePipe, RulesComponent],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
