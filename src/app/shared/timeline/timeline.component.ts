import { Component, OnInit, Input } from '@angular/core';
import { Action } from '../../model/model';
import { ActionsService } from '../../shared/actions.service';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass']
})
export class TimelineComponent implements OnInit {
  @Input()
  actions:Action[];

  public today = Date.now();

  public ActionsService = ActionsService;

  constructor(public actionsService: ActionsService) { 
  }

  ngOnInit() {
  }

  getKillIndex(action: Action){
    let kills = this.actions.filter(a=>a.type == ActionsService.ACTTION_TYPE_KILL);
    let index = kills.indexOf(action);
    index = (kills.length - index)%4;
    return index;
  }

}
