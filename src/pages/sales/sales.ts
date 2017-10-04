import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SalesItemPage } from '../sales-item/sales-item';
@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
})
export class SalesPage {

  games: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.games = [{
      "name":"NBA2K 18",
      "headimg":"http://img.kxdw.com/2017/0922/20170922042136711.jpg",
      "price": 300,
      "amount":1000,
      "salesDetail": [{
        "date":"2017/10/10",
        "sold":500,
        "purchase": 1000,
        "purchasePrice":300,
        "inStock": 2000,
      }, {
        "date":"2017/08/10",
        "sold":500,
        "purchase": 1000,
        "purchasePrice": 200,
        "inStock": 300,
      },{
        "date":"2017/08/10",
        "sold":500,
        "purchase": 1000,
        "purchasePrice": 200,
        "inStock": 100,
      },{
        "date":"2017/08/10",
        "sold":500,
        "purchase": 1000,
        "purchasePrice": 200,
        "inStock": 1000,
      }]
    },{
      "name":"PES 2017",
      "headimg":"https://www.konami.com/kde_cms/eu_publish/uploads/pes2017andy-600x338.jpg",
      "price": 200,
      "amount":100,
      "salesDetail": [{
        "date":"2017/08/10",
        "sold":500,
        "purchase": 1000,
        "purchasePrice":300,
        "inStock": 100,
      }, {
        "date":"2017/08/11",
        "sold":500,
        "purchase": 1000,
        "purchasePrice": 200,
        "inStock": 991,
      },{
        "date":"2017/08/12",
        "sold":500,
        "purchase": 1000,
        "purchasePrice": 200,
        "inStock": 888,
      }]
    },{
      "name":"拳皇14",
      "headimg":"http://cdn.steamstatic.com.8686c.com/steam/apps/571260/header.jpg?t=1504750640",
      "price": 100,
      "amount":1000,
      "salesDetail": [{
        "date":"2016/01/09",
        "sold":500,
        "purchase": 1000,
        "purchasePrice":300,
        "inStock": 2000,
      }, {
        "date":"2016/10/10",
        "sold":500,
        "purchase": 1000,
        "purchasePrice": 200,
        "inStock": 300,
      },{
        "date":"2016/11/01",
        "sold":500,
        "purchase": 1000,
        "purchasePrice": 200,
        "inStock": 100,
      },{
        "date":"2016/12/12",
        "sold":500,
        "purchase": 1000,
        "purchasePrice": 200,
        "inStock": 1000,
      },{
        "date":"2017/02/15",
        "sold":500,
        "purchase": 1000,
        "purchasePrice": 200,
        "inStock": 1000,
      },{
        "date":"2017/06/30",
        "sold":500,
        "purchase": 1000,
        "purchasePrice": 200,
        "inStock": 3540,
      },{
        "date":"2017/07/01",
        "sold":500,
        "purchase": 1000,
        "purchasePrice": 200,
        "inStock": 1000,
      },{
        "date":"2017/07/10",
        "sold":500,
        "purchase": 1000,
        "purchasePrice": 200,
        "inStock": 3540,
      }]
    },{
      "name":"PS4 pro",
      "headimg":"https://media.psu.com/media/articles/image/ps4_pro_boost_mode.jpg",
      "price": 2999,
      "amount":200,
      "salesDetail": [{
        "date":"2017/09/17",
        "sold":500,
        "purchase": 1000,
        "purchasePrice": 2100,
        "inStock": 1000,
      }]
    }];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesPage');
  }

  doViewDetail(item) {
    console.log(item);
    this.navCtrl.push(SalesItemPage, {item});
  }
}
