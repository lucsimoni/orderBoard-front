import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MockInfos } from 'src/app/models/mock-infos/mock-infos.model';
import { ApiService } from '../api/api.service';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  private requestMapping: string = 'product';

  constructor(
    private apiService: ApiService
  ) { }

  getAll():Observable<any> {
    let mockInfos: MockInfos = { mockFolder: 'product', mockService: 'getAll' };
    return this.apiService.sendRequestGetOrDelete(this.requestMapping + '/getAll', 'get', "text", mockInfos );
  }
  
}
