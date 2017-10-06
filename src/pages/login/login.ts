import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController, LoadingController } from 'ionic-angular';

import { User } from '../../providers/providers';
import { MainPage } from '../pages';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { username: string, password: string } = {
    username: 'gamepoch',
    password: 'gamepoch'
  };

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
    public loadingCtrl: LoadingController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.loginErrorString = "登录失败，请检查用户名和密码后重试！";
    // this.translateService.get('LOGIN_ERROR').subscribe((value) => {
    //   this.loginErrorString = value;
    // })
  }

  // Attempt to login in through our User service
  doLogin() {

    let loader = this.loadingCtrl.create({
      content: "登录中..."
    });

    loader.present().then(() => {
      this.user.login(this.account).subscribe((resp) => {
        loader.dismiss();
        this.navCtrl.push(MainPage);
      }, (err) => {
        loader.dismiss();
        let toast = this.toastCtrl.create({
          message: this.loginErrorString,
          duration: 3000,
          position: 'bottom'
        });
        toast.present();
      });
    });
  }
}