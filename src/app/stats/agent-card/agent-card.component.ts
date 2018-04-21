import { Component, OnInit, Input } from '@angular/core';
import { Agent } from '../../model/model';

@Component({
  selector: 'app-agent-card',
  templateUrl: './agent-card.component.html',
  styleUrls: ['./agent-card.component.sass']
})
export class AgentCardComponent implements OnInit {
  @Input()
  agent:Agent;

  public position: number;
  constructor() { 
    let min=1, max=5;
    this.position = Math.floor(Math.random() * (max - min + 1)) + min;
  }

  ngOnInit() {
  }

}
