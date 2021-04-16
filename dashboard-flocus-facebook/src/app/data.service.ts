import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
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
  private REST_API_FACEBOOK_UID = "http://localhost:3000/uid";
  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.REST_API_SERVER)
  }
  public loginFB() {
    return this.httpClient.get(this.REST_API_FACEBOOK_LOGIN)
  }

  public getUid() {  // tbc
    return this.httpClient.get(this.REST_API_FACEBOOK_UID)
  }

  public postData(newData: Object) {
    return this.httpClient.post(this.REST_API_SERVER, newData)
  }

  // For Collection "Record"
  public getRecord(getParams: any): Observable<any> {
    return this.httpClient.get(this.REST_API_SERVER_RECORD, { params: getParams });
  }

  public postRecord(newRecord: any): Observable<any> {
    const headers = new HttpHeaders().set("Content-Type",'application/json');
    console.log(newRecord);
    return this.httpClient.post(this.REST_API_SERVER_RECORD, newRecord, { headers: headers });
  }
  // Methods for Collection "Record" end here
}