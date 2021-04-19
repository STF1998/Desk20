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
  public dailyCount: number[] = [1, 2, 3, 4, 5, 6, 7];
  public colors: string[] = ["#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4"];


  constructor( private DataService: DataService ) {
    this.dailyCount = [1, 2, 3, 4, 5, 6, 7];
    this.colors = ["#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4"];
  }


  ngOnInit(): void {
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
    backgroundColor: '#2672db'}
  ];

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
