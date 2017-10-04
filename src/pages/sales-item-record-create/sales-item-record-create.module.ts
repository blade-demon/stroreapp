import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SalesItemRecordCreatePage } from './sales-item-record-create';

@NgModule({
  declarations: [
    SalesItemRecordCreatePage,
  ],
  imports: [
    IonicPageModule.forChild(SalesItemRecordCreatePage),
  ],
})
export class SalesItemRecordCreatePageModule {}
