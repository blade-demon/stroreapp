import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SalesItemPage } from '../sales-item/sales-item';
import { Api } from '../../providers/api/api';
@IonicPage()
@Component({
  selector: 'page-sales',
  templateUrl: 'sales.html',
})
export class SalesPage {
  games: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, public api: Api) {

    // this.games = [{
    //   "name": "NBA2K 18",
    //   "headimg": "http://img.kxdw.com/2017/0922/20170922042136711.jpg",
    //   "price": 300,
    //   "amount": 1000
      // "salesDetail": [{
      //   "date": "2017/10/10",
      //   "sold": 500,
      //   "purchase": 1000,
      //   "purchasePrice": 300,
      //   "inStock": 2000,
      // }, {
      //   "date": "2017/08/10",
      //   "sold": 500,
      //   "purchase": 1000,
      //   "purchasePrice": 200,
      //   "inStock": 300,
      // }, {
      //   "date": "2017/08/10",
      //   "sold": 500,
      //   "purchase": 1000,
      //   "purchasePrice": 200,
      //   "inStock": 100,
      // }, {
      //   "date": "2017/08/10",
      //   "sold": 500,
      //   "purchase": 1000,
      //   "purchasePrice": 200,
      //   "inStock": 1000,
      // }]
    // }];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesPage');
    this.api.get('products').subscribe((response) => {
      console.log(response.json());
      this.games = response.json();
    });
  }

  doViewDetail(item) {
    console.log(item);
    this.navCtrl.push(SalesItemPage, { item });
  }
}
