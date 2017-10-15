import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { MainPage } from '../pages';
import { Settings } from '../../providers/providers';
import { StorageProvider } from '../../providers/storage/storage';
import { Api } from '../../providers/api/api';
@IonicPage()
@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html'
})
export class SettingsPage {
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    public storageProvider: StorageProvider,
    public api: Api
  ) {}

  ionViewWillEnter() {
    console.log("进入设置界面");
  }

  doGoMainPage() {
    this.navCtrl.push(MainPage);
  }

  resetPassword() {
    // this.api.get("");
    console.log("reset password");
  }
}


// http://139.219.99.198/GEPortal/gepls/setpassword?employeeid=1&newpassword=xxxsdfsd?
