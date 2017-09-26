import { Component, OnInit, Input } from '@angular/core';
import { Action } from '../../model/model';

@Component({
  selector: 'app-timeline',
  templateUrl: './timeline.component.html',
  styleUrls: ['./timeline.component.sass']
})
export class TimelineComponent implements OnInit {
  @Input()
  actions:Action[];

  constructor() { }

  ngOnInit() {
  }

  isImportant(action: Action): boolean{
    switch(action.type)
    {
      case 'kill':
      case 'unmask':
        return true;
      default:
        return false;
    }
  }

}
