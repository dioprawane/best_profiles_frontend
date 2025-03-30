import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CvViewerDialogComponent } from './cv-viewer-dialog.component';

describe('CvViewerDialogComponent', () => {
  let component: CvViewerDialogComponent;
  let fixture: ComponentFixture<CvViewerDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CvViewerDialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CvViewerDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
