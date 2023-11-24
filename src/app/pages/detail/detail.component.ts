import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Participation } from 'src/app/core/models/Participation';
import { OlympicService } from 'src/app/core/services/olympic.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {
  //private countryDetails: Participation[];

  constructor(private route: ActivatedRoute, private router: Router, private olympicsService: OlympicService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const country = params.get('country');
      //this.countryDetails = this.olympicsService.getCountryDetails(country);
    });
  }

  goToDashboard() {
    // Navigate back to the dashboard
    // You can use relative or absolute path, depending on your routing configuration
    this.router.navigate(['/']);
  }
}
