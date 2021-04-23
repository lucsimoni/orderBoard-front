import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MockInfos } from '../../models/mock-infos/mock-infos.model';
import { AuthenticationService } from '../authentication/authentication.service';


// import { SessionService } from '../session.service';
// Import comme cela
// import * as _ from 'lodash';



@Injectable({
    providedIn: 'root'
})
export class ApiService {

    domainUrl: string = environment.domainUrl;
    mock: boolean = environment.mock;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    };

    constructor(
        private httpClient: HttpClient,
        private authenticationService: AuthenticationService
    ) { }

    /**
     *  used for the methods that contains the body
     *  wsName : is the service name and urls parameters if necessary
     *  body : is a  body content
     */
    sendRequestPostOrUpdate(wsName: string, reqType: string, body: object, mockInfos: MockInfos) {
        if (environment.mock) {
            return this.callMockedData(mockInfos);
        } else {
            this.authenticationService.resetTimer();
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
    sendRequestGetOrDelete(wsName: string, reqType: string, responseType: string, mockInfos: MockInfos) {
        if (environment.mock) {
            return this.callMockedData(mockInfos);
        } else {
            this.authenticationService.resetTimer();
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
    callMockedData(mockInfos: any) {
        return this.httpClient.get('./assets/mocks/' + mockInfos.mockFolder + '/' + mockInfos.mockService + '.json').pipe(
            map(res => res)
        );
    }

    handleError(error: HttpErrorResponse) {
        return throwError(error);
    }

    // setToken(data: any) {
    //     this.sessionStgService.setToken(data.SessionID_base64);
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