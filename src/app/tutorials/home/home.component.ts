import { selectAllTutorials } from './../tutorials.selectors';
import { AppState } from './../../reducers/index';
import { Store, select } from '@ngrx/store';
import { TutorialEditDialogComponent } from './../tutorial-edit-dialog/tutorial-edit-dialog.component';
import { Tutorial } from './../models/Tutorial';
import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, map } from 'rxjs';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomeComponent implements OnInit{

  tutorials$: Observable<Tutorial[]>;
  constructor(
    private dialog: MatDialog,
    private store: Store<AppState>,
    private router: Router,
    private route: ActivatedRoute) {
      this.tutorials$ = this.store.pipe(select(selectAllTutorials));
  }

  ngOnInit() {
    this.reload();
  }

  reload() {

    this.tutorials$ = this.store.pipe(select(selectAllTutorials));

  }

  onAddTutorial() {
    this.router.navigate(['create'], {relativeTo: this.route});
    // const dialogConfig = defaultDialogConfig();
    // console.log("Clicked");

    // dialogConfig.data = {
    //   dialogTitle:"Create Tutorial",
    //   mode: 'create'
    // };

    // this.dialog.open(TutorialEditDialogComponent, dialogConfig);

  }
}
