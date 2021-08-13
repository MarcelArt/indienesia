import { EventEmitter, Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrentUserService {
  private loggedUser = new BehaviorSubject({});
  private loggedName = new BehaviorSubject('');
  loggedUser$ = this.loggedUser.asObservable();
  loggedName$ = this.loggedName.asObservable();
  // onLogChange: EventEmitter<any> = new EventEmitter();

  constructor() { }

  updateUser(_loggedUser: any) {
    this.loggedUser = _loggedUser;
    this.loggedName = _loggedUser.name;
    localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
    // this.onLogChange.emit();
    console.log(`this.loggedUser`, this.loggedUser);
  }
}
