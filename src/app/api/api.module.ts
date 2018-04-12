import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HttpModule } from '@angular/http';

import {GameApiService} from './game-api.service';
import {AgentApiService} from './agent-api.service';
import {MissionApiService} from './mission-api.service';
import {RequestApiService} from './request-api.service';

@NgModule({
  imports: [
    CommonModule,
    HttpModule
  ],
  exports: [],
  declarations: [],
  providers:[GameApiService, AgentApiService, MissionApiService, RequestApiService]
})
export class ApiModule { }
