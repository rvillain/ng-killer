import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { MissionsComponent } from './missions/missions.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { ApiModule } from '../api/api.module';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';

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
  MdDialogModule
} from '@angular/material';

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
    SharedModule
  ],
  declarations: [GameComponent, MissionsComponent, AdminHomeComponent]
})
export class AdminModule { }
