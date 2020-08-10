import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SessionStorageService } from 'src/app/services/storage/session-storage.service';
import * as moment from 'moment';

@Component({
  selector: 'app-top-bar',
  templateUrl: './top-bar.component.html',
  styleUrls: ['./top-bar.component.scss']
})
export class TopBarComponent implements OnInit {

  language: string = 'fr';

  constructor(
    private translateService: TranslateService,
    private sessionStorageService: SessionStorageService,
  ) { }

  ngOnInit(): void {
    (typeof this.sessionStorageService.getLanguage() === 'undefined') ? this.language = this.translateService.currentLang || this.translateService.getDefaultLang() : this.changeLanguage(this.sessionStorageService.getLanguage());
  }

  changeLanguage(langue: string) {
    this.translateService.use(langue);
    this.sessionStorageService.setLanguage(langue);    
    this.language = langue;
    moment.locale(langue);
  }

}
