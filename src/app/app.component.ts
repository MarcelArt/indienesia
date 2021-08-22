import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { CurrentUserService } from './services/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  @Input() keyword: string = '';
  title = 'tugas-akhir';
  loggedUser: any = null;
  loggedName: string = 'test';
  // testName: string = 'marcel';

  constructor(private service: CurrentUserService, private router: Router) {

  }

  ngOnInit(): void {
    // this.service.updateUser(JSON.parse(localStorage.getItem('loggedUser')));
    // this.service.loggedUser$.subscribe(res => this.loggedUser = res);
    // this.service.loggedName$.subscribe(res => this.loggedName = res);

    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    this.loggedName = this.loggedUser.name;
    
    // this.service.updateUser(JSON.parse(localStorage.getItem('loggedUser')));
    // console.log(`this.loggedUser`, this.loggedUser);  
    // this.service.onLogChange.subscribe();
  }

  ngOnChange(): void {
    // console.log(`this.loggedUser`, this.loggedUser);
    console.log('changed');
  }

  logout(): void {
    this.loggedUser = null;
    localStorage.setItem('loggedUser', null);
    this.router.navigateByUrl('/');
    // this.service.updateUser(null);
  }

  search(): void {
    // this.router.navigateByUrl(`/search/${ this.keyword }`);
    location.href = `http://localhost:4200/search/${ this.keyword }`;
    // window.open(`http://localhost:4200/search/${ this.keyword }`);
  }

  updateHeader(): void {
    
  }
}
