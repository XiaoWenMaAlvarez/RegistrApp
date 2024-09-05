import { ComponentFixture, TestBed } from '@angular/core/testing';
import { DescargarReportePage } from './descargar-reporte.page';

describe('DescargarReportePage', () => {
  let component: DescargarReportePage;
  let fixture: ComponentFixture<DescargarReportePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(DescargarReportePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
