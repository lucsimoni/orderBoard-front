import { HttpErrorResponse } from '@angular/common/http';
import { ErrorHandler, Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { AlertsService } from '../alerts/alerts.service';

@Injectable({
  providedIn: 'root'
})
export class ErrorsService implements ErrorHandler {

  constructor(
    private _alertService: AlertsService,
    private _translateService: TranslateService
  ) { }

  handleError(error: any): void {
    if(error instanceof HttpErrorResponse) {
      let message: string = '';
      switch(error.status) {
        case 500:
          message = this._translateService.instant('ERROR.TECHNICAL_ERROR');
          break;
        case 401:
          message = this._translateService.instant('ERROR.UNAUTHORIZED');
          break;
        default:
          message = this._translateService.instant('ERROR.' + error.error.message); 
      }
      this._alertService.error(message);
    }
  }
}
