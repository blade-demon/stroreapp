import { Component, ElementRef, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController, AlertController, ActionSheetController, LoadingController, ToastController } from 'ionic-angular';
import { ImgServiceProvider } from "../../providers/img-service/img-service";
import { StorageProvider} from "../../providers/storage/storage";
import { Api } from '../../providers/api/api';
import * as randomize from 'randomatic';
import { Element } from '@angular/compiler';
declare var AzureStorage: any;
declare const Buffer;

@IonicPage()
@Component({
  selector: 'page-activity-item-edit',
  templateUrl: 'activity-item-edit.html',
})

export class ActivityItemEditPage {
  @ViewChild('storePicsFileInput') storePicsFileInput:ElementRef;
  @ViewChild('storeShowPicsFileInput') storeShowPicsFileInput:ElementRef;
  @ViewChild('shelvesPicsInput') shelvesPicsInput:ElementRef;
  public blobStorageService: any;
  private employeeInfo:any;

  activity: any;
  item: any;
  selectedPage: any;

  public base64Image: string;
  // 活动准备照片base64Array
  storePics: any;
  shelvesPics: any;
  storeShowPics: any;
  compareSizePics: any;
  // 活动准备照片URLArray
  storePicsSaved: any;
  shelvesPicsSaved: any;
  storeShowPicsSaved: any;
  compareSizePicsSaved: any;

  // 活动结果URLArray
  attend: number;
  join: number;
  live: any;
  playersPics: any;
  spectatorPics: any;
  advertisePics: any;
  liverPics: any;
  supporterPics: any;

