import { Component, Input, OnInit } from '@angular/core';
import Chart from 'chart.js/auto';
import { OlympicCountry } from '../core/models/Olympic';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-pie-chart',
  templateUrl: './pie-chart.component.html',
  styleUrls: ['./pie-chart.component.scss']
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
      console.log("pays?:" +value.length)
      if( value.length === 5){
        countries = value;
       
      }
    },
    error(msg) {
      console.log('Error Getting country ', msg);
    }});
    countries.forEach(country => {
      console.log(country.country)      
    });
    this.chart = new Chart("MyChart", {
      type: 'pie',
  
      data: {// values on X-Axis
        labels: countries.map(country => country.country),
         datasets: [{
    label: 'My First Dataset',
    data: [300, 240, 100, 432, 253, 34],
    backgroundColor: [
      'red',
      'pink',
      'green',
      'yellow',
      'orange',
      'blue',			
    ],
    hoverOffset: 4
  }],
      },
      options: {
        aspectRatio:2.5
      }
  
    });
  }
}
