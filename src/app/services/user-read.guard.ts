import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserReadGuard implements CanActivate {
  constructor(private auth: UserService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => (user && this.auth.canRead(user) ? true : false)), // <-- important line
      tap(canView => {
        if (!canView) {
          console.error('Access denied. Must have permission to view content');
        } else {
          this.router.navigate(['landing']);
        }
      })
    );
  }
}
