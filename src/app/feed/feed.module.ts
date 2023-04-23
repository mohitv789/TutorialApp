
import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
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
import { FeedComponent } from './feed.component';
import { FeedHttpService } from './feed.service';
import { TutorialsModule } from '../tutorials/tutorials.module';
import { FeedListComponent } from './feed-list/feed-list.component';

export const feedRoutes: Routes = [
  {
      path: '',
      component: FeedComponent
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
    MatProgressSpinnerModule,
    MatDatepickerModule,
    ReactiveFormsModule,
    RouterModule.forChild(feedRoutes),
  ],
  declarations: [
    FeedComponent,
    FeedListComponent
  ],

  exports: [
    FeedComponent
  ],
  providers: []
})
export class FeedModule {

  constructor() {}
}
