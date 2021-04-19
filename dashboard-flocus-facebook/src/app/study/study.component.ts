import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { DataService } from '../data.service';
import Timer = NodeJS.Timer;
import * as $ from 'jquery';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})

export class StudyComponent implements OnInit, OnDestroy {

  public dayGlassCount: number; /*  = 8 */;
  public waterLevel: number;  // used for rendering on frontend (time passed / total study session time)
  private studyTime = 10;     // Amendable: the amount of time for a study session in seconds (aka 45 mins)
  private breakTime = 5;      // Amendable: the amount of time for a break session in seconds (aka 15 mins)
  private userid = "testglasscnt"; // tmp (will be retrieved from the login component)
  private updatefreq = 2;     // Amendable: the frequency of updating the waterLevel variable for rendering (in seconds)
  private pressed = false;
  private isBreak = false;
  private time: Subscription = Subscription.EMPTY;
  private timePassed = 0;
  private isStudy = true;
  public dayGlassCount = 0;
  private stats: any = [];

  constructor(private DataService: DataService) {
   }

  ngOnInit(): void {
    // this.retrieveUid();
    this.retrieveGlassCount();
  }

  ngOnDestroy(): void {
    if(this.timePassed > 0){
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
    if(this.isBreak == true){
      return;
    }
    if(this.pressed == true){
      this.pressed = false;
    }
    else{
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
    this.time = timer(0, 1000).subscribe(t => {
      console.log(this.timePassed);
      this.timePassed++; //incrementing the time by 1 second
      if (this.isStudy) { //if the current time is for studying
        if (this.timePassed % this.updatefreq == 0) { // updating the water level every 2 seconds
          this.waterLevel = this.timePassed / this.studyTime;
          this.fillUp();
        }
        if (this.timePassed == this.studyTime) { // if the time you have spent studying is equal to the time allocation
          this.dayGlassCount++;
          console.log(JSON.stringify({ "uid": this.userid, "timestamp": new Date(), "timeSpent": this.timePassed}));  // posting to db
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
          this.isStudy = false; // it is now not time to study
          this.isBreak = true;
          this.dripDrop("stop");
          this.emptyOut();
          this.pressed = false;
        }
      }
      if (!this.isStudy && this.timePassed == this.breakTime) {
        console.log('End of the break');  // tmp
        this.timePassed = 0;
        this.time.unsubscribe();
        this.isStudy = true;
        this.isBreak = false;
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
  private yIncrementForEmpty = 625/(this.breakTime*1000/10);
  private yPos: number;
  private elem: HTMLElement | null;
  private stop: Timer;


  private fillUp(){

    console.log("fill up called on: " + this.pressed);

    if(this.pressed == true){
      this.elem = document.getElementById('waterfill');
      this.yPos = this.ydist * this.waterLevel ;
      console.log(this.yPos);
      if(this.elem != null){
        this.elem.style.transform = "translate(0px," + this.yPos + "px)";
      }
    }
  }

  private emptyOut(){
    this.elem = document.getElementById('waterfill');
    this.yPos = this.ydist * this.waterLevel ;
    this.stop = setInterval(this.empty.bind(this), 10);
  }

  private empty(){

    if(this.yPos >= 0){
      clearInterval(this.stop);
    }
    else{
      if(this.elem != null){
        this.yPos = this.yPos + this.yIncrementForEmpty;
        this.elem.style.transform = "translate(0px," + this.yPos + "px)";
      }
    }
  }


  private dripDrop(start: string){

    console.log("drip drop");

    var id = document.getElementById("dropframe");
    if(id == null){
      alert("null element id for water drop");
      return;
    }

    if(start == "start"){
      $(".dropframe").addClass("anim");
    }
    else{
      $(".dropframe").one('animationiteration webkitAnimationIteration', function() {
        $(".dropframe").removeClass("anim");
      });
    }
  }
  
  
  private retrieveGlassCount(){

    var date = new Date();
    var dayStart = new Date(date.setHours(0,0,0,0));
    var dayEnd = new Date(date.setHours(23,59,59,999));

    var httpParams = new HttpParams()
    .set("uid", this.userid)
    .set("dayStart", JSON.parse(JSON.stringify(dayStart)))
    .set("dayEnd", JSON.parse(JSON.stringify(dayEnd)))
    .set("timeSpent", this.studyTime.toString());

    this.DataService.getRecord(httpParams).subscribe(
      data => {
        this.stats = data;
        this.dayGlassCount = this.stats.length;
        console.log(this.stats);
      },
      error => {
        console.log(error);
      }
    );   
  }

  private retrieveUid(){
    this.DataService.getUid().subscribe(
      userdata => {
        const uid = userdata;
        // this.userid = uid.toString();
        console.log(uid.toString());
      }
    )
  }
}