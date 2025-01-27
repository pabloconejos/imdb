import { TestBed } from '@angular/core/testing';

import { FavoritasService } from './favoritas.service';

describe('FavoritasService', () => {
  let service: FavoritasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FavoritasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
