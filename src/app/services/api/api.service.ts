import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError, retry } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';
import { throwError } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MockInfos } from '../../models/mock-infos/mock-infos.model';
import { AuthenticationService } from '../authentication/authentication.service';
import { SessionStorageService } from '../storage/session-storage.service';

// Import comme cela
// import * as _ from 'lodash';

@Injectable({
    providedIn: 'root'
})
export class ApiService {

    domainUrl: string = environment.domainUrl;
    mock: boolean = environment.mock;
    mockedWS: string[] = environment.mockedWs;

    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        }),
    };

    constructor(
        private httpClient: HttpClient,
        private authenticationService: AuthenticationService,
        private sessionStorageService: SessionStorageService
    ) { }

    /*** GET METHOD ***/
    sendRequestGet(wsName: string, mockInfos: MockInfos) {
        if (this.mock || this.mockedWS.includes(mockInfos.mockFolder + '/' + mockInfos.mockService)) {
            return this.callMockedData(mockInfos);
        } else {
            this.authenticationService.resetTimer();
        }
        return this.httpClient.get<Object>(wsName, { headers: this.getHeaders(mockInfos.mockFolder + '/' + mockInfos.mockService) })
            .pipe(
                retry(3),
                catchError(this.handleError)
            )
    }

    /*** DELETE METHOD ***/
    sendRequestDelete(wsName: string, mockInfos: MockInfos) {
        if (this.mock || this.mockedWS.includes(mockInfos.mockFolder + '/' + mockInfos.mockService)) {
            return this.callMockedData(mockInfos);
        } else {
            this.authenticationService.resetTimer();
        }
        return this.httpClient.delete<Object>(wsName, { headers: this.getHeaders(mockInfos.mockFolder + '/' + mockInfos.mockService) })
            .pipe(
                retry(3),
                catchError(this.handleError)
            )
    }

    /*** POST METHOD - CREATE ***/
    sendRequestPost(wsName: string, body:Object, mockInfos: MockInfos) {
        if (this.mock || this.mockedWS.includes(mockInfos.mockFolder + '/' + mockInfos.mockService)) {
            return this.callMockedData(mockInfos);
        } else {
            this.authenticationService.resetTimer();
        }
        return this.httpClient.post<Object>(wsName, body, { headers: this.getHeaders(mockInfos.mockFolder + '/' + mockInfos.mockService) })
            .pipe(
                retry(3),
                catchError(this.handleError)
            )
    }

    /*** PUT METHOD - UPDATE ***/
    sendRequestPut(wsName: string, body:Object, mockInfos: MockInfos) {
        if (this.mock || this.mockedWS.includes(mockInfos.mockFolder + '/' + mockInfos.mockService)) {
            return this.callMockedData(mockInfos);
        } else {
            this.authenticationService.resetTimer();
        }
        return this.httpClient.put<Object>(wsName, body, { headers: this.getHeaders(mockInfos.mockFolder + '/' + mockInfos.mockService) })
            .pipe(
                retry(3),
                catchError(this.handleError)
            )
    }

    /*** PATCH METHOD ***/
    sendRequestPatch(wsName: string, body:Object, mockInfos: MockInfos) {
        if (this.mock || this.mockedWS.includes(mockInfos.mockFolder + '/' + mockInfos.mockService)) {
            return this.callMockedData(mockInfos);
        } else {
            this.authenticationService.resetTimer();
        }
        return this.httpClient.patch<Object>(wsName, body, { headers: this.getHeaders(mockInfos.mockFolder + '/' + mockInfos.mockService) })
            .pipe(
                retry(3),
                catchError(this.handleError)
            )
    }


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

    setToken(data: any) {
        this.sessionStorageService.setToken(data.SessionID_base64);
    }

    getHeaders(wsName) {
        if (!this.authenticationService.isAuthenticated()) {
            if (wsName === 'api/login' || wsName === 'api/resetPassword') {
                return new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            } else {
                this.authenticationService.logout();
            }
        }
        return new HttpHeaders({
            'Content-Type': 'application/json',
            'Authorization': this.sessionStorageService.getToken()
        });
    }

}