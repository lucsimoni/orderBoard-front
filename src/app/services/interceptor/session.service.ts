// import { Injectable } from '@angular/core';
// import { Observable } from 'rxjs';
// import { TranslateService } from '@ngx-translate/core';
// import { Router } from '@angular/router';

// const MAX_SESSION_TIMER = 1000;

// @Injectable({
//     providedIn: 'root'
// })

// export class SessionService {

//     timer: number = 0;
//     timerSub: any;

//     constructor(
//         private router: Router
//     ) {}

//     startTimer() {
//         this.timer = 0;
//         let timerSub = Observable.timer(10, 1000);
//         this.timerSub = timerSub.subscribe(t => this.tickerFunc(t));
//     }

//     stopTimer() {
//         if (this.timerSub)
//             this.timerSub.unsubscribe();
//     }

//     resetTimer() {
//         this.stopTimer();
//         this.startTimer();
//     }

//     tickerFunc(tick) {
//         this.timer = tick;
//         if (this.timer === MAX_SESSION_TIMER - 10) {
//             this.timerSub.unsubscribe();
//             console.log("Error : show popup logout");
//         }
//     }

//     resetSession() {
//         this.router.navigate(['/login'])
//         location.reload();
//     }

// }
