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
export class TutorialEditDialogComponent {
  form!: UntypedFormGroup;

  dialogTitle: string;

  tutorial!: Tutorial;

  mode: 'create' | 'update';

  loading$!: Observable<boolean>;

  constructor(
      private fb: UntypedFormBuilder,
      private dialogRef: MatDialogRef<TutorialEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: any,
      private store: Store<AppState>) {

      this.dialogTitle = data.dialogTitle;
      this.tutorial = data.tutorial;
      this.mode = data.mode;

      const formControls = {
          description: ['', Validators.required],
          longDescription: ['', Validators.required],
      };

      if (this.mode == 'update') {
          this.form = this.fb.group(formControls);
          this.form.patchValue({...data.tutorial});
      } else if (this.mode == 'create') {
          this.form = this.fb.group({
              ...formControls,
              iconUrl: ['', Validators.required],
              field: ['', Validators.required]
          });
      }
  }

  onClose() {
      this.dialogRef.close();
  }

  // onSave() {

  //   const tutorial: Tutorial = {
  //     ...this.tutorial,
  //     ...this.form.value
  //   };

  //   const update: Update<Tutorial> = {
  //     id: tutorial.id,
  //     changes: tutorial
  //   };

  //   if (this.mode == 'update') {
  //     this.store.dispatch(tutorialUpdated({update}));
  //     this.dialogRef.close();
  //   } else if (this.mode == "create") {
  //     this.store.dispatch(tutorialSaved({tutorial}));
  //     this.dialogRef.close();
  //   }



  // }
}
