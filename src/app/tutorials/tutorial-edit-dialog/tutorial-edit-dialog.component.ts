import { concatMap } from 'rxjs/operators';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { TutorialsHttpService } from './../services/tutorials-http.service';
import { Section } from './../models/Section';
import { tutorialSaved, tutorialUpdated } from './../tutorials.actions';
import { Update } from '@ngrx/entity';
import { AppState } from './../../reducers/index';
import { Store } from '@ngrx/store';
import { Tutorial } from './../models/Tutorial';
import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Observable, last, tap, catchError, throwError, of } from 'rxjs';
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
  iconUrl!: string;
  percentageChanges$!: Observable<any>;

  constructor(
      private fb: UntypedFormBuilder,
      private dialogRef: MatDialogRef<TutorialEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: any,
      private store: Store<AppState>,
      private tutService: TutorialsHttpService,
      private storage: AngularFireStorage) {
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

  uploadFile(event: any) {

    const file: File = event.target.files[0];


    const filePath = `tutorials/${this.tutorial.id}/${file.name}`;
    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    });
    this.percentageChanges$ = task.percentageChanges();
    task.snapshotChanges()
            .pipe(
                last(),
                concatMap(() => this.storage.ref(filePath).getDownloadURL()),
                tap(url => {
                  this.iconUrl = url;
                  this.form.get('iconUrl')!.setValue(url);
                }),
                catchError(err => {
                    console.log(err);
                    alert("Could not create thumbnail url.");
                    return throwError(err);
                })

            )
            .subscribe();
  }
}
