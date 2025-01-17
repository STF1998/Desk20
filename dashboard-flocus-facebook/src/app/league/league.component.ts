import { Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { HttpParams } from '@angular/common/http';
import { Observable, forkJoin } from 'rxjs';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-league',
  templateUrl: './league.component.html',
  styleUrls: ['./league.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LeagueComponent implements OnInit {

  private userid: string = "";
  private studyTime = 25 * 60;
  private stats: any = [];
  public dailyCount: number[] = [0, 0, 0, 0, 0, 0, 0];
  private scores: any = [];
  public leagueTable: any = [];
  public fill = 1;
  public isSafari: boolean  = false;

  constructor(private DataService: DataService) {
  }

  ngOnInit(): void {
    this.retrieveUidWithUserData();
    const userAgent = window.navigator.userAgent;
    if(userAgent.includes("Safari") == true && userAgent.includes("Chrome") == false){
      this.isSafari = true;
    }
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




  public setTable(): void {

    //sort the array
    if (this.sortLeaders() == -1) {
      this.fill = 0;
      return;
    }

    // get the table Selector
    var table = document.querySelector("table");
    if (table == null) {
      return;
    }

    //input values
    for (var i = 0; i < this.leagueTable.length; i++) {

      //add a row
      var row = table.insertRow(i + 1);
      row.classList.add('pos');
      //add a cell
      var cell = row.insertCell();
      // add the rows position
      var text = document.createTextNode(String(i + 1));
      cell.appendChild(text);

      for (var j = 0; j < 3; j++) {
        var cell = row.insertCell();
        //add the value of the array cell to the cell of the table
        var text = document.createTextNode(this.leagueTable[i][j]);
        cell.appendChild(text);
      }
    }
    this.fill = 0;
  }


  private sortLeaders(): number {

    if (this.leagueTable == null) {
      return -1;
    }
    if (this.leagueTable.length == 0) {
      return -1;
    }
    this.leagueTable.sort(this.sortFunction);
    return 1;
  }

  private sortFunction(a: number[], b: number[]) {
    if (a[2] === b[2]) {
      return 0;
    }
    else {
      return (a[2] > b[2]) ? -1 : 1;
    }
  }


  private async retrieveUserData(userid: string, todayDate: Date) {
    var sundayStart = new Date(new Date(new Date().setDate(todayDate.getDate() - todayDate.getDay())).setHours(0, 0, 0, 0));
    var sundayEnd = new Date(new Date(new Date().setDate(todayDate.getDate() - todayDate.getDay())).setHours(23, 59, 59, 999));
    

    // Get current week data (-7 if previous week)
    for (var i = 1; i <= 7; i++) {
      var currentDayStart = new Date(sundayStart.setDate(sundayStart.getDate() + 1));
      var currentDayEnd = new Date(sundayEnd.setDate(sundayEnd.getDate() + 1));
      

      this.retrieveUserRecord(this.userid, currentDayStart, currentDayEnd, i);
    }
    

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
          
          this.dailyCount[day - 1] = this.stats[0].session;
        } else {
          this.dailyCount[day - 1] = 0;
        }

        if (day == this.dailyCount.length) {
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
        this.createLeague(this.userid);
      }
    )
  }
  private async createLeague(userid: string) {
    var lastMonday = new Date();
    var day = lastMonday.getDay();
    if (day !== 1) {
      lastMonday.setHours(-24 * (day - 1));
    }
    lastMonday.setHours(0, 0, 0, 0);
    var minStudyTime = 0;
    var httpParams = new HttpParams()
      .set("uid", userid)
      .set("rangeStart", JSON.parse(JSON.stringify(lastMonday)))
      .set("rangeEnd", JSON.parse(JSON.stringify(new Date())))
      .set("timeSpentLower", minStudyTime.toString())
      .set("timeSpentUpper", this.studyTime.toString());
    this.DataService.getLeague(httpParams)
      // await this.DataService.getFriendNames().toPromise;
      // let friendsName = this.DataService.getFriendNames();
      // forkJoin([friendsScore, friendsName])
      .subscribe(
        data => {
          this.scores = data;
          // this.friendNames = data[1];
          
          for (let i = 0; i < this.scores.length; i++) {
            let row: any = ["", 0, 0];
            row[0] = this.scores[i].name;
            row[1] = Math.round(this.scores[i].totalTime / 3600 * 10) / 10;
            row[2] = this.scores[i].session;
           
            this.leagueTable[i] = row;
          }
          this.setTable();
        });
  }
}
