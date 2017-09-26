import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { GameComponent } from './admin/game/game.component';
import { JournalComponent } from './stats/journal/journal.component';
import { JoinComponent } from './agent/join/join.component';
import { AgentComponent } from './agent/agent/agent.component';

export const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: HomeComponent },
    { path: 'admin', component: AdminHomeComponent },
    { path: 'admin/:id', component: GameComponent },
    { path: 'journal/:id', component: JournalComponent },
    { path: 'join/:id', component: JoinComponent },
    { path: 'agent/:id', component: AgentComponent }
];

export const routes: ModuleWithProviders = RouterModule.forRoot(appRoutes);