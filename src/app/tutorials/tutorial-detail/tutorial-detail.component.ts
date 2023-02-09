import { SectionsDataSource } from './../services/sections.datasource';
import { selectSections } from './../sections.selector';
import { selectTutorials, selectTutorialById } from './../tutorials.selectors';
import { AppState } from './../../reducers/index';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Observable, concatMap, finalize, map, tap } from 'rxjs';
import { Tutorial } from '../models/Tutorial';
import { Section } from '../models/Section';
import { ActivatedRoute, Params } from '@angular/router';
import { TutorialsHttpService } from '../services/tutorials-http.service';
import { Store, select } from '@ngrx/store';

@Component({
  selector: 'app-tutorial-detail',
  templateUrl: './tutorial-detail.component.html',
  styleUrls: ['./tutorial-detail.component.css']
})
export class TutorialDetailComponent implements OnInit {
  tutorial$!: Observable<any>;
  id!: string;
  sections$!: Observable<Section[]>;
  loading = false;

  dataSource!: SectionsDataSource;
  displayedColumns = ['seqNo', 'description', 'solution','image'];

  nextPage = 0;

  constructor(
    private route: ActivatedRoute,
    private store: Store<AppState>) {

  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['tutorialID'];
        }
      );

      this.tutorial$ = this.store.pipe(select(selectTutorialById(this.id)))

      this.dataSource = new SectionsDataSource(this.store);

      this.loadSectionsPage()
  }
  loadSectionsPage() {

    this.dataSource.loadSections(this.id);

  }
}
