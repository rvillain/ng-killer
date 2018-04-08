import { Pipe, PipeTransform } from '@angular/core';
import { ActionsService } from './actions.service';

@Pipe({
  name: 'actionType'
})
export class ActionTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let label: string;
    switch(value){
      case ActionsService.ACTTION_TYPE_WRONG_KILLER:
        label = 'Mauvais tueur';
        break;
      case ActionsService.ACTTION_TYPE_KILL:
        label = 'Mission accomplie';
        break;
      case ActionsService.ACTTION_TYPE_UNMASK:
        label = 'Légitime défense';
        break;
      case ActionsService.ACTTION_TYPE_SUICIDE:
        label = 'Suicide';
        break;
      case ActionsService.ACTTION_TYPE_ERROR_DEATH:
        label = "Mort de s'être trompé";
        break;
      case ActionsService.ACTTION_TYPE_GAME_STARTED:
        label = "C'est parti !";
        break;
    }
    return label;
  }

}
