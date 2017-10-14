import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, NavParams } from 'ionic-angular';

import { Store } from "../../models/store";
import { Employee } from "../../models/employee";
import { EmployeesProvider } from '../../providers/providers';
import { MainPage } from '../pages';
import { Api } from "../../providers/api/api";
import { StorageProvider } from "../../providers/storage/storage";
@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account: { username: string, password: string } = {
    username: '',
    password: ''
  };

  private loginErrorString: string;
  private store: any;
  private employees: Employee[];
  private storeName: string;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public employeesProvider: EmployeesProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public api: Api,
    public storageProvider: StorageProvider) {

    this.loginErrorString = "登录失败，请检查用户名和密码后重试！";
    this.storeName = "";
  }

  ionViewWillEnter() {
    // 检查门店信息是否存在
    if(!this.store) {
      // 从缓存获取数据信息
      this.storageProvider.getStoreInfo().then(val => {
        this.store = val;
        console.log(this.store.Name);
        this.storeName = this.store.Name;
      });
    } else {
      console.log("门店信息存在");
      this.store = this.navParams.get('store');
      this.storeName = this.store.Name;
      console.log(this.store.Name);
    }

    let loader = this.loadingCtrl.create({
      content: "获取店铺信息..."
    });

    loader.present().then(() => {
      this.api.get("employees").subscribe((resp) => {
        let employeesArray = resp.json();
        let employees = employeesArray.filter(item => {
          return item.StoreID === this.store.ID;
        });
        this.employees = employees;
        console.log(this.employees);
        loader.dismiss();
      }, (err) => {
        loader.dismiss();
      });
    });
  }

  // 管理员登录
  doLogin() {
    let loader = this.loadingCtrl.create({
      content: "登录中..."
    });

    loader.present().then(() => {
      let employee = this.employees.filter((item) => {
        return item.Account === this.account.username;
      });
      if (employee[0]) {
        if (employee[0].Password === this.account.password) {
          loader.dismiss();
          console.log("登录成功！");
          // 保存管理员登录信息
          this.storageProvider.saveEmployeeInfo(employee[0]);
          // 设置账户状态为已登录
          this.storageProvider.changeLoginState(true);
          // 跳转到店铺信息首页
          this.navCtrl.push(MainPage);
        } else {
          loader.dismiss();
          console.log("密码错误！");
          const toast = this.toastCtrl.create({
            message: this.loginErrorString,
            duration: 1000,
            position: 'bottom'
          });
          toast.present();
        }
      } else {
        loader.dismiss();
        console.log("用户不存在！");
        const toast = this.toastCtrl.create({
          message: '用户不存在！',
          duration: 1000,
          position: 'bottom'
        });
        toast.present();
      }
    }, (err) => {
      console.log(err);
    });
  }
}
