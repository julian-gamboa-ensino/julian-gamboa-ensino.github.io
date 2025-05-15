import { TestBed } from '@angular/core/testing';

import { GetListaPastasService } from './get-lista-pastas.service';

describe('GetListaPastasService', () => {
  let service: GetListaPastasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GetListaPastasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
