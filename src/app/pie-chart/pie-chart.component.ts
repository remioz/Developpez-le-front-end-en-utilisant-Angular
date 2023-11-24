import { Component, Input, OnInit } from '@angular/core';
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
  public chart: any;
  @Input()
  data!: Observable<OlympicCountry[]>;


  constructor( private router: Router) {

  }

  ngOnInit(): void {
    this.createChart()
  }

  public createChart() :void{
    
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
            'orange',
            'purple',
            'green',
            'blue',			
          ],
        }],
      },
      options: {
        onClick(event, elements, chart) {
          console.log("cliqué sur: "+countries[elements[0].index].country);
          return countries[elements[0].index].country;
        },
        aspectRatio:2.5
      },
    });
    //this.router.navigate(["/detail"],this.chart.onClick())
  }
  
}
