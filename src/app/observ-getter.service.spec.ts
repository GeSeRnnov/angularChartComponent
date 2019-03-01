import { TestBed } from '@angular/core/testing';

import { ObservGetterService } from './observ-getter.service';

describe('ObservGetterService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ObservGetterService = TestBed.get(ObservGetterService);
    expect(service).toBeTruthy();
  });
});
