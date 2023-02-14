import { AppState } from './../../reducers/index';
import { Component, OnInit } from '@angular/core';
import { STEPPER_GLOBAL_OPTIONS } from '@angular/cdk/stepper';
import { Store } from '@ngrx/store';
import { tutorialSaved } from '../tutorials.actions';
import { Router } from '@angular/router';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { getStorage, ref, listAll } from "firebase/storage";
import { ToxicityService } from 'ngx-tfjs';
require('@tensorflow/tfjs');
import * as toxicity from '@tensorflow-models/toxicity';


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
  tutorialId!: string;
  iconUrl!: string;
  threshold = 0.9;
  labels: string[] = [`toxicity` , `severe_toxicity` , `identity_attack` , `insult` , `threat` , `sexual_explicit` , `obscene`]
  constructor(private store: Store<AppState>,private router: Router,private storage: AngularFireStorage,private service: ToxicityService) {

    // Load the model. Users optionally pass in a threshold and an array of
    // labels to include.

  }

  ngOnInit(): void {
    this.iconUrl = JSON.parse(localStorage.getItem("STEP_1_FILE")!)
    this.tutorialId = JSON.parse(localStorage.getItem("STEP_1_ID")!)
  }


  submit(step1: any, step2: any) {
    let usedImages:string[] = [];
    const tutorial = {
      iconUrl: this.iconUrl,
      description: step1["description"],
      longDescription: step1["longDescription"],
      field: step1["field"],
    }
    toxicity.load(this.threshold,this.labels).then(model => {
      const sentences = [tutorial.description.split(".")];

      model.classify(sentences).then(predictions => {
        // `predictions` is an array of objects, one for each prediction head,
        // that contains the raw probabilities for each input along with the
        // final prediction in `match` (either `true` or `false`).
        // If neither prediction exceeds the threshold, `match` is `null`.

        console.log(predictions);
      });
    });
    usedImages.push(tutorial.iconUrl);
    let sections:any = [];
    step2["sections"].forEach((section: any) => {
      sections.push(section);
      usedImages.push(section.image);
    })
    this.store.dispatch(tutorialSaved({tutorialId:this.tutorialId,tutorial:tutorial,sections: sections}));
    localStorage.removeItem('STEP_1');
    localStorage.removeItem('STEP_1_ID');
    localStorage.removeItem('STEP_1_FILE');
    this.router.navigateByUrl("/tutorials");
  }
}
