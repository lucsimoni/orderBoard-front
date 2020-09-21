import { Component, OnInit } from '@angular/core';
import { ErrorService } from 'src/app/services/error/error.service';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../models/user/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public users: User[] = [];
  public isLoading: boolean;


  constructor(
    private userService: UserService,
    private errorService: ErrorService
  ) { }

  ngOnInit(): void {
    this.getListUsers();
  }

  getListUsers() {    
    this.isLoading = true;
    this.userService.getAll().subscribe(
      (res) => {
        this.users = Object.assign([], res);
        this.isLoading = false;
      },
      (error) => {
        this.errorService.manageError('02:01');
        this.isLoading = false;
      }
    )
  }

}
