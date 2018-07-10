import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Investor, Project } from './../../models/project.model';

@Component({
  selector: 'app-admin-panel-investors',
  templateUrl: './admin-panel-investors.component.html',
  styleUrls: ['./admin-panel-investors.component.css']
})
export class AdminPanelInvestorsComponent implements OnInit {
  displayedColumns: string[] = ['investorId', 'amount', 'date'];
  @Input() project: Project;
  dataSource;
  constructor() {}

  ngOnInit() {
    if (this.project !== undefined && this.project !== null) {
      this.dataSource = new MatTableDataSource<Investor>(this.project.investors);
    }
  }
}
