import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { SalesItemRecordCreatePage } from '../sales-item-record-create/sales-item-record-create';
import { Api } from '../../providers/api/api';
@IonicPage()
@Component({
  selector: 'page-sales-item',
  templateUrl: 'sales-item.html',
})
export class SalesItemPage {
  salesItem: any;
  salesArray: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public api: Api) {
    let item = this.navParams.get("item");
    this.salesItem = item;
    this.salesArray = item.salesDetail;
    console.log(this.salesArray);
  }

  ionViewWillEnter() {
    // console.log(this.salesItem);
    this.api.get("saledatainfoes", {StoreID: 2, ProductId: 10}).subscribe(data => {
      let salesInfo  = data.json();
      this.salesArray = salesInfo.map(function(sales){
        return { date: sales.SaleDate, sold: sales.SaleAmount, purchase: sales.PurchaseAmount, inStock: sales.InStockAmount}
      });
    })
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesItemPage');
  }

  // 创建新的记录
  doCreateNewItem() {
    let addModal = this.modalCtrl.create(SalesItemRecordCreatePage, { item: this.salesItem });
    addModal.onDidDismiss(item => {
      // if (item) {
      //   this.activities.add(item);
      // }
    });
    addModal.present();
  }
}
