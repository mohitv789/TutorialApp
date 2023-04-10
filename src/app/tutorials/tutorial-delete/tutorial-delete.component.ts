import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/reducers';
import { tutorialDeleted } from '../tutorials.actions';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tutorial-delete',
  templateUrl: './tutorial-delete.component.html',
  styleUrls: ['./tutorial-delete.component.css']
})
export class TutorialDeleteComponent implements OnInit{
  tutorialId!: string;
  constructor(
    private dialogRef: MatDialogRef<TutorialDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) data: any,
    private store: Store<AppState>,
    private router: Router) {
      this.tutorialId = data.tutorialId;
    }

    ngOnInit(): void {
    }

  onClose() {
    this.dialogRef.close();
  }

  onDelete() {
    this.store.dispatch(tutorialDeleted({tutorialId:this.tutorialId}));
    this.dialogRef.close();
    this.router.navigateByUrl('/tutorials');
  }
}
