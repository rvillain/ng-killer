import { TestBed, inject } from '@angular/core/testing';

import { MissionApiService } from './mission-api.service';

describe('MissionApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MissionApiService]
    });
  });

  it('should be created', inject([MissionApiService], (service: MissionApiService) => {
    expect(service).toBeTruthy();
  }));
});
