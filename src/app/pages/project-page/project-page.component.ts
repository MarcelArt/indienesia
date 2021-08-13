import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  project: any;
  screenshots: any;
  projectUser: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    let project_id = this.route.snapshot.params.id;
    fetch(`http://localhost:3000/projects/${project_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => {
        res.json()
          .then(data => {
            this.project = data;
            this.screenshots = data.screenshots;
          })
      })
  }

  downloadProject(): void {
    let project_id = this.route.snapshot.params.id;
    window.open(`http://localhost:3000/projects/${project_id}/download`);

    // fetch(`http://localhost:3000/projects/${project_id}/download`, {
    //   method: 'GET',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    // });
  }
}
