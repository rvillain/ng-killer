import { TestBed, inject } from '@angular/core/testing';

import { RequestApiService } from './request-api.service';

describe('RequestApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RequestApiService]
    });
  });

  it('should be created', inject([RequestApiService], (service: RequestApiService) => {
    expect(service).toBeTruthy();
  }));
});
