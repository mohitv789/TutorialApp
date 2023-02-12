
import { Tutorial } from './../models/Tutorial';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit{
  @Input()
  tutorials: Tutorial[] = [];

  constructor() {
  }

  ngOnInit() {

  }
}
