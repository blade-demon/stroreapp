import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../pages';
import { StorageProvider } from "../../providers/storage/storage";
@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html',
})
export class AccountPage {

  storeInfo: any;
  employeeInfo: any;

  constructor(public navCtrl: NavController, public navParams: NavParams, public storageProvider: StorageProvider) {}

  ionViewWillEnter() {
    // this.storageProvider.getStoreInfo().then((data) => {
    //   // console.log(data);
    //   this.storeInfo = data;
    // });

    // this.storageProvider.getEmployeeInfo().then(data => {
    //   this.employeeInfo = data;
    //   console.log(this.employeeInfo);
    // })
  }

  doGoMainPage() {
    this.navCtrl.push(MainPage);
  }

}
