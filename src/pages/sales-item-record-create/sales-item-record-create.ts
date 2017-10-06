import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IonicPage, NavController, ViewController, NavParams } from 'ionic-angular';

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
    private formBuilder: FormBuilder) {
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
    console.log(this.itemInfo);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SalesItemRecordCreatePage');
  }

  createNewRecord() {
    console.log("创建", this.form.value);
  }

  onCancel() {
    this.viewCtrl.dismiss();
  }
}
