import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { RouterModule } from '@angular/router';
import {  
  FormsModule,  
  ReactiveFormsModule  
} from '@angular/forms';

import {
  MdButtonModule, 
  MdTableModule,
  MdToolbarModule,
  MdCardModule,
  MdExpansionModule,
  MdFormFieldModule,
  MdInputModule,
  MdIconModule,
  MdTabsModule,
  MdDialogModule,
  MdChipsModule,
  MdListModule
} from '@angular/material';
import { HeaderComponent } from './header/header.component';
import { TimelineComponent } from './timeline/timeline.component';
import { ActionTypePipe } from './action-type.pipe';

@NgModule({
  imports: [
    CommonModule,
    MdButtonModule, 
    MdTableModule,
    MdToolbarModule,
    MdCardModule,
    MdExpansionModule,
    MdFormFieldModule,
    MdInputModule,
    MdIconModule,
    MdTabsModule,
    MdDialogModule,
    MdChipsModule,
    MdListModule,
    RouterModule,
    FormsModule,  
    ReactiveFormsModule  
  ],
  exports: [
    RouterModule,
    MdButtonModule, 
    MdTableModule,
    MdToolbarModule,
    MdCardModule,
    MdExpansionModule,
    MdFormFieldModule,
    MdInputModule,
    MdIconModule,
    MdTabsModule,
    MdDialogModule,
    MdChipsModule,
    MdListModule,
    FormsModule,  
    ReactiveFormsModule,
    HeaderComponent,
    TimelineComponent
  ],
  
  declarations: [ConfirmDialogComponent, HeaderComponent, TimelineComponent, ActionTypePipe],
  entryComponents: [ConfirmDialogComponent]
})
export class SharedModule { }
