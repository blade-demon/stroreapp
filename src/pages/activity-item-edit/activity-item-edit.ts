import { Component, Input } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ActionSheetController } from 'ionic-angular';
import { FileTransfer, FileTransferObject } from '@ionic-native/file-transfer';
import { File } from '@ionic-native/file';
import { ImagePicker } from '@ionic-native/image-picker';
import { ImgServiceProvider } from "../../providers/img-service/img-service";

// import { azurestorage } from 'azure-storage';
@IonicPage()
@Component({
  selector: 'page-activity-item-edit',
  templateUrl: 'activity-item-edit.html',
})

export class ActivityItemEditPage {
  activity: any;
  item: any;
  selectedPage: any;

  public base64Image: string;
  // 活动准备照片
  storePics: any;
  shelvesPics: any;
  storeShowPics: any;
  // 活动结果
  attend: number;
  join: number;
  live: any;
  playersPics: any;
  spectatorPics: any;
  advertisePics: any;
  liverPics: any;
  supporterPics: any;


  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    public camera: Camera,
    private alertCtrl: AlertController,
    private transfer: FileTransfer,
    private file: File,
    private imagePicker: ImagePicker,
    private imgService: ImgServiceProvider
  ) {
    this.activity = this.navParams.get("item");
    this.selectedPage = "prepare";
    this.storePics = [];
    this.shelvesPics = [];
    this.storeShowPics = [];

    this.attend = 0;
    this.join = 0;
    this.live = 0;
    this.playersPics = [];
    this.spectatorPics = [];
    this.advertisePics = [];
    this.liverPics = [];
    this.supporterPics = [];
  }

  // 获取照片
  getImageFromCamera(imageArray) {
    this.imgService.openCamera().then((imageData) => {
      this.base64Image = "data:image/jpeg;base64," + imageData;
      switch (imageArray) {
        case "storePics":
          this.storePics.push(this.base64Image);
          this.storePics.reverse();
          break;
        case "shelvesPics":
          this.shelvesPics.push(this.base64Image);
          this.shelvesPics.reverse();
          break;
        case "storeShowPics":
          this.storeShowPics.push(this.base64Image);
          this.storeShowPics.reverse();
          break;

        case "playersPics":
          this.playersPics.push(this.base64Image);
          this.playersPics.reverse();
          break;
        case "spectatorPics":
          this.spectatorPics.push(this.base64Image);
          this.spectatorPics.reverse();
          break;
        case "advertisePics":
          this.advertisePics.push(this.base64Image);
          this.advertisePics.reverse();
          break;
        case "liverPics":
          this.liverPics.push(this.base64Image);
          this.liverPics.reverse();
          break;
        case "supporterPics":
          this.supporterPics.push(this.base64Image);
          this.supporterPics.reverse();
          break;
      }
    }, (err) => {
      // this.showOpenCameraFailedAlert();
    });
  }

  // 从相册获取照片
  getImageFromImgPicker(imageArray) {
    this.imgService.openImgPicker().then((imageFilesArray) => {
      switch (imageArray) {
        case "storePics":
          this.storePics = this.storePics.concat(imageFilesArray);
          this.storePics = this.storePics.reverse().slice(0, 2);
          break;
        case "shelvesPics":
          this.shelvesPics = this.shelvesPics.concat(imageFilesArray);
          this.shelvesPics = this.shelvesPics.reverse().slice(0, 2);
          break;
        case "storeShowPics":
          this.storeShowPics = this.storeShowPics.concat(imageFilesArray);
          this.storeShowPics = this.storeShowPics.reverse().slice(0, 2);
          break;

        case "playersPics":
          this.playersPics = this.playersPics.concat(imageFilesArray);
          this.playersPics = this.playersPics.reverse().slice(0, 2);
          break;
        case "spectatorPics":
          this.spectatorPics = this.spectatorPics.concat(imageFilesArray);
          this.spectatorPics = this.spectatorPics.reverse().slice(0, 2);
          break;
        case "advertisePics":
          this.advertisePics = this.advertisePics.concat(imageFilesArray);
          this.advertisePics = this.advertisePics.reverse().slice(0, 2);
          break;
        case "liverPics":
          this.liverPics = this.liverPics.concat(imageFilesArray);
          this.liverPics = this.liverPics.reverse().slice(0, 2);
          break;
        case "supporterPics":
          this.supporterPics = this.supporterPics.concat(imageFilesArray);
          this.supporterPics = this.supporterPics.reverse().slice(0, 2);
          break;
      }
    });
  }

  // 删除照片
  doDelete(imageArray, index) {
    let confirm = this
      .alertCtrl
      .create({
        title: '确认要删除吗？',
        message: '',
        buttons: [
          {
            text: '否',
            handler: () => {
              console.log('Disagree clicked');
            }
          }, {
            text: '是',
            handler: () => {
              switch (imageArray) {
                case "storePics":
                  this.storePics.splice(index, 1);
                  break;
                case "shelvesPics":
                  this.shelvesPics.splice(index, 1);
                  break;
                case "storeShowPics":
                  this.storeShowPics.splice(index, 1);
                  break;

                case "playersPics":
                  this.playersPics.splice(index, 1);
                  break;
                case "spectatorPics":
                  this.spectatorPics.splice(index, 1);
                  break;
                case "advertisePics":
                  this.advertisePics.splice(index, 1);
                  break;
                case "liverPics":
                  this.liverPics.splice(index, 1);
                  break;
                case "supporterPics":
                  this.supporterPics.splice(index, 1);
                  break;
              }
            }
          }
        ]
      });
    confirm.present();
  }

  // 选择相册或者相机
  presentActionSheet(imageArray) {
    let actionSheet = this.actionSheetCtrl.create({
      title: '选择',
      buttons: [
        {
          text: '打开相机',
          role: 'destructive',
          handler: () => {
            console.log('打开相机');
            this.getImageFromCamera(imageArray);
          }
        }, {
          text: '打开相册',
          handler: () => {
            console.log('打开本地文件');
            this.getImageFromImgPicker(imageArray);
          }
        }, {
          text: '取消',
          handler: () => {
            console.log('取消');
          }
        }
      ]
    });
    actionSheet.present();
  }

  // 打开相机失败提示
  showOpenCameraFailedAlert() {
    let alert = this.alertCtrl.create({
      subTitle: '没有找到相机',
      buttons: ['确定']
    });
    alert.present();
  }

  //上传准备照片
  doSubmitPrepare() {

  }

  // 上传活动结果
  doSubmitResult() {

  }

  buttonPrepareState() {
    return this.storePics.length && this.shelvesPics.length && this.storeShowPics.length;
  }

  buttonResultState() {
    return this.attend && this.join && this.live && this.playersPics.length && this.spectatorPics.length && this.advertisePics.length && this.liverPics.length && this.supporterPics.length;
  }
}
