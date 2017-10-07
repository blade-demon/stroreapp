import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImagePicker } from '@ionic-native/image-picker';

declare var azuresorage;
@Injectable()
export class ImgServiceProvider {

  constructor(public http: Http,
    private camera: Camera,
    private imagePicker: ImagePicker,
    private blobService: any) {
      azuresorage.createBlobService();
      // this.blobService = AzureStorage.createBlobService();
  }

  // https://storeapp.blob.core.chinacloudapi.cn/images/bjork-live.jpg
  // 打开相机
  openCamera() {
    let options: CameraOptions = {
      quality: 50,
      destinationType: this.camera.DestinationType.DATA_URL,
      sourceType: this.camera.PictureSourceType.CAMERA,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      saveToPhotoAlbum: true
    }
    return this.camera.getPicture(options)
      .then(
      (imageData) => Promise.resolve(imageData),
      (err) => Promise.reject(`Unable to take photo ${err}`)
      );
  }

  // 打开手机相册
  openImgPicker() {
    let imagePickerOpt = {
      maximumImagesCount: 2,
      width: 400,
      height: 300,
      quality: 80
    };
    return this.imagePicker.getPictures(imagePickerOpt)
      .then(
      (results) => Promise.resolve(results),
      (err) => Promise.reject("无法从收集相册中选择图片"));
  }

  // 上传图片
  uploadImg(path: string) {
    if (!path) {
      return;
    }

    this.createContainer("images", function (error, result) {
      // this.uploadFile('images', 'testblob', 'package.json');
      if(!error) {
        alert("result: " + result + "正在上传文件" + path + "...");
        // this.uploadFile("images", 'testblob', path, function(error, result){
        //   if(!error) {
        //     alert(result);
        //   } else {
        //     alert(error);
        //   }
        // });
      } else {
        alert(error);
      }
    });
  }

  // 停止上传
  stopUpload() {

  }

  // 检查门店的container是否存在, 如果不存在就为门店创建一个容器
  createContainer(container, cb) {
    this.blobService.createContainerIfNotExists(container, { publicAccessLevel: 'blob' }, function (error, result, response) {
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
  uploadFile(container, blob, filePath, cb) {
    this.blobService.createBlockBlobFromLocalFile(container, blob, filePath, function (error, result, response) {
      if (!error) {
        cb(null, result.isSuccessful);
      } else {
        cb(error);
      }
    });
  }
}
