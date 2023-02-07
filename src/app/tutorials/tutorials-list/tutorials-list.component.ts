import { MatDialog } from '@angular/material/dialog';
import { Tutorial } from './../models/Tutorial';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { TutorialEditDialogComponent } from '../tutorial-edit-dialog/tutorial-edit-dialog.component';

@Component({
  selector: 'app-tutorials-list',
  templateUrl: './tutorials-list.component.html',
  styleUrls: ['./tutorials-list.component.css']
})
export class TutorialsListComponent implements OnInit{
  @Input()
  tutorials: Tutorial[] = [];

  @Output()
  tutorialChanged = new EventEmitter();

  constructor(
    private dialog: MatDialog,) {
  }

  ngOnInit() {

  }

  editTutorial(tutorial:Tutorial) {

      const dialogConfig = defaultDialogConfig();

      dialogConfig.data = {
        dialogTitle:"Edit Tutorial",
        tutorial,
        mode: 'update'
      };

      this.dialog.open(TutorialEditDialogComponent, dialogConfig)
        .afterClosed()
        .subscribe(() => this.tutorialChanged.emit());

  }
}
