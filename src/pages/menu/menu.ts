import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController } from 'ionic-angular';
import { Tab1Root } from '../pages';

@IonicPage()
@Component({
  selector: 'page-menu',
  templateUrl: 'menu.html'
})
export class MenuPage {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = Tab1Root;

  pages: Array<{ title: string, component: any }>;

  constructor(public navCtrl: NavController) {
    this.pages = [
      { title: '首页', component: 'HomePage' },
      { title: '设置', component: 'SettingsPage' },
      { title: '关于', component: 'AboutPage'},
      { title: '退出', component: 'LogoutPage'}
    ];
  }

  ionViewDidLoad() {
    console.log('Hello MenuPage Page');
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }
}
