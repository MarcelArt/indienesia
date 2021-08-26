import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.css']
})
export class DashboardPageComponent implements OnInit {
  loggedUser: any;
  projects = [];

  constructor() { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    let reqBody =  { all: true };

    fetch(`http://localhost:3000/projects/user/${this.loggedUser.account_id}`, {
      method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody)
    })
      .then(res => res.json())
      .then(data => {
        this.projects = data;
      })
  }

}
