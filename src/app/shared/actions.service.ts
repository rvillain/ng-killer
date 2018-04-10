import { Injectable } from '@angular/core';
import { Action, Agent } from '../model/model';

@Injectable()
export class ActionsService {

  public static ACTTION_TYPE_KILL='kill';
  public static ACTTION_TYPE_UNMASK='unmask';
  public static ACTTION_TYPE_WRONG_KILLER='wrong_killer';
  public static ACTTION_TYPE_ERROR_DEATH='error_death';
  public static ACTTION_TYPE_SUICIDE='suicide';
  public static ACTTION_TYPE_GAME_STARTED='game_started';
  constructor() { }

  isImportant(action: Action): boolean{
    switch(action.type)
    {
      case ActionsService.ACTTION_TYPE_KILL:
      case ActionsService.ACTTION_TYPE_UNMASK:
        return true;
      default:
        return false;
    }
  }

  getIcon(action: Action): string{
    switch(action.type){
      case ActionsService.ACTTION_TYPE_KILL:
        return "done";
      case ActionsService.ACTTION_TYPE_UNMASK:
        return "person_pin";
      case ActionsService.ACTTION_TYPE_WRONG_KILLER:
        return "exposure_neg_1";
      default:
        return "announcement";
    }
  }

  countKillsByAgent(actions: Action[], agent: Agent): number{
    let score:number = actions.filter(a=>a.killer && a.killer.id==agent.id && a.type == ActionsService.ACTTION_TYPE_KILL).length;
    return score;
  }

  countUnmasksByAgent(actions: Action[], agent: Agent): number{
    return actions.filter(a=>a.killer && a.killer.id==agent.id && a.type == ActionsService.ACTTION_TYPE_UNMASK).length;
  }

  countBluffsByAgent(actions: Action[], agent: Agent): number{
    return actions.filter(a=>a.target && a.target.id==agent.id && a.type == ActionsService.ACTTION_TYPE_WRONG_KILLER).length;
  }

  countPointsByAgent(actions: Action[], agent: Agent): number{
    let score:number = 0;
    score+=this.countKillsByAgent(actions, agent);
    score+=this.countUnmasksByAgent(actions, agent);
    score+=this.countBluffsByAgent(actions, agent);
    return score;
  }

}
