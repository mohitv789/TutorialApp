import { Tutorial } from './../models/Tutorial';
import { AppState } from './../../reducers/index';
import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Store } from '@ngrx/store';
import { tutorialSaved } from '../tutorials.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-create',
  templateUrl: './tutorial-create.component.html',
  styleUrls: ['./tutorial-create.component.css'],
  providers: [
    {
        provide: STEPPER_GLOBAL_OPTIONS, useValue: {showError:true}
    }
]
})
export class TutorialCreateComponent implements OnInit{

  constructor(private store: Store<AppState>,private router: Router) {}

  ngOnInit(): void {

  }


  submit(step1: any, step2: any) {
    const tutorial = {
      iconUrl: step1["iconUrl"],
      description: step1["description"],
      longDescription: step1["longDescription"],
      field: step1["field"],
    }
    let sections:any = [];
    step2["sections"].forEach((section: any) => {
      sections.push(section);
    })
    this.store.dispatch(tutorialSaved({tutorial,sections}));
    localStorage.removeItem('STEP_1');
    setTimeout(() => {
      this.router.navigateByUrl("/tutorials");
    },250)


  }
}
