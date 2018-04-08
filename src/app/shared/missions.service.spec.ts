import { TestBed, inject } from '@angular/core/testing';

import { MissionsService } from './missions.service';

describe('MissionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MissionsService]
    });
  });

  it('should be created', inject([MissionsService], (service: MissionsService) => {
    expect(service).toBeTruthy();
  }));
});
