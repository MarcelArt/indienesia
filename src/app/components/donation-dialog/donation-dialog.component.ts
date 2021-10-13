import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-donation-dialog',
  templateUrl: './donation-dialog.component.html',
  styleUrls: ['./donation-dialog.component.css']
})
export class DonationDialogComponent implements OnInit {
  amount: number = 20000;

  constructor(public dialogRef: MatDialogRef<DonationDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit(): void {
  }

  downloadProject(): void {
    let { project_id } = this.data;
    window.open(`${environment.baseUrl}/projects/${project_id}/download`);

    fetch(`${environment.baseUrl}/stats/download`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ project_id })
    })
      .then(res => res.json())
      .then(() => {
        this.donate();
        this.closeDialog();
      });
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  donate(): void {
    const { project_id } = this.data;
    
    fetch(`${environment.baseUrl}/donate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ 
        project_id,
        amount: this.amount
      })
    })
      .then(res => res.json())
      .then(data => console.log(data));
  }
}
