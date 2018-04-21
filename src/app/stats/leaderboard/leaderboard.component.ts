import { Component, OnInit, Input } from '@angular/core';
import { Rank, Game } from '../../model/model';
import { ActionsService } from '../../shared/actions.service';
import { MatIconRegistry } from '@angular/material';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass']
})
export class LeaderboardComponent implements OnInit {
  @Input()
  game:Game;

  @Input()
  title:String;
  
  constructor(public actionsService: ActionsService, private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer) { 
    
    this.matIconRegistry.addSvgIcon('suicide', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/suicide.svg'));
    this.matIconRegistry.addSvgIcon('kill', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/kill.svg'));
    this.matIconRegistry.addSvgIcon('target', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/target.svg'));
    this.matIconRegistry.addSvgIcon('death', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/death.svg'));
    this.matIconRegistry.addSvgIcon('agent', this.domSanitizer.bypassSecurityTrustResourceUrl('assets/images/logoOSS.svg'));
  }

  ngOnInit() {
  }

  countAliveAgents(){
    return this.game.agents.filter(a=>a.status=='alive').length;
  }
  countAgents(){
    return this.game.agents.length;
  }

  getRanking() {
    let ranking: Rank[] = [];
    for(let i=0; i<this.game.agents.length; i++){
      let agent = this.game.agents[i];
      let r = new Rank();
      r.agent = agent;
      r.score = this.actionsService.countPointsByAgent(this.game.actions, agent);
      r.kills = this.actionsService.countKillsByAgent(this.game.actions, agent);
      r.unmasks = this.actionsService.countUnmasksByAgent(this.game.actions, agent);
      r.bluffs = this.actionsService.countBluffsByAgent(this.game.actions, agent);
      ranking.push(r);
    }
    //order
    ranking = ranking.filter(r=>r.score>0).sort((a: Rank, b: Rank) => { return b.score - a.score });
    //set places
    let rankingWithPlaces = ranking.map(r=> { 
      r.place = ranking.filter(ra=>ra.score>r.score).length + 1;
      return r
    });
    return rankingWithPlaces;
  }
}
