import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProjectCardComponent } from './single-project.component';

describe('SingleProjectCardComponent', () => {
  let component: SingleProjectCardComponent;
  let fixture: ComponentFixture<SingleProjectCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SingleProjectCardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleProjectCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
