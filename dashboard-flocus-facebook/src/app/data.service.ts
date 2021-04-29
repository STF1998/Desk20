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

  private REST_API_SERVER = "https://flocus.herokuapp.com/api";
  private REST_API_FACEBOOK_LOGIN = "https://flocus.herokuapp.com/auth/facebook";

  private REST_API_SERVER_RECORD = "https://flocus.herokuapp.com/api/record"
  private REST_API_SERVER_STATUS = "https://flocus.herokuapp.com/status";
  private REST_API_SERVER_LOGINPAGE = "https://flocus.herokuapp.com/toTheLogin";  
  private REST_API_FACEBOOK_UID = "https://flocus.herokuapp.com/uid";
  private REST_API_FACEBOOK_friendsUID = "https://flocus.herokuapp.com/friendsUID";
  private REST_API_FACEBOOK_friendNames = "https://flocus.herokuapp.com/friendNames";
  private REST_API_FACEBOOK_LEAGUE= "https://flocus.herokuapp.com/api/league";
 
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
  public getUid() {  // tbc
    return this.httpClient.get(this.REST_API_FACEBOOK_UID)
  }

  public getFriendsUid() {
    return this.httpClient.get(this.REST_API_FACEBOOK_friendsUID)
  }

  public getFriendNames() {
    return this.httpClient.get(this.REST_API_FACEBOOK_friendNames)
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
  public getLeague(getParams: any): Observable<any> {
    return this.httpClient.get(this.REST_API_FACEBOOK_LEAGUE,  { params: getParams })
  }

}

  // Methods for Collection "Record" end here


