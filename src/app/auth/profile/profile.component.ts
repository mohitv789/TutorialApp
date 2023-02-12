import { concatMap } from 'rxjs/operators';
import { last, tap, catchError, throwError } from 'rxjs';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { AppState } from './../../reducers/index';
import { AuthService } from './../auth.service';
import { Component, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { updateProfile } from '../auth.actions';
import { UserService } from '../user.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  form: UntypedFormGroup;
  userId!: string;
  photoUrl!: string;
  displayName!: string;
  constructor(
      private fb:UntypedFormBuilder,
      private user: UserService,
      private router:Router,
      private store: Store<AppState>,
      private storage: AngularFireStorage) {

      this.form = fb.group({
          displayName: ["", [Validators.required]],
      });

  }

  ngOnInit() {
    this.userId = JSON.parse(localStorage.getItem("user")!).uid;
    this.user.displayName$.subscribe((res:any) => this.displayName =res);
    this.user.pictureUrl$.subscribe((res:any) => this.photoUrl = res);
    this.form.patchValue({displayName: this.displayName});
  }

  updateProfile() {
    const val = this.form.value;
    this.store.dispatch(updateProfile({
      dName : val.displayName,
      profilePhoto : this.photoUrl}
      ));
      this.router.navigateByUrl('/tutorials');
  }

  uploadFile(event: any) {

    const file: File = event.target.files[0];


    const filePath = `profiles/${this.userId}/${file.name}`;
    const task = this.storage.upload(filePath, file, {
      cacheControl: "max-age=2592000,public"
    });

    // this.percentageChanges$ = task.percentageChanges();

    task.snapshotChanges()
            .pipe(
                last(),
                concatMap(() => this.storage.ref(filePath).getDownloadURL()),
                tap(url => {
                  this.photoUrl = url;
                  this.form.patchValue({profilePhoto:url})
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
