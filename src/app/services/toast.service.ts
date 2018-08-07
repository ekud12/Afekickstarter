import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';
//
@Injectable()
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string, action?: string) {
    this.snackBar.dismiss();
    this.snackBar.open(message, null, {
      duration: 4000,
      verticalPosition: 'top',
      direction: 'ltr',
      panelClass: ['snack']
    });
  }
}
