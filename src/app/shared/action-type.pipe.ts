import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'actionType'
})
export class ActionTypePipe implements PipeTransform {

  transform(value: any, args?: any): any {
    let label: string;
    switch(value){
      case 'wrong_killer':
        label = 'Mauvais tueur';
        break;
      case 'wrong_target':
        label = 'Mauvaise cible';
        break;
      case 'kill':
        label = 'Mission accomplie';
        break;
      case 'unmask':
        label = 'Légitime défense';
        break;
      case 'suicide':
        label = 'Suicide';
        break;
      case 'error_death':
        label = "Mort de s'être trompé";
        break;
      case 'game_started':
        label = "C'est parti !";
        break;
    }
    return label;
  }

}
