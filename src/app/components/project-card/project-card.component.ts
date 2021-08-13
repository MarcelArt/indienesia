import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-card',
  templateUrl: './project-card.component.html',
  styleUrls: ['./project-card.component.css']
})
export class ProjectCardComponent implements OnInit {
  @Input() project_id: number;
  @Input() title: string;
  @Input() imgUrl: string;
  @Input() description: string;
  thumbnail_id: string;

  constructor(private router: Router) { }

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

  goToProject(): void {
    this.router.navigateByUrl('/app');
  }
}
