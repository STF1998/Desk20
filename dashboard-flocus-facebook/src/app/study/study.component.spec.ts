
import { HttpClientModule } from '@angular/common/http';
import { DebugElement, inject } from '@angular/core';
import { ComponentFixture, fakeAsync, flush, TestBed, tick } from '@angular/core/testing';
import { of } from 'rxjs';
import { DataService } from '../data.service';

import { StudyComponent } from './study.component';

describe('StudyComponent', () => {
  let component: StudyComponent;
  let fixture: ComponentFixture<StudyComponent>;
  let html: DebugElement;
  let getUidSpy: any;
  let getRecordSpy: any;
  let postRecordSpy: any;

  beforeEach(async () => {
    const dataService = jasmine.createSpyObj('DataService', ['getUid', 'getRecord', 'postRecord']);
    getUidSpy = dataService.getUid.and.returnValue(of("test"));
    const returnObj = JSON.parse(JSON.stringify([{
      _id: "test",
      session: 100,
      timeSpent: 1000
    }]));
    getRecordSpy = dataService.getRecord.and.returnValue(of(returnObj));
    postRecordSpy = dataService.postRecord.and.returnValue(of(JSON.parse(JSON.stringify("success"))));



    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [StudyComponent],
      providers: [{ provide: DataService, useValue: dataService }]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(StudyComponent);
        component = fixture.componentInstance;
        html = fixture.debugElement;
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

  it('data should be saved on destroy', fakeAsync(() => {
    let button = fixture.nativeElement.querySelector('button');
    button.click();
    setTimeout(() => {
      button.click();
    }, 4000);
    tick(4000);
    component.ngOnDestroy();
    fixture.detectChanges();
    expect(postRecordSpy.calls.any()).toBe(true, "recordPosted");
  }));

  it('data should be saved when the time is up', fakeAsync(() => {
    let button = fixture.nativeElement.querySelector('button');
    button.click();
    setTimeout(() => {
      expect(component.timePassed).toBeLessThan(1500000);
    }, 1400000);
    tick(1499000);
    expect(component.timePassed).toBeCloseTo(1500000, -4);
    tick(Infinity);
    fixture.detectChanges();
    expect(postRecordSpy.calls.any()).toBe(true, "recordPosted");
  }))

});

