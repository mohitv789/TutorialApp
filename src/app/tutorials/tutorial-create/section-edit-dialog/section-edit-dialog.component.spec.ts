import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SectionEditDialogComponent } from './section-edit-dialog.component';

describe('SectionEditDialogComponent', () => {
  let component: SectionEditDialogComponent;
  let fixture: ComponentFixture<SectionEditDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SectionEditDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SectionEditDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
