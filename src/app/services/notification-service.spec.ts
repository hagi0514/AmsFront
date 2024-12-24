import { TestBed } from '@angular/core/testing';
import { NotificationService } from './notification-service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('NotificationService', () => {
  let service: NotificationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule], // Mocking HttpClient
    });

    service = TestBed.inject(NotificationService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
})