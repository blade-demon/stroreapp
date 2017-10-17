import { Component } from '@angular/core';
// import { FormBuilder, FormGroup } from '@angular/forms';
// import { TranslateService } from '@ngx-translate/core';
import { IonicPage, ViewController, NavController, AlertController, NavParams } from 'ionic-angular';
import { MainPage } from '../pages';
// import { Settings } from '../../providers/providers';
import { StorageProvider } from '../../providers/storage/storage';
import { Api } from '../../providers/api/api';
import { Http } from '@angular/http';
import { LoginPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  employeeInfo: any;
  inputPassword: string;
  inputNewPassword: string;
  inputRepeatNewPassword: string;
  constructor(
    public navCtrl: NavController,
    public viewCtrl: ViewController,
    public alertCtrl: AlertController,
    public navParams: NavParams,
    public storageProvider: StorageProvider,
    public api: Api,
    public http: Http
  ) { }

  ionViewWillEnter() {
    console.log("进入设置界面");
    this.storageProvider.getEmployeeInfo().then(data => {
      this.employeeInfo = data;
      console.log(this.employeeInfo);
    })
  }

  doGoMainPage() {
    this.navCtrl.push(MainPage);
  }

  resetPassword() {
    let title = '';
    // 验证密码正确
    if (this.inputPassword !== this.employeeInfo.Password) {
      title = '密码错误';
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: title,
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    // 验证信息两次输入一致
    if (this.inputNewPassword !== this.inputRepeatNewPassword) {
      title = '两次密码输入不一致';
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: title,
        buttons: ['OK']
      });
      alert.present();
      return;
    }

    // 新旧密码一致
    if (this.inputPassword === this.inputNewPassword || this.inputPassword === this.inputRepeatNewPassword) {
      title = '新密码不能和旧密码相同';
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: title,
        buttons: ['OK']
      });
      alert.present();
      return;
    }
    // 修改密码
    this.http.get(`http://139.219.99.198/GEPortal/gepls/setpassword?employeeid=${this.employeeInfo.ID}&newpassword=${this.inputNewPassword}`).subscribe(() => {
      title = '密码修改成功';
      let alert = this.alertCtrl.create({
        title: '提示',
        subTitle: title,
        buttons: ['OK']
      });
      alert.present();
      alert.dismiss().then(() => {
        // 更改登录状态
        this.storageProvider.changeLoginState(false);
        // 返回到登录界面
        this.navCtrl.setRoot(LoginPage);
      });
    });
    console.log("reset password");
  }

}


// http://139.219.99.198/GEPortal/gepls/setpassword?employeeid=1&newpassword=xxxsdfsd?
