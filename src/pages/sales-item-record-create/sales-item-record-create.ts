import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, ToastController, LoadingController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
import { StorageProvider } from '../../providers/storage/storage';

@IonicPage()
@Component({
  selector: 'page-sales-item-record-create',
  templateUrl: 'sales-item-record-create.html',
})
export class SalesItemRecordCreatePage {
  isValidate: boolean = false;
  itemInfo: any;
  newRecord: { date, sold, purchase, purchasePrice, inStock };
  private form: FormGroup;
  store: any;

  constructor(public navCtrl: NavController,
    public loaderCtrl: LoadingController,
    private toastCtrl: ToastController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private api: Api,
    private storageProvider: StorageProvider) {
    this.form = this.formBuilder.group({
      date: ['', [Validators.required]],
      sold: ['', [Validators.required, Validators.min(0), Validators.max(99999999)]],
      purchase: ['', [Validators.required, Validators.min(0), Validators.max(99999999)]],
      purchasePrice: ['', [Validators.required, Validators.min(0), Validators.max(99999999)]],
      inStock: ['', [Validators.required, Validators.min(0), Validators.max(99999999)]]
    });
  }

  ionViewWillEnter() {
    this.itemInfo = this.navParams.get("item");
    this.storageProvider.getStoreInfo().then(val => {
      this.store = val;
      console.log("storeId:", this.store.ID);
    });
    // console.log(this.itemInfo.ID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesItemRecordCreatePage');
  }

  createNewRecord() {
    console.log("创建", this.form.value);
    let data = {
      "StoreID": this.store.ID,
      "SaleDate": this.form.value.date,
      "ProductID": this.itemInfo.ID,
      "InStockAmount": this.form.value.inStock,
      "SaleAmount": this.form.value.sold,
      "PurchaseAmount": this.form.value.purchase
    };

    // 显示对话框
    let loader = this.loaderCtrl.create({
      content: "提交信息..."
    });
    loader.present();

    this.api.post("saledatainfoes", data).subscribe(resp => {
      console.log("创建新的数据", resp.json());
      loader.dismiss();
      const toast = this.toastCtrl.create({
        message: '提交成功！',
        duration: 1000,
        position: 'bottom'
      });

      toast.onDidDismiss(() => {
        this.viewCtrl.dismiss(resp.json());
      });
      toast.present();
    }, error => {
      console.log(error);
      const toast = this.toastCtrl.create({
        message: '提交失败',
        duration: 1000,
        position: 'bottom'
      });
      toast.present();
    });
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }
}
