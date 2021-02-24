import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpiredSessionAlertComponent } from './expired-session-alert.component';

describe('ExpiredSessionAlertComponent', () => {
  let component: ExpiredSessionAlertComponent;
  let fixture: ComponentFixture<ExpiredSessionAlertComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExpiredSessionAlertComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExpiredSessionAlertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
