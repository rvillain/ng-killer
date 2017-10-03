import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SuicideComponent } from './suicide.component';

describe('SuicideComponent', () => {
  let component: SuicideComponent;
  let fixture: ComponentFixture<SuicideComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SuicideComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SuicideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
