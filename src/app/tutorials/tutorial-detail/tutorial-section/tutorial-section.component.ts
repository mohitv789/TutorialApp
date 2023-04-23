import { TutorialEditComponent } from './../../tutorial-edit/tutorial-edit.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Section } from './../../models/Section';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FeedHttpService } from 'src/app/feed/feed.service';

@Component({
  selector: 'app-tutorial-section',
  templateUrl: './tutorial-section.component.html',
  styleUrls: ['./tutorial-section.component.css']
})
export class TutorialSectionComponent implements OnInit {
  @Input() section!: Section;
  @Input() canShow: boolean = false;
  @Output()
  sectionChanged = new EventEmitter<boolean>();
  iscompleted: boolean = false;
  completedSections!: string[];
  constructor(
    private dialog: MatDialog,private fService: FeedHttpService) { }
  ngOnInit(): void {
    this.fService.checkCompletionSections(this.section.tutorialId).then((result: string[]) => {
      this.completedSections = result;
    });
    setTimeout(() => {
      for (let index = 0; index < this.completedSections.length; index++)
      {
        if (this.section.id.toString() == this.completedSections[index].toString()) {
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
            this.sectionChanged.emit();
        }
    });

  }
  markComplete() {
    let tutorialId = this.section.tutorialId;
    let sectionId = this.section.id;
    let loggedInUser = JSON.parse(localStorage.getItem("user")!).uid;
    this.fService.addSectionCompletion(loggedInUser,tutorialId,sectionId);
    this.sectionChanged.emit(true);
    this.ngOnInit();

  }
}
