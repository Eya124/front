import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReservationArchivePageComponent } from './reservation-archive-page.component';

describe('ReservationArchivePageComponent', () => {
  let component: ReservationArchivePageComponent;
  let fixture: ComponentFixture<ReservationArchivePageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReservationArchivePageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ReservationArchivePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
