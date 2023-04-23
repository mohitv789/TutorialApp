import { TutorialEditComponent } from './../tutorial-edit/tutorial-edit.component';
import { SectionsRequested } from './../section.actions';
import { selectSections } from './../sections.selector';
import { selectTutorialById } from './../tutorials.selectors';
import { AppState } from './../../reducers/index';
import { Component, EventEmitter, OnChanges, OnInit, Output } from '@angular/core';
import { BehaviorSubject, Observable, catchError, map, of, tap } from 'rxjs';
import { Tutorial } from '../models/Tutorial';
import { Section } from '../models/Section';
import { ActivatedRoute, Params } from '@angular/router';
import { Store, select } from '@ngrx/store';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { TutorialEditDialogComponent } from '../tutorial-edit-dialog/tutorial-edit-dialog.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { TutorialDeleteComponent } from '../tutorial-delete/tutorial-delete.component';
import { FeedHttpService } from 'src/app/feed/feed.service';

@Component({
  selector: 'app-tutorial-detail',
  templateUrl: './tutorial-detail.component.html',
  styleUrls: ['./tutorial-detail.component.css']
})
export class TutorialDetailComponent implements OnInit {
  tutorial$!: Observable<any>;
  sections$!: Observable<any>;
  overallCompletedSections!: string[];
  ownerDisplayName!: string;
  id!: string;
  loading = false;
  private sectionsSubject = new BehaviorSubject<Section[]>([]);
  canshow: boolean = false;
  percentCompletion!: number;
  @Output()
  tutorialChanged = new EventEmitter<boolean>();

  reloadNeeded: boolean = false;

  nextPage = 0;
  user_id!: string;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>,
    private dialog: MatDialog,
    private db: AngularFirestore,private fService: FeedHttpService) {

  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['tutorialID'];
        }
      );

      this.tutorial$ = this.store.pipe(select(selectTutorialById(this.id)));

      this.loadSectionsPage();

      this.sections$ = this.store.pipe(select(selectSections(this.id)));
      if (!!this.tutorial$) {
        this.tutorial$.subscribe((result: Tutorial) => {
          this.db.collection("users").doc(result.owner).get().subscribe((res:any) => {
            this.ownerDisplayName = res.data()["displayName"]
          });
          if (result.owner.toString() == JSON.parse(localStorage.getItem("user")!).uid.toString()) {
            this.canshow = true;
          }
        })
      }
      this.user_id = JSON.parse(localStorage.getItem("user")!).uid;

      this.fService.checkCompletionSections(this.id).then((result: string[]) => {
        this.overallCompletedSections = result
      });
      setTimeout(() => {
        this.sections$.subscribe((sections: Section[]) => {
          let numberCompleted = 0;
          sections.forEach((section) => {
            for (let index = 0; index < this.overallCompletedSections.length; index++)
            {
              if (section.id.toString() == this.overallCompletedSections[index].toString()) {
                numberCompleted += 1;
              }
            }
          })
          this.percentCompletion = Math.floor(100 * (numberCompleted/(sections.length)));

        })
      }, 250);
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
    if (!!this.canshow) {
      this.dialog.open(TutorialEditDialogComponent, dialogConfig)
      .afterClosed()
      .subscribe(val => {
        if (val) {
            this.tutorialChanged.emit(true);
        }
      });
    } else {
      alert("You do not have rights to edit this tutorial!")
    }

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
        }
    });

  }

  deleteTutorial() {
    let loggedInUserID = this.user_id;
    let tutorialOwner;
    this.tutorial$.subscribe((result: Tutorial) => {
      tutorialOwner = result.owner;
    })

    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "800px";
    dialogConfig.data = {
      tutorialId:this.id
    };


    if (loggedInUserID == tutorialOwner) {
      this.dialog.open(TutorialDeleteComponent, dialogConfig)
        .afterClosed()
        .subscribe(val => {
          console.log(val);
          this.tutorialChanged.emit(true);
      });
    } else {
      alert("You do not have rights to delete this tutorial!")
    }
  }

  reloadTutorial() {
    this.ngOnInit();
  }
}
