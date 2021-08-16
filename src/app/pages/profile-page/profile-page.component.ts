import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

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

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.targetUser = JSON.parse(localStorage.getItem('loggedUser'));
    this.loggedName = this.targetUser.name;
    this.currentId = this.targetUser.account_id;
    
    let account_id = this.targetUser.account_id;
    if(this.route.snapshot.params.id) {
      account_id = this.route.snapshot.params.id;
      fetch(`http://localhost:3000/accounts/${account_id}`, {
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
    }
    this.getFollowingStatus();

    fetch(`http://localhost:3000/projects/user/${account_id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
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
    fetch(`http://localhost:3000/follow/status`, {
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
    fetch('http://localhost:3000/follow', {
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
    fetch('http://localhost:3000/unfollow', {
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
    fetch(`http://localhost:3000/follow/count/${following_id}`, {
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
