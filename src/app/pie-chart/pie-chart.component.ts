import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { OlympicCountry } from '../core/models/Olympic';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss'],
})
export class PieChartComponent implements OnInit {
  public chart: any;
  @Input()
  data!: Observable<OlympicCountry[]>;


  constructor() { }

  ngOnInit(): void {
    this.createChart()
  }

  createChart() :void{
    let countries : OlympicCountry[] = [];
    this.data.subscribe({next(value) {
        countries = value;
    },
    error(msg) {
      console.log('Error Getting country ', msg);
    }});

    this.chart = new Chart("MyChart", {
      type: 'pie',
      
      data: {// values on X-Axis
        labels: countries.map(country => country.country),
        datasets: [{
          data: countries.map(country => country.participations?.map(
            participation => participation.medalsCount).reduce(
              (previous,next)=> previous + next,0)),
          backgroundColor: [
            'red',
            'pink',
            'yellow',
            'green',
            'blue',			
          ],
        }],
      },
      options: {
        aspectRatio:2.5
      },
      
  
    });
  }
  
}
