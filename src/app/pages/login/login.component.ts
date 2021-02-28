import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { Credentials } from '../../models/authentication/credentials';
import { LoginService } from 'src/app/services/authentication/login.service';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import { SessionStorageService } from 'src/app/services/storage/session-storage.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  public showPassword: boolean = false;
  public isLoading: boolean = false;
  // post:any;

  constructor(
    private userService: UserService,
    private formBuilder: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService,
    private loginService: LoginService,
    private sessionStorageService: SessionStorageService
  ) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      login: [null, [Validators.required/*, this.loginValidator.bind(this)*/]],
      password: [null, Validators.required/*, Validators.pattern(regex)*/]
    });
  }

  get l() {
    return this.loginForm.controls;
  }

  resetLogin() {
    this.loginForm.controls.login.setValue('');
  }

  resetPassword() {
    this.loginForm.controls.password.setValue('');
  }

  testmock() {
    environment.mock = true;
    this.testCallBack();
  }

  testnonmock() {
    environment.mock = false;
    this.testCallBack();
  }

  testCallBack() {
    console.log('LSI 0');
    this.userService.getAll().subscribe(
      (res) => {
        console.log("LSI SUCCESS", res);
      },
      (error) => {
        console.log("LSI ERREUR");

      }
    );
  }

  login(credentials: Credentials) {
    this.isLoading = true;
    // Version Démo si le login est "MOCK"
    if (this.loginForm.controls.login.value.toUpperCase() == 'MOCK') {
      environment.mock = true;
    }
    this.loginService.login(credentials).subscribe(
      (user) => {
        this.sessionStorageService.setUser(user);
        this.authenticationService.setAuthSubject(true);
        this.authenticationService.startTimer();
        this.isLoading = false;
        this.router.navigate(['/dashboard']);
      },
      (error) => {
        //TODO manage error
        // this.errorService.manageError('02:01');
        this.isLoading = false;
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

  //Prerempli le login pour la prochaine connexion
  // constuctor : private storage: Storage

  //Dans le subscribe de la methode de login
  // this.storage.set('loginStorage', this.loginForm.controls.login.value);

  // Méthode appelée dans le ngoninit apres this.loginForm = this.formBuilder.group({
  // fillWithPreviousLogin() {
  //   this.storage.get('loginStorage').then(
  //     (res) => {
  //       if(res !== null && res !== undefined) {
  //         this.loginForm.patchValue({ login: res });
  //       } 
  //     })
  // }

}
