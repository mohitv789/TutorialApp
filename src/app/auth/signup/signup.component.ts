import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {tap} from "rxjs/operators";
import {noop} from "rxjs";
import {Router} from "@angular/router";
import {AppState} from '../../reducers';
import {signup} from '../auth.actions';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit{
  form: UntypedFormGroup;

  constructor(
      private fb:UntypedFormBuilder,
      private auth: AuthService,
      private router:Router,
      private store: Store<AppState>) {

      this.form = fb.group({
          email: ['test@tutorials.io', [Validators.required]],
          password: ['test123', [Validators.required]]
      });

  }

  ngOnInit() {

  }

  signup() {

      const val = this.form.value;

      this.auth.signup(val.email, val.password)
          .then(
              user => {

                  console.log(user);

                  this.store.dispatch(signup());

              }
          )
  }
}
