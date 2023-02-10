import { Section } from './../models/Section';
import { AppState } from './../../reducers/index';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { Update } from '@ngrx/entity';
import { SectionUpdated } from '../section.actions';
@Component({
  selector: 'app-tutorial-edit',
  templateUrl: './tutorial-edit.component.html',
  styleUrls: ['./tutorial-edit.component.css']
})
export class TutorialEditComponent implements OnInit{
  form!: UntypedFormGroup;
  section!: Section;
  tutorialId!: string;
  constructor(
      private fb: UntypedFormBuilder,
      private dialogRef: MatDialogRef<TutorialEditComponent>,
      @Inject(MAT_DIALOG_DATA) data: any,
      private store: Store<AppState>) {

      this.section = data.section;
      this.tutorialId = data.section.tutorialId;
      const formControls = {
        description: ['', Validators.required],
        seqNo: ['', Validators.required],
        solution: ['', Validators.required],
        image: ['', Validators.required],
        tutorialId: [this.tutorialId]
      };
      this.form = this.fb.group(formControls);
      this.form.patchValue({...data.section});
  }
  ngOnInit(): void {
  }
  onClose() {
      this.dialogRef.close();
  }

  onSave() {

    const section: Section = {
      ...this.section,
      ...this.form.value
    };

    const update: Update<Section> = {
      id: section.id,
      changes: section
    };

    this.store.dispatch(SectionUpdated({update}));

    this.dialogRef.close();



  }

}
