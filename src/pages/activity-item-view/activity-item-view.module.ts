import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ActivityItemViewPage } from './activity-item-view';

@NgModule({
  declarations: [
    ActivityItemViewPage,
  ],
  imports: [
    IonicPageModule.forChild(ActivityItemViewPage),
  ],
})
export class ActivityItemViewPageModule {}
