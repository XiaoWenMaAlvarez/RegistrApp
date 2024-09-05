import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PassRestablecidoPage } from './pass-restablecido.page';

describe('PassRestablecidoPage', () => {
  let component: PassRestablecidoPage;
  let fixture: ComponentFixture<PassRestablecidoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(PassRestablecidoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
