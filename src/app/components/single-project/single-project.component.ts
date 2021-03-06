import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Project } from './../../models/project.model';

@Component({
  selector: 'app-single-project',
  templateUrl: './single-project.component.html',
  styleUrls: ['./single-project.component.css']
})
export class SingleProjectCardComponent implements OnInit {
  @Input() project: Project;
  hide = true;
  percentageCompleted: string;
  daysLeft: number;

  constructor(private router: Router) {}
  /**
   * Documentation:
   *
   */
  ngOnInit() {
    this.percentageCompleted = ((this.project.totMoneyRaised / this.project.totMoneyNeeded) * 100).toFixed(0);
    this.daysLeft = this.getDays(this.project.endDate, this.project.startDate);
  }

  getDays(date2, date1): number {
    const one_day = 1000 * 60 * 60 * 24;
    const difference_ms = date2 - date1;
    return Math.round(difference_ms / one_day);
  }

  onImageLoaded(): void {
    this.hide = false;
  }

  redirectToDetailsView(): void {
    this.router.navigate(['/home/details', this.project.uid]);
  }
}
