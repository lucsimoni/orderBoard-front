import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../services/login/login.service';
import { Credentials } from '../../models/authentication/credentials';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SessionStorageService } from 'src/app/services/storage/session-storage.service';
import { LocalStorageService } from 'src/app/services/storage/local-storage.service';
import { UtilsService } from 'src/app/services/utils/utils.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public showPassword: boolean = false;
  // post:any;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loginService: LoginService,
    private sessionStorageService: SessionStorageService,
    private localStorageService: LocalStorageService,
    private utilsService: UtilsService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [null, [Validators.required/*, this.loginValidator.bind(this)*/]],
      password: [null, Validators.required/*, Validators.pattern(regex)*/]
    });
    this.fillWithPreviousLogin();
  }

  get l() {
    return this.loginForm.controls;
  }

  // Prérempli le login avec le login en localStorage
  fillWithPreviousLogin() {
    const loginInLocalStorage = this.localStorageService.get('loginStorage');
    if(loginInLocalStorage) {
      this.loginForm.patchValue({ login: loginInLocalStorage });
    }
  }

  resetLogin() {
    this.loginForm.controls.login.setValue('');
  }

  resetPassword() {
    this.loginForm.controls.password.setValue('');
  }

  login(credentials: Credentials) {
    this.utilsService.setLoader(true);
    // Version Démo si le login est "MOCK"
    if (this.loginForm.controls.login.value.toUpperCase() == 'MOCK') {
      environment.mock = true;
    }
    this.loginService.login(credentials).subscribe(
      (user) => {
        this.sessionStorageService.setUser(user);
        this.localStorageService.set('loginStorage', credentials.login);
        this.authenticationService.setAuthSubject(true);
        this.authenticationService.startTimer();
        this.utilsService.setLoader(false);
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        //TODO manage error
        // this.errorService.manageError('02:01');
        //utilsService.manageError() ou utilsService.manageSuccess
        this.utilsService.setLoader(false);
      }
    )
  }

  // loginValidator(control: FormControl) {
  //   // ok
  //   if(control.value === 'test') {
  //     return;
  //     // pas ok
  //   } else {
  //     return { errorLogin: true }
  //   }
  // }

  // errorFromCustomValidator(login) {
  //   if(login.errors.errorLogin)
  //     return true;
  //   return false;
  // }
}
