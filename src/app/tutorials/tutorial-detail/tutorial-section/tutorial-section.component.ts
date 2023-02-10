import { TutorialEditComponent } from './../../tutorial-edit/tutorial-edit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Section } from './../../models/Section';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-tutorial-section',
  templateUrl: './tutorial-section.component.html',
  styleUrls: ['./tutorial-section.component.css']
})
export class TutorialSectionComponent implements OnInit {
  @Input() section!: Section;
  @Input() canShow: boolean = false;
  @Output()
  tutorialChanged = new EventEmitter();
  constructor(
    private dialog: MatDialog) { }
  ngOnInit(): void {

  }
  editSection(section:Section) {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.minWidth = "800px";
    dialogConfig.data = {
      section:section
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
