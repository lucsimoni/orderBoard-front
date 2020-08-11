import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private requestMapping: string = 'user/';

    constructor(
      private apiService: ApiService
    ) { }

    getOneById() {
      // TODO
    }

    getAll():Observable<any> {
      return this.apiService.sendRequestGetOrDelete(this.requestMapping + 'getAll', 'get', "text");
    }
  

}
