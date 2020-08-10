import { Injectable, Inject } from '@angular/core';
import { SESSION_STORAGE, StorageService } from 'ngx-webstorage-service';

const STORAGE_LANG = 'storage_lang';

@Injectable({
  providedIn: 'root'
})
export class SessionStorageService {

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

}
