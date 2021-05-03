import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from './services/storage/session-storage.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  public title = 'OrderBoard';

  constructor(
    private translate: TranslateService,
    private sessionStgService: SessionStorageService) 
  {
    this.translate.setDefaultLang('fr');
    this.translate.use('fr');
    this.sessionStgService.clearLanguage('fr');
  }

  /**
   * 
   * Gestion d'état : pattern redux
   * 
   * ngxs
   * 
   * ajout librairie @ngxs/form-plugin
   * @ngxs/storage-plugin
   * @ngxs/store
   * 
   * dev dependency
   * @ngxs/devtools-plugin
   * 
   */
}
