import { TestBed, inject } from '@angular/core/testing';

import { PushNotificationsService } from './push-notifications.service';

describe('PushNotificationsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PushNotificationsService]
    });
  });

  it('should be created', inject([PushNotificationsService], (service: PushNotificationsService) => {
    expect(service).toBeTruthy();
  }));
});
