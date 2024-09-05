import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TomaAsistenciaPage } from './toma-asistencia.page';

describe('TomaAsistenciaPage', () => {
  let component: TomaAsistenciaPage;
  let fixture: ComponentFixture<TomaAsistenciaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TomaAsistenciaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
