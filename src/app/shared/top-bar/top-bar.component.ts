import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'src/app/services/storage/session-storage.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import * as moment from 'moment';
import { User } from 'src/app/models/user/user.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  language: string = 'fr';

  constructor(
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
    private authenticationService: AuthenticationService,
    private router: Router
  ) { }

  ngOnInit(): void {
    (typeof this.sessionStorageService.getLanguage() === 'undefined') ? this.language = this.translateService.currentLang || this.translateService.getDefaultLang() : this.changeLanguage(this.sessionStorageService.getLanguage());
  }

  changeLanguage(langue: string) {
    this.translateService.use(langue);
    this.sessionStorageService.setLanguage(langue);    
    this.language = langue;
    moment.locale(langue);
  }

  isLoggedIn() {
    return this.authenticationService.isAuthenticated();
  }

  logout() {
    this.authenticationService.logout();
  }

  /**
   * Affiche le nom sous la forme : Luc SIMONI => L. SIMONI
   * Sinon on affiche "mon compte" si des données sont manquantes
   */
  getUserName():string {
    const user:User = this.sessionStorageService.getUser();
    if(user) {
      if(user.firstname && user.name) {
        return user.firstname.charAt(0).toUpperCase() + '. ' + user.name;
      }
    }
    return this.translateService.instant('HEADER.ACCOUNT');
  }

  editProfil(): void {
    const user:User = this.sessionStorageService.getUser();
    if(user) {
      if(user.login) {
        this.router.navigate(['user/' + user.login]);
      }
    }
  }

}
