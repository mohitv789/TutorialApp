import { Component, OnInit } from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";

import {Store} from "@ngrx/store";

import {AuthService} from "../auth.service";
import {Router} from "@angular/router";
import {AppState} from '../../reducers';
import {login} from '../auth.actions';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
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

  login() {

      const val = this.form.value;

      this.auth.login(val.email, val.password)
          .then(
              userCred => {

                  console.log(userCred.user!.email);
                  if (!!userCred.user) {
                    this.store.dispatch(login({user: {uid:userCred.user.uid}}));

                    this.router.navigateByUrl('/tutorials');
                  }


              }
          )
  }

}
