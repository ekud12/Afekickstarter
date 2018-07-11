import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AdminGuard implements CanActivate {
  constructor(private auth: UserService, private router: Router, private toaster: ToastService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => (user && this.auth.isAdmin(user) ? true : false)),
      tap(isAdmin => {
        if (!isAdmin) {
          this.toaster.openSnackBar('Access denied, Admin permissions required.');
          this.router.navigate(['home/projects']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
