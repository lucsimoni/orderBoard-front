import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TranslateService } from '@ngx-translate/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {

  constructor(
    private snackBar: MatSnackBar,
    private translateService: TranslateService
  ) { }

  /***** Loader de chargement *****/
  private loaderSub = new Subject<boolean>();

  watchLoader(): Observable<boolean> {
    return this.loaderSub.asObservable();
  }

  setLoader(isEnable: boolean) {
    this.loaderSub.next(isEnable);
  }

  
  /***** Formatage des données de recherche *****/
  format(element: any) {
    //On passe tout en minuscule
    element = element.toLowerCase();
    //On supprime les éventuels accents
    let accent = [
      /[\300-\306]/g, /[\340-\346]/g, // A, a
      /[\310-\313]/g, /[\350-\353]/g, // E, e
      /[\314-\317]/g, /[\354-\357]/g, // I, i
      /[\322-\330]/g, /[\362-\370]/g, // O, o
      /[\331-\334]/g, /[\371-\374]/g, // U, u
      /[\321]/g, /[\361]/g, // N, n
      /[\307]/g, /[\347]/g, // C, c
    ];
    let noaccent = ['A', 'a', 'E', 'e', 'I', 'i', 'O', 'o', 'U', 'u', 'N', 'n', 'C', 'c'];
    for (var i = 0; i < accent.length; i++) {
      element = element.replace(accent[i], noaccent[i]);
    }
    return element;
  }


  /***** Manage Success Message *****/
  

  /***** Manage Error Message *****/
  manageErrors(error:string = '00_00'):void {
    const wording = this.translateService.instant('ERROR.' + error);
    this.snackBar.open(wording, 'Error', {
      duration: 5000,
    });
  }

}
