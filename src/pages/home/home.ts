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
  storeID: any;
  productsList: any[];
  products: any[];
  salesInfo: any[];
  constructor(
    public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public navParams: NavParams,
    public storageProvider: StorageProvider,
    public api: Api
  ) {
    this.storageProvider.getStoreID().then(data => {
      console.log(data);
      this.storeID = data;
    });
  }

  ionViewWillEnter() {
    // 从服务器获取销售数据
    let loader = this.loadingCtrl.create({ content: "获取数据..." });
    loader.present().then(() => {
      let dataArray = [];
      // 获取店铺销售信息
      this.api.get("saledatainfoes").subscribe((resp) => {
        console.log(resp.json());
        // 获得产品列表
        this.api.get("products").subscribe(products => {
          this.productsList = products.json().map(item => {
            return { "ProductID": item.ID, "ProductName": item.ProductName ,"TotalSalesAmount": 0 };
          });
          // 处理产品信息
          let temp = _
            .chain(resp.json())
            .filter(_.iteratee({StoreID: this.storeID}))
            .map(item => {
              delete item.Store;
              let products = this.productsList.filter(product => item.ProductID == product.ProductID);
              console.log(products[0]);
              return {
                ID: item.ID,
                InStockAmount: item.InStockAmount,
                ProductName: products[0].ProductName,
                ProductID: item.ProductID,
                PurchaseAmount: item.PurchaseAmount,
                SaleAmount: item.SaleAmount,
                SaleDate: item.SaleDate
              }
            })
            .groupBy('ProductID')
            .value();

          for (let p in temp) {
            let sum = 0;
            let id = "";
            temp[p].map(function (item) {
              sum += item.SaleAmount;
              id = item["ProductID"];
            })
            dataArray.push({ "ProductID": id, "TotalSalesAmount": sum });
          }
          // console.log("商品销售列表：", dataArray);
          console.log("商品列表：", this.productsList);
          // 过滤产品信息，确保所有产品的数据都列出来，即使产品销售数据为0
          this.products = _.unionBy(dataArray, this.productsList, "ProductID");
          console.log(this.products);
          loader.dismiss();
        });
      }, error => { });
    }).catch();
  }
}
