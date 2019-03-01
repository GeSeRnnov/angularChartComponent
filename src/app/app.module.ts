import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { SelectDropDownModule } from 'ngx-select-dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CompMonthAggregatorComponent } from './comp-month-aggregator/comp-month-aggregator.component';
import { ObservGetterService } from './observ-getter.service';
import { CompaniesComponent } from './companies/companies.component';
import { CompChartComponent } from './comp-chart/comp-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    // Companies,
    CompMonthAggregatorComponent,
    CompaniesComponent,
    CompChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SelectDropDownModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [ObservGetterService],
  bootstrap: [AppComponent]
})
export class AppModule { }
