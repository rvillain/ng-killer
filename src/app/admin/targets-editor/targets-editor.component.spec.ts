import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TargetsEditorComponent } from './targets-editor.component';

describe('TargetsEditorComponent', () => {
  let component: TargetsEditorComponent;
  let fixture: ComponentFixture<TargetsEditorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TargetsEditorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TargetsEditorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
