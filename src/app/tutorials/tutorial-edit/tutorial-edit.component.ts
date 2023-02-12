import { Section } from './../models/Section';
import { AppState } from './../../reducers/index';
import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { Observable, catchError, concatMap, last, tap, throwError } from 'rxjs';
import { Update } from '@ngrx/entity';
import { SectionUpdated } from '../section.actions';
import { AngularFireStorage } from '@angular/fire/compat/storage';
@Component({
  selector: 'app-tutorial-edit',
  templateUrl: './tutorial-edit.component.html',
  styleUrls: ['./tutorial-edit.component.css']
})
export class TutorialEditComponent implements OnInit{
  form!: UntypedFormGroup;
  section!: Section;
  tutorialId!: string;
  image!: string;
  constructor(
      private fb: UntypedFormBuilder,
      private dialogRef: MatDialogRef<TutorialEditComponent>,
      @Inject(MAT_DIALOG_DATA) data: any,
      private store: Store<AppState>,
      private storage: AngularFireStorage) {

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

  uploadFile(event: any) {

    const file: File = event.target.files[0];


    const filePath = `tutorials/${this.tutorialId}/${file.name}`;
    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    });

    task.snapshotChanges()
            .pipe(
                last(),
                concatMap(() => this.storage.ref(filePath).getDownloadURL()),
                tap(url => {
                  // this.storage.storage.refFromURL(this.iconUrl).delete();
                  this.image = url;
                  this.form.get('image')!.setValue(url);
                }),
                catchError(err => {
                    console.log(err);
                    alert("Could not create section image.");
                    return throwError(err);
                })

            )
            .subscribe();
  }

}
