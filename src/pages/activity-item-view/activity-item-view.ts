import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { ActivityItemEditPage } from '../activity-item-edit/activity-item-edit';
import { Api } from '../../providers/api/api';
@IonicPage()
@Component({
  selector: 'page-activity-item-view',
  templateUrl: 'activity-item-view.html',
})
export class ActivityItemViewPage {
  store: any;
  activityItem: any;
  result: any;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public api: Api) {

    this.activityItem = this.navParams.get("item");
    this.store = this.navParams.get("store");

    this.api.get(`eventdatainfoes?storeid=${this.store.ID}&eventid=${this.activityItem.id}`).subscribe((resp) => {
      // 获取该门店该活动的所有数据信息
      this.result = resp.json();
      console.log(this.result);
    }, (error) => {
      let errorMsg = "";
      if (error.status == 404) {
        errorMsg = "暂无活动数据";
      } else {
        errorMsg = error.statusText;
      }
      let toast = this.toastCtrl.create({
        message: errorMsg,
        duration: 1000
      });
      toast.present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityItemViewPage');
  }

  doOpenEditPage() {
    console.log("编辑界面");
    this.navCtrl.push(ActivityItemEditPage, { item: this.activityItem });
  }

}
