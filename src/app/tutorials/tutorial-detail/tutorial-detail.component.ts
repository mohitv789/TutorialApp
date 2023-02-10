import { SectionsRequested } from './../section.actions';
import { selectSections } from './../sections.selector';
import { selectTutorialById } from './../tutorials.selectors';
import { AppState } from './../../reducers/index';
import { Component, EventEmitter, OnInit, Output, ViewEncapsulation } from '@angular/core';
import { BehaviorSubject, Observable, catchError, of, tap } from 'rxjs';
import { Tutorial } from '../models/Tutorial';
import { Section } from '../models/Section';
import { ActivatedRoute, Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TutorialEditDialogComponent } from '../tutorial-edit-dialog/tutorial-edit-dialog.component';

@Component({
  selector: 'app-tutorial-detail',
  templateUrl: './tutorial-detail.component.html',
  styleUrls: ['./tutorial-detail.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class TutorialDetailComponent implements OnInit {
  tutorial$!: Observable<any>;
  sections$!: Observable<any>;
  id!: string;
  loading = false;
  private sectionsSubject = new BehaviorSubject<Section[]>([]);
  canshow: boolean = false;

  @Output()
  tutorialChanged = new EventEmitter();

  nextPage = 0;
  user_id!: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private dialog: MatDialog) {

  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['tutorialID'];
        }
      );

      this.tutorial$ = this.store.pipe(select(selectTutorialById(this.id)))

      // this.dataSource = new SectionsDataSource(this.store);

      this.loadSectionsPage();

      this.sections$ = this.store.pipe(select(selectSections(this.id)));
      setTimeout(() => {

        this.tutorial$.subscribe((result: Tutorial) => {

          if (result.owner.toString() == JSON.parse(localStorage.getItem("user")!).uid.toString()) {
            this.canshow = true;
          }
        })
      }, 250)

      this.user_id = JSON.parse(localStorage.getItem("user")!).uid;
  }
  loadSectionsPage() {

    this.store
          .pipe(
            select(selectSections(this.id)),
            tap(sections => {
              if (sections.length > 0) {
                this.sectionsSubject.next(sections);
              }
              else {
                this.store.dispatch(new SectionsRequested({tutorialId: this.id}));
              }
            }),
            catchError(() => of([]))
          )
          .subscribe(
          )

  }


  editTutorial(tutorial:Tutorial) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "800px";
    dialogConfig.data = {
      tutorial:tutorial
    };
    this.dialog.open(TutorialEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(val => {
        if (val) {
            this.tutorialChanged.emit();
        }
    });

  }
}
