import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  // testCallBack() {
  //   console.log('LSI 0');
  //   this.userService.getAll().subscribe(
  //     (res) => {
  //       console.log("LSI SUCCESS", res);
  //     },
  //     (error) => {
  //       console.log("LSI ERREUR");
        
  //     }
  //   );
  // }

}
