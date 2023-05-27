import { TestBed } from '@angular/core/testing';

import { OrdersListRestService } from './orders-list-rest.service';

describe('OrdersListRestService', () => {
  let service: OrdersListRestService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OrdersListRestService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
