import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialCreatePartAComponent } from './tutorial-create-part-a.component';

describe('TutorialCreatePartAComponent', () => {
  let component: TutorialCreatePartAComponent;
  let fixture: ComponentFixture<TutorialCreatePartAComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialCreatePartAComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialCreatePartAComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
