
import { HttpClientModule } from '@angular/common/http';
import { DebugElement, inject } from '@angular/core';
import { ComponentFixture, fakeAsync, TestBed, tick } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { DataService } from '../data.service';

import { StudyComponent } from './study.component';

// class MockDataService extends DataService {
//   uid = "test";
//   getUid(){
//     return of(this.uid);
//   }
// }

describe('StudyComponent', () => {
  let component: StudyComponent;
  let fixture: ComponentFixture<StudyComponent>;
  let html: DebugElement;
  // let dataService: DataService;
  let getUidSpy: any;
  let getRecordSpy: any;

  beforeEach(async () => {
    const dataService = jasmine.createSpyObj('DataService', ['getUid', 'getRecord']);
    getUidSpy = dataService.getUid.and.returnValue(of("test"));
    const returnObj = JSON.parse(JSON.stringify([{
      _id: "test",
      session: 100,
      timeSpent: 1000
    }]));
    console.log(returnObj);
    getRecordSpy = dataService.getRecord.and.returnValue(of(returnObj));
    console.log(getRecordSpy);



    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [StudyComponent],
      providers: [{ provide: DataService, useValue: dataService }]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(StudyComponent);
        component = fixture.componentInstance;
        html = fixture.debugElement;
        // dataService = TestBed.inject(dataService);
      });

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  it('should getUid', async () => {
    fixture.detectChanges();
    expect(component.userid).toBe("test");
    expect(getUidSpy.calls.any()).toBe(true, "getUid called");
  });

  // can't get it success...
  it('should load user data', async () => {
    fixture.detectChanges();
    expect(component.dayGlassCount).toEqual(100);
    expect(getRecordSpy.calls.any()).toBe(true, "getRecord called");
  });

  it('should start timer after the button is pressed', () => {
    expect(component.pressed).toBeFalsy();
    let button = fixture.nativeElement.querySelector('button');
    button.click();
    expect(component.pressed).toBeTruthy();
    button.click();
    expect(component.pressed).toBeFalsy();
  })

  it('timer should start counting when called', fakeAsync(() => {
    let button = fixture.nativeElement.querySelector('button');
    button.click();
    setTimeout(() => {
      button.click();
    }, 4000);
    tick(4000);
    expect(component.pressed).toBeFalsy;
    expect(component.yPos).toBeLessThan((-625 * 2 / 1500));
  }))

});

