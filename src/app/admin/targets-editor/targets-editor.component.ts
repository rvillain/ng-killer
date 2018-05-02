import { Component, OnInit, Input, ApplicationRef, IterableDiffers, IterableDiffer } from '@angular/core';
import { Game, Agent } from '../../model/model';
import { NgStyle } from '@angular/common';

@Component({
  selector: 'app-targets-editor',
  templateUrl: './targets-editor.component.html',
  styleUrls: ['./targets-editor.component.sass']
})

export class TargetsEditorComponent implements OnInit {


  iterableDiffer: IterableDiffer<Agent>;
  @Input()
  public game: Game;
  public positions: Array<Position> = new Array<Position>();
  public zoneSize: number;
  constructor(private ref: ApplicationRef, private _iterableDiffers: IterableDiffers) {
    this.iterableDiffer = this._iterableDiffers.find([]).create(null);
  }

  ngOnInit() {
    // this.game.agents.forEach((a, index) => {
    //   let position = new Position();
    //   position.agent = a;
    //   position.position = index;
    //   this.positions.push(position);
    // });
    this.zoneSize = 300 + 50 * this.game.agents.length;
  }

  switchPosition (position: Position) {
    let target = this.positions.find(p=>p.isSelected);
    if(target){
      let targetPosition = target.position;
      target.position = position.position;
      position.position = targetPosition;
      target.isSelected = false;
    }
    else{
      position.isSelected = true;
    }
  }
  insertAfter(index: number){
    let source = this.positions.find(p=>p.isSelected);
    let targetPos = (index + 1) % (this.positions.length+1);
    console.log(source, index);
    if(source && source.position != targetPos){
      if(targetPos<source.position){
        for(let i=source.position - 1; i>=targetPos; i--){
          this.positions.find(p=>p.position == i).position++;
        }
        source.position = targetPos;
      }
      else{
        for(let i=source.position + 1; i<targetPos; i++){
          this.positions.find(p=>p.position == i).position--;
        }
        source.position = targetPos-1;
      }
    }
  }

  getR() {
    return Math.floor(this.zoneSize / 2) - 100;
  }
  positionsToAngle(position: number): number {
    let length = this.positions.length;
    let angle = -(position / length) * (2 * Math.PI)
    return angle;
  }
  calculateX(position): Number {
    let x = Math.floor(this.getR() * Math.cos(this.positionsToAngle(position)) + (this.zoneSize / 2 - 55));
    return x;
  }
  calculateY(position): Number {
    let y = Math.floor(this.getR() * Math.sin(this.positionsToAngle(position)) + (this.zoneSize / 2 - 55));
    return y;
  }
  getX(position): string {
    return this.calculateX(position).toString() + "px";
  }
  getY(position): string {
    return this.calculateY(position).toString() + "px";
  }

  getArrowRotation(index){
    return Math.floor(90+(index/this.positions.length)*360);
  }

  ngDoCheck() {
    let changes = this.iterableDiffer.diff(this.game.agents);
    if (changes) {

      let items = new Array<Agent>();
      changes.forEachItem(i=>{
        items.push(i.item);
      });
      //Add new agents
      changes.forEachAddedItem(c=>{
        let agent = c.item;
        if(!this.positions.find(p=>p.agent.id==agent.id)){
          let pos = new Position();
          pos.agent = agent;
          pos.position = this.positions.length;
          this.positions.push(pos);
        }
      })


      //Remove deleted agentd
      changes.forEachRemovedItem(c=>{
        let agent = c.item;
        if(this.positions.find(p=>p.agent.id==agent.id) && !items.find(i=>i.id == agent.id)){
          let pos = this.positions.find(p=>p.agent.id == agent.id);
          let index = pos.position;
          this.positions.splice(this.positions.indexOf(pos, 0), 1);
          this.positions.filter(p=>p.position > index).forEach(p=>{
            p.position--;
          });
        }
      });
      this.zoneSize = 300 + 50 * this.game.agents.length;
    }
}

}



class Position {
  constructor() { }
  public agent: Agent;
  public position: number;
  public isSelected: boolean;
}