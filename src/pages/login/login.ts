import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { Employee } from "../../models/employee";
import { EmployeesProvider } from '../../providers/providers';
import { MainPage } from '../pages';
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
  private employee: Employee;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public employeesProvider: EmployeesProvider,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public storageProvider: StorageProvider) {

    this.loginErrorString = "登录失败，请检查用户名和密码后重试！";
  }

  ionViewWillEnter() { }

  // 管理员登录
  doLogin() {
    let loader = this.loadingCtrl.create({
      content: "登录中..."
    });
    loader.present().then(() => {
      this.employeesProvider.login({ account: this.account.username, password: this.account.password }).subscribe((resp) => {
        if (!resp) {
          throw new Error("获取信息失败");
        } else {
          var ID = resp.ID;
          // 跳转到店铺信息首页
          this.navCtrl.push(MainPage);
          this.storageProvider.saveStoreID(resp.ID);
          loader.dismiss();
        }
        // 保存管理员登录信息
        this.storageProvider.saveEmployeeInfo({ "Name": this.account.username });
        console.log('登录的雇员是：', this.account.username);
        // 设置账户状态为已登录
        // this.storageProvider.changeLoginState(true);

      }, (error) => {
        loader.dismiss();
        this.loginErrorString = "请确认用户名和密码后重试！";
        const toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 1000,
          position: 'bottom'
        });
        toast.present();
      });
    });
  }
}
