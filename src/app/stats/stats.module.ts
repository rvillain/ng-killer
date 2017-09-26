import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JournalComponent } from './journal/journal.component';
import { SharedModule } from '../shared/shared.module';
//import { NgxQRCodeModule } from '@techiediaries/ngx-qrcode';

@NgModule({
  imports: [
    CommonModule,
    //NgxQRCodeModule,
    SharedModule
  ],
  declarations: [JournalComponent]
})
export class StatsModule { }
