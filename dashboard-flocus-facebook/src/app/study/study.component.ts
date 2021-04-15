import { Component, OnInit, OnDestroy, ɵɵInheritDefinitionFeature } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { DataService } from '../data.service';
import Timer = NodeJS.Timer;

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit, OnDestroy {

  public waterLevel: number;  // used for rendering on frontend (time passed / total study session time)
  private studyTime = 60;     // Amendable: the amount of time for a study session in seconds (aka 45 mins)
  private breakTime = 10;      // Amendable: the amount of time for a break session in seconds (aka 15 mins)
  private updatefreq = 2;     // Amendable: the frequency of updating the waterLevel variable for rendering (in seconds)
  private pressed = 0;
  private time: Subscription = Subscription.EMPTY;
  private timePassed = 0;
  private isStudy = true;
  public dayGlassCount = 0;

  constructor(private DataService: DataService) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    if(this.timePassed > 0){
      console.log(JSON.stringify({ "uid": "sampeluid", "timestamp": new Date(), "timeSpent": this.timePassed }));  // posting to db
      this.DataService.postRecord(JSON.stringify({ "uid": "sampeluid", "timestamp": new Date(), "timeSpent": this.timePassed }));
      this.pauseTimer();
    }
  }

  public press() {
    this.pressed++;
    this.dripDrop();
    if (this.pressed % 2 == 1) {
      this.startTimer();
    } else {
      this.pauseTimer();
    }
  }

  private startTimer() {
    this.time = timer(0, 1000).subscribe(t => {
      this.timePassed++; //incrementing the time by 1 second
      if (this.isStudy) { //if the current time is for studying
        if (this.timePassed % this.updatefreq == 0) { // updating the water level every 2 seconds
          this.waterLevel = this.timePassed / this.studyTime;
          this.fillUp();
        }
        if (this.timePassed == this.studyTime) { // if the time you have spent studying is equal to the time allocation
          this.dayGlassCount++;
          console.log(JSON.stringify({ "uid": "sampeluid", "timestamp": new Date(), "timeSpent": this.timePassed }));  // posting to db
          this.DataService.postRecord(JSON.stringify({ "uid": "sampeluid", "timestamp": new Date(), "timeSpent": this.timePassed }));
          this.timePassed = 0; // time is reset
          this.isStudy = false; // it is now not time to study
          this.emptyOut();
        }
      }
      if (!this.isStudy && this.timePassed == this.breakTime) {
        console.log('End of the break');  // tmp
        this.timePassed = 0;
        this.time.unsubscribe();
        this.isStudy = true;
        this.pressed++;
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

    this.elem = document.getElementById('waterfill');
    this.yPos = this.ydist * this.waterLevel ;
    console.log(this.yPos);
    if(this.elem != null){
      this.elem.style.transform = "translate(0px," + this.yPos + "px)";
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

  private dripDrop(){


    var dropElement = document.getElementById('dropframe');
    if(dropElement == null){
      console.log("dropElement is null");
      return;
    }

    if(this.pressed % 2 == 1){
      dropElement.animate([
        {transform: 'translate(0, 0px)'},
        {transform: 'translate(0, 340px)'}
      ], {
        duration: 1500,
        iterations: Infinity,
        easing: "ease-in"
      });
    }
  }
}
