import { Injectable } from '@angular/core';

@Injectable()
export class MissionsService {

  public levels: string[] = ['action','manipulation', 'hardcore'];
  constructor() { }

  getLevels(): string[]{
    return this.levels;
  }

}
