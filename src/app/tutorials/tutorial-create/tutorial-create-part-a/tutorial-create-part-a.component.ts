import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter } from 'rxjs';

@Component({
  selector: 'app-tutorial-create-part-a',
  templateUrl: './tutorial-create-part-a.component.html',
  styleUrls: ['./tutorial-create-part-a.component.css']
})
export class TutorialCreatePartAComponent {

  form = this.fb.group({
    iconUrl: ['', {
      validators: [
          Validators.required,
      ],
    }],
    description: ['', {
        validators: [
            Validators.required,
            Validators.minLength(10),
            Validators.maxLength(60)
        ],
    }],
    longDescription: ['', {
      validators: [
          Validators.required,
          Validators.minLength(25)
      ],
    }],
    field: ['', {
      validators: [
          Validators.required,
          Validators.maxLength(50)
      ],
  }],
});

constructor(private fb: FormBuilder) {

}

ngOnInit() {

    const draft = localStorage.getItem("STEP_1");

    if (draft) {
      this.form.setValue(JSON.parse(draft));
    }

    this.form.valueChanges
        .pipe(
            filter(() => this.form.valid)
        )
        .subscribe( val => localStorage.setItem("STEP_1", JSON.stringify(val)));

  }
}
