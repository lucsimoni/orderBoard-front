import { Injectable } from '@angular/core';
import { BehaviorSubject, timer } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from '../storage/session-storage.service';
import { MatDialog } from '@angular/material/dialog';
import { ExpiredSessionAlertComponent } from './expired-session-alert/expired-session-alert.component';

// Durée de session en secondes - 3min 180s
const MAX_SESSION_TIMER = 180;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authSubject = new BehaviorSubject<boolean>(false);
  private isLoggedIn = this.authSubject.asObservable();

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService,
    private dialog: MatDialog
  ) { }

  public isAuthenticated(): boolean {
    let authVal = false;
    this.isLoggedIn.subscribe((res) => { authVal = res });
    return authVal;
  }

  setAuthSubject(value: boolean) {
    this.authSubject.next(value);
  }

  logout() {
    this.sessionStorageService.clear();
    this.setAuthSubject(false);
    this.stopTimer();
    this.router.navigate(['/']);
  }

  /***** TIMER DE SESSION *****/
  timer: number = 0;
  timerSub: any;

  startTimer() {
    this.timer = 0;
    let timerSub = timer(10, 1000);
    this.timerSub = timerSub.subscribe(t => this.tickerFunc(t));
  }

  stopTimer() {
    if (this.timerSub)
      this.timerSub.unsubscribe();
  }

  resetTimer() {
    this.stopTimer();
    this.startTimer();
  }

  tickerFunc(tick) {
    this.timer = tick;      
    if (this.timer === MAX_SESSION_TIMER) {
      this.timerSub.unsubscribe();
      this.openExpiredSessionPopUp();
    }
  }

  //Ouverture d'une popup indiquant que la session est expirée
  openExpiredSessionPopUp() {
    const dialogRef = this.dialog.open(ExpiredSessionAlertComponent, {disableClose: true});
    dialogRef.afterClosed().subscribe(() => {
      this.logout();
    });
  }
  /***** ./TIMER DE SESSION *****/

}
