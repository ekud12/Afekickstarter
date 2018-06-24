import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Project } from '../../models/project.model';
import { ProjectsService } from '../../services/projects.service';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  project: Project;
  constructor(private route: ActivatedRoute, private projectService: ProjectsService) {}

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.projectService.getProject(params['uid']).subscribe(data => {
        this.project = data;
      });
    });
  }
}
