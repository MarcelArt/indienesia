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
  comments: Array<object>;
  myComment: string;
  likeCount: number;
  likedThis: boolean;

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
    this.addViewCount(project_id);
    this.getLikes();
  }

  downloadProject(): void {
    let project_id = this.route.snapshot.params.id;
    window.open(`http://localhost:3000/projects/${project_id}/download`);

    fetch(`http://localhost:3000/stats/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project_id })
    })

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
        console.log(`data`, data);
      })
  }

  getLikes(): void {
    let project_id = this.route.snapshot.params.id;
    let { account_id } = JSON.parse(localStorage.getItem('loggedUser'));

    fetch(`http://localhost:3000/likes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project_id, account_id })
    })
      .then(res => res.json())
      .then(data => {
        console.log(data);
        this.likeCount = data.like_count;
        this.likedThis = data.liked;
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

  addViewCount(project_id: string): void {
    fetch(`http://localhost:3000/stats/view`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project_id })
    })
  }

  like(): void {
    let project_id = this.route.snapshot.params.id;
    let { account_id } = JSON.parse(localStorage.getItem('loggedUser'));

    fetch('http://localhost:3000/like', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project_id, account_id })
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.likeCount++;
        this.likedThis = true;
      })
  }

  unlike(): void {
    let { account_id } = JSON.parse(localStorage.getItem('loggedUser'));

    fetch('http://localhost:3000/unlike', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account_id })
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.likeCount--;
        this.likedThis = false;
      })
  }
}

