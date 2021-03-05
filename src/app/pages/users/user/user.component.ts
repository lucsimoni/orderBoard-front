import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { User } from 'src/app/models/user/user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  public editedUser:User;

  constructor(
    private route:ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((data:User) => {      
      this.editedUser = data;
      // Object.assign({}, JSON.parse(data.user));
      console.log("LSI MAJ", this.editedUser);
    });
  }

}
