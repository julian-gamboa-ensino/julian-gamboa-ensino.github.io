import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ComparadorLogoTechCertificadoComponent } from './comparador-logo-tech-certificado.component';

describe('ComparadorLogoTechCertificadoComponent', () => {
  let component: ComparadorLogoTechCertificadoComponent;
  let fixture: ComponentFixture<ComparadorLogoTechCertificadoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ComparadorLogoTechCertificadoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ComparadorLogoTechCertificadoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
