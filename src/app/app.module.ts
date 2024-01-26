import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';
import { PieChartComponent } from './pie-chart/pie-chart.component';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { DetailComponent } from './pages/detail/detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgApexchartsModule } from 'ng-apexcharts';


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, PieChartComponent,DetailComponent],
  imports: [AppRoutingModule, HttpClientModule, RouterModule, CommonModule, BrowserModule, CommonModule, FormsModule, ReactiveFormsModule, NgApexchartsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
