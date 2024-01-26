import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import Chart from 'chart.js/auto';
import { OlympicCountry } from '../core/models/Olympic';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  @ViewChild('pieChart') private pieChartCanvas: ElementRef | undefined;
  public chart: any;
  @Input()
  data!: Observable<OlympicCountry[]>;


  constructor( private router: Router) {

  }

  ngOnInit(): void {
    this.initPieChart()
  }
  
  initPieChart(): void {
    let countries : OlympicCountry[] = [];
    this.data.subscribe({next(value) {
        countries = value;
    },
    error(msg) {
      console.log('Error Getting country ', msg);
    }});

    const data = {
      labels: countries.map(country => country.country),
      datasets: [{
        data: countries.map(country => country.participations?.map(
          participation => participation.medalsCount).reduce(
            (previous,next)=> previous + next,0)),
        backgroundColor: [
          '#793e52',
          '#8aa1dc',
          '#9780a1',
          '#c0e0f1',
          '#966165',			
        ],
      }],
    };

    const router = this.router;

    this.chart = new Chart("MyChart", {
      type: 'pie',
      data: data,
      options: {
        aspectRatio:2.5,
        onClick: function (event: any, chartElements: any[]) {
          if (chartElements.length > 0) {
            const clickedElementIndex = chartElements[0].index;
            const clickedCountry = data.labels[clickedElementIndex];
            router.navigate(['/detail'],
            {queryParams: {country: clickedCountry}}
            );
          }
        },
      },
    });
  }
}

