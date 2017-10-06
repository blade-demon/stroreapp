import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

}
