import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListaCursosEstPage } from './lista-cursos-est.page';

describe('ListaCursosEstPage', () => {
  let component: ListaCursosEstPage;
  let fixture: ComponentFixture<ListaCursosEstPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaCursosEstPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
