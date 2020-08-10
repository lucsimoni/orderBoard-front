import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
// import { SessionStgService } from '../session-storage/session-stg.service';
// import { AuthService } from './auth.service';
// import { SessionService } from '../session.service';

// Import comme cela
// import * as _ from 'lodash';

// Version mock dans le .ts du login
// if (this.loginForm.controls.login.value.toUpperCase() == 'MOCK') {
//     environment.mock = true;
// }

@Injectable({
    providedIn: 'root'
})
export class ApiService {
    //Variables
    domainUrl: string = environment.domainUrl;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    };

    constructor(
        private httpClient: HttpClient,
        // private sessionStgService: SessionStgService,
        // private authService: AuthService,
        // private sessionService: SessionService
    ) {}

    /**
     *  used for the methods that contains the body
     *  wsName : is the service name and urls parameters if necessary
     *  body : is a  body content
     */
    sendRequestPostOrUpdate(wsName: string, reqType: string, body: object) {
        if (environment.mock) {
            return this.callMockedData(wsName);
        } else {
            // if (wsName != 'rdf/login')
            //     this.sessionService.resetTimer();
        }
        return this.httpClient[reqType](this.domainUrl + wsName, body/*, { headers: this.getHeaders(wsName) }*/)
            .pipe(
                map(res => res),
                catchError(this.handleError)
            )
    }

    /**
     * used for the methods without body
     * wsNameAndParameters : example 'nomService/urlParametre' is the service name and urls parameters if necessary
     * reqType : is a methode name for example get and delete
     * responseType: is XMLHttpRequestResponseType  example 'text'
     * */
    sendRequestGetOrDelete(wsName: string, reqType: string, responseType: string) {
        if (environment.mock) {
            return this.callMockedData(wsName);
        } else {
            // this.sessionService.resetTimer();
        }
        return this.httpClient[reqType](this.domainUrl + wsName/*, { headers: this.getHeaders(wsName) }*/)
            .pipe(
                map(res => res),
                catchError(this.handleError)
            )
    }

    /**
     *  used for mocking all Wss if mock is true
     *  wsName : is the service name which is the name of the jsonFile
     */
    callMockedData(wsName: string) {
        return this.httpClient.get('./assets/mocks/' + this.extractWsName(wsName) + '.json').pipe(
            map(res => res)
        );
    }

    extractWsName(wsName) {
        let wsN = wsName.split('/');
        wsN = wsN[wsN.length - 1].split('?');
        return wsN[0];
    }


    handleError(error: HttpErrorResponse) {
        // return an observable with a user-facing error message
        return throwError(error);
    }

    // setToken(data: any) {
    //     this.sessionStgService.setToken('Bearer ' + data.SessionID_base64);
    // }

    // getHeaders(wsName) {
    //     //TODO Rajouter le logout
    //     if (!this.authService.isAuthenticated() && wsName != '/rdf/login/' && wsName != 'rdf/serviceName' )
    //         this.authService.logout();
    //     if (wsName == 'rdf/serviceName' ||  wsName == 'rdf/serviceName') {
    //         return new HttpHeaders({
    //             'Content-Type': 'application/json'
    //         })
    //     }
    //     return new HttpHeaders({
    //         'Content-Type': 'application/json',
    //         'Authorization': this.sessionStgService.getToken()
    //     })
    // }

}