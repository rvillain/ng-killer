import { Component, OnInit, Input } from '@angular/core';
import { Rank } from '../../model/model';

@Component({
  selector: 'app-leaderboard',
  templateUrl: './leaderboard.component.html',
  styleUrls: ['./leaderboard.component.sass']
})
export class LeaderboardComponent implements OnInit {
  @Input()
  ranking:Rank[];

  @Input()
  title:String;

  constructor() { }

  ngOnInit() {
  }

}
