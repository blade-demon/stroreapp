import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { ImgServiceProvider } from "../../providers/img-service/img-service";

declare var AzureStorage: any;
declare const Buffer;

@IonicPage()
@Component({
  selector: 'page-activity-item-edit',
  templateUrl: 'activity-item-edit.html',
})

export class ActivityItemEditPage {
  public blobStorageService: any;

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
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    private toastCtrl: ToastController,
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
    // Azure Blob Storage Init
    this.blobStorageService = AzureStorage.createBlobService("DefaultEndpointsProtocol=https;AccountName=storeapp;AccountKey=cwzlYfEC+rSZRmt2ywr4GqVKytXsMvh/a6bIgH2zzlYLu5BLa2fvqMw1fHHkrEEugUlLlhBmik+GRQG4TpUtpQ==;EndpointSuffix=core.chinacloudapi.cn");
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
      let newImageFilesArray = [];
      imageFilesArray.map(item => {
        newImageFilesArray.push("data:image/jpeg;base64," + item);
      });
      switch (imageArray) {
        case "storePics":
          this.storePics = this.storePics.concat(newImageFilesArray);
          this.storePics = this.storePics.reverse().slice(0, 2);
          break;
        case "shelvesPics":
          this.shelvesPics = this.shelvesPics.concat(newImageFilesArray);
          this.shelvesPics = this.shelvesPics.reverse().slice(0, 2);
          break;
        case "storeShowPics":
          this.storeShowPics = this.storeShowPics.concat(newImageFilesArray);
          this.storeShowPics = this.storeShowPics.reverse().slice(0, 2);
          break;

        case "playersPics":
          this.playersPics = this.playersPics.concat(newImageFilesArray);
          this.playersPics = this.playersPics.reverse().slice(0, 2);
          break;
        case "spectatorPics":
          this.spectatorPics = this.spectatorPics.concat(newImageFilesArray);
          this.spectatorPics = this.spectatorPics.reverse().slice(0, 2);
          break;
        case "advertisePics":
          this.advertisePics = this.advertisePics.concat(newImageFilesArray);
          this.advertisePics = this.advertisePics.reverse().slice(0, 2);
          break;
        case "liverPics":
          this.liverPics = this.liverPics.concat(newImageFilesArray);
          this.liverPics = this.liverPics.reverse().slice(0, 2);
          break;
        case "supporterPics":
          this.supporterPics = this.supporterPics.concat(newImageFilesArray);
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
    const loading = this.loadingCtrl.create({
      content: '上传中...'
    });
    loading.present();

    let fileArray = [];
    var storePicsLength = this.storePics.length;
    var shelvesPicsLength = this.shelvesPics.length;
    var storeShowPicsLength = this.storeShowPics.length;
    fileArray = fileArray.concat(this.storePics).concat(this.shelvesPics).concat(this.storeShowPics);
    this.uploadImg(fileArray, [storePicsLength, shelvesPicsLength, storeShowPicsLength], function(err, result){
      loading.dismiss();
      if(!err) {
        // alert(result);
        let alert = this.alertCtrl.create({
          subTitle: '图片上传成功！',
          buttons: ['确定']
        });
        alert.present();
      } else {
        alert(err);
      }
    });
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

  // 上传图片
  uploadImg(files: any[], picLengthArray, callback) {
    if (!files.length) {
      return;
    }

    // 创建容器
    this.createContainer("images", (error, result) => {
      if (!error) {
        // 上传Blob
        this.uploadFiles("images", files, picLengthArray, function (error, result) {
          if (!error) {
            callback(null, "上传结果：" + result);
          } else {
            callback(error, "上传失败：" + error);
          }
        });
      } else {
        callback(error, "上传失败：" + error);
      }
    });
  }

  // 检查门店的container是否存在, 如果不存在就为门店创建一个容器
  createContainer(container, cb) {
    this.blobStorageService.createContainerIfNotExists(container, { publicAccessLevel: 'blob' }, function (error, result, response) {
      if (!error) {
        if (result) {
          cb(null, "容器已经创建");
        } else {
          cb(null, "容器已存在");
        }
      } else {
        cb(error, "出现错误");
      }
    });
  }

  // 上传文件
  uploadFiles(containerName, files, picLengthArray, callback) {
    var finished = 0;
    var blobService = this.blobStorageService;
    var imgCategory = "";
    files.forEach(function (file, index) {
      // var blobName = file.replace(/^.*[\\\/]/, '');
      var fileInfo = [];
      fileInfo = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      console.log(fileInfo);
      var type = fileInfo[1];

      if(index < picLengthArray[0]) {
        imgCategory = "storePics";
      }
      if(picLengthArray[0] <= index < picLengthArray[0] + picLengthArray[1]) {
        imgCategory = "shelvesPics";
      }
      if(picLengthArray[0] + picLengthArray[1] <= index < picLengthArray[0] + picLengthArray[1] + picLengthArray[2]) {
        imgCategory = "storeShowPics";
      }

      var blobName = imgCategory + Date.now() + ".jpeg";
      var fileBuffer = new Buffer(fileInfo[2], "base64");
      console.log(fileBuffer);
      blobService.createBlockBlobFromText(containerName, blobName, fileBuffer, {contentType: type}, function (error, result, response) {
        finished++;
        if (error) {
          callback(error);
        } else {
          if (finished === files.length) {
            callback(null, result);
          }
        }
      });
    });
  }
}
