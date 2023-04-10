import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TutorialCreateComponent } from './tutorial-create.component';

describe('TutorialCreateComponent', () => {
  let component: TutorialCreateComponent;
  let fixture: ComponentFixture<TutorialCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TutorialCreateComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TutorialCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
