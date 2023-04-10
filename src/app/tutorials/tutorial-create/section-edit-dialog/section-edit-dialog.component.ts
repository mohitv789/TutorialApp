import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable, catchError, concatMap, last, tap, throwError } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-section-edit-dialog',
  templateUrl: './section-edit-dialog.component.html',
  styleUrls: ['./section-edit-dialog.component.css']
})
export class SectionEditDialogComponent implements OnInit{
  sectionForm = this.fb.group({
    description: ['', Validators.required],
    seqNo: ['', Validators.required],
    solution: ['', Validators.required],
    image: ['', Validators.required],
  });

  percentageChanges$!: Observable<any>;
  tutorialId!: string;
  image!: string;
  loading$!: Observable<boolean>;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<SectionEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: any,
      private storage: AngularFireStorage) {
  }
  ngOnInit(): void {

    this.tutorialId = JSON.parse(localStorage.getItem("STEP_1_ID")!)
  }
  onClose() {
      this.dialogRef.close();
  }

  onSave() {

    this.dialogRef.close({data:this.sectionForm});

  }

  uploadFile(event: any) {

    const file: File = event.target.files[0];


    const filePath = `tutorials/${this.tutorialId}/${file.name}`;
    const task = this.storage.upload(filePath, file);

    this.percentageChanges$ = task.percentageChanges();

    task.snapshotChanges()
            .pipe(
                last(),
                concatMap(() => this.storage.ref(filePath).getDownloadURL()),
                tap(url => {
                  this.image = url;
                  this.sectionForm.get('image')!.setValue(url);
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
