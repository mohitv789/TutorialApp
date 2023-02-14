import { TutorialsHttpService } from './../services/tutorials-http.service';
import { TutorialEditComponent } from './../tutorial-edit/tutorial-edit.component';
import { SectionsRequested } from './../section.actions';
import { selectSections } from './../sections.selector';
import { selectTutorialById } from './../tutorials.selectors';
import { AppState } from './../../reducers/index';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
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
  styleUrls: ['./tutorial-detail.component.css']
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
    private dialog: MatDialog,
    private http: TutorialsHttpService) {

  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['tutorialID'];
        }
      );
      this.user_id = JSON.parse(localStorage.getItem("user")!).uid;
      this.loadTutorial();
      this.loadSectionsPage();
      // this.dataSource = new SectionsDataSource(this.store);




  }

  loadTutorial() {
    this.tutorial$ = this.store.pipe(select(selectTutorialById(this.id)));
    this.tutorial$.subscribe((result: Tutorial) => {
      if (!!result) {

        this.sections$ = this.store.pipe(select(selectSections(this.id)));
        this.tutorial$.subscribe((result: Tutorial) => {
          console.log(result);

        if (result.owner.toString() == this.user_id.toString()) {
          this.canshow = true;
          }}
        )

      } else {
        this.tutorial$ = this.http.findTutorialById(this.id);
        this.sections$ = this.store.pipe(select(selectSections(this.id)));
        this.tutorial$.subscribe((httpResult: Tutorial) => {


          if (httpResult.owner.toString() == this.user_id.toString()) {
            this.canshow = true;
            }
          }
        )
      }
    }
  )}

  loadSectionsPage() {

    this.store
          .pipe(
            select(selectSections(this.id)),
            tap(sections => {
              if (sections.length > 0) {
                this.sectionsSubject.next(sections);
              }
              else {
                this.store.dispatch(SectionsRequested({tutorialId : this.id}));
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

  addSection() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "800px";
    dialogConfig.data = {
      tutorialId:this.id
    };
    this.dialog.open(TutorialEditComponent, dialogConfig)
      .afterClosed()
      .subscribe(val => {
        if (val) {
            console.log(val);
            this.tutorialChanged.emit();
        }
    });

  }
}
