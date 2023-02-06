import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {HomeComponent} from './home/home.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDialogModule} from '@angular/material/dialog';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSelectModule} from '@angular/material/select';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatSortModule} from '@angular/material/sort';
import {MatTableModule} from '@angular/material/table';
import {MatTabsModule} from '@angular/material/tabs';
import {ReactiveFormsModule} from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {RouterModule, Routes} from '@angular/router';
import { TutorialDetailComponent } from './tutorial-detail/tutorial-detail.component';
import { compareTutorials } from './models/Tutorial';
import { compareSections } from './models/Section';
import { TutorialsListComponent } from './tutorials-list/tutorials-list.component';
import { TutorialEditComponent } from './tutorial-edit/tutorial-edit.component';

export const tutorialsRoutes: Routes = [
  {
      path: '',
      component: HomeComponent,

  },
  {
      path: ':tutorialID',
      component: TutorialDetailComponent,

  }
];

// const entityMetadata: EntityMetadataMap = {
//   Tutorial: {
//       sortComparer: compareTutorials,
//       entityDispatcherOptions: {
//           optimisticUpdate: true
//       }
//   },
//   Section: {
//       sortComparer: compareSections
//   }
// };


@NgModule({
  imports: [
      CommonModule,
      MatButtonModule,
      MatIconModule,
      MatCardModule,
      MatTabsModule,
      MatInputModule,
      MatTableModule,
      MatPaginatorModule,
      MatSortModule,
      MatProgressSpinnerModule,
      MatSlideToggleModule,
      MatDialogModule,
      MatSelectModule,
      MatDatepickerModule,
      ReactiveFormsModule,
      RouterModule.forChild(tutorialsRoutes)
  ],
  declarations: [
      HomeComponent,
      TutorialsListComponent,
      TutorialEditComponent,
      TutorialDetailComponent
  ],
  exports: [
      HomeComponent,
      TutorialsListComponent,
      TutorialEditComponent,
      TutorialDetailComponent

  ],
  providers: [

  ]
})
export class TutorialsModule {


}
