import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

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
    private router: Router
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

  onSubmit(post) {
    console.log("lsi",post);
    this.router.navigate(['/dashboard']);
    // this.post = post;
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
