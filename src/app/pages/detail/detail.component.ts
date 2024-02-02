import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { OlympicCountry } from 'src/app/core/models/Olympic';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';


@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit, OnDestroy{
  public countryParticipations?: Participation[];
  private olympicSub!:Subscription;
  private countrySub!:Subscription;
  public country!: string;
  public olympic?:  OlympicCountry;
  public totalMedals: number|undefined;
  public totalAthletes: number|undefined;
  chartOptions: any;

  constructor(private route: ActivatedRoute, private router: Router, private olympicsService: OlympicService) { }

  ngOnInit(): void {
    this.countrySub = this.route.queryParams.subscribe(params => {
      this.country = params['country'];
    });
    this.olympicSub = this.olympicsService.getCountryDetails(this.country)?.subscribe(olympic => this.olympic = olympic);
    this.countryParticipations = this.olympic?.participations
    this.totalMedals = this.countryParticipations?.map((participation) => participation.medalsCount)
      .reduce((sum,count)=>sum + count,0)
    this.totalAthletes = this.countryParticipations?.map((participation) => participation.athleteCount)
      .reduce((sum,count)=>sum + count,0)
    console.log(this.countryParticipations)
    this.initializeLineChartData();
  }
  ngOnDestroy(): void {
    this.olympicSub.unsubscribe();
    this.countrySub.unsubscribe();
  }
  initializeLineChartData(): void {
    if (this.countryParticipations) {
      this.chartOptions = {
        chart: {
          height: '625',
          type: 'line',
          toolbar:{
            show:false,
            },
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
        yaxis:{
          forceNiceScale: true
        },
        
      };
    }
  }
  goToDashboard() {
    this.router.navigate(['/']);
  }
}
