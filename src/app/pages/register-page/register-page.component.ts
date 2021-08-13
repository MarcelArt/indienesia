import { Component, OnInit } from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-register-page',
  templateUrl: './register-page.component.html',
  styleUrls: ['./register-page.component.css']
})
export class RegisterPageComponent implements OnInit {
  email = '';
  password = '';
  rePassword = '';
  name = '';

  constructor(private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  register(): void {
    if(this.email === '' || this.password === '' || this.rePassword === '' || this.name === '') {
      console.log('Cannot be blank');
      this.snackBar.open('Please fill all the field', 'OK');
    }
    else  if(this.password !== this.rePassword) {
      console.log('wrong password');
      this.snackBar.open('Password repeat does not match', 'OK');
    }
    else {
      console.log({email: this.email, password: this.password, name: this.name});
      fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({email: this.email, password: this.password, name: this.name})
      })
        .then(res => {
          console.log(res.json());
          this.snackBar.open('Account succesfully created', 'OK');
        })
        .catch(err => console.error(err));
    }
  }
}
