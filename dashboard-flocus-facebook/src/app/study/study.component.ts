import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { DataService } from '../data.service';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})

export class StudyComponent implements OnInit, OnDestroy {

  public dayGlassCount: number; /*  = 8 */;
  public waterLevel: number;  // used for rendering on frontend (time passed / total study session time)
  private studyTime = 25 * 60 * 1000;     // Amendable: the amount of time for a study session in seconds (aka 45 mins)
  private breakTime = 5 * 60 * 1000;      // Amendable: the amount of time for a break session in seconds (aka 15 mins)
  private userid = "108266374709077"; // tmp (will be retrieved from the login component)
  private updatefreq = 2;     // Amendable: the frequency of updating the waterLevel variable for rendering (in seconds)
  private pressed = false;
  private isBreak = false;
  private time: Subscription = Subscription.EMPTY;
  private timePassed = 0;
  private isStudy = true;
  public dayGlassCount = 0;
  private stats: any = [];
  private CountDownTime = 0;
  private interval: Timer;

  constructor(private DataService: DataService) {
  }

  ngOnInit(): void {
    this.retrieveUidWithUserData();
  }

  ngOnDestroy(): void {
    if (this.timePassed > 0) {
      console.log(JSON.stringify({ "uid": this.userid, "timestamp": new Date(), "timeSpent": this.timePassed }));  // posting to db
      this.DataService.postRecord(
        JSON.stringify({
          "uid": this.userid,
          "timestamp": new Date(),
          "timeSpent": this.timePassed
        })).subscribe(
          feedback => {
            console.log(feedback);
          }
        );
      this.pauseTimer();
    }
  }

  public press() {
    if (this.isBreak == true) {
      return;
    }
    if (this.pressed == true) {
      this.pressed = false;
    }
    else {
      this.pressed = true;
    }
    if (this.pressed == true) {
      this.isBreak = false;
      this.dripDrop("start");
      this.startTimer();
    } else {
      this.dripDrop("stop");
      this.pauseTimer();
    }
  }

  private startTimer() {

    this.CountDownTime = Date.now() + this.studyTime - this.timePassed;
    this.interval = setInterval(() => {
      console.log(this.timePassed);
      this.timePassed = this.getTimePassed(); //incrementing the time by 1 second
      if (this.isStudy) { //if the current time is for studying
          this.waterLevel = this.timePassed / this.studyTime;
          this.fillUp();
        if (this.timePassed >= this.studyTime) { // if the time you have spent studying is more than or equal to the time allocation
          this.dayGlassCount++;
          console.log(JSON.stringify({ "uid": this.userid, "timestamp": new Date(), "timeSpent": this.timePassed }));  // posting to db
          this.DataService.postRecord(JSON.stringify({
            "uid": this.userid,
            "timestamp": new Date(),
            "timeSpent": this.timePassed
          })).subscribe(
            feedback => {
              console.log(feedback);
            }
          );
          this.retrieveGlassCount();
          this.isStudy = false; // it is now not time to study
          this.isBreak = true;
          this.dripDrop("stop");
          clearInterval(this.interval);
          this.emptyOut();
          this.pressed = false;
          this.timePassed = 0;
          this.isStudy = true;
          this.isBreak = false;
        }
      }
    }, 1000);
  }

  private getTimePassed() : number{

    var now = Date.now();
    var distance = this.CountDownTime - now;
    console.log("distance = " + distance);
    var timepassed = (this.studyTime - distance);
    console.log("Time passed = " + timepassed);
    return timepassed;
  }
  

  private pauseTimer() {
    if (this.isStudy) {
      clearInterval(this.interval);
    }
  }

  // ANIMATION WORK //

  public minutes: number;
  private ydist = -625;
  private yIncrementForEmpty = 625 / (this.breakTime / 1000);
  private yPos: number;
  private elem: HTMLElement | null;
  private stop: Timer;


  private fillUp() {

    if(this.pressed == true) {
      this.elem = document.getElementById('waterfill');
      this.yPos = this.ydist * this.waterLevel;
      if (this.elem != null) {
        this.elem.style.transform = "translate(0px," + this.yPos + "px)";
      }
    }
  }

  private emptyOut() {
    console.log("empty out called");
    this.elem = document.getElementById('waterfill');
    this.yPos = this.ydist * this.waterLevel;
    this.stop = setInterval(this.empty.bind(this), 1000);
  }

  private empty() {

    console.log("empty");

    if (this.yPos >= 0) {
      console.log("clearing interval stop");
      clearInterval(this.stop);
    }
    else {
      if (this.elem != null) {
        this.yPos = this.yPos + this.yIncrementForEmpty;
        this.elem.style.transform = "translate(0px," + this.yPos + "px)";
        console.log(this.yPos);
      }
    }
  }


  private dripDrop(start: string) {

    console.log("drip drop");

    var id = document.getElementById("dropframe");
    if (id == null) {
      alert("null element id for water drop");
      return;
    }

    if (start == "start") {
      id.style.animationIterationCount = "infinite";
    }
    else {
      id.style.animationIterationCount = "1";
    }
  }


  private retrieveGlassCount() {

    var date = new Date();
    var dayStart = new Date(date.setHours(0, 0, 0, 0));
    var dayEnd = new Date(date.setHours(23, 59, 59, 999));

    console.log(this.userid);
    var httpParams = new HttpParams()
      .set("uid", this.userid)
      .set("rangeStart", JSON.parse(JSON.stringify(dayStart)))
      .set("rangeEnd", JSON.parse(JSON.stringify(dayEnd)))
      .set("timeSpentLower", this.studyTime.toString())
      .set("timeSpentUpper", this.studyTime.toString());

    this.DataService.getRecord(httpParams).subscribe(
      data => {
        this.stats = data;
        if (this.stats.length == 1) {
          this.dayGlassCount = this.stats[0].session;
        } else {
          this.dayGlassCount = 0;
        }
        console.log(this.dayGlassCount);
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
        this.retrieveGlassCount();
      }
    )
  }
}