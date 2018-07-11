import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserInvestGuard implements CanActivate {
  constructor(private auth: UserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => (user && this.auth.canInvest(user) ? true : false)),
      tap(canView => {
        if (!canView) {
          console.error('Access denied. Must have permission to view content');
          this.router.navigate(['/home/projects']);
        } else {
        }
      })
    );
  }
}
