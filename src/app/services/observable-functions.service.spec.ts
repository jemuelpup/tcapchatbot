import { TestBed, inject } from '@angular/core/testing';

import { ObservableFunctionsService } from './observable-functions.service';

describe('ObservableFunctionsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ObservableFunctionsService]
    });
  });

  it('should be created', inject([ObservableFunctionsService], (service: ObservableFunctionsService) => {
    expect(service).toBeTruthy();
  }));
});
