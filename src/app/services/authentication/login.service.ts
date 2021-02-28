import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Credentials } from 'src/app/models/authentication/credentials';
import { MockInfos } from 'src/app/models/mock-infos/mock-infos.model';
import { User } from 'src/app/models/user/user.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  private requestMapping: string = 'authentication';

  constructor(
    private apiService: ApiService
  ) { }

  login(credentials: Credentials): Observable<User> {
    let mockInfos: MockInfos = { mockFolder: 'authentication', mockService: 'login' };
    const input = {
      "login": credentials.login,
      "password": credentials.password
    }
    return this.apiService.sendRequestPostOrUpdate(this.requestMapping + '/login', 'post', input, mockInfos);
  }
}
