import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormreclamationComponent } from './formreclamation.component';

describe('FormreclamationComponent', () => {
  let component: FormreclamationComponent;
  let fixture: ComponentFixture<FormreclamationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormreclamationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormreclamationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
