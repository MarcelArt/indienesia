import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import * as CanvasJS from '../../utils/canvasjs/canvasjs.min.js';

@Component({
  selector: 'app-project-page',
  templateUrl: './project-page.component.html',
  styleUrls: ['./project-page.component.css']
})
export class ProjectPageComponent implements OnInit {
  project: any;
  screenshots: any;
  projectUser: string;
  comments: Array<object>;
  myComment: string;

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
    this.getComments();

    let chart = new CanvasJS.Chart("chartContainer", {
      animationEnabled: true,
      theme: "light2",
      title:{
        text: "Simple Line Chart"
      },
      data: [{        
        type: "line",
            indexLabelFontSize: 16,
        dataPoints: [
          { y: 450 },
          { y: 414},
          { y: 520, indexLabel: "\u2191 highest",markerColor: "red", markerType: "triangle" },
          { y: 460 },
          { y: 450 },
          { y: 500 },
          { y: 480 },
          { y: 480 },
          { y: 410 , indexLabel: "\u2193 lowest",markerColor: "DarkSlateGrey", markerType: "cross" },
          { y: 500 },
          { y: 480 },
          { y: 510 }
        ]
      }]
    });
    chart.render();
    
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

  getComments(): void {
    let project_id = this.route.snapshot.params.id;
    fetch(`http://localhost:3000/comments/${project_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(res => res.json())
      .then(data => {
        this.comments = data;
      })
  }

  postComment(): void {
    const account_id = JSON.parse(localStorage.getItem('loggedUser')).account_id;
    const project_id = this.route.snapshot.params.id;
    const reqBody = { account_id, project_id, body: this.myComment };
    
    fetch('http://localhost:3000/comment', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody)
    })
    .then(res => res.json())
    .then(data => {
      console.log(data);
      this.comments.push({ ...reqBody, name: JSON.parse(localStorage.getItem('loggedUser')).name });
      this.myComment = '';
    })
  }
}