  // 活动结果照片URLArray
  playersPicsSaved: any;
  spectatorPicsSaved: any;
  advertisePicsSaved: any;
  liverPicsSaved: any;
  supporterPicsSaved: any;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    public viewCtrl: ViewController,
    public actionSheetCtrl: ActionSheetController,
    private alertCtrl: AlertController,
    public loadingCtrl: LoadingController,
    // private toastCtrl: ToastController,
    private imgService: ImgServiceProvider,
    private storageProvider: StorageProvider,
    private api: Api
  ) {
    this.activity = this.navParams.get("item");
    this.selectedPage = "prepare";
    // 本地文件储存
    this.storePics = [];
    this.shelvesPics = [];
    this.storeShowPics = [];
    this.compareSizePics = [];
    // 上传后文件URL array
    this.storePicsSaved = [];
    this.shelvesPicsSaved = [];
    this.storeShowPicsSaved = [];
    this.compareSizePicsSaved = [];

    this.attend = 0;
    this.join = 0;
    this.live = 0;
    this.playersPics = [];
    this.spectatorPics = [];
    this.advertisePics = [];
    this.liverPics = [];
    this.supporterPics = [];

    // 活动结果上传后文件URL array
    this.playersPicsSaved = [];
    this.spectatorPicsSaved = [];
    this.advertisePicsSaved = [];
    this.liverPicsSaved = [];
    this.supporterPicsSaved = [];

    // Azure Blob Storage Init
    this.blobStorageService = AzureStorage.createBlobService("DefaultEndpointsProtocol=https;AccountName=storeapp;AccountKey=cwzlYfEC+rSZRmt2ywr4GqVKytXsMvh/a6bIgH2zzlYLu5BLa2fvqMw1fHHkrEEugUlLlhBmik+GRQG4TpUtpQ==;EndpointSuffix=core.chinacloudapi.cn");
  }

  ionViewWillEnter() {
    console.log("进入设置界面");
    this.storageProvider.getEmployeeInfo().then(data => {
      this.employeeInfo = data;
      // console.log(this.employeeInfo);
    })
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
        case "compareSizePics":
          this.compareSizePics.push(this.base64Image);
          this.compareSizePics.reverse();
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

  // 获取照片
  getPicture(imageArray) {
    this.storePicsFileInput.nativeElement.click();
  }

  // 处理选中的图片
  processWebImage(imageArray, event) {
    let reader = new FileReader();
    reader.onload = (readerEvent) => {
      let imageData = (readerEvent.target as any).result;
      this.addImageFilesIntoArray(imageArray, imageData);
    };
    if (event.target.files[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }
  }

  // 根据照片类型放入到指定的数组中去
  addImageFilesIntoArray(imageArray, imageData) {
      switch (imageArray) {
        case "storePics":
          this.storePics.push(imageData);
          // this.storePics = this.storePics.concat(newImageFilesArray);
          // this.storePics = this.storePics.reverse().slice(0, 2);
          break;
        case "shelvesPics":
          this.shelvesPics.push(imageData);
          // this.shelvesPics = this.shelvesPics.concat(newImageFilesArray);
          // this.shelvesPics = this.shelvesPics.reverse().slice(0, 2);
          break;
        case "storeShowPics":
          this.storeShowPics.push(imageData);
          // this.storeShowPics = this.storeShowPics.concat(newImageFilesArray);
          // this.storeShowPics = this.storeShowPics.reverse().slice(0, 2);
          break;
        case "compareSizePics":
          this.compareSizePics.push(imageData);
          // this.compareSizePics = this.compareSizePics.concat(newImageFilesArray);
          // this.compareSizePics = this.compareSizePics.reverse().slice(0, 2);
          break;
        case "playersPics":
          this.playersPics.push(imageData);
          // this.playersPics = this.playersPics.concat(newImageFilesArray);
          // this.playersPics = this.playersPics.reverse().slice(0, 2);
          break;
        case "spectatorPics":
          this.spectatorPics.push(imageData);
          // this.spectatorPics = this.spectatorPics.concat(newImageFilesArray);
          // this.spectatorPics = this.spectatorPics.reverse().slice(0, 2);
          break;
        case "advertisePics":
          this.advertisePics.push(imageData);
          // this.advertisePics = this.advertisePics.concat(newImageFilesArray);
          // this.advertisePics = this.advertisePics.reverse().slice(0, 2);
          break;
        case "liverPics":
          this.liverPics.push(imageData);
          // this.liverPics = this.liverPics.concat(newImageFilesArray);
          // this.liverPics = this.liverPics.reverse().slice(0, 2);
          break;
        case "supporterPics":
          this.supporterPics.push(imageData);
          // this.supporterPics = this.supporterPics.concat(newImageFilesArray);
          // this.supporterPics = this.supporterPics.reverse().slice(0, 2);
          break;
      }
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
        case "compareSizePics":
          this.compareSizePics = this.compareSizePics.concat(newImageFilesArray);
          this.compareSizePics = this.compareSizePics.reverse().slice(0, 2);
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
                case "compareSizePics":
                  this.compareSizePics.splice(index, 1);

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

  //上传准备照片
  doSubmitPrepare() {
    const loading = this.loadingCtrl.create({
      content: '上传中...'
    });
    loading.present();

    let fileArray = [];
    let savedArray = [];

    fileArray = fileArray.concat(this.storePics).concat(this.shelvesPics).concat(this.storeShowPics).concat(this.compareSizePics);
    for (let i = 0; i < fileArray.length; i++) {
      savedArray.push( this.employeeInfo.Name + '-' + randomize('Aa0', 20));
    }

    // this.storePicsSaved = savedArray.slice(0, this.storePics.length);
    // this.shelvesPicsSaved = savedArray.slice(this.storePics.length, this.storePics.length + this.shelvesPics.length);
    // this.storeShowPicsSaved = savedArray.slice(this.storePics.length + this.shelvesPics.length, this.storePics.length + this.shelvesPics.length + this.storeShowPics.length);

    this.doUploadImg(fileArray, savedArray, (err, result) => {
      this.uploadImagesURLToServer(savedArray, 6).then((value) => {
        loading.dismiss().then(() => {
          this.viewCtrl.dismiss();
        })
        // alert("success");
      }).catch(e => {
        alert(e);
      });
    });
  }

  // 上传活动结果
  doSubmitResult() {
    const loading = this.loadingCtrl.create({
      content: '上传中...'
    });
    loading.present();

    let fileArray = [];
    let savedArray = [];

    fileArray = fileArray.concat(this.playersPics).concat(this.spectatorPics).concat(this.advertisePics).concat(this.liverPics).concat(this.supporterPics);
    for (let i = 0; i < fileArray.length; i++) {
      savedArray.push(this.employeeInfo.Name + '-' + randomize('Aa0', 20));
    }

    this.doUploadImg(fileArray, savedArray, (err, result) => {
      this.uploadImagesURLToServer(savedArray.slice(0, this.playersPics.length), 1).then(() => {
        this.uploadImagesURLToServer(savedArray.slice(this.playersPics.length, this.playersPics.length + this.spectatorPics.length), 2).then(() => {
          this.uploadImagesURLToServer(savedArray.slice(this.playersPics.length + this.spectatorPics.length, this.playersPics.length + this.spectatorPics.length + this.advertisePics.length), 3).then(() => {
            this.uploadImagesURLToServer(savedArray.slice(this.playersPics.length + this.spectatorPics.length + this.advertisePics.length, this.playersPics.length + this.spectatorPics.length + this.advertisePics.length + this.liverPics.length), 4).then(() => {
              this.uploadImagesURLToServer(savedArray.slice(this.playersPics.length + this.spectatorPics.length + this.advertisePics.length + this.liverPics.length, this.playersPics.length + this.spectatorPics.length + this.advertisePics.length + this.liverPics.length + this.supporterPics.length), 5).then(() => {
                this.api.post("eventdatainfoes", {
                  "StoreID": this.navParams.get('storeID'),
                  "EventDate": new Date(this.navParams.get('EventDate')),
                  "EventID": this.navParams.get('EventID'),
                  "PplAttend": this.attend,
                  "PplOnSpot": this.join,
                  "PplOnLive": this.live
                }).subscribe(() => {
                  loading.dismiss().then(() => {
                    this.viewCtrl.dismiss();
                  })
                });
              });
            });
          });
        })
        loading.dismiss().then(() => {
          this.viewCtrl.dismiss();
        })
      }).catch(e => {
        alert(e);
      });
    });
  }

  buttonPrepareState() {
    return this.storePics.length && this.shelvesPics.length && this.storeShowPics.length && this.compareSizePics.length;
  }

  buttonResultState() {
    return this.attend && this.join && this.live && this.playersPics.length && this.spectatorPics.length && this.advertisePics.length && this.liverPics.length && this.supporterPics.length;
  }

  // 上传图片
  doUploadImg(files: any[], savedArray, callback) {
    if (!files.length) {
      return;
    }

    // 创建容器
    this.createContainer("images", (error, result) => {
      if (!error) {
        // 上传Blob
        this.uploadFiles("images", files, savedArray, function (error, result) {
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
  uploadFiles(containerName, files, savedArray, callback) {
    var finished = 0;
    var blobService = this.blobStorageService;

    files.forEach(function (file, index) {
      var fileInfo = [];
      fileInfo = file.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
      var type = fileInfo[1];
      var blobName = savedArray[index] + ".jpeg";
      var fileBuffer = new Buffer(fileInfo[2], "base64");
      blobService.createBlockBlobFromText(containerName, blobName, fileBuffer, { contentType: type }, function (error, result, response) {
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

  // 上传图片到服务器
  uploadImagesURLToServer(imageArray, photoType) {
    return new Promise((resolve, reject) => {
      imageArray.forEach(image => {
        // 上传成功后post结果到服务器
        let photoData = {
          "StoreID": this.navParams.get('storeID'),
          "EventDate": new Date(this.navParams.get('EventDate')),
          "EventID": this.navParams.get('EventID'),
          "EventPhotoTypeID": photoType,
          "EventPhotoUrl": `https://storeapp.blob.core.chinacloudapi.cn/images/${image}.jpeg`
        };
        this.api.post('eventphotoinfoes', photoData).subscribe((resp) => {
          resolve();
        }, error => {
          reject(error);
        });
      });
    });
  }
}
