import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.css']
})
export class ProfileEditPageComponent implements OnInit {
  avatar: any;
  avatarFile: any;
  name: string;
  oldPassword: string;
  newPassword: string;
  rePassword: string;
  currentPassword: string;
  loggedUser: any;

  constructor(private _snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.loggedUser = JSON.parse(localStorage.getItem('loggedUser'));
    this.getPassword();
  }

  onImageSelected(event): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    if(file) {
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.avatar = reader.result;
        this.avatarFile = file;
      }
    }
  }

  saveProfile(): void {
    console.log(this.name, this.avatar);
    let { account_id } = JSON.parse(localStorage.getItem('loggedUser'));
    let reqBody = { account_id, new_name: this.name };

    let body = new FormData();
    body.append('account_id', account_id);
    body.append('new_name', this.name);
    body.append('avatar', this.avatarFile);
    console.log(`body`, body);

    
    fetch('http://localhost:3000/accounts', {
      method: 'POST',
      body
      // body: JSON.stringify(reqBody)
    })
      .then(res => res.json())
      .then(data => {
        this.loggedUser.name = this.name;
        console.log(`this.loggedUser`, this.loggedUser);
        localStorage.setItem('loggedUser', JSON.stringify(this.loggedUser));
        this.router.navigateByUrl('/profile')
      });
  }

  getPassword(): void {
    fetch('http://localhost:3000/accounts/getPassword', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ account_id: this.loggedUser.account_id })
    })
      .then(res => res.json())
      .then(data => {
        this.currentPassword = data.password;
        console.log(`this.currentPassword`, this.currentPassword);
      })
  }

  changePassword(): void {
    if(this.currentPassword !== this.oldPassword) {
      this._snackBar.open('Wrong old password', 'OK');
    }
    else if(this.newPassword !== this.rePassword) {
      this._snackBar.open('Password confirmation wrong', 'OK');
    }
    else {
      let reqBody = { account_id: this.loggedUser.account_id, new_password: this.newPassword };
      fetch('http://localhost:3000/accounts/changePassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reqBody)
      })
        .then(res => res.json())
        .then(data => this.router.navigateByUrl('/profile'));
    }
  }
}
