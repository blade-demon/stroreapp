import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, ToastController } from 'ionic-angular';
import { Store } from '../../models/store';
import { StoresProvider } from "../../providers/stores/stores";
import { StorageProvider } from "../../providers/storage/storage";
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  storeInput: string;
  selectedStore: Store;
  hideCurrentStores: boolean;
  stores: Store[];
  currentStores: Store[];
  errorString: string;
  constructor(
    public navCtrl: NavController,
    public storesProvider: StoresProvider,
    public loadingCtrl: LoadingController,
    public toastCtrl: ToastController,
    public storageProvider: StorageProvider) { }

  ionViewWillEnter() {
    let loader = this.loadingCtrl.create({
      content: "获取门店信息中..."
    });

    loader.present().then(() => {
      this.storesProvider.query().subscribe((resp) => {
        loader.dismiss();
        // console.log(resp);
        this.stores = resp;
      }, (err) => {
        this.errorString = err;
        loader.dismiss();
        let toast = this.toastCtrl.create({
          message: this.errorString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
    });
  }

  getStores(ev) {
    this.hideCurrentStores = false;
    let val = ev.target.value;
    if (!val || !val.trim()) {
      this.currentStores = [];
      return;
    }
    this.currentStores = this.filterStores({ Name: val });
  }

  doLogin() {
    // 保存门店数据到storage
    this.storageProvider.saveStoreInfo(this.selectedStore);
    console.log("要登录的门店是：",this.selectedStore);
    // 跳转页面到门店负责人登录界面
    this.navCtrl.push('LoginPage', { store: this.selectedStore });
  }

  select(store: Store) {
    this.hideCurrentStores = true;
    this.selectedStore = store;
    // console.log(store.Name);
  }

  filterStores(params?: any) {
    if (!params) {
      return this.stores;
    }

    return this.stores.filter((item) => {
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });
  }

}
