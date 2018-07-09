import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ProjectsService } from '../../services/projects.service';
import { Project } from './../../models/project.model';

@Component({
  selector: 'app-donation-box',
  templateUrl: './donation-box.component.html',
  styleUrls: ['./donation-box.component.css']
})
export class DonationBoxComponent implements OnInit {
  donationAmount = 0;
  stage = 'waiting';
  constructor(
    public dialogRef: MatDialogRef<DonationBoxComponent>,
    @Inject(MAT_DIALOG_DATA) public project: Project,
    private projectService: ProjectsService
  ) {}

  ngOnInit() {}

  donate() {
    this.stage = 'donating';
    this.projectService
      .updateDonation(this.donationAmount, this.project)
      .then(() => {
        this.stage = 'done';
      })
      .catch(() => {
        this.stage = 'waiting';
      });
  }
}
