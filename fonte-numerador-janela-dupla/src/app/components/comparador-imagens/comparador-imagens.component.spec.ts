import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparadorImagensComponent } from './comparador-imagens.component';

describe('ComparadorImagensComponent', () => {
  let component: ComparadorImagensComponent;
  let fixture: ComponentFixture<ComparadorImagensComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparadorImagensComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparadorImagensComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
