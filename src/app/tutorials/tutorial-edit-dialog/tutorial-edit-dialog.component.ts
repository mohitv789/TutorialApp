import { TutorialsHttpService } from './../services/tutorials-http.service';
import { Section } from './../models/Section';
import { tutorialSaved, tutorialUpdated } from './../tutorials.actions';
import { Update } from '@ngrx/entity';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Tutorial } from './../models/Tutorial';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-tutorial-edit-dialog',
  templateUrl: './tutorial-edit-dialog.component.html',
  styleUrls: ['./tutorial-edit-dialog.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TutorialEditDialogComponent implements OnInit{
  form!: UntypedFormGroup;
  tutorial!: Tutorial;

  loading$!: Observable<boolean>;

  constructor(
      private fb: UntypedFormBuilder,
      private dialogRef: MatDialogRef<TutorialEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: any,
      private store: Store<AppState>,
      private tutService: TutorialsHttpService) {
      this.tutorial = data.tutorial;

      const formControls = {
        description: ['', Validators.required],
        longDescription: ['', Validators.required],
        iconUrl: ['', Validators.required],
        field: ['', Validators.required],
      };
      this.form = this.fb.group(formControls);
      this.form.patchValue({...data.tutorial});
  }
  ngOnInit(): void {
  }
  onClose() {
      this.dialogRef.close();
  }

  onSave() {

    const tutorial: Tutorial = {
      ...this.tutorial,
      ...this.form.value
    };

    const update: Update<Tutorial> = {
      id: tutorial.id,
      changes: tutorial
    };

    this.store.dispatch(tutorialUpdated({update}));
    this.dialogRef.close();



  }
}
