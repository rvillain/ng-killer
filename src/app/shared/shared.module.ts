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
  MatSelectModule
} from '@angular/material';

import { HeaderComponent } from './header/header.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ActionTypePipe } from './action-type.pipe';
import { SocketsService } from './sockets.service'

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
    MatSelectModule
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
    TimelineComponent,
    MatSnackBarModule,
    MatSelectModule
  ],
  providers: [SocketsService],
  declarations: [ConfirmDialogComponent, HeaderComponent, TimelineComponent, ActionTypePipe],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
