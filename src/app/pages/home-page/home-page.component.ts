import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  projects = [];

  constructor() { }

  ngOnInit(): void {
    fetch(`http://localhost:3000/projects/all`, {
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
      });
  }

}
