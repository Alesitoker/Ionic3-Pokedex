import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { TabsPage } from '../indexPages';
import { TutorialpProvider } from '../../providers/tutorialp/tutorialp';

@IonicPage()
@Component({
  selector: 'page-tutorial',
  templateUrl: 'tutorial.html',
})
export class TutorialPage {

  slides: any[] = [];

  constructor(public navCtrl: NavController, public navParams: NavParams, private tutorialp: TutorialpProvider) {
    this.slides = tutorialp.getSlides();
  }

  ionViewDidLoad() {

  }

  saltar_tutorial() {
    this.tutorialp.tutorial.mostrarTutorial = false;

    this.tutorialp.guardarStorage();

    this.navCtrl.setRoot(TabsPage);
  }

  // slides: any[] = [
  //   {
  //     "title": "Bienvenido a la pokedex",
  //     "description": "Lo mejor que vas a ver en tu vida",
  //     "image": "assets/imgs/tutorial/original_p.gif"
  //   },
  //   {
  //     "title": "Iniciamos una aventura",
  //     "description": "Podras ver tus pokemon favoritos de la primera generacion",
  //     "image": "assets/imgs/tutorial/Starter_cute_transparent_d.png"
  //   },
  //   {
  //     "title": "No se que poner pero quiero otra",
  //     "description": "Gustar es muy de gustar",
  //     "image": "assets/imgs/tutorial/pikachu_gif_gordo_p.gif"
  //   }
  // ]

}
