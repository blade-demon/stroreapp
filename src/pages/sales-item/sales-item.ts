import { Component } from '@angular/core';
import { IonicPage, NavController, ModalController, NavParams } from 'ionic-angular';
import { SalesItemRecordCreatePage } from '../sales-item-record-create/sales-item-record-create';
import { Api } from '../../providers/api/api';
import { StorageProvider } from '../../providers/storage/storage';
@IonicPage()
@Component({
  selector: 'page-sales-item',
  templateUrl: 'sales-item.html',
})
export class SalesItemPage {
  store: any;
  salesItem: any;
  salesArray: any;
  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public storageProvider: StorageProvider,
    public api: Api) {
    let item = this.navParams.get("item");
    this.salesItem = item;
    this.salesArray = item.salesDetail;
  }

  ionViewWillEnter() {
    this.storageProvider.getStoreInfo().then(val => {
      this.store = val;
      console.log(this.store.ID);

      console.log("当前商品信息是：", this.salesItem);
      this.api.get("saledatainfoes", { StoreID: this.store.ID, ProductId: this.salesItem.ID }).subscribe(data => {
        let salesInfo = data.json();
        console.log("商品的信息：", salesInfo);
        let tempArray = salesInfo.filter(item => {
          return item.StoreID == this.store.ID && item.Product.ID == this.salesItem.ID;
        });
        this.salesArray = tempArray.map(function (sales) {
          return { date: sales.SaleDate, sold: sales.SaleAmount, purchase: sales.PurchaseAmount, inStock: sales.InStockAmount }
        });
      });
    });
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
