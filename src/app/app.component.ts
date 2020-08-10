import { Component } from '@angular/core';
import { UserService } from './services/user/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'OrderBoard';

  constructor(private userService:UserService) {}

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
