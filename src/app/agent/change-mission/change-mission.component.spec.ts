import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeMissionComponent } from './change-mission.component';

describe('ChangeMissionComponent', () => {
  let component: ChangeMissionComponent;
  let fixture: ComponentFixture<ChangeMissionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeMissionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
