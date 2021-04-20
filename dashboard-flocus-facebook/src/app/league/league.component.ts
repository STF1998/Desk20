import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpParams } from '@angular/common/http';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  private userid: string = "108266374709077";
  private studyTime = 10;
  private stats: any = [];
  public dailyCount: number[] = [/*1, 2, 3, 4, 5, 6, 7*/];
  public colors: string[] = ["#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4"];


  constructor(private DataService: DataService) {
    // this.dailyCount = [1, 2, 3, 4, 5, 6, 7];
    this.colors = ["#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4", "#9fbce4"];
  }


  ngOnInit(): void {
    this.retrieveUidWithUserData();
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
          display: false,
        }
      }],
    }
  };

  public barChartLabels = ['Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa', 'Su'];
  public barChartType = 'bar';
  public barChartData = [
    {
      data: this.dailyCount,
      backgroundColor: '#2672db'
    }
  ];


  private async retrieveUserData(userid: string, todayDate: Date) {
    var sundayStart = new Date(new Date(new Date().setDate(todayDate.getDate() - todayDate.getDay())).setHours(0, 0, 0, 0));
    var sundayEnd = new Date(new Date(new Date().setDate(todayDate.getDate() - todayDate.getDay())).setHours(23, 59, 59, 999));
    console.log(sundayStart + " " + sundayEnd);

    // Get current week data (-7 if previous week)
    for(var i=1; i<=7; i++){
      var currentDayStart = new Date(sundayStart.setDate(sundayStart.getDate() + 1));
      var currentDayEnd = new Date(sundayEnd.setDate(sundayEnd.getDate() + 1));
      console.log(currentDayStart);
      console.log(currentDayEnd);

      this.retrieveUserRecord(this.userid, currentDayStart, currentDayEnd); 
    }
    if(this.dailyCount.length != 7){
      console.log("Not 7 days a week " + this.dailyCount.length);
    }
    console.log(this.dailyCount);


  }

  private async retrieveUserRecord(userid: string, rangeStart: Date, rangeEnd: Date) {

    var minStudyTime = 0;

    var httpParams = new HttpParams()
      .set("uid", userid)
      .set("rangeStart", JSON.parse(JSON.stringify(rangeStart)))
      .set("rangeEnd", JSON.parse(JSON.stringify(rangeEnd)))
      .set("timeSpentLower", minStudyTime.toString())
      .set("timeSpentUpper", this.studyTime.toString());

    this.DataService.getRecord(httpParams).subscribe(
      data => {     
        this.stats = data;
        if(this.stats.length == 1){
          console.log(this.stats[0].session);
          console.log(this.stats[0].totalTime);
          this.dailyCount.push(this.stats[0].session);
        } else {
          this.dailyCount.push(0);
        }
        console.log(this.dailyCount)
      },
      error => {
        console.log(error);
      }
    );
  }

  private retrieveUidWithUserData() {
    this.DataService.getUid().subscribe(
      userdata => {
        const uid = userdata;
        this.userid = uid.toString();
        this.retrieveUserData(this.userid, new Date());
      }
    )
  }

}
