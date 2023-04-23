import { Component, Input, OnInit } from '@angular/core';
import { Tutorial } from 'src/app/tutorials/models/Tutorial';

@Component({
  selector: 'app-feed-list',
  templateUrl: './feed-list.component.html',
  styleUrls: ['./feed-list.component.css']
})
export class FeedListComponent implements OnInit{
  @Input()
  tutorials: Tutorial[] = [];

  constructor() {}

  ngOnInit(): void {

  }

}
