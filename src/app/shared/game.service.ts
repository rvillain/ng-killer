import { Injectable } from '@angular/core';
import { Game } from '../model/model';

@Injectable()
export class GameService {

  public static GAME_STATUS_CREATED = "created";
  public static GAME_STATUS_STARTED = "started";

  constructor() { }

  isStarted(game: Game){
    return game.status == GameService.GAME_STATUS_STARTED;
  }
  isCreated(game: Game){
    return game.status == GameService.GAME_STATUS_CREATED;
  }

}
