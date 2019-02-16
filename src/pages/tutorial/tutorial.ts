import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController } from 'ionic-angular';
import { TabsPage } from '../indexPages';
import { TutorialpProvider } from '../../providers/tutorialp/tutorialp';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  slides: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private tutorialp: TutorialpProvider, private loadingCtrl: LoadingController) {

  }

  ionViewCanEnter() {
    let loading = this.loadingCtrl.create({
      content: 'Cargando',
    });

    loading.present();

    let promesa = new Promise((resolve, reject) => {
        this.tutorialp.getSlides().then((slides: any[]) => {
          this.slides = slides;
          loading.dismiss();
          resolve();
        });
      });
    return promesa;
  }

  saltar_tutorial() {
    this.tutorialp.tutorial.mostrarTutorial = false;

    this.tutorialp.guardarStorage();

    this.navCtrl.setRoot(TabsPage);
  }
}
