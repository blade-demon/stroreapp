import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { StorageProvider } from '../../providers/storage/storage';
import * as _ from "lodash";
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  store: any;
  products: any[];
  salesInfo: any[];
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public storageProvider: StorageProvider,
    public api: Api
  ) { }

  ionViewDidLoad() {

    if (this.storageProvider.isLoggedIn) {
      // 确保用户处于登录状态

    } else {
      // 用户不处于登录状态就退回到登录界面
      this.navCtrl.popToRoot();
    }
  }

  ionViewWillEnter() {
    // 获取店铺信息
    this.storageProvider.getStoreInfo().then(val => {
      this.store = val;
      console.log(this.store.ID);
      // this.storeName = this.store.ID;
      // 从服务器获取销售数据
      let loader = this.loadingCtrl.create({ content: "获取数据..." });
      loader.present().then(() => {
        let dataArray = [];
        // 获取店铺销售信息
        this.api.get("saledatainfoes").subscribe((resp) => {
          // 处理产品信息
          let temp = _
            .chain(resp.json())
            .filter(_.iteratee({ StoreID: this.store.ID }))
            .map(item => {
              delete item.Store;
              return {
                ID: item.ID,
                InStockAmount: item.InStockAmount,
                ProductName: item.Product.ProductName,
                ProductID: item.ProductID,
                PurchaseAmount: item.PurchaseAmount,
                SaleAmount: item.SaleAmount,
                SaleDate: item.SaleDate
              }
            })
            .groupBy('ProductName')
            // .toPairs()
            // .map(item => _.zipObject(['ID', 'ProductName', 'SaleAmount'], item))
            .value();

          for (let p in temp) {
            let sum = 0;
            let name = "";
            temp[p].map(function (item) {
              sum += item.SaleAmount;
              name = item["ProductName"];
            })
            dataArray.push({ "ProductName": name, "TotalSalesAmount": sum });
          }

          this.products = dataArray;
          console.log(this.products);
          loader.dismiss();

        }, error => { });
      }).catch();
    });
  }
}
