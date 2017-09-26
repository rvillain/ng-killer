import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { KillModalComponent } from './kill-modal.component';

describe('KillModalComponent', () => {
  let component: KillModalComponent;
  let fixture: ComponentFixture<KillModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ KillModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(KillModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
