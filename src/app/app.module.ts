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


@NgModule({
  declarations: [AppComponent, HomeComponent, NotFoundComponent, PieChartComponent,DetailComponent],
  imports: [BrowserModule, AppRoutingModule, HttpClientModule,RouterModule,CommonModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
