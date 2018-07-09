import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material';

@Injectable()
export class ToastService {
  constructor(private snackBar: MatSnackBar) {}

  public openSnackBar(message: string, action?: string) {
    this.snackBar.dismiss();
    this.snackBar.open(message, null, {
      duration: 7000,
      verticalPosition: 'bottom',
      direction: 'ltr',
      panelClass: ['snack']
    });
  }
}
