import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AppInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return next.handle(request);
  }
}

// import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from "@angular/common/http";
// import { Observable } from "rxjs/Observable";
// import { Injectable } from "@angular/core";
// import 'rxjs/add/operator/do';
// import { AuthService } from './auth.service';


// @Injectable()
// export class AppInterceptor implements HttpInterceptor {

//   isAlreadyDisconnect: boolean = false;

//   constructor(private authService: AuthService) { }

//   intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
//     return next.handle(req).do((event: HttpEvent<any>) => { }, (error: any) => {
//       if (error instanceof HttpErrorResponse) {
//         console.log('global error', error.status)
//         switch (error.status) {
//           case 401:
//             if (!this.isAlreadyDisconnect) {
//               this.authService.logoutExpiredSession();
//               this.isAlreadyDisconnect = true;
//             }
//             break;
//           default:
//             break;
//         }
//       }
//     });
//   }
// }
