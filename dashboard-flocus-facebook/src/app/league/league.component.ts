import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  private studyTime = 10;
  private stats: any = [];

  constructor( private DataService: DataService ) { }

  ngOnInit(): void {
  }

  
  

  private retrieveGlassCount(userid: string, weekStart: Date, weekEnd: Date): number {

    var glassCount: number;
    var date = new Date();
    var dayStart = new Date(date.setHours(0,0,0,0));   // today
    var dayEnd = new Date(date.setHours(23,59,59,999));   // today

    var httpParams = new HttpParams()
    .set("uid", userid)
    .set("dayStart", JSON.parse(JSON.stringify(weekStart)))
    .set("dayEnd", JSON.parse(JSON.stringify(weekEnd)))
    .set("timeSpentLower", this.studyTime.toString())
    .set("timeSpentUpper", this.studyTime.toString());

    this.DataService.getRecord(httpParams).subscribe(
      data => {
        this.stats = data;
        glassCount = this.stats.length;
        return glassCount;  
      },
      error => {
        console.log(error);
      }
    ); 
    return -1;  // Error
  }

}
