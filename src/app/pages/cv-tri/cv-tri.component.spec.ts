import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvTriComponent } from './cv-tri.component';

describe('CvTriComponent', () => {
  let component: CvTriComponent;
  let fixture: ComponentFixture<CvTriComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvTriComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvTriComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
