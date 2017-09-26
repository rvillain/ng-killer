import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {  
  FormsModule,  
  ReactiveFormsModule  
} from '@angular/forms';

import { AppComponent } from './app.component';
import { routes } from './app.router';
import { HomeComponent } from './home/home.component';

import { ApiModule } from './api/api.module';
import { AdminModule } from './admin/admin.module';
import { StatsModule } from './stats/stats.module';
import { AgentModule } from './agent/agent.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    routes,
    BrowserAnimationsModule,
    ApiModule,
    AdminModule,
    StatsModule,
    AgentModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
