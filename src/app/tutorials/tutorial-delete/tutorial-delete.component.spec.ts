import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialDeleteComponent } from './tutorial-delete.component';

describe('TutorialDeleteComponent', () => {
  let component: TutorialDeleteComponent;
  let fixture: ComponentFixture<TutorialDeleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialDeleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
