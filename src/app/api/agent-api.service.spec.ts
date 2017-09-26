import { TestBed, inject } from '@angular/core/testing';

import { AgentApiService } from './agent-api.service';

describe('AgentApiService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AgentApiService]
    });
  });

  it('should be created', inject([AgentApiService], (service: AgentApiService) => {
    expect(service).toBeTruthy();
  }));
});
