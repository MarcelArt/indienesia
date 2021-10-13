import { Xmb } from '@angular/compiler';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-create-project',
  templateUrl: './create-project.component.html',
  styleUrls: ['./create-project.component.css']
})
export class CreateProjectComponent implements OnInit {
  title: string;
  description: string;
  visibility: string;
  project_file: any;
  screenshots = [];
  projectFiles = [];
  selectedImage: any;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  postProject(): void {
    let { account_id } = JSON.parse(localStorage.getItem('loggedUser'));
    this.projectFiles.push(this.project_file);
    // let body = {title: this.title, description: this.description, visibility: this.visibility, project_file: this.projectFiles, account_id};
    
    let body = new FormData();
    body.append('title', this.title);
    body.append('description', this.description);
    body.append('visibility', this.visibility);
    this.projectFiles.map((pFile, i) => {
      body.append('project_file[]', pFile);
    });
    body.append('account_id', account_id);

    // console.log(this.visibility);

    // let oReq = new XMLHttpRequest();
    // oReq.addEventListener('load', (evt) => console.log('success'));
    // oReq.open('POST', 'http://localhost:3000/projects/post');
    // oReq.send(body);

    fetch(`${environment.baseUrl}/projects/post`, {
      method: 'POST',
      body
    })
      .then(res => { 
        res.json()
          .then(data => {
            console.log(data)
            this.router.navigateByUrl('/profile');
          });
      })
      .catch(err => {console.log(err)});
  }

  onFileSelected(event): void {
    const file: File = event.target.files[0];
    if(file) {
      this.project_file = file;
    }
  }

  onImageSelected(event): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    if(file) {
      this.projectFiles.push(file);
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.selectedImage = reader.result;
        this.screenshots.push(this.selectedImage);
      }
    }
  }
}
