import { Component, OnInit } from '@angular/core';
import { Observable, concatMap, finalize, map, tap } from 'rxjs';
import { Tutorial } from '../models/Tutorial';
import { Section } from '../models/Section';
import { ActivatedRoute, Params } from '@angular/router';
import { TutorialsHttpService } from '../services/tutorials-http.service';

@Component({
  selector: 'app-tutorial-detail',
  templateUrl: './tutorial-detail.component.html',
  styleUrls: ['./tutorial-detail.component.css']
})
export class TutorialDetailComponent implements OnInit {
  tutorial!: Tutorial;
  id!: string;
  sections!: Section[];
  loading = false;
  displayedColumns = ['seqNo', 'description', 'solution','image'];

  nextPage = 0;

  constructor(
    private tutService: TutorialsHttpService,
    private route: ActivatedRoute) {

  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = params['tutorialID'];
        }
      );
      setTimeout(() => {

        this.tutService.findTutorialById(this.id).subscribe(
          (result) => {

            console.log(result);
            if (result) {
              this.tutorial = result;

            }
          }
        )
      }, 200)
      setTimeout(() => {
        this.tutService.findSections(this.id)
        .pipe(
            finalize(() => this.loading = false)
        )
        .subscribe(
          sections => this.sections = sections
        );
      },500)

  }
}
