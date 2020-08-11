import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from '../storage/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  public loggedIn = new BehaviorSubject<boolean>(false);

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  // public isAuthenticated(): boolean {
  //   return (this.sessionStorageService.getToken() != null) || false;
  // }

  logoutExpiredSession() { 
    this.logout();
  }
 
  logout() {
    this.sessionStorageService.clear();
    this.loggedIn.next(false); 
    this.router.navigate(['/login']);
  }
}
