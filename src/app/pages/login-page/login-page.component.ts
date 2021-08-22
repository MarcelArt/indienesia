import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import {Router} from '@angular/router'
import { CurrentUserService } from 'src/app/services/current-user.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {
  email = '';
  password = '';
  loggedUser: any = null;

  constructor(private router: Router, private service: CurrentUserService, private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    // this.service.loggedUser$.subscribe(res => this.loggedUser = res);
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    if(this.loggedUser) {
      this.router.navigateByUrl('/');
    }
  }

  login(): void {
    fetch('http://localhost:3000/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({email: this.email, password: this.password})
    })
      .then(res => {
        res.json()
          .then(data => {
            if(data.success) {
              localStorage.setItem('loggedUser', JSON.stringify(data.data[0]));
              // this.service.updateUser(data.data[0]);
              // console.log(data.data[0]);
              // console.log(location.href);
              // this.router.navigateByUrl('/profile');
              location.href = 'http://localhost:4200/profile';
            }
            else {
              this._snackBar.open('Wrong email or password', 'OK', {
                duration: 3000
              });
            }
          });
      })
      .catch(err => console.error(err));
  }
}
