import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  public countryParticipations: Participation[]|undefined;
  public country: string | undefined;
  public totalMedals: number|undefined;
  public totalAthletes: number|undefined;
  chartOptions: any;
  chartSeries: any;

  constructor(private route: ActivatedRoute, private router: Router, private olympicsService: OlympicService) { }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.country = params['country'];
      this.countryParticipations = this.olympicsService.getCountryDetails(this.country);
    });
    this.totalMedals = this.countryParticipations?.map((participation) => participation.medalsCount)
      .reduce((sum,count)=>sum + count,0)
    this.totalAthletes = this.countryParticipations?.map((participation) => participation.athleteCount)
      .reduce((sum,count)=>sum + count,0)
    //this.initializeLineChartData();
  }
  initializeLineChartData(): void {
    if (this.countryParticipations) {
      this.chartOptions = {
        chart: {
          type: 'line',
        },
        series: [
          {
            name: 'Médailles par participation',
            data: this.countryParticipations.map(data => data.medalsCount),
          },
        ],
        xaxis: {
          categories: this.countryParticipations.map(data => data.year.toString()),
        },
      };
    }
  }
  goToDashboard() {
    // Navigate back to the dashboard
    // You can use relative or absolute path, depending on your routing configuration
    this.router.navigate(['/']);
  }
}
