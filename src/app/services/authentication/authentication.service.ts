import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { SessionStorageService } from '../storage/session-storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  private authSubject = new BehaviorSubject<boolean>(false);
  private isLoggedIn = this.authSubject.asObservable();

  constructor(
    private router: Router,
    private sessionStorageService: SessionStorageService
  ) { }

  public isAuthenticated() {
    let authVal = false;
    this.isLoggedIn.subscribe((res) => { authVal = res});
    return authVal;    
  }

  login() {
    this.authSubject.next(true);
  }
 
  logout() {
    this.sessionStorageService.clear();
    this.authSubject.next(false); 
    this.router.navigate(['/']);
  }
  
}
