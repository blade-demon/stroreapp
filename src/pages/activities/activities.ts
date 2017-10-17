import { Component } from '@angular/core';
import { IonicPage, NavController, LoadingController, AlertController, NavParams } from 'ionic-angular';
import { ActivityItemViewPage } from '../activity-item-view/activity-item-view';
import { ActivitiesProvider } from '../../providers/activities/activities';
import { StorageProvider } from '../../providers/storage/storage';
@IonicPage()
@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html',
})
export class ActivitiesPage {
  activities: any;
  store: any;
  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private activitiesProvider: ActivitiesProvider,
    public storageProvider: StorageProvider,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController) {
    // this.activities = [{
    //   "date": "2017-11-12",
    //   "name": "实况足球17体验活动",
    //   "image": "https://storeapp.blob.core.chinacloudapi.cn/images/pes-activity.jpg",
    //   "status": "准备中",
    //   "desc": "这次线下活动邀请了各路2K大神前来，希望门店好好利用他们做好宣传展示工作。",
    //   "result": {
    //     "attend": 2000,
    //     "join": 220,
    //     "live": 20000,
    //     "playersPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-1.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-2.png", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-3.jpeg"],
    //     "spectatorPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-1.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-2.png"],
    //     "advertisePics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-1.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-2.png"],
    //     "liverPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/winner.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/live-2.jpeg"],
    //     "supporterPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-1.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-2.png"]
    //   },
    //   "prepare": {
    //     "storePics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/storehead.jpeg"],
    //     "shelvesPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/shelves.jpeg"],
    //     "storeShowPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/material.png"]
    //   }
    // }, {
    //   "date": "2017-10-12",
    //   "name": "NBA2K18线下比赛",
    //   "image": "https://storeapp.blob.core.chinacloudapi.cn/images/nba2k18-activity.jpg",
    //   "status": "准备中",
    //   "desc": "这次线下活动邀请了各路2K大神前来，希望门店好好利用他们做好宣传展示工作。",
    //   "result": {
    //     "attend": 2000,
    //     "join": 220,
    //     "live": 20000,
    //     "playersPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-1.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-2.png", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-3.jpeg"],
    //     "spectatorPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/live-2.jpeg"],
    //     "advertisePics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-1.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-2.png"],
    //     "liverPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/live-1.jpeg"],
    //     "supporterPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-1.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-2.png"]
    //   },
    //   "prepare": {
    //     "storePics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/storehead.jpeg"],
    //     "shelvesPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/shelves.jpeg"],
    //     "storeShowPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/storehead.jpeg"]
    //   }
    // }, {
    //   "date": "2017-01-20",
    //   "name": "拳皇14中国区总决赛",
    //   "status": "已结束",
    //   "image": "https://storeapp.blob.core.chinacloudapi.cn/images/nba2k18-activity.jpg",
    //   "desc": "拳皇14中国区总决赛将产生3位选手晋级世界总决赛，比赛在繁华的静安区举行，希望门店到时候准备好各种物料，配合直播和比赛工作",
    //   "result": {
    //     "attend": 2000,
    //     "join": 220,
    //     "live": 20000,
    //     "playersPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-1.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-2.png", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-3.jpeg"],
    //     "spectatorPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/live-2.jpeg"],
    //     "advertisePics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/ad-1.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/ad-2.jpeg"],
    //     "liverPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/live-1.jpeg"],
    //     "supporterPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-1.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-2.png"]
    //   },
    //   "prepare": {
    //     "storePics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/storehead.jpeg"],
    //     "shelvesPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/shelves.jpeg"],
    //     "storeShowPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/storehead.jpeg"]
    //   }
    // }, {
    //   "date": "2016-10-20",
    //   "name": "拳皇14争霸赛",
    //   "status": "已结束",
    //   "image": "https://storeapp.blob.core.chinacloudapi.cn/images/nba2k18-activity.jpg",
    //   "desc": "作为拳皇14的代理商，这次比赛会带来很多的客流，希望门店做好的设备摆放，宣传背板按照规定摆放。",
    //   "result": {
    //     "attend": 2000,
    //     "join": 220,
    //     "live": 20000,
    //     "playersPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-1.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-2.png", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-3.jpeg"],
    //     "spectatorPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/live-2.jpeg"],
    //     "advertisePics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/ad-1.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/ad-2.jpeg"],
    //     "liverPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/live-1.jpeg"],
    //     "supporterPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/support.jpeg", "https://storeapp.blob.core.chinacloudapi.cn/images/activities/player-2.png"]
    //   },
    //   "prepare": {
    //     "storePics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/storehead.jpeg"],
    //     "shelvesPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/shelves.jpeg"],
    //     "storeShowPics": ["https://storeapp.blob.core.chinacloudapi.cn/images/activities/material.png"]
    //   }
    // }];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitiesPage');
  }

  ionViewWillEnter() {
    this.activitiesProvider.query("events").subscribe((activities) => {
      this.activities = activities.map((item) => {
        let status = "未开始";
        // console.log(new Date(item.EventTime));
        const currentDate = new Date();
        // console.log(currentDate);
        if (new Date(item.StartDate) > currentDate) {
          // 活动未开始
        }
        else if (currentDate > new Date(item.EndDate)) {
          // 活动已结束
          status = "已结束";
        } else {
          // 活动进行中
          status = "进行中";
        }
        return {
          "date": item.EventTime.slice(0, 10),
          "name": item.EventSubject,
          "status": status,
          "image": item.EventPromoPicUrl,
          "desc": item.EventDesc,
          "id": item.ID
        }
      });
    }, (error) => {
      console.log(error);
    });

    // 获取店铺信息
    this.storageProvider.getStoreInfo().then((val) => {
      console.log("获取店铺信息：", val);
      this.store = val;
    });
  }

  doViewDetail(item) {
    // console.log(item);
    this.navCtrl.push(ActivityItemViewPage, { item: item, store: this.store });
  }
}
