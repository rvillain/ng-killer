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

  public ActionsService = ActionsService;

  constructor(public actionsService: ActionsService) { }

  ngOnInit() {
  }

  

}
