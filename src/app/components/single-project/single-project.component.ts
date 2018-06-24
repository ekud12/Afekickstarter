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
  constructor(private router: Router) {}

  ngOnInit() {}

  projectDetails() {
    this.router.navigate(['details', this.project.uid]);
  }
}
