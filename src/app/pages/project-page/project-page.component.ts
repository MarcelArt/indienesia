import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { DonationDialogComponent } from 'src/app/components/donation-dialog/donation-dialog.component';
import { environment } from 'src/environments/environment';


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
  dislikeCount: number;
  viewCount: number;
  likedThis: boolean;
  dislikedThis: boolean;
  isMobile: boolean = false;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private deviceService: DeviceDetectorService) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit(): void {
    let project_id = this.route.snapshot.params.id;
    fetch(`${environment.baseUrl}/projects/${project_id}`, {
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
            console.log(`this.screenshots`, this.screenshots);
          })
      })
    this.getComments();
    this.addViewCount(project_id);
    this.getLikes();
    this.getViews();
    this.getDislikes();
  }

  openDonation(): void {
    const dialogRef = this.dialog.open(DonationDialogComponent, {
      width: '300px',
      data: this.project
    });
  }

  downloadProject(): void {
    let project_id = this.route.snapshot.params.id;
    window.open(`${environment.baseUrl}/projects/${project_id}/download`);

    fetch(`${environment.baseUrl}/stats/download`, {
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
    fetch(`${environment.baseUrl}/comments/${project_id}`, {
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

    fetch(`${environment.baseUrl}/likes/`, {
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

  getDislikes(): void {
    let project_id = this.route.snapshot.params.id;
    let { account_id } = JSON.parse(localStorage.getItem('loggedUser'));

    fetch(`${environment.baseUrl}/dislikes/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project_id, account_id })
    })
      .then(res => res.json())
      .then(data => {
        console.log('dislikes', data);
        this.dislikeCount = data.dislike_count;
        this.dislikedThis = data.disliked;
      })
  }

  getViews(): void {
    let project_id = this.route.snapshot.params.id;

    fetch(`${environment.baseUrl}/views/${ project_id }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        this.viewCount = data.view_count;
      })
  }

  postComment(): void {
    const account_id = JSON.parse(localStorage.getItem('loggedUser')).account_id;
    const project_id = this.route.snapshot.params.id;
    const reqBody = { account_id, project_id, body: this.myComment };
    
    fetch(`${environment.baseUrl}/comment`, {
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
    fetch(`${environment.baseUrl}/stats/view`, {
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

    fetch(`${environment.baseUrl}/like`, {
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

    if(this.dislikedThis) {
      this.undislike();
    }
  }

  dislike(): void {
    let project_id = this.route.snapshot.params.id;
    let { account_id } = JSON.parse(localStorage.getItem('loggedUser'));

    fetch(`${environment.baseUrl}/dislike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project_id, account_id })
    })
      .then(res => res.json())
      .then(data => {
        this.dislikeCount++;
        this.dislikedThis = true;
      })

    if(this.likedThis) {
      this.unlike();
    }
  }

  unlike(): void {
    let { account_id } = JSON.parse(localStorage.getItem('loggedUser'));

    fetch(`${environment.baseUrl}/unlike`, {
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

  undislike(): void {
    let { account_id } = JSON.parse(localStorage.getItem('loggedUser'));

    fetch(`${environment.baseUrl}/undislike`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account_id })
    })
      .then(res => res.json())
      .then(data => {
        // console.log(data);
        this.dislikeCount--;
        this.dislikedThis = false;
      })
  }
}

