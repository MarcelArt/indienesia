import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit {
  targetUser: any;
  loggedName: string;
  projects = [];
  followed: boolean;
  currentId: string;
  followerCount: number;
  avatar: string;
  isMobile: boolean = false;

  constructor(private route: ActivatedRoute, private deviceService: DeviceDetectorService) { 
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit(): void {
    this.targetUser = JSON.parse(localStorage.getItem('loggedUser'));
    this.loggedName = this.targetUser.name;
    this.currentId = this.targetUser.account_id;
    let reqBody =  { all: false };
    
    let account_id = this.targetUser.account_id;
    if(this.route.snapshot.params.id) {
      account_id = this.route.snapshot.params.id;
      this.avatar = account_id;
      fetch(`${environment.baseUrl}/accounts/${account_id}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .then(res => {
        res.json()
        .then(data => {
          this.targetUser = data[0];
        })
      })

    }
    else {
      this.avatar = this.targetUser.account_id;
    }
    this.getFollowingStatus();

    fetch(`${environment.baseUrl}/projects/user/${account_id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(reqBody)    
    })
      .then(res => {
        res.json()
          .then(data => {
            this.projects = data;
          });
      })

    // fetch(`http://localhost:3000/follow/status`, {
    //   method: 'POST',
    //   headers: {
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({ account_id: this.currentId, following_id: this.route.snapshot.params.id })
    // })
    //   .then(res => res.json())
    //   .then(data => {
    //     this.followed = data.followed;
    //   })

    this.getFollowerCount();
  }

  getFollowingStatus(): void {
    let following_id = this.route.snapshot.params.id || this.currentId;
    fetch(`${environment.baseUrl}/follow/status`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account_id: this.currentId, following_id })
    })
      .then(res => res.json())
      .then(data => {
        this.followed = data.followed;
      })
  }

  follow(): void {
    fetch(`${environment.baseUrl}/follow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account_id: this.currentId, following_id: this.route.snapshot.params.id })
    })
    .then(res => res.json())
    .then(data => {
      this.followed = !this.followed;
      console.log(this.followed);
    })
  }

  unfollow(): void {
    fetch(`${environment.baseUrl}/unfollow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account_id: this.currentId, following_id: this.route.snapshot.params.id })
    })
    .then(res => res.json())
    .then(data => {
      this.followed = !this.followed;
    })
  }

  getFollowerCount(): void {
    let following_id = this.route.snapshot.params.id || this.currentId;
    fetch(`${environment.baseUrl}/follow/count/${following_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => res.json())
      .then(data => {
        this.followerCount = data.follower_count;
      })
    // return 0;
  }

  
}
