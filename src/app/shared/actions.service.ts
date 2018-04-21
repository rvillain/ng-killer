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
  public static ACTTION_TYPE_END='end';

  
  public static REQUEST_TYPE_JOIN_ROOM='join-room';

  public static REQUEST_TYPE_ASK_KILL='ask-kill';
  public static REQUEST_TYPE_CONFIRM_KILL='confirm-kill';
  public static REQUEST_TYPE_UNCONFIRM_KILL='unconfirm-kill';

  public static REQUEST_TYPE_ASK_UNMASK='ask-unmask';
  public static REQUEST_TYPE_WRONG_KILLER='wrong-killer';
  public static REQUEST_TYPE_CONFIRM_UNMASK='confirm-unmask';
  public static REQUEST_TYPE_UNCONFIRM_UNMASK='unconfirm-unmask';

  public static REQUEST_TYPE_AGENT_UPDATE='agent-update';
  public static REQUEST_TYPE_CHANGE_MISSION='change-mission';
  public static REQUEST_TYPE_SUICIDE='suicide';
  public static REQUEST_TYPE_NEW_ACTION='new-action';
  public static REQUEST_TYPE_NEW_AGENT='new-agent';
  public static REQUEST_TYPE_GAME_STATUS='game-status';
  public static REQUEST_TYPE_ACTION_ERROR='action-error';
  public static REQUEST_TYPE_TRIBUNAL_STATUS='tribunal-status';
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
    let score:number = actions.filter(a=>a.killerId && a.killerId==agent.id && a.type == ActionsService.ACTTION_TYPE_KILL).length;
    return score;
  }

  countUnmasksByAgent(actions: Action[], agent: Agent): number{
    return actions.filter(a=>a.killerId && a.killerId==agent.id && a.type == ActionsService.ACTTION_TYPE_UNMASK).length;
  }

  countBluffsByAgent(actions: Action[], agent: Agent): number{
    return actions.filter(a=>a.targetId && a.targetId==agent.id && (a.type == ActionsService.ACTTION_TYPE_WRONG_KILLER || a.type == ActionsService.ACTTION_TYPE_ERROR_DEATH)).length;
  }

  countPointsByAgent(actions: Action[], agent: Agent): number{
    let score:number = 0;
    score+=this.countKillsByAgent(actions, agent);
    score+=this.countUnmasksByAgent(actions, agent);
    score+=this.countBluffsByAgent(actions, agent);
    return score;
  }

}
