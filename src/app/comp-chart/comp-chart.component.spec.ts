import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompChartComponent } from './comp-chart.component';

describe('CompChartComponent', () => {
  let component: CompChartComponent;
  let fixture: ComponentFixture<CompChartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompChartComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
