import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})
export class StudyComponent implements OnInit {

  public waterLevel: number;  // used for rendering on frontend (time passed / total study session time)
  private studyTime = 10;     // Amendable: the amount of time for a study session (aka 45 mins)
  private breakTime = 5;      // Amendable: the amount of time for a break session (aka 15 mins)
  private updatefreq = 2;     // Amendable: the frequency of updating the waterLevel variable for rendering (in seconds)
  private pressed = 0;
  private time: Subscription;
  private timePassed = 0;
  private isStudy = true;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {

  }

  public press() {
    this.pressed++;
    if (this.pressed % 2 == 1) {
      this.startTimer();
    } else {
      this.pauseTimer();
    }
  }

  private startTimer() {
    this.time = timer(0, 1000).subscribe(t => {
      this.timePassed++;
      if (this.isStudy) {
        if (this.timePassed % this.updatefreq == 0) {
          this.waterLevel = this.timePassed / this.studyTime;
          console.log(this.waterLevel);  // tmp
        }
        if (this.timePassed == this.studyTime) {
          console.log(JSON.stringify({"uid":"sampeluid", "timestamp": new Date(), "timeSpent": this.timePassed}));  // posting to db
          this.timePassed = 0;
          this.isStudy = false;
        }
      }
      if (!this.isStudy && this.timePassed == this.breakTime) {
        console.log('End of the break');
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
      console.log("Stopped");
    }
  }

}
