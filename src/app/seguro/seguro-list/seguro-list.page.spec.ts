import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeguroListPage } from './seguro-list.page';

describe('SeguroListPage', () => {
  let component: SeguroListPage;
  let fixture: ComponentFixture<SeguroListPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguroListPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
