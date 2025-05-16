import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaPastasComponent } from './lista-pastas.component';

describe('ListaPastasComponent', () => {
  let component: ListaPastasComponent;
  let fixture: ComponentFixture<ListaPastasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaPastasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaPastasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
