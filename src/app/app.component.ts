import { Component } from '@angular/core';
import { CurrentUserService } from './services/current-user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tugas-akhir';
  loggedUser: any = null;
  loggedName: string = 'test';
  // testName: string = 'marcel';

  constructor(private service: CurrentUserService) {

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

    // this.service.updateUser(null);
  }

  updateHeader(): void {
    
  }
}
