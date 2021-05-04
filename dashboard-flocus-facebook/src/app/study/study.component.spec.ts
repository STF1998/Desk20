
import { HttpClientModule } from '@angular/common/http';
import { DebugElement, inject } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { data } from 'jquery';
import { By } from 'protractor';
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
  let dataService: DataService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientModule],
      declarations: [StudyComponent],
      providers: [DataService/* , MockDataService */]
    })
      .compileComponents().then(() => {
        fixture = TestBed.createComponent(StudyComponent);
        component = fixture.componentInstance;
        html = fixture.debugElement;
        dataService = TestBed.inject(DataService);
      });

    fixture.detectChanges();

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // can't get it success...
  it('should load user data', async () => {
    spyOn(component, 'retrieveUidWithUserData').and.callFake(()=>{
      const returnObj = JSON.stringify({
        _id: null,
        session: 100,
        timeSpent: 1000
      })
      return of(returnObj);
    });
    expect(component.retrieveUidWithUserData).toHaveBeenCalled();
  });

  it('should start timer after the button is pressed', async () => {
    const test = new StudyComponent(dataService);
    expect(component.pressed).toBe(false);
    
    component.press();
    spyOn(component, 'startTimer');
    expect(component.pressed).toBe(true);
    expect(component.startTimer).toHaveBeenCalled();
    component.press();
    expect(component.pressed).toBe(false);
    // expect(component.press).toHaveBeenCalled();
    // expect(component.startTimer).toHaveBeenCalled();
    // expect(component.dripDrop).toHaveBeenCalledOnceWith("start");
    // expect(component.fillUp).toHaveBeenCalled();

  })

});

