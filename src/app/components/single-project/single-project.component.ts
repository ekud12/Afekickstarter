import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
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
  @Output() loaded: EventEmitter<boolean> = new EventEmitter<boolean>();
  constructor(private router: Router) {}

  ngOnInit() {}

  markAsLoaded() {
    this.hide = false;
  }
  projectDetails() {
    this.router.navigate(['/home/details', this.project.uid]);
  }
}
