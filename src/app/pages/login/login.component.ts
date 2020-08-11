import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {}

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

}
