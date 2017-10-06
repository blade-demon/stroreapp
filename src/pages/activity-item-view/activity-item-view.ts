import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityItemEditPage } from '../activity-item-edit/activity-item-edit';
@IonicPage()
@Component({
  selector: 'page-activity-item-view',
  templateUrl: 'activity-item-view.html',
})
export class ActivityItemViewPage {
  activityItem: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.activityItem = this.navParams.get("item");
    console.log(this.activityItem);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityItemViewPage');
  }

  doOpenEditPage() {
    console.log("编辑界面");
    this.navCtrl.push(ActivityItemEditPage, {item: this.activityItem});
  }

}
