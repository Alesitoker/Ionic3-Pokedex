import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-movimientos',
  templateUrl: 'movimientos.html',
})
export class MovimientosPage {

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MovimientosPage');
  }

  backButton() {
    this.navCtrl.pop();
  }

}
