import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardBenchmarkComponent } from './dashboard-benchmark.component';

describe('DashboardBenchmarkComponent', () => {
  let component: DashboardBenchmarkComponent;
  let fixture: ComponentFixture<DashboardBenchmarkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DashboardBenchmarkComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DashboardBenchmarkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
