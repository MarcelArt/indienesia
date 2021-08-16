import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-profile-edit-page',
  templateUrl: './profile-edit-page.component.html',
  styleUrls: ['./profile-edit-page.component.css']
})
export class ProfileEditPageComponent implements OnInit {
  avatar: any;
  name: string;
  oldPassword: string;
  newPassword: string;
  rePassword: string;

  constructor(private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  onImageSelected(event): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    if(file) {
      reader.readAsDataURL(file);
      reader.onload = (_event) => {
        this.avatar = reader.result;
      }
    }
  }

  saveProfile(): void {
    console.log(this.name, this.oldPassword, this.newPassword, this.rePassword);
    if(this.newPassword !== this.rePassword) {
      this._snackBar.open('Password confirmation wrong', 'OK');
    }
  }
}
