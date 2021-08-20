import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-project-edit-page',
  templateUrl: './project-edit-page.component.html',
  styleUrls: ['./project-edit-page.component.css']
})
export class ProjectEditPageComponent implements OnInit {
  @Input() title: string;
  @Input() description: string;
  @Input() visibility: string;
  @Input() project_file: any = null;

  project: any;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    const { id } = this.route.snapshot.params;
    fetch(`http://localhost:3000/projects/${ id }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        console.log(`data`, data);
        this.project = data;
        this.title = this.project.title;
        this.description = this.project.description;
        this.visibility = this.project.visibility;

      })
  }

  editAndSave(): void {
    let body = new FormData();
    body.append('project_id', this.route.snapshot.params.id);
    body.append('title', this.title);
    body.append('description', this.description);
    body.append('visibility', this.visibility);
    if(this.project_file) {
      body.append('project_file', this.project_file);
    }
    fetch('http://localhost:3000/projects/edit', {
      method: 'POST',
      body
    })
      .then(res => res.json())
      .then(data => {
        this.router.navigateByUrl('/dashboard');
      })
  }

  onFileSelected(event): void {
    const file: File = event.target.files[0];
    if(file) {
      this.project_file = file;
    }
  }
}
