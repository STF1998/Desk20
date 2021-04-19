import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public status: boolean;
  public tempVar: boolean;
  tmp: any = [];
  constructor(private dataService: DataService) { }
 
  ngOnInit() {
  
    this.retrieveData();

  }

 

  retrieveData() {
    this.dataService.loginStatus().subscribe(
      data => {
        this.tmp = data;
        console.log(this.tmp);
        this.status = this.tmp.status;
        this.tempVar = this.tmp.status;
        console.log(this.tempVar);
        console.log(this.status);
        console.log("test");
        if (this.status) {
          console.log("yes");
          //route to another page
        } else {
          console.log("no");
          //let's stay here boiii
        }
        
      },
      error => {
        console.log(error);
      });
  }

}

