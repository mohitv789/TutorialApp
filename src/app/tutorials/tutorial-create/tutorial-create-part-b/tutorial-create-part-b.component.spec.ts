import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialCreatePartBComponent } from './tutorial-create-part-b.component';

describe('TutorialCreatePartBComponent', () => {
  let component: TutorialCreatePartBComponent;
  let fixture: ComponentFixture<TutorialCreatePartBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialCreatePartBComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialCreatePartBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
