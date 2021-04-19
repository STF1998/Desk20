import { Component, OnInit } from '@angular/core';
import { GoogleChartsModule } from 'angular-google-charts';
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


  public drawChart() {
    var data = google.visualization.arrayToDataTable([
        ['Day', 'Glasses'],
        ['Mo', 3],
        ['Tu', 5],
        ['We', 6],
        ['Th', 0],
        ['Fr', 0],
        ['Sa', 1]
    ]);
    var options = {
        title: 'Glasses poured per day',
        isStacked: true
    };
    var id = document.getElementById('stats');
    if(id == null){
      alert("cannot find stats container");
      return;
    }
    var chart = new google.visualization.BarChart(id);
    chart.draw(data, options);
  }

  
  

  private retrieveGlassCount(userid: string, rangeStart: Date, rangeEnd: Date): number {

    var glassCount: number;
    var date = new Date();
    var dayStart = new Date(date.setHours(0,0,0,0));   // today
    var dayEnd = new Date(date.setHours(23,59,59,999));   // today

    var httpParams = new HttpParams()
    .set("uid", userid)
    .set("dayStart", JSON.parse(JSON.stringify(rangeStart)))
    .set("dayEnd", JSON.parse(JSON.stringify(rangeEnd)))
    .set("timeSpent", this.studyTime.toString());

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
