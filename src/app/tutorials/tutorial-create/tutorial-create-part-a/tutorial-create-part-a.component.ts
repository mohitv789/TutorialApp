import { concatMap } from 'rxjs/operators';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { filter, last, Observable, tap, catchError, throwError } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';

@Component({
  selector: 'app-tutorial-create-part-a',
  templateUrl: './tutorial-create-part-a.component.html',
  styleUrls: ['./tutorial-create-part-a.component.css']
})
export class TutorialCreatePartAComponent {
  canshow: boolean = false;
  iconUrl!: string;
  percentageChanges$!: Observable<any>;
  tutorialId!: string;
  form = this.fb.group({
    iconUrl: ['', Validators.required],
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

constructor(private fb: FormBuilder,
  private afs : AngularFirestore, private storage: AngularFireStorage) {

}

ngOnInit() {

    this.tutorialId = this.afs.createId();
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

  uploadFile(event: any) {

    const file: File = event.target.files[0];


    const filePath = `tutorials/${this.tutorialId}/${file.name}`;
    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    });

    this.percentageChanges$ = task.percentageChanges();

    task.snapshotChanges()
            .pipe(
                last(),
                concatMap(() => this.storage.ref(filePath).getDownloadURL()),
                tap(url => {
                  localStorage.setItem("STEP_1_FILE", JSON.stringify(url));
                  localStorage.setItem("STEP_1_ID", JSON.stringify(this.tutorialId));
                  this.iconUrl = url;
                  this.canshow = true;
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
