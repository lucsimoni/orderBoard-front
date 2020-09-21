import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class ErrorService {

  constructor(
    private snackBar: MatSnackBar
  ) { }

  manageError(codeError: string) {
    switch (codeError) {
      case '02:01':
        this.presentAlert('ERROR_02_01');
        break;
      case '03:01':
        this.presentAlert('ERROR_03_01');
        break;

      default:
        break;
    }
  }

  presentAlert(text: string) {
    this.snackBar.open(text, 'Error', {
      duration: 5000,
    });
  }

}
