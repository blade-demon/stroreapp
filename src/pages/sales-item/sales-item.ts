import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { SalesItemRecordCreatePage } from '../sales-item-record-create/sales-item-record-create';
@IonicPage()
@Component({
  selector: 'page-sales-item',
  templateUrl: 'sales-item.html',
})
export class SalesItemPage {
  salesItem: any;
  salesArray: any;
  constructor(public navCtrl: NavController, public navParams: NavParams, public modalCtrl: ModalController) {
    let item = this.navParams.get("item");
    this.salesItem = item;
    this.salesArray = item.salesDetail;
    console.log(this.salesArray);
  }

  ionViewWillEnter() {
    // console.log(this.salesItem);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesItemPage');
  }

  // 创建新的记录
  doCreateNewItem() {
    let addModal = this.modalCtrl.create(SalesItemRecordCreatePage, {item: this.salesItem});
    addModal.onDidDismiss(item => {
      // if (item) {
      //   this.activities.add(item);
      // }
    });
    addModal.present();
  }

}
