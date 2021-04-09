import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-api-test',
  templateUrl: './api-test.component.html',
  styleUrls: ['./api-test.component.css']
})
export class APITestComponent implements OnInit {

  constructor(private DataService : DataService) { }

  ngOnInit(): void {  }

  testUserData: Object = {
    uid: "ab",
    email: "abc.com",
    name: "testuser",
    gender: "m",
    birthday: "2 OCT 1862",
    pic: "abc.jpg",
    location: "UK",
    friends: "testuser2"
  };
 
  sendData(){
    this.DataService.postData(JSON.stringify(this.testUserData));
  }

}
