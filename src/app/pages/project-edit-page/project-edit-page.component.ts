import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-project-edit-page',
  templateUrl: './project-edit-page.component.html',
  styleUrls: ['./project-edit-page.component.css']
})
export class ProjectEditPageComponent implements OnInit {
  title: string;
  description: string;
  visibility: string;
  project_file: any = null;
  image_file: any = null;
  screenshots = [];
  isMobile: boolean = false;

  project: any;

  constructor(private route: ActivatedRoute, private router: Router, private deviceService: DeviceDetectorService) { 
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit(): void {
    this.getProject();
  }

  getProject(): void {
    const { id } = this.route.snapshot.params;
    fetch(`${environment.baseUrl}/projects/${ id }`, {
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
        this.screenshots = data.screenshots;
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
    fetch(`${environment.baseUrl}/projects/edit`, {
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

  onImageSelected(event): void {
    const file: File = event.target.files[0];
    if(file) {
      this.image_file = file;
      this.uploadImage();
    }
  }

  deleteImage(screenshot_id: number): void {
    fetch(`${environment.baseUrl}/screenshot/delete`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ screenshot_id })
    })
      .then(res => res.json())
      .then(data => {
        let i = this.screenshots.findIndex((s => s.screenshot_id === screenshot_id));
        this.screenshots.splice(i, 1);
      });
  }

  uploadImage(): void {
    const { id } = this.route.snapshot.params;
    let body = new FormData();
    body.append('project_id', id);
    body.append('image_file', this.image_file);

    fetch(`${environment.baseUrl}/screenshot`, {
      method: 'POST',
      body
    })
      .then(res => res.json())
      .then(data => {
        console.log(`data`, data);
        this.screenshots.push(data.new_screenshot);
      });
  }
}
