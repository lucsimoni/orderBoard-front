import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ApiService } from '../api/api.service';
import { MockInfos } from 'src/app/models/mock-infos/mock-infos.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    private requestMapping: string = 'user';

    constructor(
      private apiService: ApiService
    ) { }

    getOneById() {
      // TODO
    }

    getAll():Observable<any> {
      let mockInfos: MockInfos = { mockFolder: 'user', mockService: 'getAll' };
      return this.apiService.sendRequestGetOrDelete(this.requestMapping + '/getAll', 'get', "text", mockInfos );
    }
  

}
