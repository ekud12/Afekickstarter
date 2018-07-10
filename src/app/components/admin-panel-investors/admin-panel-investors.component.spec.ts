import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPanelInvestorsComponent } from './admin-panel-investors.component';

describe('AdminPanelInvestorsComponent', () => {
  let component: AdminPanelInvestorsComponent;
  let fixture: ComponentFixture<AdminPanelInvestorsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminPanelInvestorsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPanelInvestorsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
