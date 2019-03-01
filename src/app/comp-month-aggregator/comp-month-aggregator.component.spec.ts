import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompMonthAggregatorComponent } from './comp-month-aggregator.component';

describe('CompMonthAggregatorComponent', () => {
  let component: CompMonthAggregatorComponent;
  let fixture: ComponentFixture<CompMonthAggregatorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompMonthAggregatorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompMonthAggregatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
