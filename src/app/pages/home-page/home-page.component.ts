import { Component, OnInit, ɵɵNgOnChangesFeature } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DeviceDetectorService } from 'ngx-device-detector';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  projects = [];
  sort: string = 'Likes';
  keyword: string;
  isMobile: boolean = false;

  constructor(private route: ActivatedRoute, private deviceService: DeviceDetectorService) {
    this.isMobile = deviceService.isMobile();
  }

  ngOnInit(): void {
    this.keyword = this.route.snapshot.params.keyword || '';

    if(this.keyword) {
      fetch(`${environment.baseUrl}/projects/search/${ this.keyword }`, {
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
      fetch(`${environment.baseUrl}/projects/all`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(res => {
          res.json()
            .then(data => {
              this.projects = data;
              this.switchSort(null);
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
          return b.project_id - a.project_id
        });
        break;
    }
  }

}
