import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityItemEditPage } from './activity-item-edit';

@NgModule({
  declarations: [
    ActivityItemEditPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityItemEditPage),
  ],
})
export class ActivityItemEditPageModule {}
