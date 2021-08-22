import { Component, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  projects = [];
  sort: string = 'Recent';
  keyword: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.keyword = this.route.snapshot.params.keyword || '';

    if(this.keyword) {
      fetch(`http://localhost:3000/projects/search/${ this.keyword }`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      }
    })
      .then(res => {
        res.json()
          .then(data => {
            this.projects = data;
            console.log(data);
          });
      });
    }
    else {
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
              console.log(data);
            });
        });
    }

  }

  switchSort(event): void {
    switch(this.sort) {
      case 'Views': 
        this.projects.sort((a, b) => {
          return b.view_count - a.view_count
        });
        break;
      case 'Likes': 
        this.projects.sort((a, b) => {
          return b.like_count - a.like_count
        });
        break;
      case 'Downloads': 
        this.projects.sort((a, b) => {
          return b.download_count - a.download_count
        });
        break;
      case 'Recent': 
        this.projects.sort((a, b) => {
          return a.project_id - b.project_id
        });
        break;
    }
  }

}
