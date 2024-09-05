import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MarcarPresentePage } from './marcar-presente.page';

describe('MarcarPresentePage', () => {
  let component: MarcarPresentePage;
  let fixture: ComponentFixture<MarcarPresentePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(MarcarPresentePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
