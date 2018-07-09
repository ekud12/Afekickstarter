import { inject, TestBed } from '@angular/core/testing';
import { UserInvestGuard } from './user-invest.guard';

describe('UserGuard', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [UserInvestGuard]
    });
  });

  it('should ...', inject([UserInvestGuard], (guard: UserInvestGuard) => {
    expect(guard).toBeTruthy();
  }));
});
