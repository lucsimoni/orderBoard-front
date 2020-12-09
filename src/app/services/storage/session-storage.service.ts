import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';
import { Observable, Subject } from 'rxjs';

const STORAGE_LANG = 'storage_lang';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

  private storageSub = new Subject<any>();

  constructor(
    @Inject(SESSION_STORAGE)
    private storage: StorageService
  ) { }

  initiliaze() {
    if (sessionStorage.length === 0) {
      //TODO mettre ici les objets a initialiser si besoin
    }
  }
  clear() {
    let lang = this.storage.get(STORAGE_LANG);
    this.storage.clear()
    this.setLanguage(lang);
  }
  clearSession() {
    this.storage.clear();
  }

  /*** TEST ***/
  getSearchFilters() {
    return this.storage.get('test');
  }
  setSearchFilters(filters) {
    this.storage.set('test',filters);
  }

  /*** LANG ***/
  getLanguage():string {
    return this.storage.get(STORAGE_LANG);
  }
  setLanguage(lang:string) {
    this.storage.set(STORAGE_LANG, lang);
  }
  clearLanguage(lang) {
    if(this.storage.get(STORAGE_LANG))
      return;
    else
      this.setLanguage(lang);
  }

  /*** SUBJECT MODIFICATION EN SESSION ET REPERCUSION DANS TOUS LES COMPOSANTS QUI L UTILISENT ***/
  /**
   * DANS LE TS DES COMPOSANTS
   * public list: string[];
   * ngOnInit {
   *  this.list = this.sessionStorageService.getAnInfo();
   *  this.sessionStorageService.watchStorage().subscribe((data:any) => {
   *    this.list = data;
   *  })
   * }
   */
  
  watchStorage(): Observable<any> {
    return this.storageSub.asObservable();
  }

  setAnInfo(info: string) {
    const listInfos: string[] = this.getAnInfo() || [];
    listInfos.push(info);
    this.storage.set('anInfo', listInfos);
    this.storageSub.next(listInfos) //Ou 'modifié'
  }

  getAnInfo(): string[] {
    return this.storage.get('anInfo');
  }

  clearAnInfo(): void {
    this.storage.set("anInfo", []);
    this.storageSub.next([]);
  }

}
