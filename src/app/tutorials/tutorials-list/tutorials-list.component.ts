import { Section } from './../models/Section';
import { TutorialsHttpService } from './../services/tutorials-http.service';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Tutorial } from './../models/Tutorial';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { defaultDialogConfig } from '../shared/default-dialog-config';
import { TutorialEditDialogComponent } from '../tutorial-edit-dialog/tutorial-edit-dialog.component';
import { switchMap } from 'rxjs';

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
    private dialog: MatDialog,
    private tutService: TutorialsHttpService) {
  }

  ngOnInit() {

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
