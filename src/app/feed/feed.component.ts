import { Component, OnInit } from '@angular/core';
import { FeedHttpService } from './feed.service';
import { TutorialsHttpService } from '../tutorials/services/tutorials-http.service';
import { Tutorial } from '../tutorials/models/Tutorial';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  compTutorials: Tutorial[] = [];
  inprogressTutorials: Tutorial[] = [];
  constructor(private feedService: FeedHttpService, private http: TutorialsHttpService) {}

  ngOnInit(): void {
    this.feedService.generateFeed();
    setTimeout(() => {
      this.fetchInProgressTutorials();
      this.fetchCompletedTutorials();
    }, 600)
  }

  fetchCompletedTutorials() {
    for (let index = 0; index<this.feedService.completedFeed.length; index++) {
      this.http.findTutorialById(this.feedService.completedFeed[index]).subscribe((tutorial: Tutorial) => {
        this.compTutorials.push(tutorial);

      })
    }

  }

  fetchInProgressTutorials() {

    for (let index = 0; index<this.feedService.inprogressFeed.length; index++) {

      console.log(this.feedService.inprogressFeed[index]);
      this.http.findTutorialById(this.feedService.inprogressFeed[index]).subscribe((tutorial: Tutorial) => {
        this.inprogressTutorials.push(tutorial);

      })
    }
  }

}
