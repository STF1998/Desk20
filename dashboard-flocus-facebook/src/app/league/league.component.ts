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
  public dailyCount: number[] = [1, 2, 8, 4, 5, 6, 15];


  constructor( private DataService: DataService ) {}


  ngOnInit(): void {
  }

  private assignColors (day: number): string {

    if(this.dailyCount[day] <= 2){
       return "#cbdef8";
    }
    if(this.dailyCount[day] <= 4){
      return "#b5cef1";
    }
    if(this.dailyCount[day] <= 5){
      return "#6a9be0";
    }
    if(this.dailyCount[day] <= 10){
      return "#a82cda";
    }
    if(this.dailyCount[day] > 13){
      return "#ad445f";
    }
    return "#9fbce4"
  }

  public barChartOptions = {
    responsive: true,
    scales: {
      xAxes: [{
          gridLines: {
              display: false,
          }
      }],
      yAxis: [{
        gridLines: {
            drawBorder: false,
            display: false,
            zeroLineColor:'transparent',
        }
      }],
    },
    legend: {
      display: false
   },
  };

  public barChartLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  public barChartType = 'horizontalBar';
  public barChartData = [
    {data: this.dailyCount,
    backgroundColor:[
      this.assignColors(0),
      this.assignColors(1),
      this.assignColors(2),
      this.assignColors(3),
      this.assignColors(4),
      this.assignColors(5),
      this.assignColors(6)
    ],
    hoverBackgroundColor: '#112d53'
  }];

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
