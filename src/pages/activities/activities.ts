import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ActivityItemViewPage } from '../activity-item-view/activity-item-view';
import { ActivityItemEditPage } from '../activity-item-edit/activity-item-edit';
@IonicPage()
@Component({
  selector: 'page-activities',
  templateUrl: 'activities.html',
})
export class ActivitiesPage {
  activities: any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.activities = [{
      "date": "2017-11-12",
      "name": "实况足球17体验活动",
      "image":"assets/img/pes-activity.jpg",
      "status": "准备中",
      "desc": "这次线下活动邀请了各路2K大神前来，希望门店好好利用他们做好宣传展示工作。",
      "result": {
        "attend": 2000,
        "join": 220,
        "live": 20000,
        "playersPics": ["assets/img/activities/player-1.jpeg","assets/img/activities/player-2.png", "assets/img/activities/player-3.jpeg"],
        "spectatorPics": ["assets/img/activities/player-1.jpeg", "assets/img/activities/player-2.png"],
        "advertisePics":["assets/img/activities/player-1.jpeg", "assets/img/activities/player-2.png"],
        "liverPics":["assets/img/activities/winner.jpeg", "assets/img/activities/live-2.jpeg"],
        "supporterPics":["assets/img/activities/player-1.jpeg", "assets/img/activities/player-2.png"]
      },
      "prepare": {
        "storePics": ["assets/img/activities/storehead.jpeg"],
        "shelvesPics":["assets/img/activities/shelves.jpeg"],
        "storeShowPics":["assets/img/activities/material.png"]
      }
    }, {
      "date": "2017-10-12",
      "name": "NBA2K18线下比赛",
      "image":"assets/img/nba2k18-activity.jpg",
      "status": "准备中",
      "desc": "这次线下活动邀请了各路2K大神前来，希望门店好好利用他们做好宣传展示工作。",
      "result": {
        "attend": 2000,
        "join": 220,
        "live": 20000,
        "playersPics": ["assets/img/activities/player-1.jpeg","assets/img/activities/player-2.png", "assets/img/activities/player-3.jpeg"],
        "peoplePics": ["assets/img/activities/player-1.jpeg", "assets/img/activities/player-2.png"],
        "spectatorPics":["assets/img/activities/live-2.jpeg"],
        "advertisePics":["assets/img/activities/player-1.jpeg", "assets/img/activities/player-2.png"],
        "liverPics":["assets/img/activities/live-1.jpeg"],
        "supporterPics":["assets/img/activities/player-1.jpeg", "assets/img/activities/player-2.png"]
      },
      "prepare": {
        "storePics": ["assets/img/activities/storehead.jpeg"],
        "shelvesPics":["assets/img/activities/shelves.jpeg"],
        "storeShowPics":["assets/img/activities/storehead.jpeg"]
      }
    }, {
      "date": "2017-01-20",
      "name": "拳皇14中国区总决赛",
      "status": "已结束",
      "image":"assets/img/nba2k18-activity.jpg",
      "desc": "拳皇14中国区总决赛将产生3位选手晋级世界总决赛，比赛在繁华的静安区举行，希望门店到时候准备好各种物料，配合直播和比赛工作",
      "result": {
        "attend": 2000,
        "join": 220,
        "live": 20000,
        "playersPics": ["assets/img/activities/player-1.jpeg","assets/img/activities/player-2.png", "assets/img/activities/player-3.jpeg"],
        "peoplePics": ["assets/img/activities/player-1.jpeg", "assets/img/activities/player-2.png"],
        "spectatorPics":["assets/img/activities/live-2.jpeg"],
        "advertisePics":["assets/img/activities/ad-1.jpeg", "assets/img/activities/ad-2.jpeg"],
        "liverPics":["assets/img/activities/live-1.jpeg"],
        "supporterPics":["assets/img/activities/player-1.jpeg", "assets/img/activities/player-2.png"]
      },
      "prepare": {
        "storePics": ["assets/img/activities/storehead.jpeg"],
        "shelvesPics":["assets/img/activities/shelves.jpeg"],
        "storeShowPics":["assets/img/activities/storehead.jpeg"]
      }
    }, {
      "date": "2016-10-20",
      "name": "拳皇14争霸赛",
      "status": "已结束",
      "image":"assets/img/nba2k18-activity.jpg",
      "desc": "作为拳皇14的代理商，这次比赛会带来很多的客流，希望门店做好的设备摆放，宣传背板按照规定摆放。",
      "result": {
        "attend": 2000,
        "join": 220,
        "live": 20000,
        "playersPics": ["assets/img/activities/player-1.jpeg","assets/img/activities/player-2.png", "assets/img/activities/player-3.jpeg"],
        "peoplePics": ["assets/img/activities/player-1.jpeg", "assets/img/activities/player-2.png"],
        "spectatorPics":["assets/img/activities/live-2.jpeg"],
        "advertisePics":["assets/img/activities/ad-1.jpeg", "assets/img/activities/ad-2.jpeg"],
        "liverPics":["assets/img/activities/live-1.jpeg"],
        "supporterPics":["assets/img/activities/support.jpeg", "assets/img/activities/player-2.png"]
      },
      "prepare": {
        "storePics": ["assets/img/activities/storehead.jpeg"],
        "shelvesPics":["assets/img/activities/shelves.jpeg"],
        "storeShowPics":["assets/img/activities/material.png"]
      }
    }];
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ActivitiesPage');
  }

  doViewDetail(item) {
    console.log(item);
    this.navCtrl.push(ActivityItemViewPage, { item });
  }

  doEditDetail(item) {
    console.log(item);
    this.navCtrl.push(ActivityItemEditPage, { item });
  }

}
