import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NovosComponent } from './novos.component';

describe('NovosComponent', () => {
  let component: NovosComponent;
  let fixture: ComponentFixture<NovosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NovosComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NovosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
