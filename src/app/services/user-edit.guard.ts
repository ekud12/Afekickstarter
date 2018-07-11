import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';
import { ToastService } from './toast.service';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class UserEditGuard implements CanActivate {
  constructor(private auth: UserService, private router: Router, private toaster: ToastService) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    return this.auth.user$.pipe(
      take(1),
      map(user => (user && this.auth.canEdit(user) ? true : false)),
      tap(canEdit => {
        if (!canEdit) {
          this.toaster.openSnackBar('Access denied. Must have permission to view content');
          this.router.navigate(['home/projects']);
          return false;
        } else {
          return true;
        }
      })
    );
  }
}
