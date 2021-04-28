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
  private studyTime = 25 * 60;     // Amendable: the amount of time for a study session in seconds (aka 45 mins)
  private breakTime = 5 * 60;      // Amendable: the amount of time for a break session in seconds (aka 15 mins)
  private userid = "108266374709077"; // tmp (will be retrieved from the login component)
  private updatefreq = 2;     // Amendable: the frequency of updating the waterLevel variable for rendering (in seconds)
  private pressed = false;
  private isBreak = false;
  private time: Subscription = Subscription.EMPTY;
  private timePassed = 0;
  private isStudy = true;
  public dayGlassCount = 0;
  private stats: any = [];
  static isActive = true;

  constructor(private DataService: DataService) { }

  ngOnInit(): void {
    this.retrieveUidWithUserData();
    StudyComponent.isActive = true;
    this.timePassed = 0;
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
      this.timePassed = 0;
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
    let inactiveTime: Date;
    let timePassedWhenInactive = 0;
    let totalInactiveTime = 0;
    this.time = timer(0, 1000).subscribe(t => {
      console.log("actual time: " + this.timePassed);
      this.timePassed++; //incrementing the time by 1 second
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          if (StudyComponent.isActive) {
            console.log("hidden");
            inactiveTime = new Date();
            timePassedWhenInactive = this.timePassed;
          }
          StudyComponent.isActive = false;
        } else {
          if (!StudyComponent.isActive) {
            console.log("shown");
            totalInactiveTime = Math.floor((new Date().getTime() - inactiveTime.getTime()) / 1000);
            console.log("Inactivity time: " + totalInactiveTime);
            if (this.isStudy) {
              if (timePassedWhenInactive + totalInactiveTime < this.studyTime) {
                this.timePassed = totalInactiveTime + timePassedWhenInactive;
                console.log("Resumed Study timePassed: " + this.timePassed);
              } else {
                this.timePassed = this.studyTime;
                console.log("Study time's up timePassed: " + this.timePassed);
              }
            } else {
              if (timePassedWhenInactive + totalInactiveTime < this.breakTime) {
                this.timePassed = totalInactiveTime + timePassedWhenInactive;
                console.log("Resumed Break timePassed: " + this.timePassed);
              } else {
                this.timePassed = this.breakTime;
                console.log("Break Time's up timePassed: " + this.timePassed);
              }
            }
          }
          StudyComponent.isActive = true;
        }
      });


      if (this.isStudy) { //if the current time is for studying
        if (this.timePassed % this.updatefreq == 0) { // updating the water level every 2 seconds
          this.waterLevel = this.timePassed / this.studyTime;
          this.fillUp();
        }
        if (this.timePassed >= this.studyTime) { // if the time you have spent studying is equal to the time allocation
          this.dayGlassCount++;
          this.timePassed = this.studyTime;
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
          this.timePassed = 0; // time is reset
          timePassedWhenInactive = 0;
          totalInactiveTime = 0;
          if (!StudyComponent.isActive) { inactiveTime = new Date(); }
          this.isStudy = false; // it is now not time to study
          this.isBreak = true;
          this.dripDrop("stop");
          this.emptyOut();
          this.pressed = false;
        }
      }
      if (!this.isStudy) {
        if (this.timePassed >= this.breakTime) {
          console.log('End of the break');  // tmp
          this.timePassed = 0;
          this.time.unsubscribe();
          this.isStudy = true;
          this.isBreak = false;
        }
      }
    });
  }

  private pauseTimer() {
    if (this.isStudy) {
      this.time.unsubscribe();
      console.log("Paused");  // tmp 
    }
  }

  // ANIMATION WORK //

  public minutes: number;
  private ydist = -625;
  private yIncrementForEmpty = 625 / (this.breakTime * 1000 / 10);
  private yPos: number;
  private elem: HTMLElement | null;
  private stop: Timer;


  private fillUp() {

    if (this.pressed == true) {
      this.elem = document.getElementById('waterfill');
      this.yPos = this.ydist * this.waterLevel;
      if (this.elem != null) {
        this.elem.style.transform = "translate(0px," + this.yPos + "px)";
      }
    }
  }

  private emptyOut() {
    this.elem = document.getElementById('waterfill');
    this.yPos = this.ydist * this.waterLevel;
    this.stop = setInterval(this.empty.bind(this), 10);
  }

  private empty() {

    if (this.yPos >= 0) {
      clearInterval(this.stop);
    }
    else {
      if (this.elem != null) {
        this.yPos = this.yPos + this.yIncrementForEmpty;
        this.elem.style.transform = "translate(0px," + this.yPos + "px)";
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