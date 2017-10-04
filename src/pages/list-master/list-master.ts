import { Component } from '@angular/core';
import { IonicPage, ModalController, NavController } from 'ionic-angular';

import { Activity } from '../../models/activity';
import { Activities } from '../../providers/providers';

@IonicPage()
@Component({
  selector: 'page-list-master',
  templateUrl: 'list-master.html'
})
export class ListMasterPage {
  currentActivties: Activity[];

  constructor(public navCtrl: NavController, public activities: Activities, public modalCtrl: ModalController) {
    this.currentActivties = this.activities.query();
  }

  /**
   * The view loaded, let's query our items for the list
   */
  ionViewDidLoad() {
  }

  /**
   * Prompt the user to add a new item. This shows our ItemCreatePage in a
   * modal and then adds the new item to our data source if the user created one.
   */
  addItem() {
    let addModal = this.modalCtrl.create('ItemCreatePage');
    addModal.onDidDismiss(item => {
      if (item) {
        this.activities.add(item);
      }
    })
    addModal.present();
  }

  /**
   * Delete an item from the list of items.
   */
  deleteItem(activity) {
    this.activities.delete(activity);
  }

  /**
   * Navigate to the detail page for this item.
   */
  openItem(activity: Activity) {
    this.navCtrl.push('ItemDetailPage', {
      activity: Activity
    });
  }
}
