import { SectionEditDialogComponent } from '../section-edit-dialog/section-edit-dialog.component';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';
import { Component } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-tutorial-create-part-b',
  templateUrl: './tutorial-create-part-b.component.html',
  styleUrls: ['./tutorial-create-part-b.component.css']
})
export class TutorialCreatePartBComponent {
  form = this.fb.group({
    sections: this.fb.array([])
  });


constructor(private fb:FormBuilder,
  private dialog: MatDialog) {

}

get sections() {
  return this.form.controls["sections"] as FormArray;
}

addSection() {

  const dialogConfig = new MatDialogConfig();
  dialogConfig.autoFocus = true;
  dialogConfig.minWidth = "800px";
  dialogConfig.disableClose = true;

  this.dialog.open(SectionEditDialogComponent, dialogConfig)
    .afterClosed()
    .subscribe(val => {
      if (val) {
        console.log(val.data);

        this.sections.push(val.data);
      }
  });
}

  deleteSection(sectionIndex: number) {
    this.sections.removeAt(sectionIndex);
  }
}
