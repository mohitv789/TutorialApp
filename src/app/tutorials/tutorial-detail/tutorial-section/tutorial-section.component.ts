import { TutorialEditComponent } from './../../tutorial-edit/tutorial-edit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Section } from './../../models/Section';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UserService } from 'src/app/auth/user.service';

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
  iscompleted: boolean = false;
  constructor(
    private dialog: MatDialog,private user: UserService) { }
  ngOnInit(): void {

    let completedSections: any[];
    completedSections = this.user.checkCompletionSections(JSON.parse(localStorage.getItem("user")!).uid);
    setTimeout(() => {
      for (let index = 0; index < completedSections.length; index++)
      {
        if (this.section.id.toString() == completedSections[index].toString()) {
          this.iscompleted = true;
        }
      }
    },250);
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
  markComplete() {
    let tutorialId = this.section.tutorialId;
    let sectionId = this.section.id;
    let loggedInUser = JSON.parse(localStorage.getItem("user")!).uid;
    this.user.addSectionCompletion(loggedInUser,tutorialId,sectionId);
    this.tutorialChanged.emit();
    this.ngOnInit();
  }
}
