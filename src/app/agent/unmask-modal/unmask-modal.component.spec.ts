import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UnmaskModalComponent } from './unmask-modal.component';

describe('UnmaskModalComponent', () => {
  let component: UnmaskModalComponent;
  let fixture: ComponentFixture<UnmaskModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UnmaskModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UnmaskModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
