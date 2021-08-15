import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-project',
  templateUrl: './dashboard-project.component.html',
  styleUrls: ['./dashboard-project.component.css']
})
export class DashboardProjectComponent implements OnInit {
  @Input() title: string;
  @Input() project_id: string;
  thumbnail_id: string;


  constructor() { }

  ngOnInit(): void {
    fetch(`http://localhost:3000/projects/${this.project_id}`, {
      method: 'GET',
    })
    .then(res => {
      res.json()
        .then(data => {
          this.thumbnail_id = data.screenshots[0].screenshot_id;
        })
    })
  }

}
