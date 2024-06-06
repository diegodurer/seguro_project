import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SeguroEditPage } from './seguro-edit.page';

describe('SeguroEditPage', () => {
  let component: SeguroEditPage;
  let fixture: ComponentFixture<SeguroEditPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(SeguroEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
