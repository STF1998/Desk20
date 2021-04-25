import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css']
})
export class LeagueComponent implements OnInit {

  private userid: string = "108266374709077";
  private studyTime = 10;
  private stats: any = [];
  public dailyCount: number[] = [0, 0, 0, 0, 0, 0, 0];
  private friendIDs: any = [];
  private friendNames: any = [];
  private statsLeague: any = [];
  public leagueTable: any = [];
  private tmp: any = [];
  private row: any = new Array(2);

  constructor(private DataService: DataService) { }

  ngOnInit(): void {
    this.retrieveUidWithUserData();
    this.createLeague();
  }

  private assignColors(day: number): string {

    if (this.dailyCount[day] <= 2) {
      return "#cbdef8";
    }
    if (this.dailyCount[day] <= 4) {
      return "#b5cef1";
    }
    if (this.dailyCount[day] <= 5) {
      return "#6a9be0";
    }
    if (this.dailyCount[day] <= 10) {
      return "#a82cda";
    }
    if (this.dailyCount[day] > 13) {
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
          zeroLineColor: 'transparent',
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
    {
      data: this.dailyCount,
      backgroundColor: [
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


  private async retrieveUserData(userid: string, todayDate: Date) {
    var sundayStart = new Date(new Date(new Date().setDate(todayDate.getDate() - todayDate.getDay())).setHours(0, 0, 0, 0));
    var sundayEnd = new Date(new Date(new Date().setDate(todayDate.getDate() - todayDate.getDay())).setHours(23, 59, 59, 999));
    console.log(sundayStart + " " + sundayEnd);

    // Get current week data (-7 if previous week)
    for (var i = 1; i <= 7; i++) {
      var currentDayStart = new Date(sundayStart.setDate(sundayStart.getDate() + 1));
      var currentDayEnd = new Date(sundayEnd.setDate(sundayEnd.getDate() + 1));
      console.log(currentDayStart);
      console.log(currentDayEnd);

      this.retrieveUserRecord(this.userid, currentDayStart, currentDayEnd, i);
    }
    console.log(this.dailyCount);

  }

  private async retrieveUserRecord(userid: string, rangeStart: Date, rangeEnd: Date, day: number) {

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
        if (this.stats.length == 1) {
          console.log(this.stats[0].session);
          console.log(this.stats[0].totalTime);
          this.dailyCount[day - 1] = this.stats[0].session;
        } else {
          this.dailyCount[day - 1] = 0;
        }

        if(day == this.dailyCount.length){
          this.barChartData = [
            {
              data: this.dailyCount,
              backgroundColor: [
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
        }
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
  private retrieveRecord(userid: string, rangeStart: Date, rangeEnd: Date) {
    var minStudyTime = 0;

    var httpParams = new HttpParams()
      .set("uid", userid)
      .set("rangeStart", JSON.parse(JSON.stringify(rangeStart)))
      .set("rangeEnd", JSON.parse(JSON.stringify(rangeEnd)))
      .set("timeSpentLower", minStudyTime.toString())
      .set("timeSpentUpper", this.studyTime.toString());

    return this.DataService.getRecord(httpParams).toPromise();
  }
  
  private async createLeague() {
    
    let array = [1,2,3];
    console.log(array.length); 

    let friendsID = this.DataService.getFriendsUid();
    await this.DataService.getFriendNames().toPromise;
    let friendsName = this.DataService.getFriendNames();
    forkJoin([friendsID, friendsName])
    .subscribe(
      async data => {
        console.log("test");
        this.friendIDs = data[0];
        this.friendNames = data[1];
        console.log(this.friendIDs);
        console.log(this.friendNames);
        var lastMonday = new Date();
    var day = lastMonday.getDay();
    if(day !== 1){
      lastMonday.setHours(-24 * (day - 1));
    }
    lastMonday.setHours(0,0,0,0); 
    console.log(this.friendNames.length);  
    for(var i = 0; i < this.friendNames.length ; i++){
      
      this.row[0] = this.friendNames[i];
      console.log(this.friendNames[i]);    
      let stats = await this.retrieveRecord(this.friendIDs[i], lastMonday, new Date());

      this.row[1] = this.stats.totalTime;
      this.leagueTable[i] = this.row;
      console.log(this.row);
    }
    console.log(this.statsLeague);    
      });
      
  
    
  }
} 
