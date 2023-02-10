import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { Validators, FormBuilder } from '@angular/forms';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-section-edit-dialog',
  templateUrl: './section-edit-dialog.component.html',
  styleUrls: ['./section-edit-dialog.component.css']
})
export class SectionEditDialogComponent implements OnInit{
  sectionForm = this.fb.group({
    description: ['', Validators.required],
    seqNo: ['', Validators.required],
    solution: ['', Validators.required],
    image: ['', Validators.required],
  });


  loading$!: Observable<boolean>;

  constructor(
      private fb: FormBuilder,
      private dialogRef: MatDialogRef<SectionEditDialogComponent>,
      @Inject(MAT_DIALOG_DATA) data: any) {
  }
  ngOnInit(): void {
  }
  onClose() {
      this.dialogRef.close();
  }

  onSave() {

    this.dialogRef.close({data:this.sectionForm});

  }
}
