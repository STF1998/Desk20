import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Router, RouterModule } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})


export class LoginComponent implements OnInit {
  
  public status: boolean;
  tmp: any = [];
  constructor(private dataService: DataService, public router : Router) { }
  
  ngOnInit() {
    
    this.retrieveData();

  }

 
  retrieveData() {
    this.dataService.loginStatus().subscribe(
      data => {
        this.tmp = data;
        console.log(this.tmp);
        this.status = this.tmp.status;

        if (this.status) {
          console.log("yes");
          this.router.navigate(['home']);
          //route to another page
        } else {
          console.log("no");
          //let's stay here boi
        }
        
      },
      error => {
        console.log(error);
      });
  }
}

