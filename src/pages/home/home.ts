import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import * as _ from "lodash";
@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html',
})
export class HomePage {

  products: any[];
  salesInfo: any[];
  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public navParams: NavParams, public api: Api) { }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({ content: "获取数据..." });
    loader.present();
    let dataArray = [];
    this.api.get("saledatainfoes").subscribe((resp) => {
      // 筛选店铺2的产品
      this.salesInfo = resp.json().filter((item) => {
        return item.StoreID == 2;
      });
      // 删除不需要的字段
      this.salesInfo = this.salesInfo.map(function (item) {
        delete item.Store;
        return {
          ID: item.ID,
          InStockAmount: item.InStockAmount,
          ProductName: item.Product.ProductName,
          ProductID: item.ProductID,
          PurchaseAmount: item.PurchaseAmount,
          SaleAmount: item.SaleAmount,
          SaleDate: item.SaleDate
        };
      });
      // 根据ProductName进行分组
      let temp = _.groupBy(this.salesInfo, 'ProductName');
      for (let p in temp) {
        let sum = 0;
        let name = "";
        temp[p].map(function (item) {
          sum += item.SaleAmount;
          name = item["ProductName"];
        })
        // console.log({ProductName: name, TotalSalesAmount: sum});
        console.log("123");
        dataArray.push({ "ProductName": name, "TotalSalesAmount": sum });
      }

      this.products = dataArray;
      loader.dismiss();
    }, error => {

    });
  }
}
