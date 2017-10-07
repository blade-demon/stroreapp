import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';
import { Camera, CameraOptions } from "@ionic-native/camera";
import { ImagePicker } from '@ionic-native/image-picker';

@Injectable()
export class ImgServiceProvider {
  constructor(public http: Http,
    private camera: Camera,
    private imagePicker: ImagePicker) { }

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
      quality: 80,
      outputType: 1
    };
    return this.imagePicker.getPictures(imagePickerOpt)
      .then(
      (results) => Promise.resolve(results),
      (err) => Promise.reject("无法从收集相册中选择图片"));
  }
}
