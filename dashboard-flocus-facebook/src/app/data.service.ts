import { Injectable, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map, filter, switchMap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  private REST_API_SERVER = "http://localhost:3000/api";
  private REST_API_FACEBOOK_LOGIN = "http://localhost:3000/auth/facebook";
  private REST_API_SERVER_RECORD = "http://localhost:3000/api/record"
  private REST_API_SERVER_STATUS = "http://localhost:3000/status";
  private REST_API_SERVER_LOGINPAGE = "http://localhost:3000/toTheLogin";
  constructor(private httpClient: HttpClient) { }

  public getAll() {
    return this.httpClient.get(this.REST_API_SERVER)
  }
  public loginFB() {
    return this.httpClient.get(this.REST_API_FACEBOOK_LOGIN)
  }

  public loginStatus() {
    return this.httpClient.get(this.REST_API_SERVER_STATUS)
  }

  public toTheLogin() {
    return this.httpClient.get(this.REST_API_SERVER_LOGINPAGE)
  }

  public postData(newData: Object) {
    return this.httpClient.post(this.REST_API_SERVER, newData)
  }

  public postRecord(newData: Object) {
    return this.httpClient.post(this.REST_API_SERVER_RECORD, newData)
  }
}
