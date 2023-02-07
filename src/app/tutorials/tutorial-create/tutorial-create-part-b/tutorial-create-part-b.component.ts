import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tutorial-create-part-b',
  templateUrl: './tutorial-create-part-b.component.html',
  styleUrls: ['./tutorial-create-part-b.component.css']
})
export class TutorialCreatePartBComponent {
  form = this.fb.group({
    sections: this.fb.array([])
  });


constructor(private fb:FormBuilder) {

}

get sections() {
  return this.form.controls["sections"] as FormArray;
}

addSection() {
  const sectionForm = this.fb.group({
    description: ['', Validators.required],
    seqNo: ['', Validators.required],
    solution: ['', Validators.required],
    image: ['', Validators.required],
  });

  this.sections.push(sectionForm);
}

  deleteSection(sectionIndex: number) {
    this.sections.removeAt(sectionIndex);
  }
}
