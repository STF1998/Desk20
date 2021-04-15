import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map, filter, switchMap } from 'rxjs/operators';
import { Params } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:3000/api";
  private REST_API_FACEBOOK_LOGIN = "http://localhost:3000/auth/facebook";
  private REST_API_SERVER_RECORD = "http://localhost:3000/api/record";
  // private REST_API_SERVER_RECORD_test = "http://localhost:3000/api/record/test";
  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.REST_API_SERVER)
  }
  public loginFB() {
    return this.httpClient.get(this.REST_API_FACEBOOK_LOGIN)
  }

  public postData(newData: Object) {
    return this.httpClient.post(this.REST_API_SERVER, newData)
  }

  // For Collection "Record"
  public getRecord(getParameter: any): Observable<any>{
    return this.httpClient.get(this.REST_API_SERVER_RECORD, {params: getParameter})
  }

  public postRecord(newData: Object) {
    return this.httpClient.post(this.REST_API_SERVER_RECORD, newData)
  }
  // Methods for Collection "Record" end here
}