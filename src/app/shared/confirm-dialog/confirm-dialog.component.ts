import { Component, OnInit, Inject } from '@angular/core';

import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.sass']
})
export class ConfirmDialogComponent {

  constructor(
    public dialogRef: MdDialogRef<ConfirmDialogComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}