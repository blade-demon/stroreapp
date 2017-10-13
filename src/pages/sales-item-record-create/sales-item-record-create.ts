import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';
import { Api } from '../../providers/api/api';
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

  constructor(public navCtrl: NavController,
    public viewCtrl: ViewController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private api: Api) {
    this.form = formBuilder.group({
      date: ['', [Validators.required]],
      sold: ['', [Validators.required, Validators.min(0), Validators.max(99999999)]],
      purchase: ['', [Validators.required, Validators.min(0), Validators.max(99999999)]],
      purchasePrice: ['', [Validators.required, Validators.min(0), Validators.max(99999999)]],
      inStock: ['', [Validators.required, Validators.min(0), Validators.max(99999999)]]
    });
  }

  ionViewWillEnter() {
    this.itemInfo = this.navParams.get("item");
    console.log(this.itemInfo.ID);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesItemRecordCreatePage');
  }

  createNewRecord() {
    console.log("创建", this.form.value);
    let data = {
      "StoreID": "2",//this.storeID,
      "SaleDate": this.form.value.date,
      "ProductID": this.itemInfo.ID,
      "InStockAmount": this.form.value.inStock,
      "SaleAmount": this.form.value.sold,
      "PurchaseAmount": this.form.value.purchase
    };
    this.api.post("saledatainfoes", data).subscribe((resp) => {
      console.log("创建的新数据", resp.json());
    }, (error) => {
      console.log(error);
    });
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }
}
