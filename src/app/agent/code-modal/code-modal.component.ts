import { Component, OnInit, Inject } from '@angular/core';
import { AgentApiService } from '../../api/agent-api.service';

import {MdDialog, MdDialogRef, MD_DIALOG_DATA} from '@angular/material';

@Component({
  selector: 'app-code-modal',
  templateUrl: './code-modal.component.html',
  styleUrls: ['./code-modal.component.sass']
})
export class CodeModalComponent implements OnInit{
  constructor(
    public dialogRef: MdDialogRef<CodeModalComponent>,
    @Inject(MD_DIALOG_DATA) public data: any) { }

  public code: string;

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(){
    this.code = this.data.agent.code;
  }

}