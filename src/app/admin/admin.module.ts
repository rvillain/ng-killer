import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GameComponent } from './game/game.component';
import { MissionsComponent } from './missions/missions.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';

import { ApiModule } from '../api/api.module';
import { SharedModule } from '../shared/shared.module';

import { RouterModule } from '@angular/router';

import {
} from '@angular/material';
import { TargetsEditorComponent } from './targets-editor/targets-editor.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
  ],
  declarations: [GameComponent, MissionsComponent, AdminHomeComponent, TargetsEditorComponent]
})
export class AdminModule { }
