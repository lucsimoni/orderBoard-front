import { Injectable, NgZone } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertsService {

  constructor(
    private zone: NgZone,
    private snackBar: MatSnackBar,
  ) { }

  error(message: string) {
    this.displayCustomSnackBar('alt-error', message);
  }

  warning(message: string) {
    this.displayCustomSnackBar('alt-warn', message);
  }

  success(message: string) {
    this.displayCustomSnackBar('alt-succeed', message);
  }

  private displayCustomSnackBar(cssClass: string, text: string) {
    // this.zone.run(()=> {
    //   this.snackBar.openFromComponent(AlertComponent, {
    //     panelClass: cssClass
    //   })
    // })
  }
}
