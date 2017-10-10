import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController, NavParams } from 'ionic-angular';

import { Store } from "../../models/store";
import { Employee } from "../../models/employee";
import { EmployeesProvider } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  account: { username: string, password: string } = {
    username: 'gamepoch',
    password: 'gamepoch'
  };

  // Our translated text strings
  private loginErrorString: string;
  private store: Store;
  private employee: Employee;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public employees: EmployeesProvider,
    public toastCtrl: ToastController,
    public translateService: TranslateService,
    public navParams: NavParams, ) {

    this.loginErrorString = "登录失败，请检查用户名和密码后重试！";
  }

  ionViewWillEnter() {
    this.store = this.navParams.get('store');
    console.log(typeof this.store);
  }

  // 管理员登录
  doLogin() {
    let loader = this.loadingCtrl.create({
      content: "登录中..."
    });

    loader.present().then(() => {
      //this.employee.login(this.account).subscribe((resp) => {
        loader.dismiss();
        this.navCtrl.push(MainPage);
      //}, (err) => {
     //   loader.dismiss();
        // let toast = this.toastCtrl.create({
        //   message: this.loginErrorString,
        //   duration: 3000,
        //   position: 'bottom'
        // });
        // toast.present();
      // });
    });
  }
}
