import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { UserService } from 'src/app/services/user/user.service';
import { User } from '../../models/user/user.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {

  public isLoading: boolean;
  public sellers: User[];

  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getListUsers();
  }

  getListUsers() {    
    this.isLoading = true;
    this.userService.getAll().subscribe(
      (res) => {
        this.sellers = Object.assign([], res);
        this.isLoading = false;
      },
      (error) => {
        // this.errorService.manageError('02:01');
        this.isLoading = false;
      }
    )
  }

}
