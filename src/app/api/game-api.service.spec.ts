import { TestBed, inject } from '@angular/core/testing';

import { GameApiService } from './game-api.service';

describe('GameApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GameApiService]
    });
  });

  it('should be created', inject([GameApiService], (service: GameApiService) => {
    expect(service).toBeTruthy();
  }));
});
