import { Component } from '@angular/core';
import { IonicPage, NavController, ToastController, NavParams } from 'ionic-angular';
import { ActivityItemEditPage } from '../activity-item-edit/activity-item-edit';
import { Api } from '../../providers/api/api';
import { Http } from '@angular/http';
@IonicPage()
@Component({
  selector: 'page-activity-item-view',
  templateUrl: 'activity-item-view.html',
})
export class ActivityItemViewPage {
  storeID: any;
  activityItem: any;
  dataResults: any;
  constructor(
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public navParams: NavParams,
    public api: Api,
    public http: Http) {
    this.storeID = this.navParams.get("storeID");
    this.dataResults = {
      PplAttend: 0,
      PplOnSpot: 0,
      PplOnLive: 0,
      playersPics: [],
      spectatorPics: [],
      advertisePics: [],
      liverPics: [],
      supporterPics: []
    };
    this.activityItem = this.navParams.get("item");
    this.activityItem.prepare = [];
  }

  ionViewWillEnter() {
    this.dataResults = {
      PplAttend: 0,
      PplOnSpot: 0,
      PplOnLive: 0,
      playersPics: [],
      spectatorPics: [],
      advertisePics: [],
      liverPics: [],
      supporterPics: []
    };
    this.activityItem = this.navParams.get("item");
    this.activityItem.prepare = [];
    console.log(this.activityItem);
    // 获得指定门店指定活动的数据
    this.api.get(`eventdatainfoes?StoreID=${this.storeID}&EventID=${this.activityItem.id}`).subscribe((resp) => {
      let tempArray = [];
      // 如果是单个对象直接push到数组，如果是数组直接复制到数组
      Array.isArray(resp.json()) ? tempArray = resp.json() : tempArray.push(resp.json);
      tempArray = tempArray.filter((data) => {
        return data.StoreID === this.storeID && data.EventID === this.activityItem.id;
      });
      // 遍历累加
      tempArray.map((results) => {
        this.dataResults.PplAttend += results.PplAttend;
        this.dataResults.PplOnSpot += results.PplOnSpot;
        this.dataResults.PplOnLive += results.PplOnLive;
      });
    }, (error) => {
      let toast = this.toastCtrl.create({
        message: (error.status == 404) ? "暂无活动数据" : error.statusText,
        duration: 1000
      });
      toast.present();
    });

    // 获得指定门店指定活动的照片信息(包括：选手照片1，围观人群照片2，活动物料广告照片3，直播大v照片4，支持人照片5, 活动准备照片6)
    this.http.get(`http://portal.gamepoch.com/geportal/gepls/getepibystoreevent?storeid=${this.storeID}&eventid=${this.activityItem.id}`).subscribe(resp => {
      console.log(JSON.parse(resp.json()));
      let tempArray = JSON.parse(resp.json()).map((data) => {
        delete data.Store;
        delete data.Event;
        switch (data.EventPhotoTypeID) {
          case 1:
            this.dataResults.playersPics.push(data.EventPhotoUrl);
            break;
          case 2:
            this.dataResults.spectatorPics.push(data.EventPhotoUrl);
            break;
          case 3:
            this.dataResults.advertisePics.push(data.EventPhotoUrl);
            break;
          case 4:
            this.dataResults.liverPics.push(data.EventPhotoUrl);
            break;
          case 5:
            this.dataResults.supporterPics.push(data.EventPhotoUrl);
            break;
          default:
            this.activityItem.prepare.push(data.EventPhotoUrl);
            break;
        }
        return data;
      });

    }, error => {
      let toast = this.toastCtrl.create({
        message: (error.status == 404) ? "暂无活动照片" : error.statusText,
        duration: 1000
      });
      toast.present();
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivityItemViewPage');
  }

  doOpenEditPage() {
    this.navCtrl.push(ActivityItemEditPage, {
      item: this.activityItem,
      storeID: this.storeID,
      EventID: this.activityItem.id,
      EventDate: this.activityItem.date
    });
  }
}
