import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TabsEstudiantePage } from './tabs-estudiante.page';

describe('TabsEstudiantePage', () => {
  let component: TabsEstudiantePage;
  let fixture: ComponentFixture<TabsEstudiantePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsEstudiantePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
