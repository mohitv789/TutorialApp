import { sectionsReducer } from './reducers/sections.reducers';
import { TutorialCreatePartAComponent } from './tutorial-create/tutorial-create-part-a/tutorial-create-part-a.component';
import { TutorialCreatePartBComponent } from './tutorial-create/tutorial-create-part-b/tutorial-create-part-b.component';
import { TutorialCreateComponent } from './tutorial-create/tutorial-create.component';
import { TutorialEditDialogComponent } from './tutorial-edit-dialog/tutorial-edit-dialog.component';
import { tutorialsReducer } from './reducers/tutorial.reducers';
import { TutorialsEffects } from './tutorials.effects';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
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
import { TutorialsListComponent } from './tutorials-list/tutorials-list.component';
import { TutorialEditComponent } from './tutorial-edit/tutorial-edit.component';

import { TutorialsHttpService } from './services/tutorials-http.service';

import { TutorialsResolver } from './tutorials.resolver';
import { SectionsResolver } from './sections.resolver';
import { MatStepperModule } from '@angular/material/stepper';

export const tutorialsRoutes: Routes = [
  {
      path: '',
      component: HomeComponent,
      resolve: {
        tutorials: TutorialsResolver
      }

  },
  {
    path: 'create',
    component: TutorialCreateComponent
  },
  {
      path: ':tutorialID',
      component: TutorialDetailComponent,

  }
];


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

    MatStepperModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    RouterModule.forChild(tutorialsRoutes),
    EffectsModule.forFeature([TutorialsEffects]),
    StoreModule.forFeature("tutorials", tutorialsReducer),
    StoreModule.forFeature("sections", sectionsReducer)
  ],
  declarations: [
      HomeComponent,
      TutorialsListComponent,
      TutorialEditComponent,
      TutorialDetailComponent,
      TutorialEditDialogComponent,
      TutorialCreateComponent,
      TutorialCreatePartAComponent,
      TutorialCreatePartBComponent
  ],
  exports: [
      HomeComponent,
      TutorialsListComponent,
      TutorialEditComponent,
      TutorialDetailComponent,
      TutorialEditDialogComponent,
      TutorialCreateComponent,
      TutorialCreatePartAComponent,
      TutorialCreatePartBComponent


  ],
  entryComponents: [TutorialEditDialogComponent],
  providers: [
    TutorialsHttpService,
    TutorialsResolver,
    SectionsResolver
  ]
})
export class TutorialsModule {

  constructor() {}
}
