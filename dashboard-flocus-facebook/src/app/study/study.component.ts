import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription, timer } from 'rxjs';
import { DataService } from '../data.service';

@Component({
  selector: 'app-study',
  templateUrl: './study.component.html',
  styleUrls: ['./study.component.css']
})

export class StudyComponent implements OnInit, OnDestroy {

  public dayGlassCount: number; /*  = 8 */;
  public waterLevel: number;  // used for rendering on frontend (time passed / total study session time)
  
  private userid = "testglasscnt"; // tmp (will be retrieved from the login component)
  
  private studyTime = 10;     // Amendable: the amount of time for a study session in seconds (aka 45 mins)
  private breakTime = 5;      // Amendable: the amount of time for a break session in seconds (aka 15 mins)
  private updatefreq = 2;     // Amendable: the frequency of updating the waterLevel variable for rendering (in seconds)
  private pressed = 0;
  private time: Subscription = Subscription.EMPTY;
  private timePassed = 0;
  private isStudy = true;
  private stats: any = [];

  constructor(private DataService: DataService) { }

  ngOnInit(): void {
    this.retrieveUid();
    this.retrieveGlassCount();
  }

  ngOnDestroy(): void {
    if(this.timePassed > 0){
      console.log(JSON.stringify({ "uid": this.userid, "timestamp": new Date(), "timeSpent": this.timePassed }));  // posting to db
      this.DataService.postRecord(JSON.stringify({ "uid": this.userid, "timestamp": new Date(), "timeSpent": this.timePassed }));
      this.pauseTimer();
    }
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
          console.log(JSON.stringify({ "uid": this.userid, "timestamp": new Date(), "timeSpent": this.timePassed }));  // posting to db
          this.DataService.postRecord(JSON.stringify({ "uid": this.userid, "timestamp": new Date(), "timeSpent": this.timePassed }));
          this.retrieveGlassCount();
          this.timePassed = 0;
          this.isStudy = false;
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
